let pen_arr = []


canv.addEventListener('mouseup', (e) => {
  if (mode == "rectangle") {
    if (draw) {
      rectxf = e.offsetX;
      rectyf = e.offsetY;

      let renX = rectxi;
      let renY = rectyi
      let width_rect = rectxf - rectxi;
      let height_rect = rectyf - rectyi;
      if (width_rect < 0 && height_rect > 0) {
        renX = rectxf
      } else if (width_rect > 0 && height_rect < 0) {
        renY = rectyf
      } else if (width_rect < 0 && height_rect < 0) {
        renX = rectxf
        renY = rectyf
      }

      width_rect = Math.abs(width_rect)
      height_rect = Math.abs(height_rect)
      arr_prev = [...arr];
      add_undo();
      arr.push({ x_i: renX, y_i: renY, width: width_rect, height: height_rect, type: "rectangle", color: color_val.value, swi: swi.value, angle: angle.value })

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

      // if (width_rect < 0) {
      //  rectxi = rectxf
      //  rectyi = rectyf
      // }
      width_rect = Math.abs(width_rect)

      let renX = rectxi
      let renY = rectyi

      let draw_W = Math.abs(e.offsetX - rectxi)
      if (e.offsetX - rectxi < 0 && e.offsetY - rectyi > 0) {
        renX = e.offsetX
      } else if (e.offsetX - rectxi > 0 && e.offsetY - rectyi < 0) {
        renY = e.offsetY
        draw_W = Math.abs(e.offsetY - rectyi)
      }
      else if (e.offsetX - rectxi < 0 && e.offsetY - rectyi < 0) {
        draw_W = Math.abs(e.offsetX - rectxi)
        renX = e.offsetX
        renY = rectyi - draw_W
      }

      arr_prev = [...arr];
      add_undo();
      arr.push({ x_i: renX, y_i: renY, width: draw_W, height: draw_W, type: "square", color: color_val.value, swi: swi.value, angle: angle.value })
      localStorage.setItem("state", JSON.stringify(arr))
      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "pen") {
    arr_prev = [...arr];
    add_undo()
    arr.push({ penarr: pen_arr, type: "pen", color: color_val.value, swi: swi.value, angle: angle.value })
    localStorage.setItem("state", JSON.stringify(arr))
    pen_arr = []
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

      arr.push({ x_i: rectxi, y_i: rectyi, x_f: rectxf, y_f: rectyf, type: "line", color: color_val.value, swi: swi.value, angle: angle.value })
      localStorage.setItem("state", JSON.stringify(arr))

      draw = false;
      render();
    } else {
      draw = true;
    }
  } else if (mode == "eraser") {
    draw = false;
  } else if (mode == "select" && found == true) {
    moveHold = false;
  }
})

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
      arr.push({ x1: points[0].x, x2: points[1].x, x3: points[2].x, y1: points[0].y, y2: points[1].y, y3: points[2].y, type: "triangle", color: color_val.value, swi: swi.value, angle: angle.value })
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
    add_undo()
    arr.push({ "tx": text, "xi": e.offsetX, "yi": e.offsetY, type: "text", color: color_val.value, swi: swi.value, angle: angle.value })
    localStorage.setItem("state", JSON.stringify(arr))
    render()
  } else if (mode == "image") {
    let seed = getRandom()
    seed = seed % 100;
    seed = `${seed}`
    let url = `https://picsum.photos/seed/${seed}/200/300`;
    arr_prev = [...arr];
    add_undo();
    arr.push({ x: e.offsetX, y: e.offsetY, width: 200, height: 300, type: "image", url: url, angle: angle.value });
    localStorage.setItem("state", JSON.stringify(arr));
    render();
  } else if (mode === "select" && found === true) {
    moveHold = true;
    prevX_move = e.offsetX;
    prevY_move = e.offsetY;
    let hit = search(e.offsetX, e.offsetY);
    let scale_val = Number(scale.value);
    let elem = arr[hit]
    add_undo()
    if (elem.type === "square" || elem.type === "rectangle") {
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

    } else if (elem.type === "image") {
      elem.width *= scale_val;
      elem.height *= scale_val;

      elem.angle = Number(angle.value);
      render();
    }
    localStorage.setItem("state", JSON.stringify(arr))
  }
});



