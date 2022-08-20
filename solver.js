function solveGrid(array){
    // console.log("********************* SOLVING")
    // for (let i = 0; i < 9; i++){
    //     for (let j = 0; j < 9; j++){
    //         if (array[i][j] !== 0) continue;

    //         for (let num = 1; num <= 9; num++){
    //             if (!isValid(num, i, j)) continue;

    //             array[i][j] = num

    //             if (solveGrid(array)) return true

    //             array[i][j] = 0
    //         }
    //         console.log(grid)
    //         return false
    //     }   
    // }
    // return true
    solve()
} 

function solve() {
    for (let i = 0; i < 9; i++) { 

        for (let j = 0; j < 9; j++) {

            if (grid[i][j] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(num, i, j)) {
                        grid[i][j] = num;

                        if (solve()) return true;
                        else grid[i][j] = 0;
                    }
                }
            return false;
            }
        }
    }
  return true;
}

function updateSolved(){
    // Solving the grid

    // //Sets the main grid to the solved grid
    // for (let i = 0; i < 9; i++ ) {
    //     for (let j = 0; j < 9; j++) {
    //         grid[i][j] = solvedGrid[i][j]
    //     }
    // }

    solveGrid(grid)
    console.log("SOLVE: " + solvedGrid, grid)
    
    resetScreen()
    updateDisplay()
}