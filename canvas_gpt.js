/*  // Seleziona il tuo elemento canvas dal DOM
const canvas = document.getElementById('camvas');
const ctx = canvas.getContext('2d');

// Variabile booleana per tenere traccia dello stato del mouse
let isDrawing = false;

// Variabili per tenere traccia delle coordinate iniziali e finali
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// Aggiungi event listener per l'evento del mouse
const boarddiv = document.getElementById("board");
const canvasWidth = boarddiv.offsetWidth;
const canvasHeight = ;
canvas.height = boarddiv.offsetHeight;
canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Funzione chiamata quando il mouse viene premuto
function startDrawing(e) {
  isDrawing = true;
  startX = e.pageX - canvas.offsetLeft;
  startY = e.pageY - canvas.offsetTop;
}

// Funzione chiamata durante il movimento del mouse
function drawLine(e) {
  if (!isDrawing) return;
  endX = e.pageX - canvas.offsetLeft;
  endY = e.pageY - canvas.offsetTop;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Cancella l'intero canvas
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

// Funzione chiamata quando il mouse viene rilasciato o esce dall'area del canvas
function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  
  // Cancella gli elementi sotto la linea
  const minX = Math.min(startX, endX);
  const maxX = Math.max(startX, endX);
  const minY = Math.min(startY, endY);
  const maxY = Math.max(startY, endY);
  
  const elements = document.elementsFromPoint(minX, minY);
  elements.forEach((element) => {
    if (element !== {canvas, html, body}) {
      element.remove();
    }
  });
}

/* const boarddiv = document.getElementById("board");
const canvasWidth = boarddiv.offsetWidth;
const canvasHeight = boarddiv.offsetHeight;

var canvas = null;
var bounds = null;
var ctx = null;
var hasLoaded = false;

var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
var existingLines = [];

function draw() {
    //ctx.fillStyle = "#33333300";
    //ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();

/*     for (var i = 0; i < existingLines.length; ++i) {
        var line = existingLines[i];
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
    } 

    ctx.stroke();

    if (isDrawing) {
        //ctx.strokeStyle = "darkred";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        imageData = ctx.getImageData(0,0, canvas.width, canvas.height)
        ctx.putImageData(imageData, circleX, circleY, circleX, circleY, 2*circle_radius, 2*circle_radius)

    }
}

function onmousedown(e) {
    if (hasLoaded && e.button === 0) {
        if (!isDrawing) {
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;

            isDrawing = true;
        }

        draw();
    }
}

function onmouseup(e) {
    if (hasLoaded && e.button === 0) {
        if (isDrawing) {
            existingLines.push({
                startX: startX,
                startY: startY,
                endX: mouseX,
                endY: mouseY
            });

            isDrawing = false;
        }

        draw();
    }
}

function onmousemove(e) {
    if (hasLoaded) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;

        if (isDrawing) {
            draw();
        }
    }
}

window.onload = function() {
    canvas = document.getElementById("camvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.onmousedown = onmousedown;
    canvas.onmouseup = onmouseup;
    canvas.onmousemove = onmousemove;

    bounds = canvas.getBoundingClientRect();
    ctx = canvas.getContext("2d");
    hasLoaded = true;

    draw();
} */

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
    ctx.fillRect(coord.x, coord.y, 10, 10);
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
                    ctx.fillRect(
                        currx + xslice * i - board.offsetLeft,
                        curry + yslice * i - board.offsetTop,
                        10,
                        10
                    );
                }
            } else {
                ctx.fillRect(
                    currx - board.offsetLeft,
                    curry - board.offsetTop,
                    10,
                    10
                );
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
