const squ = document.getElementById('square')

const cir = document.getElementById('circle')

const triangle = document.getElementById('triangle')

const pen = document.getElementById('pen')

const eraser = document.getElementById('eraser')

const rectangle = document.getElementById('rectangle')

const line = document.getElementById('line')

canvas = document.getElementById('can');
ctx = canvas.getContext("2d");

let mode;
let currY, currX, prevX, prevY = 0;
let draw = false;

function icoClick(e, type) {
  console.log(type)
  mode = type;
}

squ.addEventListener('click', (e) => {
  icoClick(e, "square")
})

cir.addEventListener('click', (e) => {
  icoClick(e, "circle")
})

triangle.addEventListener('click', (e) => {
  icoClick(e, "triangle")
})

pen.addEventListener('click', (e) => {
  icoClick(e, "pen")
})

eraser.addEventListener('click', (e) => {
  icoClick(e, "eraser")
})

rectangle.addEventListener('click', (e) => {
  icoClick(e, "rectangle")
})

line.addEventListener('click', (e) => {
  icoClick(e, "line")
})

const canv = document.getElementById('can')

canv.addEventListener('mouseup', (e) => {
  draw = false;
  console.log("mouse up")
})

canv.addEventListener('mousedown', (e) => {
  draw = true;
  currY = prevY;
  currX = prevX;
});

canv.addEventListener("mousemove", (e) => {
  if (!draw) return;
  prevX = currX;
  prevY = currY;
  currX = e.offsetX;
  currY = e.offsetY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.stroke();
  ctx.closePath();
});
