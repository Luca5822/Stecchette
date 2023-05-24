const linedebug = false;

// Carica la "tavola" da gioco e il canvas (per le linee tracciate dal mouse) con il context 2d
const board = document.getElementById("board");
const canvas = document.getElementById("camvas");
const ctx = canvas.getContext("2d");

// Inizializza la variabile per le coordinate del canvas
let coord = { x: 0, y: 0 };

// tiene le coordinate della linea del canvas
const linecoords = [];

// Listener per il mouse o quando viene ridimensionata la finestra
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);
// TODO: trova il modo per tenere il canvas non troppo largo rispetto al bordo delle stecchette (a destra e a sinistra, in alto e basso aggiungi un margine)
resize();

// Ridimensiona il canvas
function resize() {
    ctx.canvas.width = board.offsetWidth; //window.innerWidth;
    ctx.canvas.height = board.offsetHeight; //window.innerHeight;
}

// Riposiziona il punto della linea sul canvas e aggiunge le coordinate correnti all'array delle coordinate
function reposition(event) {
    let pagex = event.clientX - canvas.offsetLeft;
    let pagey = event.clientY - canvas.offsetTop;
    coord.x = pagex - board.offsetLeft;
    coord.y = pagey - board.offsetTop;
    linecoords.push([pagex, pagey]);
}

// Avvia il processo di disegno
function start(event) {
    document.addEventListener("mousemove", draw);
    reposition(event);
}

// Ferma il processo di disegno, pulisce il canvas, inoltre trova e processa le stecchette selezionate
function stop() {
    document.removeEventListener("mousemove", draw);
    console.log(linecoords);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    processStecchette(findStecchette());
}

// Disegna sul canvas
function draw(event) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    //ctx.strokeStyle = "#ACD3ED"; // TODO: rendi colore quello del giocatore
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
    //ctx.fillRect(coord.x, coord.y, 10, 10);
}

// Dato un array di punti, trova se è stata tracciata una linea sopra ad una stecchetta
// se i punti sono troppo distanti fa un tentativo (brutto e schifoso) per cercare di aggiungere punti sulla linea
function findStecchette() {
    const stecchette = [];
    for (let i = 0; i < linecoords.length; i++) {
        // check per evitare che faccia un errore quando richiede linecoords[i+1]
        if (linecoords[i] != linecoords[linecoords.length - 1]) {
            // Trova x e y correnti e successive; trova la distanza tra x corrente e x "futura", poi la stessa cosa per y
            let currx = linecoords[i][0];
            let curry = linecoords[i][1];

            let nextx = linecoords[i + 1][0];
            let nexty = linecoords[i + 1][1];

            let xdiff = Math.abs(currx - nextx);
            let ydiff = Math.abs(curry - nexty);

            // se una delle differenze è minore di 10:
            if (xdiff > 10 || ydiff > 10) {
                let steps;
                // trova quale delle due differenze è minore e "calcola" il numero di step in cui verrà divisa la linea
                if (xdiff > ydiff) {
                    steps = xdiff / 4 + 1; // TODO: non mi piace sta formula
                } else {
                    steps = ydiff / 4 + 1;
                }

                // calcola 1/'steps' da moltiplicare per 'i' dopo
                const xslice = (Math.sign(currx - nextx) * xdiff) / steps;
                const yslice = (Math.sign(curry - nexty) * ydiff) / steps;

                for (let i = 1; i <= steps; i++) {
                    // se il debug è attivo disegna i punti generati in aqua
                    if (linedebug) {
                        ctx.fillStyle = "aqua";
                        ctx.fillRect(
                            currx + xslice * i - board.offsetLeft,
                            curry + yslice * i - board.offsetTop,
                            6,
                            6
                        );
                    }
                    // cerca elementi html in quella posizione
                    let elements = document.elementsFromPoint(
                        currx + xslice * i,
                        curry + yslice * i
                    );
                    // per ogni elemento trovato, cerca se è già stato identificato e cerca se fa parte della classe "stick", se si viene aggiunto all'array 'stecchette'
                    elements.forEach((element) => {
                        if (
                            !stecchette.includes(element) &&
                            element.matches("div.stick") &&
                            !element.matches(".del")
                        ) {
                            stecchette.push(element);
                        }
                    });
                }
            } else {
                // cerca elementi html in quella posizione
                let elements = document.elementsFromPoint(currx, curry);
                // per ogni elemento trovato, cerca se è già stato identificato e cerca se fa parte della classe "stick", se si viene aggiunto all'array 'stecchette'
                elements.forEach((element) => {
                    if (
                        !stecchette.includes(element) &&
                        element.matches("div.stick") &&
                        !element.matches(".del")
                    ) {
                        stecchette.push(element);
                    }
                });

                // se il debug è attivo disegna i punti generati in green
                if (linedebug) {
                    ctx.fillStyle = "green";
                    ctx.fillRect(
                        currx + xslice * i - board.offsetLeft,
                        curry + yslice * i - board.offsetTop,
                        10,
                        10
                    );
                }
            }
        }
    }
    linecoords.length = 0;
    return stecchette;
}