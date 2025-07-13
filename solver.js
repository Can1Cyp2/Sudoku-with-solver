/**
 * Recursively solves a Sudoku puzzle using backtracking.
 *
 * Attempts to fill the Sudoku grid by placing numbers 1 to 9 in each cell,
 * proceeding row by row and column by column. If a number placement is valid
 * according to Sudoku rules, it continues to the next cell. If a placement
 * leads to an invalid configuration, it backtracks and tries a different number.
 *
 * @param {number[][]} grid - The 9x9 Sudoku grid to be solved, with empty cells as 0.
 * @param {number} [row=0] - The current row index to solve.
 * @param {number} [col=0] - The current column index to solve.
 * @returns {boolean} True if the puzzle is solved, otherwise false.
 */
function solveGrid(grid, row = 0, col = 0) {
  if (col === 9) {
    row++;
    col = 0;
  }
  if (row === 9) return true;

  if (grid[row][col] !== 0) {
    return solveGrid(grid, row, col + 1);
  }

  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of nums) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveGrid(grid, row, col + 1)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

/**
 * Randomly shuffles the elements of an array in place using the Fisher-Yates algorithm.
 *
 * Iterates over the array from the last element to the second element,
 * swapping each element with a randomly selected earlier element or itself.
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
