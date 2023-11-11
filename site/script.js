// Game Constants
const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;
const WINNING_LENGTH = 4;

// Game Variables
let board = [];
let turn = PLAYER1;
let gameOver = false;
let winner = null;

// DOM Elements
const boardEl = document.querySelector(".board");
const playerTurnEl = document.querySelector(".player-turn");
const restartBtn = document.querySelector(".restart-btn");

// Create Board
function createBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = EMPTY;
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("row", row);
            cell.setAttribute("col", col);
            cell.addEventListener("click", handleCellClick);
            boardEl.appendChild(cell);
        }
    }
}

// Render Board
function renderBoard() {
    board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const cell = document.querySelector(`[row="${rowIndex}"][col="${colIndex}"]`);
            cell.classList.remove("player1");
            cell.classList.remove("player2");
            if (col === PLAYER1) {
                cell.classList.add("player1");
            } else if (col === PLAYER2) {
                cell.classList.add("player2");
            }
        });
    });
}

// Handle Cell Click
function handleCellClick() {
    if (gameOver) return;
    const col = parseInt(this.getAttribute("col"));
    const row = getAvailableRow(col);
    if (row === null) return;
    board[row][col] = turn;
    renderBoard();
    const winningPlayer = checkWin();
    if (winningPlayer) {
        gameOver = true;
        winner = winningPlayer;
        playerTurnEl.textContent = `Player ${winner} wins!`;
    } else if (checkTie()) {
        gameOver = true;
        playerTurnEl.textContent = "It's a tie!";
    } else {
        turn = turn === PLAYER1 ? PLAYER2 : PLAYER1;
        playerTurnEl.textContent = `Player ${turn}'s turn`;
    }
}

// Check Win
function checkWin() {
    // Check Rows
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS - WINNING_LENGTH + 1; col++) {
            const slice = board[row].slice(col, col + WINNING_LENGTH);
            if (slice.every((cell) => cell === PLAYER1)) {
                return PLAYER1;
            } else if (slice.every((cell) => cell === PLAYER2)) {
                return PLAYER2;
            }
        }
    }

    // Check Columns
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS - WINNING_LENGTH + 1; row++) {
            const slice = [];
            for (let i = 0; i < WINNING_LENGTH; i++) {
                slice.push(board[row + i][col]);
            }
            if (slice.every((cell) => cell === PLAYER1)) {
                return PLAYER1;
            } else if (slice.every((cell) => cell === PLAYER2)) {
                return PLAYER2;
            }
        }
    }

    // Check Diagonals (Left to Right)
