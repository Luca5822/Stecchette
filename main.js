// variabile che indica il giocatore corrente
let giocatore;

// carica le variabili css per i colori
const colors = document.querySelector(":root");

// colori dei giocatori
let coloriGiocatori = ["#34c477", "#3c3a7d"];

// array che indica tutte le stecchette disponibili
let stecchetteLibere = [];

// definisce se si può disegnare sul canvas
let candraw;

// resetta il gioco quando viene premuto reset
document.getElementById("reset-button").addEventListener("click", reset);

// "processa" le stecchette, al momento aggiunge solo le stecchette alla classe 'del'
function processStecchette(stecchette) {
    // estrapola la riga dall'id
    let currrow = stecchette[0].id.toString().split("")[0];

    let laststecchetta = parseInt(stecchette[0].id);
    // cerca se una mossa è invalida
    for (let i = 0; i < stecchette.length; i++) {
        if (stecchette[i].id.toString().split("")[0] != currrow) {
            alert(
                "Mossa invalida:\n" +
                    "Stai cancellando una o più stecchette da righe diverse"
            );
            return;
        }
        if (stecchette[i].matches(".del")) {
            alert(
                "Mossa invalida:\n" +
                    "Stai cancellando una o più stecchette già cancellate"
            );
            return;
        }
        if (
            ![laststecchetta - 1, laststecchetta, laststecchetta + 1].includes(
                parseInt(stecchette[i].id)
            )
        ) {
            alert(
                "Mossa invalida:\n" +
                    "Stai cancellando delle stecchette non consecutive"
            );
            return;
        }
        laststecchetta = parseInt(stecchette[i].id);
    }

    // cerca se la mossa cancellerebbe tutte le stecchette
    if (stecchette.length == stecchetteLibere.length) {
        alert(
            "Mossa invalida:\n" +
                "Stai cancellando tutte le stecchette, deve rimanerne almeno una libera"
        );
        return;
    }

    // se quindi la mossa è valida cancella le stecchette
    for (let i = 0; i < stecchette.length; i++) {
        stecchette[i].classList.add("del", "g" + giocatore);
        stecchetteLibere.splice(stecchetteLibere.indexOf(stecchette[i].id), 1);
    }

    // controlla se qualcuno ha vinto
    if (stecchetteLibere.length == 1) {
        alert("Ha vinto il giocatore " + giocatore);
        candraw = false;
    } else if (stecchetteLibere.length < 1) alert("Partita nulla");

    giocatore = giocatore === 1 ? 2 : 1;
    switchColors();
}

function switchColors(reload = false) {
    // se non è attivato il debug
    if (!linedebug)
        // cambia il colore della linea ad una tonalità del colore del giocatore
        ctx.strokeStyle = pSBC(
            0.5,
            coloriGiocatori[giocatore - 1],
            "#ffffff",
            true
        );

    // cambia il colore dello sfondo ad una tonalità del colore del giocatore
    // cambiando il colore dello sfondo in questo modo fa fare anche il fade allo sfondo
    colors.style.setProperty(
        "--bg",
        pSBC(0.1, coloriGiocatori[giocatore - 1], "#000000", true)
    );

    // se però viene ricaricato tutto (tipo primo caricamento della pagina)
    if (reload) {
        // imposta i colori delle stecchette dei 2 giocatori ad una tonalità del loro colore
        colors.style.setProperty(
            "--g1",
            pSBC(0.3, coloriGiocatori[0], "#ffffff", true)
        );
        colors.style.setProperty(
            "--g2",
            pSBC(0.3, coloriGiocatori[1], "#ffffff", true)
        );
    }
}

function reset() {
    // toglie a tutte le stecchette la classe a cui appartengono
    let sticks = document.getElementsByClassName("stick");
    for (let i = 0; i < sticks.length; i++) {
        sticks[i].classList.remove("del", "g1", "g2");
    }

    // imposta il giocatore ad 1
    giocatore = 1;

    // resetta la possibilità di disegnare
    candraw = true;

    // resetta le stecchette libere
    // prettier-ignore
    stecchetteLibere = [
                            11,
                        21,     22,
                    31,     32,     33,
                41,     42,     43,     44,
            51,     52,     53,     54,     55,
    ]

    // ricarica i colori
    switchColors(true);
}

// resetta il gioco per essere sicuri che sia tutto apposto
reset();
