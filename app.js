const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange")
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 1.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;


let painting = false;
let filling = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}


// 캔버스 위에서 마우스가 움직일 때
function onMouseMove (event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (painting === false) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    // console.log(`here is ${x}, ${y}`)
}

// 캔버스 위에 클릭했을 때
// function onMouseDown (event) {
//     painting = true;
// }

// 캔버스 클릭을 놨을 때
// function onMouseUp (event){
//     stopPainting();
// }

// 캔버스에서 마우스가 나올 때
// function onMouseLeave (event){
//     painting = false;
// }

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleRangeChange (event){
    const brush = event.target.value;
    ctx.lineWidth = brush;
}

function handleModeClick () {
    if (filling===true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

// 우클릭했을 때 contextmenu라는 click과 같은 일종의 기능을 사용하지 못하도록 하는 함수
function handleCanvasClick () {
    if (filling){
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
    }  else{
    }
}

function handleRightClick(event) {
	event.preventDefault();
}

function handleSaveClick() {
    //canvas의 데이터를 이미지처럼 얻도록
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image
    link.download = 'PaintJS_result';
    link.click(); // fake로 click하게 만드는 방법
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}


Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

// range === true; 가 생략됬다는 뜻
if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}