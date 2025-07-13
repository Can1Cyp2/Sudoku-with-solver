/**
 * Draws a 9x9 grid on the canvas for the Sudoku game.
 * 
 * Iterates over each line to create the grid with alternating styles 
 * for every third line to visually separate the 3x3 sub-grids.
 * Uses thicker black lines for the main sub-grid boundaries 
 * and thinner grey lines for the internal grid lines.
 */
function drawGrid() {
  for (let i = 0; i <= 9; i++) {
    if (i % 3 === 0) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1.5;
    }

    ctx.beginPath();
    ctx.moveTo(0, i * w);
    ctx.lineTo(width, i * w);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i * w, 0);
    ctx.lineTo(i * w, width);
    ctx.stroke();
  }
}


/**
 * Fills in a 3x3 sub-grid within the given Sudoku grid with numbers from 1 to 9.
 *
 * Iterates over each cell of the 3x3 sub-grid and assigns a random number from 1 to 9
 * that has not been used before in the sub-grid.
 *
 * @param {number[][]} grid - The target Sudoku grid to fill in the sub-grid.
 * @param {number} row - The row index of the top-left cell of the sub-grid.
 * @param {number} col - The column index of the top-left cell of the sub-grid.
 */
function fillBox(grid, row, col) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const randIndex = Math.floor(Math.random() * nums.length);
      grid[row + i][col + j] = nums[randIndex];
      nums.splice(randIndex, 1);
    }
  }
}

/**
 * Copies the contents of the solvedGrid into the grid.
 *
 * Iterates over each cell of the 9x9 Sudoku grid and assigns the value from
 * the corresponding cell in solvedGrid to grid.
 *
 * @param {number[][]} grid - The target grid to copy values into.
 * @param {number[][]} solvedGrid - The source grid to copy values from.
 */
function copyGrid(grid, solvedGrid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid[i][j] = solvedGrid[i][j];
    }
  }
}

function generateGrid(size) {
  console.log(`Executing generateGrid with size: ${size}`);
  const n = 9;

  // Fill diagonal boxes
  for (let i = 0; i < n; i += 3) fillBox(grid, i, i);

  // Copy the partially filled grid to solvedGrid before solving
  copyGrid(solvedGrid, grid);

  // Solve the rest
  solveGrid(solvedGrid);

  // Copy the solved grid back to grid to create the puzzle
  copyGrid(grid, solvedGrid);

  // Remove cells to create puzzle
  for (let i = 0; i < size; i++) {
    const randRow = Math.floor(Math.random() * n);
    const randCol = Math.floor(Math.random() * n);
    grid[randRow][randCol] = 0;
  }

  // Mark user spots
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) userSpots[i][j] = true;
    }
  }

  return grid;
}

/**
 * Places a number in the selected grid cell if it is a user-modifiable spot.
 * Updates the display and checks for win condition.
 *
 * @param {string} number - The number to place in the grid cell. Use "0" to clear the cell.
 */
function placeNumber(number) {
  if (!selected || !userSpots[selectedX][selectedY]) return;

  resetScreen();
  ctx.fillStyle = selectedSpot;
  ctx.fillRect(selectedX * w, selectedY * h, w, h);

  const numValue = number === "0" ? 0 : parseInt(number);
  grid[selectedX][selectedY] = numValue;

  updateDisplay();

  if (checkWin(grid)) {
    showMessage("Congratulations! You solved the puzzle!", "success");
    stopTimer();
  }
}

/**
 * Resets the screen by filling it with white.
 * @function
 * @name resetScreen
 */
function resetScreen() {
  console.log("Executing resetScreen");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}

/**
 * Asynchronously displays the Sudoku grid on the canvas.
 * Iterates over each cell of the 9x9 grid and renders the numbers.
 * Applies enhanced color logic to differentiate between given and user-input numbers.
 * Highlights invalid inputs and applies animation effects during the start of the game.
 * Uses asynchronous sleep to create a fade-in effect for numbers during the animation.
 */
async function displayGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num === 0) continue;

      ctx.font = "26px Arial";
      ctx.textAlign = "center";

      // Enhanced color logic
      if (!userSpots[i][j]) {
        ctx.fillStyle = "black"; // Given numbers
      } else {
        // Check if the number is valid
        if (isValid(grid, i, j, num)) {
          ctx.fillStyle = "darkBlue"; // Valid user input
        } else {
          ctx.fillStyle = "#c62828"; // Invalid input
          // Highlight conflict cell
          ctx.fillStyle = conflictColor;
          ctx.fillRect(i * w + 1, j * h + 1, w - 2, h - 2);
          ctx.fillStyle = "#c62828";
        }
      }
      ctx.fillText(num, i * w + w / 2, (j + 1) * h - h / 4);
    }
  }
}

/**
 * Updates the Sudoku grid display on the canvas by calling drawGrid and displayGrid.
 * @function
 * @name updateDisplay
 */
function updateDisplay() {
  console.log("Executing updateDisplay");
  drawGrid();
  displayGrid();
}

/**
 * Displays a message to the user with a specified type and hides it after 4 seconds.
 *
 * @param {string} message - The message to display to the user.
 * @param {string} type - The type of the message, used for styling. Can be "success", "info", etc.
 */
function showMessage(message, type) {
  const messageElement = document.getElementById("status-message");
  messageElement.textContent = message;
  messageElement.className = `status-message ${type}`;
  messageElement.style.display = "block";

  setTimeout(() => {
    messageElement.style.display = "none";
  }, 4000);
}
