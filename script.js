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
const mode_val = document.getElementById('mode')
const color_val = document.getElementById('color_s')
const swi = document.getElementById('swi')
const angle = document.getElementById('angle')
const clear = document.getElementById('clear')
canvas = document.getElementById('can');
const scale = document.getElementById('scale')
const dmode = document.getElementById('dark_mode')
let theme_init = "light"

let theme_loc = localStorage.getItem("theme")

if(theme_loc === null){
  localStorage.setItem(theme, "light")
}else{
  theme_init = theme_loc;
}
dmode.addEventListener('click', ()=>{
  if(theme_loc==="light"){
    theme_loc = "dark"
    document.documentElement.setAttribute('theme', "dark")
  }else{
    theme_loc = "light"
    document.documentElement.setAttribute('theme', "light")
  }
})


clear.addEventListener('click', () => {
  localStorage.removeItem("state");
  arr=[]
  render()
})

let moveHold = false;
let delete_sel = true;
ctx = canvas.getContext("2d");
let prevX_move = 0;
let prevY_move  = 0;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
state = localStorage.getItem("state")
let found = false;
let arr = [];
let arr_prev = [];

let undo = []

function add_undo(){
  undo.push(JSON.parse(JSON.stringify(arr)));
}

if (state != null) {
  arr = JSON.parse(state);
  arr_prev = JSON.parse(state);
}//logic to check whether point is inside triangle from gfg
function area(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}

function isInside(x1, y1, x2, y2, x3, y3, x, y)
{
let A = area(x1, y1, x2, y2, x3, y3);

let A1 = area(x, y, x2, y2, x3, y3);

let A2 = area(x1, y1, x, y, x3, y3);

let A3 = area(x1, y1, x2, y2, x, y);

return (A == A1 + A2 + A3);
}
render()

//logic to check whether point is inside triangle from gfg
function area(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}

function isInside(x1, y1, x2, y2, x3, y3, x, y)
{
let A = area(x1, y1, x2, y2, x3, y3);

let A1 = area(x, y, x2, y2, x3, y3);

let A2 = area(x1, y1, x, y, x3, y3);

let A3 = area(x1, y1, x2, y2, x, y);

return (A == A1 + A2 + A3);
}


