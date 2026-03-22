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
let points = [];
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
  } else if (mode == "square") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      console.log(rectxi, rectyi, rectxf, rectyf)
      let width_rect = rectxf - rectxi;
      ctx.strokeRect(rectxi, rectyi, width_rect, width_rect)
      draw = false;
    } else {
      draw = true;
    }
  } else if (mode == "pen") {
    draw = false;
  } else if (mode == "circle") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      let radius = Math.sqrt(((rectxf - rectxi) * (rectxf - rectxi)) + ((rectyf - rectyi) * (rectyf - rectyi)));
      ctx.beginPath();
      ctx.arc(rectxi, rectyi, radius, 0, 2 * Math.PI);
      ctx.stroke();
      draw = false;
    } else {
      draw = true;
    }
  } else if (mode == "line") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      ctx.beginPath();
      ctx.moveTo(rectxi, rectyi);
      ctx.lineTo(rectxf, rectyf);
      ctx.stroke();
      ctx.closePath();
      draw = false;
    } else {
      draw = true;
    }
  } else if (mode == "eraser") {
    draw = false;
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

  } else if (mode == "square") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
      ctx.beginPath();
      ctx.moveTo(rectxi, rectyi);
      ctx.closePath();
    }
  } else if (mode == "triangle") {
    points.push({ x: e.offsetX, y: e.offsetY });
    if (points.length === 3) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.closePath();
      ctx.stroke();
      points = [];
    }
  } else if (mode == "circle") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
    }
  } else if (mode == "line") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
    }
  } else if (mode == "eraser") {
    draw = true;
    currX = e.offsetX;
    currY = e.offsetY;
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
    } else if (mode == "eraser") {
      ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20);
    }

  }
});
