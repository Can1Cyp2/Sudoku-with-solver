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
                played.push(randRow + ", " + randCol)
                count++
            }
            else continue;
        }
      }

        console.log("num")
}
