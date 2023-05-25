/* let sticks = document.getElementsByClassName("stick");
for (let i = 0; i < sticks.length; i++) {
    sticks[i].addEventListener("click", function () {
        stecchettaClick(this);
    });
}

function stecchettaClick(stecchetta) {
    console.log(stecchetta);
    if (!stecchetta.classList.contains("del")) {
        console.log("del");
        stecchetta.classList.add("del");
    }
}
 */

// variabile che indica il giocatore corrente
let giocatore = 1;

// array che indica tutte le stecchette disponibili
// prettier-ignore
let stecchetteLibere = [];

// resetta il gioco, ovvero al momento toglie solo la classe del
document.getElementById("reset-button").addEventListener("click", reset);

function reset() {
    let sticks = document.getElementsByClassName("stick");
    for (let i = 0; i < sticks.length; i++) {
        sticks[i].classList.remove("del", "g1", "g2");
    }
    giocatore = 1;
    ctx.strokeStyle = "lightblue";
    // prettier-ignore
    stecchetteLibere = [
                            11,
                        21,     22,
                    31,     32,     33,
                41,     42,     43,     44,
            51,     52,     53,     54,     55,
    ]
}

// "processa" le stecchette, al momento aggiunge solo le stecchette alla classe 'del'
function processStecchette(stecchette) {
    let currrow = stecchette[0].id.toString().split("")[0];
    for (let i = 1; i < stecchette.length; i++) {
        if (stecchette[i].id.toString().split("")[0] != currrow) {
            alert("Mossa invalida");
            return false;
        }
    }

    console.log(stecchetteLibere);
    for (let i = 0; i < stecchette.length; i++) {
        stecchette[i].classList.add("del", "g" + giocatore);
        stecchetteLibere.splice(stecchetteLibere.indexOf(stecchette[i].id), 1);
    }
    console.log(stecchetteLibere);
    if (stecchetteLibere.length == 1)
        alert("Ha vinto il giocatore " + giocatore);
    else if (stecchetteLibere.length < 1)
        alert(
            "Ha vinto il giocatore " +
                giocatore +
                "??\nCioè la tavola non ha più stecchette libere quindi uhh non ho idea chi abbia vinto"
        );

    // Reminder, qui le cose sono al contrario, le cose per il giocatore 1 vanno sul case 2
    switch (giocatore) {
        case 1:
            giocatore++;
            if (!linedebug) ctx.strokeStyle = "lightcoral";
            break;

        case 2:
            giocatore--;
            if (!linedebug) ctx.strokeStyle = "lightblue";
            break;
        default:
            alert("hai rotto una semplice variabile, like how");
            break;
    }
}

reset();
