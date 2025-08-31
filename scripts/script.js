// Get all the cells as a NodeList and define the winning conditions
const cells = document.querySelectorAll('.cell');
const startNewGameButton = document.querySelector('.start-new-game-button');
const turnIndicator = document.querySelector('.turn-indicator');
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Define players, current player, game board and running state
export const players = [
  { name: 'Usagi', symbol: 'X', image: 'YahaUsagi.webp' },
  { name: 'Momonga', symbol: 'O', image: 'Momonga.webp' }
];
let currentPlayer = players[0];
let board = ['', '', '', '', '', '', '', '', ''];
let running = false;

// Add event listener to start new game button
startNewGameButton.addEventListener('click', startNewGame);

function startNewGame() {
  // Show game container
  document.getElementById('game-container').classList.remove('hidden');
  document.getElementById('game-container').classList.add('game-container');
  restartGame();
  running = true;
  // Add event listeners to cells
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  turnIndicator.innerHTML = `It's <span class="player-turn-name">${currentPlayer.name}</span>'s turn!`;
}

function cellClicked() {
  // Get the cell index
  const cellIndex = this.getAttribute('cellIndex');
  // Check if the cell is already filled or if the game is not running
  if (board[cellIndex] !== '' || !running) {
    return;
  }
  // Update the cell and check for a winner
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  // Update the board array with the current player's symbol
  board[index] = currentPlayer.symbol;
  // cell.innerText = currentPlayer.symbol;
  cell.innerHTML = `<img src="images/${currentPlayer.image}" alt="${currentPlayer.name} Symbol" class="player-image">`;
  if (currentPlayer.image === 'YahaUsagi.webp') {
    cell.classList.add('selected-cell-usagi');
  } else {
    cell.classList.add('selected-cell');
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  turnIndicator.innerHTML = `It's <span class="player-turn-name">${currentPlayer.name}</span>'s turn!`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    // A player won
    showGameOver(1);
    running = false;
  } else if (!board.includes('')) {
    // Draw
    showGameOver(0);
    running = false;
  } else{
    changePlayer();
  }
}

function showGameOver(result) {
  // Show the game over screen
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('game-over').classList.add('game-over');
  result === 1 ? document.querySelector('.game-winner-text').innerText = `You won, ${currentPlayer.name}!` : document.querySelector('.game-winner-text').innerText = `It's a draw!`;
}

function restartGame() {
  // Reset the game state
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = players[0];
  cells.forEach(cell => (cell.innerText = ''));
  cells.forEach(cell => cell.classList.remove('selected-cell'));
  cells.forEach(cell => cell.classList.remove('selected-cell-usagi'));
  // Hide the game over screen
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('game-over').classList.remove('game-over');
}