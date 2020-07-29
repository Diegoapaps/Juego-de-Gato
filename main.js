// jugador y ai
const ai = 'X';
const player = 'O';

// celdas
const cells = document.querySelectorAll('.cell');

// Arrays para checar el número de x y círculos que hay en la tabla
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

// bloques para enseñar empate, ganador o perdedor
const won = document.querySelector('#won');
const lost = document.querySelector('#lost');
const tie = document.querySelector('#empate');

// botón para jugar de nuevo
const jugar = document.querySelector('#jugar');

// puntos 
const pPoints = document.querySelector('#pl');
const cPoints = document.querySelector('#cpu');
const ePoints = document.querySelector('#em');

// contenedor de los puntos
const pointsContainer = document.querySelector('.headers');

let pPointsCount = 0;
let cPointsCount = 0;
let ePointsCount = 0;


// variable para checar si hay empate
let tieCheckers = 0;

// a cada celda añadirle un listener
cells.forEach(cell => {
    addListenerToCells(cell);
});

// jugar de nuevo
jugar.addEventListener('click', () => {
    setElementsDisplay();

    circleCount = [];
    xCount = [];

    cells.forEach(cell => {
        cell.innerHTML = '';
        addListenerToCells(cell);
    });
});

function addListenerToCells(elt) {
    elt.addEventListener('click', function addListener() {
        putCircleInSquare(elt);
        elt.removeEventListener('click', addListener);
    });
}

// añadir círculo al cuadro seleccionado
function putCircleInSquare(elt) {

    if (won.style.display !== 'block' && tie.style.display !== 'block' && lost.style.display !== 'block') {
        // Poner círculo en el cuadrado
        if (elt.innerHTML === '') {
            elt.innerHTML = player;
            checkWinners(player, circleCount);

            // Poner la x aleatoriamente en el tablero
            putTheX();
        }
    }
}

// poner x
function putTheX() {
    if (won.style.display !== 'block' && tie.style.display !== 'block') {
        let space = true;

        // buscar cuadro sin círculo para poner la x aleatoriamente
        while (space === true) {
            const cell = cells[Math.floor(Math.random() * cells.length)];
            if (cell.innerHTML === '') {
                cell.innerHTML = ai;
                space = false;
            }

            // checar si hay empate
            if (checkForTie()) {
                space = false;
            }

        }

        checkWinners(ai, xCount);
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
                playerWon();
            } else {
                playerLost();
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

        setPoints(ePoints, ePointsCount, 'Empates:');

        return true;
    }
    return false;
}

// esconder o mostrar elementos
function setDisplay(elt, str) {
    elt.style.display = str;
}

function setElementsDisplay() {
    setDisplay(won, 'none');
    setDisplay(lost, 'none');
    setDisplay(tie, 'none');
    setDisplay(jugar, 'none');
}

function playerWon() {
    setDisplay(won, 'block');
    setDisplay(jugar, 'block');

    setPoints(pPoints, pPointsCount, 'Jugador:');
}

function playerLost() {
    setDisplay(lost, 'block');
    setDisplay(jugar, 'block');

    setPoints(cPoints, cPointsCount, 'CPU:');
}

// función para mostrar puntos
function setPoints(elt, counter, text) {
    counter++;
    elt.innerHTML = `${text} ${counter}`;
    setDisplay(pointsContainer, 'flex');
}

