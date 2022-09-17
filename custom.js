const btn = document.querySelector('.btn');
let inputs = document.querySelectorAll('.input'),
    totalValue = 0;

const canvas = document.querySelector('#pieChart');
canvas.height = 300;
canvas.width = 300;
let ctx = canvas.getContext('2d');

// Data object containing pie chart sizes
const data = {
  one : undefined,
  two: undefined,
  three: undefined,
  four: undefined,
  five: undefined
}

// Setting data object values to user / or default input values
function updateValue() {
  inputs.forEach(input => {
    data[input.id] = parseInt(input.value);
  });
  return data;
}
updateValue();

// Update total value (sum of all of the user inputs or default data values)
function updateTotal() {
  for (let value in data) {
    totalValue += data[value];
  }
  return totalValue;
}

updateTotal();

const colors = [
  '#f8b195',
  '#f67280',
  '#ffc1d3',
  '#d4c0e5',
  '#1d4260'
]

// Class for creating a pie chart
class Chart {
  constructor(data, totalValue) {
    this.x = canvas.height / 2;
    this.y = canvas.height / 2;
    this.start = 0;
    this.totalValue = totalValue;
    
    let index = 0;

    for (let value in data) {
      totalValue += data[value];
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x, this.y, 100, this.start, this.start + (Math.PI * 2 * (data[value] / this.totalValue)), false);
      ctx.fillStyle = colors[index];
      ctx.fill();

      this.start += Math.PI * 2 * (data[value] / this.totalValue);
      index += 1;
    }
  }
}

// Default pie chart instance
const test = new Chart(data, totalValue);

// Draw a new chart using updated values
function redrawChart(totalValue) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let chart = new Chart(data, totalValue);
}

// Event handler
function handler(e) {
  let input = e.target.closest('.input');

  if (input) {
    input.value = "";
    return;
  }

  let btn = e.target.closest('.btn');

  if (!btn) return;

  inputs.forEach(input => {
    if (input.value === "") {
      input.value = 0;
    }
  });

  totalValue = 0;
  updateValue();
  updateTotal();
  redrawChart(totalValue);
}

window.addEventListener('click', handler);