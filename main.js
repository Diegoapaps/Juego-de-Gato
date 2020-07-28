// jugador y ai
const ai = 'X';
const player = 'O';

// celdas
const cells = document.querySelectorAll('.cell');

// círculos y x
let circleCount = [];
let xCount = [];

// posibles combinaciones ganadoras
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

// bloques
const won = document.querySelector('#won');
const lost = document.querySelector('#lost');
const tie = document.querySelector('#empate');
const jugar = document.querySelector('#jugar');

// puntos 
const pPoints = document.querySelector('#pl');
const cPoints = document.querySelector('#cpu');
const ePoints = document.querySelector('#em');
const pointsContainer = document.querySelector('.headers');

let pPointsCount = 0;
let cPointsCount = 0;
let ePointsCount = 0;


// checadores
let tieCheckers = 0;

// a cada celda añadirle un listener
cells.forEach(cell => {
    addListenerToCells(cell);
});

// jugar de nuevo
jugar.addEventListener('click', () => {

    setDisplay(won, 'none');
    setDisplay(lost, 'none');
    setDisplay(tie, 'none');
    setDisplay(jugar, 'none');

    circleCount = [];
    xCount = [];

    cells.forEach(cell => {
        cell.innerHTML = '';
        addListenerToCells(cell);
    });
});

function addListenerToCells(elt) {
    elt.addEventListener('click', function addListener() {
        startSquare(elt);
        elt.removeEventListener('click', addListener);
    });
}

// añadir cuadrado al juego
function startSquare(elt) {

    if (won.style.display !== 'block' && tie.style.display !== 'block' && lost.style.display !== 'block') {
        // Poner círculo en el cuadrado
        if (elt.innerHTML === '') {
            elt.innerHTML = player;
            checkWinners(player, circleCount);


            if (won.style.display !== 'block' && tie.style.display !== 'block') {
                let space = true;
                let isTie;

                // buscar cuadro sin círculo para poner la x aleatoriamente
                while (space === true) {
                    const cell = cells[Math.floor(Math.random() * cells.length)];
                    if (cell.innerHTML === '') {
                        cell.innerHTML = ai;
                        space = false;
                    }

                    // checar si hay empate
                    isTie = checkForTie();

                    if (isTie === true) {
                        space = false;
                    }

                }

                checkWinners(ai, xCount);
            }
        }
    }
}

// checar si hay ganador
function checkWinners(elt, arr) {
    cells.forEach((cell, index) => {
        if (cell.textContent === elt) {
            arr.push(index);
        }
    });

    let count;

    // checar cada combinación
    for (let i = 0; i < combinations.length; i++) {
        count = 0;
        for (let j = 0; j < combinations[i].length; j++) {
            for (let k = 0; k < arr.length; k++) {
                if (combinations[i][j] === arr[k]) {
                    count++;
                    break;
                }
            }
        }
        if (count === 3) {
            if (elt === player) {
                setDisplay(won, 'block');
                setDisplay(jugar, 'block');

                pPointsCount++;
                pPoints.innerHTML = `Jugador: ${pPointsCount}`;
                setDisplay(pointsContainer, 'flex');


                break;
                return;
            } else {
                setDisplay(lost, 'block');
                setDisplay(jugar, 'block');

                cPointsCount++;
                cPoints.innerHTML = `CPU: ${cPointsCount}`;
                setDisplay(pointsContainer, 'flex');

                break;
                return;
            }
        }
    }

}

// checkar si hay empate
function checkForTie() {
    tieCheckers = 0;
    cells.forEach(cell => {
        if (cell.innerHTML === '') {
            tieCheckers++;
        }
    });

    if (tieCheckers === 0) {
        setDisplay(tie, 'block');
        setDisplay(jugar, 'block');

        ePointsCount++;
        ePoints.innerHTML = `Empates: ${ePointsCount}`;
        setDisplay(pointsContainer, 'flex');

        return true;
    }
    return false;
}

// esconder o mostrar elementos
function setDisplay(elt, str) {
    elt.style.display = str;
}


