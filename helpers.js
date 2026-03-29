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

function getRandom(){
    return Math.random()
}
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

            case "pen":{
                let found_touch = -1;
                for (let j = 0; j < ele.penarr.length; j++) {
                    let dist = (x - ele.penarr[j].x1)**2 + (y-ele.penarr[j].y1)**2;
                    if(dist <= 500){
                        return  i;
                    }
                }

            }
            case "image": {
                if (x >= ele.x && x <= ele.x + ele.width && y >= ele.y && y <= ele.y + ele.height) {
                    return i;
                }
                break;
            }
            case "text" : {
                let width_tx = ctx.measureText(ele.tx).width
                let height_tx = 48
                if (x >= ele.xi && x <= ele.xi + width_tx && y <= ele.yi && y >= height_tx - ele.yi) {
                    return i;
                }


            }

        }
    }
    return -1;
}
