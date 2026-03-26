const squ = document.getElementById('square')
const cir = document.getElementById('circle')
const triangle = document.getElementById('triangle')
const pen = document.getElementById('pen')
const eraser = document.getElementById('eraser')
const rectangle = document.getElementById('rectangle')
const line = document.getElementById('line')
const text = document.getElementById('text')
const select = document.getElementById('select')
const mainp = document.getElementById('main_parent')
const stroke_val = document.getElementById('stroke')
const color_val = document.getElementById('color_s')
const swi = document.getElementById('swi')
canvas = document.getElementById('can');

let moveHold = false;
ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
state = localStorage.getItem("state")
let found = false;
let arr = [];
let arr_prev = [];
if (state != null) {
  arr = JSON.parse(state);
  arr_prev = JSON.parse(state);
}
render()

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arr.length; i++) {
    const shape = arr[i];
    ctx.beginPath();
    ctx.strokeStyle = shape.color
    ctx.lineWidth = shape.swi

    switch (shape.type) {
      case "rectangle":
        ctx.strokeRect(shape.x_i, shape.y_i, shape.width, shape.height);
        break;
      case "square":
        ctx.strokeRect(shape.x_i, shape.y_i, shape.width, shape.height);
        break;
      case "circle":
        ctx.arc(shape.x_i, shape.y_i, shape.r, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case "line":
        ctx.moveTo(shape.x_i, shape.y_i);
        ctx.lineTo(shape.x_f, shape.y_f);
        ctx.stroke();
        break;
      case "triangle":
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.lineTo(shape.x3, shape.y3);
        ctx.closePath();
        ctx.stroke();
        break;
      case "segment":
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        break;
      case "eraser":
        ctx.clearRect(shape.x - 10, shape.y - 10, 20, 20);
        break;
      case "text":
        ctx.font = "48px serif";
        ctx.fillText(shape.tx, shape.xi, shape.yi);
    }
  }
}

let rectxi = 0;
let rectyi = 0;
let rectxf = 0;
let rectyf = 0;
let mode = "square";
let currY = 0;
let currX = 0;
let prevX = 0;
let prevY = 0;
let draw = false;
let points = [];

function icoClick(e, type) {
  document.getElementById(mode).classList.remove('ico-base-selected')
  document.getElementById(mode).classList.add('ico-base')
  console.log(type)
  mode = type;
  document.getElementById(mode).classList.remove('ico-base')
  document.getElementById(mode).classList.add('ico-base-selected')
}

squ.addEventListener('click', (e) => { icoClick(e, "square") })
cir.addEventListener('click', (e) => { icoClick(e, "circle") })
triangle.addEventListener('click', (e) => { icoClick(e, "triangle") })
pen.addEventListener('click', (e) => { icoClick(e, "pen") })
eraser.addEventListener('click', (e) => { icoClick(e, "eraser") })
rectangle.addEventListener('click', (e) => { icoClick(e, "rectangle") })
line.addEventListener('click', (e) => { icoClick(e, "line") })
text.addEventListener('click', (e) => { icoClick(e, "text") })
select.addEventListener('click', (e) => { icoClick(e, "select") })

const canv = document.getElementById('can')

