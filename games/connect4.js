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

