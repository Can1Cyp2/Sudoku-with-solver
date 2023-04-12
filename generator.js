let start = true;

function generateGrid(size) {
    const n = 9; // size of the grid
  
    // Creates the grid:
    for (let i = 0; i < n; i += 3) fillBox(grid, i, i); // Fills the diagonal boxes
    // Solve the rest of the Sudoku grid
    solveGrid(solvedGrid);
    copyGrid(grid, solvedGrid); // Deep copies the solvedGrid to grid
  
    // Remove some cells to create the puzzle
    for (let i = 0; i < size; i++) {
        const randRow = Math.floor(Math.random() * n);
        const randCol = Math.floor(Math.random() * n);
        grid[randRow][randCol] = 0;
    }

    // Add the spots the user has to fill to the userSpots array:
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) userSpots[i][j] = true;
        }
    }

    return grid;
}
  
function fillBox(grid, row, col) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const randIndex = Math.floor(Math.random() * nums.length);
            grid[row+i][col+j] = nums[randIndex];
            nums.splice(randIndex, 1);
        }
    }
}


// Deep copies the solvedGrid to grid
function copyGrid(grid, solvedGrid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i][j] = solvedGrid[i][j];
        }
    }
}

function printSudoku(sudoku) { for (const row of sudoku) console.log(row.join(' ')); } // prints the sudoku grid