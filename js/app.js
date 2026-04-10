let currentPlayer = "X";
let board = [];
let size = 3;
let gameActive = true;

const gameContainer = document.getElementById("game");
const statusText = document.getElementById("status");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  size = parseInt(document.getElementById("size").value);

  if (size < 3) size = 3;

  board = Array(size).fill().map(() => Array(size).fill(""));
  currentPlayer = "X";
  gameActive = true;

  gameContainer.innerHTML = "";
  gameContainer.style.gridTemplateColumns = `repeat(${size}, 60px)`;

  statusText.textContent = `Ход игрока: ${currentPlayer}`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", handleClick);

      gameContainer.appendChild(cell);
    }
  }
}

function handleClick(event) {
  if (!gameActive) return;

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin(row, col)) {
    statusText.textContent = `Победил ${currentPlayer}!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Ход игрока: ${currentPlayer}`;
}

function checkWin(row, col) {
  row = parseInt(row);
  col = parseInt(col);

  if (board[row].every(cell => cell === currentPlayer)) return true;

  if (board.every(r => r[col] === currentPlayer)) return true;

  if (row === col) {
    if (board.every((r, i) => r[i] === currentPlayer)) return true;
  }

  if (row + col === size - 1) {
    if (board.every((r, i) => r[size - 1 - i] === currentPlayer)) return true;
  }

  return false;
}
