let start = true;

function generateGrid(size){

      for (let i = 0; i < 9; i++){
          for (let j = 0; j < 9; j++){
              grid[i][j] = 0
          }
      }

      count = 0;
      played = []
      while (count < size){
        
        // Random numbers
        randNum = getRandomInt() + 1
        randRow = getRandomInt()
        randCol = getRandomInt()

        if (grid[randRow][randCol] === 0){
            if (isValid(randNum, randRow, randCol)){
                grid[randRow][randCol] = randNum
                solvedGrid[randRow][randCol] = randNum
                played.push(randRow + ", " + randCol)
                count++
            }
            else continue;
        }
      }

        console.log("num")
        // for (let i = 0; i < 9; i++){
        //     for (let j = 0; j < 9; j++){
        //     }
        // }
        //solvedGrid = grid.slice(0)
        console.log("generate: ", solvedGrid, grid)
}

function fillGrid(){
    let solvable = false
    makeGrid()
        for (let x = 0; x < 9; x++){   // row
            for (let y = 0; y < 9; y++){   // col
    
                // checking that the space is available
                if (grid[x][y] === 0 ){
                    let randNum = getRandomInt() + 1
    
                    for (let num = 1; num <= 9; num++){
                        if (isValid(num, x, y)){
                            grid[x][y] = num;
                            console.log(grid[x][y])
                        }
                    }
                }
        
            }
        
        }

}