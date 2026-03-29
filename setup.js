//grabbing elements


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
let moveHold = false;
let delete_sel = true;
const canv = document.getElementById('can')
//canvas setting

let reload_img = true;
ctx = canvas.getContext("2d");
let prevX_move = 0;
let prevY_move  = 0;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//state and undo
state = localStorage.getItem("state")
let found = false;
let arr = [];
let arr_prev = [];

let redo = []
let undo = []

//rendering vars
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

//Dark Mode Setup
if(theme_loc === null){
    localStorage.setItem("theme", "light")
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

if (state != null) {
    arr = JSON.parse(state);
    arr_prev = JSON.parse(state);
}

function add_undo(){
    undo.push(JSON.parse(JSON.stringify(arr)));

    redo = []
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
        if (undo.length > 0) {
            redo.push(JSON.parse(JSON.stringify(arr)));
            arr = undo.pop();
            localStorage.setItem("state", JSON.stringify(arr));
            render();
        }
    } else if (e.ctrlKey && e.key === 'r') {
        e.preventDefault()
        if (redo.length > 0) {
            undo.push(JSON.parse(JSON.stringify(arr)));
            arr = redo.pop();
            localStorage.setItem("state", JSON.stringify(arr));
            render();
        }
    }
});
