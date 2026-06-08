const board = document.getElementById("board");
const targetSquareEl = document.getElementById("target-square");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("start-btn");

const boardSize = 8;
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

let gridSize = 1;
let score = 0;
let correctInLevel = 0;
let targetSquare = null;
let gameRunning = false;
let timeLeft = 180;
let timerInterval = null;

// Number of correct answers needed before level gets harder
const rightsNeededPerLevel = {
    1: 3,
    2: 5,
    4: 8,
    8: Infinity
};

function createBoard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    const zoneSize = boardSize / gridSize;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const visualColor = (row + col) % 2 === 0 ? "light" : "dark";
            cell.classList.add(visualColor);

            cell.dataset.row = row;
            cell.dataset.col = col;

            if (row % zoneSize === 0) {
                cell.classList.add("zone-top");
            }

            if (col % zoneSize === 0) {
                cell.classList.add("zone-left");
            }

            if ((row + 1) % zoneSize === 0) {
                cell.classList.add("zone-bottom");
            }

            if ((col + 1) % zoneSize === 0) {
                cell.classList.add("zone-right");
            }

            cell.addEventListener("click", handleCellClick);

            board.appendChild(cell);
        }
    }

    levelEl.textContent = `${gridSize}×${gridSize}`;
}

function generateRandomSquare() {
    const file = files[Math.floor(Math.random() * 8)];
    const rank = Math.floor(Math.random() * 8) + 1;

    targetSquare = file + rank;
    targetSquareEl.textContent = targetSquare;
}

function squareToBoardPosition(square) {
    const file = square[0];
    const rank = parseInt(square[1], 10);

    const fileIndex = files.indexOf(file);

    /*
        Board display:
        Top row is rank 8.
        Bottom row is rank 1.

        So:
        a8 is row 0, col 0
        h1 is row 7, col 7
    */
    const actualCol = fileIndex;
    const actualRow = boardSize - rank;

    return {
        row: actualRow,
        col: actualCol
    };
}

function getCorrectQuadrantForSquare(square) {
    const position = squareToBoardPosition(square);

    const rowsPerQuadrant = boardSize / gridSize;
    const colsPerQuadrant = boardSize / gridSize;

    const quadrantRow = Math.floor(position.row / rowsPerQuadrant);
    const quadrantCol = Math.floor(position.col / colsPerQuadrant);

    return {
        row: quadrantRow,
        col: quadrantCol
    };
}

function handleCellClick(event) {
    if (!gameRunning) {
        return;
    }

    const clickedActualRow = parseInt(event.currentTarget.dataset.row, 10);
    const clickedActualCol = parseInt(event.currentTarget.dataset.col, 10);
    const rowsPerQuadrant = boardSize / gridSize;
    const colsPerQuadrant = boardSize / gridSize;
    const clickedRow = Math.floor(clickedActualRow / rowsPerQuadrant);
    const clickedCol = Math.floor(clickedActualCol / colsPerQuadrant);

    const correctQuadrant = getCorrectQuadrantForSquare(targetSquare);

    if (
        clickedRow === correctQuadrant.row &&
        clickedCol === correctQuadrant.col
    ) {
        handleCorrectClick(event.currentTarget);
    } else {
        handleWrongClick(event.currentTarget);
    }
}

function handleCorrectClick(cell) {
    score++;
    correctInLevel++;

    scoreEl.textContent = score;
    messageEl.textContent = "Correct!";
    playCorrectSound();

    cell.classList.remove("correct-flash");
    void cell.offsetWidth;
    cell.classList.add("correct-flash");

    maybeIncreaseDifficulty();
    generateRandomSquare();
}

function handleWrongClick(cell) {
    messageEl.textContent = gridSize === boardSize ? "Wrong square." : "Wrong area.";
    playWrongSound();

    cell.classList.remove("wrong-flash");
    void cell.offsetWidth;
    cell.classList.add("wrong-flash");
}

function maybeIncreaseDifficulty() {
    if (correctInLevel >= rightsNeededPerLevel[gridSize]) {
        correctInLevel = 0;

        if (gridSize === 1) {
            gridSize = 2;
        } else if (gridSize === 2) {
            gridSize = 4;
        } else if (gridSize === 4) {
            gridSize = 8;
        }

        createBoard();
        messageEl.textContent = `Level up: ${gridSize}×${gridSize}`;
    }
}

function startGame() {
    score = 0;
    correctInLevel = 0;
    gridSize = 1;
    timeLeft = 180;
    gameRunning = true;

    scoreEl.textContent = score;
    timerEl.textContent = "03:00";
    messageEl.textContent = "Game started!";
    startBtn.disabled = true;
    startBtn.textContent = "Game Running";

    createBoard();
    generateRandomSquare();

    timerInterval = setInterval(() => {
        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;
    clearInterval(timerInterval);

    targetSquareEl.textContent = "--";
    messageEl.textContent = `Game over. Final score: ${score}`;

    startBtn.disabled = false;
    startBtn.textContent = "Play Again";
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerEl.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

/*
    Simple generated browser sounds.
    No external audio file needed.
*/
function playCorrectSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12);

    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.18);
}

function playWrongSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(180, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.12);
}

startBtn.addEventListener("click", startGame);

// Initial board before game starts
createBoard();
