const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
ctx.lineWidth = 1.5;
ctx.strokeStyle = "#2c2c2c";


let painting = false;



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
function onMouseDown (event) {
    painting = true;
}

// 캔버스 클릭을 놨을 때
// function onMouseUp (event){
//     stopPainting();
// }

// 캔버스에서 마우스가 나올 때
// function onMouseLeave (event){
//     painting = false;
// }

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

colorPick.addEventListener("click", colorChange);