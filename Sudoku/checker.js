//  checking if input is valid
function isValid(num, x, y){

    return (
        !inRow(num, x) &&
        !inCol(num, y) &&
        !inBox(num, x, y)
    )
}

function inRow(num, x){
    for (let i = 0; i < 9; i++){
        if (grid[x][i] === num) return true
    }
    return false
}

function inCol(num, y){
    for (let i = 0; i < 9; i++){
        if (grid[i][y] === num) return true
    }
    return false
}

function inBox(num, x, y){
    let boxRow = x - x % 3
    let boxCol = y - y % 3 

    for (let i = boxRow; i < boxRow + 3; i++){
        for (let j = boxCol; j < boxCol + 3; j++){
            if (grid[i][j] === num) return true
        }
    }
    return false
}