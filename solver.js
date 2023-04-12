function solveGrid(grid, row = 0, col = 0) {
    if (col === 9) {
      row++;
      col = 0;
    }
    if (row === 9) return true;
  
    if (grid[row][col] !== 0) {
      return solveGrid(grid, row, col + 1);
    }
  
    // Shuffle the numbers before trying them
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
  
// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  

function updateSolved(){
    // Add the solvedGrid's correct values to the user grid and update the display to show the correct values in green:




    console.log("SOLVE: " + solvedGrid, grid)
    
    resetScreen()
    updateDisplay()
}