const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const urlParams = new URLSearchParams(location.search);

ctx.font = "60px Arial monospace";
ctx.fillStyle = "red";
ctx.textBaseline = "middle";
ctx.textAlign = "center";

const stations = {
    station: "Вокзал",
    beach: "Пляж",
    park: "Парк",
    bay: "Бухта",
    center: "Центр",
    residential_complex: "Жилой комплекс",
    office: "Офис",
    stadium: "Стадион",
    airport: "Аэропорт"
}

const threads = {
    red: ["station", "beach", "park", "bay", "center", "residential_complex"],
    blue: ["station", "office", "stadium", "airport"]
}

const station = urlParams.get("station");
const direction = urlParams.get("direction");
const thread = urlParams.get("thread");

ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(canvas.width / 2, 0);
ctx.lineTo(canvas.width / 2, canvas.height);
ctx.strokeStyle = "black";
ctx.stroke();

ctx.lineWidth = 10;
ctx.strokeStyle = ctx.fillStyle = thread;

ctx.beginPath();
ctx.moveTo(canvas.width - 50, 10);
ctx.lineTo(canvas.width - 50, canvas.height - 10);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 10);
ctx.lineTo(50, canvas.height - 10);
ctx.stroke();

ctx.lineWidth=5;

ctx.beginPath();
ctx.moveTo(canvas.width - 65, canvas.height-10);
ctx.lineTo(canvas.width - 35, canvas.height-10);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(65,10);
ctx.lineTo(35,10);
ctx.stroke();

ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(canvas.width - 50, 0);
ctx.lineTo(canvas.width - 70, 20);
ctx.lineTo(canvas.width - 30, 20);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, canvas.height);
ctx.lineTo(70, canvas.height - 20);
ctx.lineTo(30, canvas.height - 20);
ctx.closePath();
ctx.fill();

ctx.font = "20px Arial monospace"
ctx.textBaseline = "middle";
ctx.fillStyle = "white"
ctx.textAlign = "right";

let currentThread = threads[thread];
if (direction == 1) currentThread = currentThread.reverse();
ctx.lineWidth = 5;
for (let i = 0; i < currentThread.length; i++) {
    if (currentThread[i] == station) ctx.fillStyle = ctx.strokeStyle = "cyan";
    else {
        ctx.fillStyle = "white";
        ctx.strokeStyle = thread;
    }
    let y = (canvas.height - 20) / currentThread.length * i;
    ctx.fillText(stations[currentThread[i]], canvas.width - 70, y + 40);
    ctx.beginPath();
    ctx.moveTo(canvas.width - 65, y + 40);
    ctx.lineTo(canvas.width - 35, y + 40);
    ctx.stroke();
}
ctx.textAlign = "left";
for (let i = 0; i < currentThread.length; i++) {
    if (currentThread[i] == station) ctx.fillStyle = ctx.strokeStyle = "cyan";
    else {
        ctx.fillStyle = "white";
        ctx.strokeStyle = thread;
    }
    let y = (canvas.height - 20) / currentThread.length * i;
    ctx.fillText(stations[currentThread[i]], 70, y + 40);
    ctx.beginPath();
    ctx.moveTo(65, y + 40);
    ctx.lineTo(35, y + 40);
    ctx.stroke();
}