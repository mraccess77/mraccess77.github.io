const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');
const turn = document.getElementById('turn');

let currentPlayer = 'red';
let gameWon = false;

// Helper function to get the index of the last available cell in a column
function getLastAvailableCellIndex(cellsInColumn) {
  for (let i = cellsInColumn.length - 1; i >= 0; i--) {
    if (!cellsInColumn[i].classList.contains('red') && !cellsInColumn[i].classList.contains('yellow')) {
      return i;
    }
  }
  return -1;
}

// Helper function to check if a player has won
function checkWinningCondition(cells, row, col, player) {
  let horizontalCount = 0;
  let verticalCount = 0;
  let diagonalCount1 = 0;
  let diagonalCount2 = 0;

  // Check horizontal
  for (let i = 0; i < 4; i++) {
    if (cells[row][col + i].classList.contains(player)) {
      horizontalCount++;
    }
  }

  // Check vertical
  for (let i = 0; i < 4; i++) {
    if (cells[row + i][col].classList.contains(player)) {
      verticalCount++;
    }
  }

  // Check diagonal (top left to bottom right)
  for (let i = 0; i < 4; i++) {
    if (cells[row + i][col + i].classList.contains(player)) {
      diagonalCount1++;
    }
  }

  // Check diagonal (bottom left to top right)
  for (let i = 0; i < 4; i++) {
    if (cells[row - i][col + i].classList.contains(player)) {
      diagonalCount2++;
    }
  }

  if (horizontalCount === 4 || verticalCount === 4 || diagonalCount1 === 4 || diagonalCount2 === 4) {
    gameWon = true;
    turn.textContent = `${player} wins!`;
  }
}

// Function to handle a player's turn
function playTurn(columnIndex) {
  if (gameWon) {
    return;
  }

  const cellsInColumn = [];
  for (let i = columnIndex; i < cells.length; i += 7) {
    cellsInColumn.push(cells[i]);
  }

  const lastAvailableCellIndex = getLastAvailableCellIndex(cellsInColumn);

  if (lastAvailableCellIndex === -1) {
    // Column is full
    return;
  }

  const cell = cellsInColumn[lastAvailableCellIndex];
  cell.classList.add(currentPlayer);

  checkWinningCondition(cells, Math.floor(cell.cellIndex / 7), cell.cellIndex % 7, currentPlayer);

  if (!gameWon) {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    turn.textContent = `${currentPlayer}'s turn`;
  }
}

// Event listener to handle a player's turn when a cell is clicked
board.addEventListener('click', event => {
  const cell = event.target;
  if (cell.classList.contains('cell')) {
    const columnIndex = cell.cellIndex;
    playTurn(columnIndex);
  }
});

// Event listeners to handle a player's turn when a cell is focused and the spacebar or enter key is pressed
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('keydown', event => {
    const cell = event.target;
    const columnIndex = cell.cellIndex;
    if (event.code === 'Space
    } else if (event.code === 'Enter') {
      playTurn(columnIndex);
    }
  });
}

// Event listener to handle when the reset button is clicked
document.getElementById('reset').addEventListener('click', () => {
  // Reset game state
  currentPlayer = 'red';
  gameWon = false;
  turn.textContent = `${currentPlayer}'s turn`;
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('red', 'yellow');
  }
});
