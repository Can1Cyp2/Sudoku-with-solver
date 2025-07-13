// Enhanced version of your existing code with improvements
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const available = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Enhanced selection info
let selected = false;
let selectedX = 0;
let selectedY = 0;
let prevSelectedX = 0;
let prevSelectedY = 0;

// Enhanced colors
let selectedSpot = "lightcyan";
let textCol = "darkBlue";
let conflictColor = "#ffcdd2";
let givenColor = "#f5f5f5";
let solvedColor = "#c8e6c9";

// Game state
let userSpots = [];

let gameStartTime = null;
let timerInterval = null;
let currentDifficulty = "Easy";

// Grid setup
const width = (height = 450);
const w = width / 9;
const h = height / 9;
ctx.canvas.width = width;
ctx.canvas.height = height;

let grid = [];
let solvedGrid = [];

/**
 * Checks if the given number can be placed in the given row and column.
 *
 * @param {number[][]} grid - The Sudoku grid to check.
 * @param {number} row - The row index to check.
 * @param {number} col - The column index to check.
 * @param {number} num - The number to check.
 * @returns {boolean} True if the number can be placed, otherwise false.
 */
function isValid(grid, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Initializes the Sudoku grid, solved grid, and userSpots arrays
 * with zeros and false values, respectively.
 *
 * Sets the text color to black and prints the grid to the console.
 */
function makeGrid() {
  console.log("Executing makeGrid");
  grid = [];
  solvedGrid = [];
  userSpots = [];

  for (let i = 0; i < 9; i++) {
    grid.push([]);
    solvedGrid.push([]);
    userSpots.push([]);
    for (let j = 0; j < 9; j++) {
      grid[i].push(0);
      solvedGrid[i].push(0);
      userSpots[i].push(false);
    }
  }
  textCol = "black";
  console.table(grid);
}

// mouse interaction:
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  selectedX = Math.floor(x / w);
  selectedY = Math.floor(y / h);

  if (selectedX >= 0 && selectedX < 9 && selectedY >= 0 && selectedY < 9) {
    if (
      selected &&
      selectedX === prevSelectedX &&
      selectedY === prevSelectedY
    ) {
      selected = false;
    } else {
      selected = true;
    }

    resetScreen();
    updateDisplay();

    if (selected) {
      ctx.fillStyle = selectedSpot;
      ctx.fillRect(selectedX * w, selectedY * h, w, h);
      drawGrid();
      displayGrid();
    }
  }

  prevSelectedX = selectedX;
  prevSelectedY = selectedY;
});

//  Deletes the selected cell when the user presses backspace or Delete:
document.addEventListener("keydown", (e) => {
  const num = e.key;
  if (available.includes(num) && selected) {
    placeNumber(num);
  } else if (e.key === "Backspace" || e.key === "Delete") {
    if (selected && userSpots[selectedX][selectedY]) {
      placeNumber("0");
    }
  }
});

/**
 * Generates a new Sudoku puzzle and starts the timer.
 * @param {string} difficulty - The difficulty of the puzzle. Can be "Easy", "Medium", or "Hard".
 */
function startGame(difficulty) {
  console.log(`Starting game with difficulty: ${difficulty}`);
  makeGrid();

  let removeCount;
  switch (difficulty) {
    case "Easy":
      removeCount = 30;
      break;
    case "Medium":
      removeCount = 45;
      break;
    case "Hard":
      removeCount = 55;
      break;
    default:
      removeCount = 30;
  }

  currentDifficulty = difficulty;
  document.getElementById("difficulty").textContent = difficulty;

  generateGrid(removeCount);
  resetScreen();
  updateDisplay();
  startTimer();
  showMessage(`New ${difficulty} puzzle generated!`, "info");
}

/**
 * Starts the game timer.
 *
 * The timer is implemented as a setInterval, updating the displayed time every 1000ms.
 * The timer is stopped by calling stopTimer() and is reset when the user starts a new game.
 * The timer is displayed in the format MM:SS.
 *
 * @example startTimer();
 */
function startTimer() {
  console.log("Executing startTimer");
  gameStartTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById("timer").textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}

/**
 * Stops the game timer.
 *
 * Clears the interval responsible for updating the timer display and sets the interval
 * reference to null.
 *
 * @example stopTimer();
 */
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Event listeners for buttons and difficulties:
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("easy-btn")
    .addEventListener("click", () => startGame("Easy"));
  document
    .getElementById("medium-btn")
    .addEventListener("click", () => startGame("Medium"));
  document
    .getElementById("hard-btn")
    .addEventListener("click", () => startGame("Hard"));
  document.getElementById("solve-btn").addEventListener("click", solvePuzzle);
  document.getElementById("hint-btn").addEventListener("click", getHint);
});

/**
 * Solves the Sudoku puzzle by copying the solution from solvedGrid to grid.
 *
 * Iterates over each cell of the grid, and for any empty cell (value 0),
 * it replaces the value with the corresponding value from solvedGrid.
 * Marks these cells as non-user-modifiable by setting userSpots to false.
 * Updates the display, shows a success message, and stops the timer.
 */
function solvePuzzle() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        grid[i][j] = solvedGrid[i][j];
        userSpots[i][j] = false;
      }
    }
  }

  resetScreen();
  updateDisplay();
  showMessage("Puzzle solved!", "success");
  stopTimer();
}


/**
 * Checks if the Sudoku grid is completely and correctly filled.
 *
 * Iterates over each cell in the 9x9 grid, ensuring all numbers are non-zero
 * and valid according to Sudoku rules using the isValid function.
 *
 * @param {number[][]} grid - The 9x9 Sudoku grid to check.
 * @returns {boolean} True if the grid is completely and correctly filled, otherwise false.
 */
function checkWin(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num === 0) return false;

      const valid = isValid(grid, row, col, num);

      if (!valid) return false;
    }
  }
  return true;
}

document.getElementById("hint-btn").addEventListener("click", getHint);

/**
 * Provides a hint for the Sudoku puzzle by highlighting a random empty cell
 * and displaying the correct value for that cell.
 */
function getHint() {
  const emptyCells = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (emptyCells.length === 0) {
    showMessage("Puzzle is complete!", "info");
    return;
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const correctValue = solvedGrid[randomCell.x][randomCell.y];

  // Highlight the hint cell
  ctx.fillStyle = "#fff3e0";
  ctx.fillRect(randomCell.x * w, randomCell.y * h, w, h);
  drawGrid();
  displayGrid();

  showMessage(
    `Hint: Try placing ${correctValue} in row ${randomCell.y + 1}, column ${
      randomCell.x + 1
    }`,
    "info"
  );
}

// Initialize the game
updateDisplay();
showMessage(
  "Welcome! Click Easy, Medium, or Hard to start a new game.",
  "info"
);