canv.addEventListener("mousemove", (e) => {
  if (draw) {
    if (mode == "pen") {
      ctx.beginPath()
      if (pen_arr.length === 0) {
        ctx.strokeStyle = color_val.value;
        ctx.lineWidth = swi.value;
        ctx.moveTo(e.offsetX, e.offsetY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
      } else {
        ctx.strokeStyle = color_val.value;
        ctx.lineWidth = swi.value;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.stroke();
      }
      prevX = currX;
      prevY = currY;
      currX = e.offsetX;
      currY = e.offsetY;
      pen_arr.push({ x1: prevX, y1: prevY, x2: currX, y2: currY })
      //localStorage.setItem("state", JSON.stringify(arr))
      // render();
    } else if (mode == "eraser") {
      arr_prev = [...arr];
      let hit = search(e.offsetX, e.offsetY)
      if (hit != -1) {
        add_undo()
        arr.splice(hit, 1)
        render()
      }
      arr.push({ x: e.offsetX, y: e.offsetY, type: "eraser" })
      localStorage.setItem("state", JSON.stringify(arr))

      render();
    }
  }

  if (mode == "select") {
    if (moveHold == true && found == false) {
      moveHold = false
      found = false
    }
    const hit = search(e.offsetX, e.offsetY);
    if (hit != -1) {
      canv.style.cursor = "pointer"
      found = true;
    } else {
      canv.style.cursor = "auto"
      found = false;
    }

    if (moveHold && found && (arr[hit].type == "square" || arr[hit].type === "rectangle" || arr[hit].type === "circle")) {
      arr[hit].x_i += e.offsetX - prevX_move
      arr[hit].y_i += e.offsetY - prevY_move
      render()
      prevX_move = e.offsetX;
      prevY_move = e.offsetY;
      localStorage.setItem("state", JSON.stringify(arr))
    } else if (moveHold && found && arr[hit].type === "triangle") {
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
    } else if (moveHold && found && arr[hit].type === "pen") {
      let x_mv = e.offsetX - prevX_move;
      let y_mv = e.offsetY - prevY_move;
      for (let j = 0; j < arr[hit].penarr.length; j++) {
        arr[hit].penarr[j].x1 += x_mv;
        arr[hit].penarr[j].y1 += y_mv;
        arr[hit].penarr[j].x2 += x_mv;
        arr[hit].penarr[j].y2 += y_mv;
        render()
        prevX_move = e.offsetX;
        prevY_move = e.offsetY;
        localStorage.setItem("state", JSON.stringify(arr))
      }
    } else if (moveHold && found && arr[hit].type === "image") {
      arr[hit].x += e.offsetX - prevX_move
      arr[hit].y += e.offsetY - prevY_move
      render()
      prevX_move = e.offsetX;
      prevY_move = e.offsetY;
      localStorage.setItem("state", JSON.stringify(arr))
    } else if (moveHold && found && arr[hit].type === "text") {
      arr[hit].xi += e.offsetX - prevX_move
      arr[hit].yi += e.offsetY - prevY_move
      render()
      prevX_move = e.offsetX;
      prevY_move = e.offsetY;
      localStorage.setItem("state", JSON.stringify(arr))
    } else if (moveHold && found && arr[hit].type === "line") {
      arr[hit].x_i += e.offsetX - prevX_move
      arr[hit].y_i += e.offsetY - prevY_move
      arr[hit].x_f += e.offsetX - prevX_move
      arr[hit].y_f += e.offsetY - prevY_move
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

    let renX = rectxi
    let renY = rectyi
    if (e.offsetX - rectxi < 0 && e.offsetY - rectyi > 0) {
      renX = e.offsetX
    } else if (e.offsetX - rectxi > 0 && e.offsetY - rectyi < 0) {
      renY = e.offsetY
    } else if (e.offsetX - rectxi < 0 && e.offsetY - rectyi < 0) {
      renX = e.offsetX
      renY = e.offsetY
    }

    ctx.strokeRect(renX, renY, Math.abs(e.offsetX - rectxi), Math.abs(e.offsetY - rectyi));
  } else if (mode == "square" && draw === true) {
    render();
    ctx.beginPath();
    ctx.strokeStyle = color_val.value
    ctx.lineWidth = swi.value

    let renX = rectxi
    let renY = rectyi
    let draw_W = Math.abs(e.offsetX - rectxi)
    if (e.offsetX - rectxi < 0 && e.offsetY - rectyi > 0) {
      renX = e.offsetX
    } else if (e.offsetX - rectxi > 0 && e.offsetY - rectyi < 0) {
      renY = e.offsetY
      draw_W = Math.abs(e.offsetY - rectyi)
    }
    else if (e.offsetX - rectxi < 0 && e.offsetY - rectyi < 0) {
      draw_W = Math.abs(e.offsetX - rectxi)
      renX = e.offsetX
      renY = rectyi - draw_W
    }

    ctx.strokeRect(renX, renY, draw_W, draw_W);

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
