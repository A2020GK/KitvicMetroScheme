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
    sports: "Спортивная",
    interfluve: "Междуречье",
    airport: "Аэропорт",
}

const threads = {
    red: ["station", "beach", "park", "bay", "center", "residential_complex"],
    blue: ["station", "office", "sports", "interfluve", "airport"]
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

const ball = { x: 50, y: 50, color:0 };

function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 50, 0, Math.PI * 2);
    ctx.fillStyle = `HSLA(${ball.color},100%,50%,0.2)`;
    ctx.lineWidth=1;
    ctx.strokeStyle=`rgba(0,0,0,0.2)`;
    ctx.fill();
    ctx.stroke();

    // -- Static info --
    // Splitter
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 10);
    ctx.lineTo(canvas.width / 2, canvas.height - 10);
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.stroke();

    function threadArrow(rotated) {

        const x = rotated ? canvas.width - 30 : 30;

        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, canvas.height - 20);
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = thread;
        ctx.stroke();

        // Arrow
        ctx.beginPath();
        let yb = rotated ? 15 : canvas.height - 15;
        let ycof = rotated ? -15 : 15;
        ctx.moveTo(x, yb);
        ctx.lineTo(x - 10, yb - ycof);
        ctx.lineTo(x + 10, yb - ycof);
        ctx.closePath();
        ctx.fillStyle = thread;
        ctx.fill();

        const ymax = rotated ? canvas.height - 15 : canvas.height - 30;
        const ymin = rotated ? ymax - (canvas.height - 45) : 20;

        let step = (ymax - ymin) / rThread.length;

        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.font = "20px Comic Sans MS, Comic Sans, cursive";
        ctx.textAlign=rotated?"right":"left";
        ctx.textBaseline="middle";

        for (let y = 0; y < rThread.length; y++) {

            let ycord = ymin + step * y + (rotated ? step - 5 : 0);

            ctx.beginPath();
            ctx.moveTo(x - 10, ycord);
            ctx.lineTo(x + 10, ycord);

            if(rThread[y] == station) {
                ctx.fillStyle=curStMap[thread];
            } else {
                ctx.fillStyle=thread;
            }
            ctx.fillText(stations[rThread[y]],rotated?x-20:x+20,ycord);

            ctx.stroke();
        }

    }
    threadArrow(false);
    threadArrow(true);

}

const randomFloat = (min, max) => Math.random() * (max - min) + min;

let xCof = randomFloat(0.5, 2);
let yCof = randomFloat(0.5, 2);

function app() {

    ball.x += xCof;
    ball.y += yCof;

    ball.color++;
    if(ball.color>=360) ball.color=0;

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