function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < arr.length; i++) {
    const shape = arr[i];
    ctx.beginPath();
    ctx.strokeStyle = shape.color
    ctx.lineWidth = shape.swi

    switch (shape.type) {
      case "rectangle":
        ctx.translate(shape.x_i + shape.width / 2, shape.y_i + shape.height / 2);
        ctx.rotate(shape.angle * Math.PI / 180);
        ctx.strokeRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        break;
      case "square":
        ctx.translate(shape.x_i + shape.width / 2, shape.y_i + shape.height / 2);
        ctx.rotate(shape.angle * Math.PI / 180);
        ctx.strokeRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        break;
      case "circle":
        ctx.arc(shape.x_i, shape.y_i, shape.r, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case "line":
        ctx.translate((shape.x_i + shape.x_f) / 2, (shape.y_i + shape.y_f) / 2);
        ctx.rotate(shape.angle * Math.PI / 180);
        ctx.moveTo(- (shape.x_f - shape.x_i) / 2, - (shape.y_f - shape.y_i) / 2);
        ctx.lineTo((shape.x_f - shape.x_i) / 2, (shape.y_f - shape.y_i) / 2);
        ctx.stroke();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
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
  angle.value = 0;
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
      add_undo();
      arr.push({ x_i: rectxi, y_i: rectyi, width: width_rect, height: height_rect, type: "rectangle", color: color_val.value, swi: swi.value, angle: angle.value })
      console.log(color_val.value, swi.value)
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
      add_undo();
      arr.push({ x_i: rectxi, y_i: rectyi, width: width_rect, height: width_rect, type: "square", color: color_val.value, swi: swi.value ,angle: angle.value})
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
      add_undo();
      arr.push({ x_i: rectxi, y_i: rectyi, r: radius, type: "circle", color: color_val.value, swi: swi.value, angle: angle.value })
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
      add_undo();

      arr.push({ x_i: rectxi, y_i: rectyi, x_f: rectxf, y_f: rectyf, type: "line",color: color_val.value, swi: swi.value, angle: angle.value })
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "eraser") {
    draw = false;
  } else if (mode == "select" && found == true) {
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
      case "triangle": {
        if (isInside(ele.x1, ele.y1, ele.x2, ele.y2, ele.x3, ele.y3, x, y)) {
          return i;
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
      add_undo();
      arr.push({ x1: points[0].x, x2: points[1].x, x3: points[2].x, y1: points[0].y, y2: points[1].y, y3: points[2].y, type: "triangle",  color: color_val.value, swi: swi.value, angle: angle.value })
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
    arr.push({ "tx": text, "xi": e.offsetX, "yi": e.offsetY, type: "text", color: color_val.value, swi: swi.value ,angle: angle.value})
    render()
  } else if (mode === "select" && found === true) {
    moveHold = true;
    prevX_move = e.offsetX;
    prevY_move = e.offsetY;
    let hit = search(e.offsetX, e.offsetY);
    let scale_val = Number(scale.value);
    let elem = arr[hit]
    add_undo()
    if (elem.type === "square" || elem.type === "rectangle") {
      console.log(scale_val)
      elem.width *= scale_val;
      elem.height *= scale_val;
      elem.angle = Number(angle.value);
      render();
    } else if (elem.type === "circle") {
      elem.r *= scale_val;
      render();
    } else if (elem.type === "triangle") {

      let centX = (elem.x1 + elem.x2 + elem.x3) / 3;
      let centY = (elem.y1 + elem.y2 + elem.y3) / 3;

      // Scaling
      elem.x1 = centX + (elem.x1 - centX) * scale_val;
      elem.y1 = centY + (elem.y1 - centY) * scale_val;
      elem.x2 = centX + (elem.x2 - centX) * scale_val;
      elem.y2 = centY + (elem.y2 - centY) * scale_val;
      elem.x3 = centX + (elem.x3 - centX) * scale_val;
      elem.y3 = centY + (elem.y3 - centY) * scale_val;

      elem.angle = Number(angle.value);

      // Point 1 Rotation
      let x1Rel = elem.x1 - centX;
      let y1Rel = elem.y1 - centY;
      elem.x1 = centX + (x1Rel * Math.cos(elem.angle * Math.PI / 180) - y1Rel * Math.sin(elem.angle * Math.PI / 180));
      elem.y1 = centY + (x1Rel * Math.sin(elem.angle * Math.PI / 180) + y1Rel * Math.cos(elem.angle * Math.PI / 180));

      // Point 2 Rotation
      let x2Rel = elem.x2 - centX;
      let y2Rel = elem.y2 - centY;
      elem.x2 = centX + (x2Rel * Math.cos(elem.angle * Math.PI / 180) - y2Rel * Math.sin(elem.angle * Math.PI / 180));
      elem.y2 = centY + (x2Rel * Math.sin(elem.angle * Math.PI / 180) + y2Rel * Math.cos(elem.angle * Math.PI / 180));

      // Point 3 Rotation
      let x3Rel = elem.x3 - centX;
      let y3Rel = elem.y3 - centY;
      elem.x3 = centX + (x3Rel * Math.cos(elem.angle * Math.PI / 180) - y3Rel * Math.sin(elem.angle * Math.PI / 180));
      elem.y3 = centY + (x3Rel * Math.sin(elem.angle * Math.PI / 180) + y3Rel * Math.cos(elem.angle * Math.PI / 180));

      render();
    // console.log("yo")
    // let editf = document.createElement("div")
    // let canv = document.getElementById("can")
    // editf.id = "edit-form"
    // editf.innerHTML = "Yo"
    // mainp.insertBefore(editf, canv)

    }
    localStorage.setItem("state", JSON.stringify(arr))
  }
});

let idx_mov;
let state_old


canv.addEventListener("mousemove", (e) => {
  if (draw) {
    if (mode == "pen") {
      prevX = currX;
      prevY = currY;
      currX = e.offsetX;
      currY = e.offsetY;
      arr_prev = [...arr];
      arr.push({ x1: prevX, y1: prevY, x2: currX, y2: currY, type: "segment", color: color_val.value, swi: swi.value, angle: angle.value })
      localStorage.setItem("state", JSON.stringify(arr))
      render();
    } else if (mode == "eraser") {
      arr_prev = [...arr];
      let hit = search(e.offsetX, e.offsetY)
      if(hit != -1){
        add_undo()
        arr.splice(hit, 1)
        render()
      }
      arr.push({ x: e.offsetX, y: e.offsetY, type: "eraser" })
      localStorage.setItem("state", JSON.stringify(arr))

      render();
    }
  }
  // if (mode == "select") {
  //   // console.log(mode, moveHold, found)
  //   // // let idx;
  //   // if (moveHold) {
  //   //   const hit = search(e.offsetX, e.offsetY);
  //   //   console.log(hit)
  //   //   if (delete_sel) {
  //   //     state_old = [...arr]
  //   //     console.log(state_old)
  //   //     arr.splice(hit, 1)
  //   //     delete_sel = false;
  //   //     idx_move = hit;
  //   //   }
  //   //   console.log(arr)
  //   //   render()
  //   //   // let state_old
  //   //   // let state_old = [...arr]
  //   //   // arr.splice(hit, 1)
  //   //   // render();
  //   //   // console.log(hit)
  //   //   console.log(state_old[idx_move])
  //   //   if (state_old[idx_move].type == "square") {
  //   //     console.log("in")
  //   //     ctx.beginPath();
  //   //     ctx.strokeStyle = state_old[idx_move].color
  //   //     ctx.lineWidth = state_old[idx_move].swi
  //   //     ctx.strokeRect(e.offsetX, e.offsetY, state_old[idx_move].width, state_old[idx_move].width)
  //   //   }
  //   //   // console.log("holding and moving")
  //   console.log(mode, moveHold, found)
  //   if (moveHold) {
  //     let hit = search(e.offsetX, e.offsetY)
  //     arr[hit].x_i = e.offsetX
  //     arr[hit].y_i = e.offsetY
  //     render()
  //   }
  // }
  // render();
  // const hit = search(e.offsetX, e.offsetY);
  // if (hit) {
  //   canv.style.cursor = "pointer"
  //   found = true;
  // } else {p = e.offs
  //   canv.style.cursor = "auto"
  //   found = false;
  // }
  if(mode == "select"){

    const hit = search(e.offsetX, e.offsetY);
    if (hit != -1) {
      canv.style.cursor = "pointer"
      found = true;
    } else {
      canv.style.cursor = "auto"
      found = false;
    }

    if (moveHold && found && (arr[hit].type === "square" || arr[hit].type === "rectangle" || arr[hit].type === "circle")) {
      arr[hit].x_i += e.offsetX - prevX_move
      arr[hit].y_i += e.offsetY - prevY_move
      render()
      prevX_move = e.offsetX;
      prevY_move = e.offsetY;
      localStorage.setItem("state", JSON.stringify(arr))
    }else if (moveHold && found && arr[hit].type === "triangle") {
      arr[hit].x1 += e.offsetX - prevX_move
      arr[hit].y1 += e.offsetY - prevY_move
      arr[hit].x2 += e.offsetX - prevX_move
      arr[hit].y2 += e.offsetY - prevY_move
      arr[hit].x3 += e.offsetX - prevX_move
      arr[hit].y3 += e.offsetY - prevY_move
      render()
      prevX_move = e.offsetX;
      prevY_move = e.offsetY;
      localStorage.setItem("state", JSON.stringify(arr))
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
  console.log(undo)
  if (e.ctrlKey && e.key === 'z') {
    if (undo.length > 0) {
      arr = undo.pop();
      console.log(undo)
      localStorage.setItem("state", JSON.stringify(arr));
      render();
    }
  }
});
// mode_val.addEventListener('change', (e) => {
//   if (mode_val.value === "dark") {
//     document.documentElement.setAttribute('theme', 'dark');
//     localStorage.setItem("theme", "dark")
//   } else {
//     document.documentElement.setAttribute('theme', 'light');
//     localStorage.setItem("theme", "light")
//   }
// })