const squ = document.getElementById('square')

const cir = document.getElementById('circle')

const triangle = document.getElementById('triangle')

const pen = document.getElementById('pen')

const eraser = document.getElementById('eraser')

const rectangle = document.getElementById('rectangle')

const line = document.getElementById('line')

canvas = document.getElementById('can');
ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let rectxi = 0;
let rectyi = 0;
let rectxf = 0;
let rectyf = 0;
let mode;
let currY = 0;
let currX = 0;
let prevX = 0;
let prevY = 0;
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

  if (mode == "rectangle") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      console.log(rectxi, rectyi, rectxf, rectyf)
      let width_rect = rectxf - rectxi;
      let height_rect = rectyf - rectyi;
      ctx.strokeRect(rectxi, rectyi, width_rect, height_rect)
      draw = false;
    } else {
      draw = true;
    }
  }
  console.log("mouse up")
})

canv.addEventListener('mousedown', (e) => {
  if (mode == "pen") {
    draw = true;
    currX = e.offsetX;
    currY = e.offsetY
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.closePath();
  } else if (mode == "rectangle") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
      ctx.beginPath();
      ctx.moveTo(rectxi, rectyi);
      ctx.closePath();
    }

  }

});

canv.addEventListener("mousemove", (e) => {
  if (draw) {
    if (mode == "pen") {
      prevX = currX;
      prevY = currY;
      currX = e.offsetX;
      currY = e.offsetY;
      console.log(prevX, prevY, currX, currY, e.clientX, e.clientY)
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.stroke();
      ctx.closePath();
    } else if (mode == "square") {
      prevX = currX;
      prevY = currY;
      currX = e.offsetX;
      currY = e.offsetY;

    }

  }
});
