function solveGrid(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (grid[i][j] !== 0) continue;

            for (let num = 1; num <= 9; num++){
                if (!isValid(num, i, j)) continue;

                grid[i][j] = num

                if (solveGrid()) return true

                grid[i][j] = 0
            }

            return false
        }
    }
    return true
} 