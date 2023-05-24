const canvas = document.getElementById("camvas");
const board = document.getElementById("board");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

let coords = [];
const stecchette = [];

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
    ctx.canvas.width = board.offsetWidth; //window.innerWidth;
    ctx.canvas.height = board.offsetHeight; //window.innerHeight;
}
function reposition(event) {
    let pagex = event.clientX - canvas.offsetLeft;
    let pagey = event.clientY - canvas.offsetTop;
    coord.x = pagex - board.offsetLeft;
    coord.y = pagey - board.offsetTop;
    coords.push([pagex, pagey]);
}
function start(event) {
    document.addEventListener("mousemove", draw);
    reposition(event);
}
function stop() {
    document.removeEventListener("mousemove", draw);
    console.log(coords);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    findStecchette();
    processStecchette();
}
function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ACD3ED";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
    //ctx.fillRect(coord.x, coord.y, 10, 10);
}

const steps = 1;
function findStecchette() {
    for (let i = 0; i < coords.length; i++) {
        if (coords[i] != coords[coords.length - 1]) {
            let currx = coords[i][0];
            let curry = coords[i][1];

            let nextx = coords[i + 1][0];
            let nexty = coords[i + 1][1];

            let xdiff = Math.abs(currx - nextx);
            let ydiff = Math.abs(curry - nexty);
            console.log(xdiff + "\n" + ydiff);

            if (xdiff > 10 || ydiff > 10) {
                let steps;
                if (xdiff > ydiff) {
                    steps = xdiff / 4 + 1; // TODO: non mi piace sta formula
                } else {
                    steps = ydiff / 4 + 1; // TODO: non mi piace sta formula
                }

                //const inbetweens = [];

                const xslice = (Math.sign(currx - nextx) * xdiff) / steps;
                const yslice = (Math.sign(curry - nexty) * ydiff) / steps;

                for (let i = 1; i <= steps; i++) {
                    //inbetweens.push([currx + xslice * i, curry + yslice * i]);
                    /* ctx.fillRect(
                        currx + xslice * i - board.offsetLeft,
                        curry + yslice * i - board.offsetTop,
                        10,
                        10
                    ); */
                    let elements = document.elementsFromPoint(
                        currx + xslice * i,
                        curry + yslice * i
                    );
                    elements.forEach((element) => {
                        if (!stecchette.includes(element)) {
                            stecchette.push(element);
                        }
                    });
                }
            } else {
                let elements = document.elementsFromPoint(currx, curry);
                elements.forEach((element) => {
                    if (!stecchette.includes(element)) {
                        stecchette.push(element);
                    }
                });
                /* ctx.fillRect(
                    currx - board.offsetLeft,
                    curry - board.offsetTop,
                    10,
                    10
                ); */
            }
        }
        /* console.log(
            "i: " +
                i +
                "\ncoords[i]: " +
                coords[i] +
                "\ncoords.length: " +
                coords.length
        );
        if (coords[i] != coords[coords.length - 1]) {
            // x
            for (
                let x = coords[i][0];
                x <= coords[i + 1][0];
                x += steps * Math.sign(coords[i + 1][0])
            ) {
                //y
                for (
                    let y = coords[i][1];
                    y <= coords[i + 1][1];
                    y += steps * Math.sign(coords[i + 1][1])
                ) {
                    ctx.fillRect(
                        x - board.offsetLeft,
                        y - board.offsetTop,
                        10,
                        10
                    );
                    let elements = document.elementsFromPoint(x, y);
                    elements.forEach((element) => {
                        if (!stecchette.includes(element)) {
                            stecchette.push(element);
                        }
                    });
                }
            }
        } */
    }
    coords.length = 0;
}

function processStecchette() {
    for (let i = 0; i <= stecchette.length; i++) {
        if (stecchette[i].classList.contains("stick"))
            stecchette[i].classList.add("del");
    }
    console.log(stecchette);
    stecchette.length = 0;
}