canv.addEventListener('mouseup', (e) => {
  if (mode == "rectangle") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      let width_rect = rectxf - rectxi;
      let height_rect = rectyf - rectyi;
      arr_prev = [...arr];
      arr.push({ x_i: rectxi, y_i: rectyi, width: width_rect, height: height_rect, type: "rectangle", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      console.log(stroke_val.value, color_val.value, swi.value)
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "square") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      let width_rect = rectxf - rectxi;
      arr_prev = [...arr];
      arr.push({ x_i: rectxi, y_i: rectyi, width: width_rect, height: width_rect, type: "square", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
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
      arr_prev = [...arr];
      arr.push({ x_i: rectxi, y_i: rectyi, r: radius, type: "circle", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "line") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;
      arr_prev = [...arr];
      arr.push({ x_i: rectxi, y_i: rectyi, x_f: rectxf, y_f: rectyf, type: "line", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "eraser") {
    draw = false;
  } else if (mode == "select" && found==true){
    console.log("change")
    moveHold = false;
  }
})

function search(x, y) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    switch (ele.type) {
      case "square": {

        if (x >= ele.x_i && x <= ele.x_i + ele.width && y >= ele.y_i && y <= ele.height + ele.y_i) {
          return i;
        }

        break;

      }

      case "rectangle": {
        if (x >= ele.x_i && x <= ele.x_i + ele.width && y >= ele.y_i && y <= ele.height + ele.y_i) {
          return i;
        }
        break;
      }
      case "circle": {
        if ((x - ele.x_i) ** 2 + (y - ele.y_i) ** 2 <= ele.r ** 2) {
          return i;

        }

        break;
      }

      case "line": {
        let a2_b2 = Math.sqrt((ele.x_f - ele.x_i) ** 2 + (ele.y_f - ele.y_i) ** 2);
        // distance of point from |line Ax^2 + By^2 + C | / root A^2 + B^2 11th ki coordinate geometry :)
        let dist = Math.abs((ele.y_f - ele.y_i) * x - (ele.x_f - ele.x_i) * y + ele.x_f * ele.y_i - ele.y_f * ele.x_i) / a2_b2;
        if (dist <= 4) {
          return i
        };
        break;
      }


    }
  }
  return -1;
}

canv.addEventListener('mousedown', (e) => {

  if (mode == "pen") {
    draw = true;
    currX = e.offsetX;
    currY = e.offsetY;
  } else if (mode == "rectangle") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
    }
  } else if (mode == "square") {
    if (!draw) {
      rectxi = e.offsetX;
      rectyi = e.offsetY;
    }
  } else if (mode == "triangle") {
    points.push({ x: e.offsetX, y: e.offsetY });
    if (points.length === 3) {
      arr_prev = [...arr];
      arr.push({ x1: points[0].x, x2: points[1].x, x3: points[2].x, y1: points[0].y, y2: points[1].y, y3: points[2].y, type: "triangle", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      localStorage.setItem("state", JSON.stringify(arr))
      points = [];
      render();
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
  } else if (mode == "text") {
    let text = prompt();
    arr_prev = [...arr];
    arr.push({ "tx": text, "xi": e.offsetX, "yi": e.offsetY, type: "text", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
    render()
  } else if (mode === "select" && found === true) {
    moveHold = true;
    // console.log("yo")
    // let editf = document.createElement("div")
    // let canv = document.getElementById("can")
    // editf.id = "edit-form"
    // editf.innerHTML = "Yo"
    // mainp.insertBefore(editf, canv)

  }
});

canv.addEventListener("mousemove", (e) => {
  if (draw) {
    if (mode == "pen") {
      prevX = currX;
      prevY = currY;
      currX = e.offsetX;
      currY = e.offsetY;
      arr_prev = [...arr];
      arr.push({ x1: prevX, y1: prevY, x2: currX, y2: currY, type: "segment", stroke: stroke_val.value, color: color_val.value, swi: swi.value })
      localStorage.setItem("state", JSON.stringify(arr))
      render();
    } else if (mode == "eraser") {
      arr_prev = [...arr];
      arr.push({ x: e.offsetX, y: e.offsetY, type: "eraser" })
      localStorage.setItem("state", JSON.stringify(arr))
      render();
    }
  }
  if (mode == "select") {
    console.log(mode, moveHold, found)
    if(moveHold){
      const hit = search(e.offsetX, e.offsetY);
      console.log(hit)
      let state_old = [...arr]
      console.log(state_old)
      arr.splice(hit, 1)
      console.log(arr)
      render()
      // let state_old
      // let state_old = [...arr]
      // arr.splice(hit, 1)
      // render();
      // console.log(hit)
      // if(state_old[hit].type == "square"){
      //   ctx.beginPath();
      //   ctx.strokeStyle = shape.color
      //   ctx.lineWidth = shape.swi
      //   ctx.strokeRect(e.offsetX, e.offsetY, state_old[hit].width, state_old[hit].width)
      // }
      // console.log("holding and moving")
    }
    render();
    const hit = search(e.offsetX, e.offsetY);
    if (hit) {
      canv.style.cursor = "pointer"
      found = true;
    } else {
      canv.style.cursor = "auto"
      found = false;
    }
  }
  if (mode == "rectangle" && draw === true) {
    render();
    ctx.beginPath();
    ctx.strokeStyle = color_val.value
    ctx.lineWidth = swi.value
    ctx.strokeRect(rectxi, rectyi, Math.abs(e.offsetX - rectxi), Math.abs(e.offsetY - rectyi));
  } else if (mode == "square" && draw === true) {
    render();
    ctx.beginPath();
    ctx.strokeStyle = color_val.value
    ctx.lineWidth = swi.value
    ctx.strokeRect(rectxi, rectyi, Math.abs(e.offsetX - rectxi), Math.abs(e.offsetX - rectxi));
  } else if (mode == "circle" && draw === true) {
    render();
    ctx.beginPath();
    ctx.strokeStyle = color_val.value
    ctx.lineWidth = swi.value
    ctx.arc(rectxi, rectyi, Math.sqrt(((e.offsetX - rectxi) * (e.offsetX - rectxi)) + ((e.offsetY - rectyi) * (e.offsetY - rectyi))), 0, 2 * Math.PI);
    ctx.stroke();
  } else if (mode == "line" && draw === true) {
    render()
    ctx.beginPath();
    ctx.strokeStyle = color_val.value
    ctx.lineWidth = swi.value
    ctx.moveTo(rectxi, rectyi);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

  } else if (mode == "triangle" && points.length > 0) {
    render();
    ctx.beginPath()
    ctx.strokeStyle = color_val.value;
    ctx.lineWidth = swi.value;
    if (points.length === 1) {
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    } else if (points.length === 2) {
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.closePath();
      ctx.stroke();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    console.log("log")
    console.log(arr_prev)
    arr = [...arr_prev]
    localStorage.setItem("state", JSON.stringify(arr))
    render()
  }
})
