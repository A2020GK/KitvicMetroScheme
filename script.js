const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const urlParams = new URLSearchParams(location.search);

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

const rThread = threads[thread];

if (direction == 1) rThread.reverse();

const curStMap = {
    red: "blue",
    blue: "red"
}

const ball = { x: 50, y: 50 };

function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 50, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,255,0,0.2)";
    ctx.fill();

    // -- Static info --
    // Splitter
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 10);
    ctx.lineTo(canvas.width / 2, canvas.height - 10);
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.stroke();

    function threadArrow(x, color, rotated) {
        let ymin = rotated ? canvas.height - 20 : 20;
        let ymax = rotated ? 20 : canvas.height - 20;

        let arrowCof = 10;

        ctx.beginPath();
        ctx.moveTo(x, ymin);
        ctx.lineTo(x, ymax);
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - 10, rotated ? ymin - 5 : ymin + 5);
        ctx.lineTo(x + 10, rotated ? ymin - 5 : ymin + 5);
        ctx.lineTo(x, rotated ? ymin + arrowCof : ymin - arrowCof);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = "20px Comic Sans MS, Comic Sans, cursive";

        ymax = canvas.height - 30;
        ymin = 20;

        const step = (ymax - ymin) / rThread.length;

        ctx.textBaseline = "middle";
        ctx.textAlign = rotated ? "left" : "right";

        for (let y = 0; y < rThread.length; y++) {
            let yc = y * step +step+30;
            let yr = rotated ? canvas.height - yc : yc;

            ctx.beginPath();
            ctx.moveTo(x - 10, yr);
            ctx.lineTo(x + 10, yr);
            ctx.stroke();

            if (station == rThread[y]) {
                ctx.fillStyle = curStMap[thread];
            } else {
                ctx.fillStyle = thread;
            }
            ctx.fillText(stations[rThread[y]], rotated ? x + 20 : x - 20, yr);
        }
    }

    threadArrow(30, thread, true)
    threadArrow(canvas.width - 30, thread, false);


}

const randomFloat = (min, max) => Math.random() * (max - min) + min;

let xCof = randomFloat(0.5,2);
let yCof = randomFloat(0.5,2);

function app() {

    ball.x += xCof;
    ball.y += yCof;

    if (ball.x >= canvas.width - 50) {
        xCof = -randomFloat(0.5, 2);
    } else if (ball.x <= 50) {
        xCof = randomFloat(0.5, 2);
    }

    if (ball.y >= canvas.height - 50) {
        yCof = -randomFloat(0.5, 2);
    } else if (ball.y <= 50) {
        yCof = randomFloat(0.5, 2);
    }

    render();
    requestAnimationFrame(app);
}

app();