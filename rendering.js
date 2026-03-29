clear.addEventListener('click', () => {
  localStorage.removeItem("state");
  arr = []
  render()
})


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
      case "pen":
        if (shape.penarr.length === 0) {
          break;
        }
        ctx.moveTo(shape.penarr[0].x1, shape.penarr[0].y1);
        for (let i = 0; i < shape.penarr.length; i++) {
          ctx.moveTo(shape.penarr[i].x1, shape.penarr[i].y1);
          ctx.lineTo(shape.penarr[i].x2, shape.penarr[i].y2);
          ctx.stroke();
        }
        break;
      // case "eraser":
      //     ctx.clearRect(shape.x - 10, shape.y - 10, 20, 20);
      //     break;
      case "text":
        ctx.font = "48px serif";
        ctx.fillText(shape.tx, shape.xi, shape.yi);
        break;
      case "image":

        const img = new Image();
        img.src = shape.url;
        img.onload = () => {
          ctx.beginPath();
          ctx.strokeStyle = shape.color
          ctx.lineWidth = shape.swi
          ctx.translate(shape.x + shape.width / 2, shape.y + shape.height / 2);
          ctx.rotate(shape.angle * Math.PI / 180);
          ctx.drawImage(img, -shape.width / 2, -shape.height / 2, shape.width, shape.height);
          ctx.setTransform(1, 0, 0, 1, 0, 0);

        }


        ctx.setTransform(1, 0, 0, 1, 0, 0);
        break;
    }
  }

}


function icoClick(e, type) {
  document.getElementById(mode).classList.remove('ico-base-selected')
  document.getElementById(mode).classList.add('ico-base')
  angle.value = 0;
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
image.addEventListener('click', (e) => { icoClick(e, "image") })
