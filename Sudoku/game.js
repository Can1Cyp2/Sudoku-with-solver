// game buttons

let easy = document.createElement("button")
easy.textContent= "Easy"
easy.onclick = startEasy

// let medium = document.createElement("button")
// medium.textContent = "Medium"
// medium.onclick = startMedium

// let hard = document.createElement("button")
// hard.textContent = "Hard"
// hard.onclick = startHard


function makeLevels(){
    document.body.appendChild(easy)
    // document.body.appendChild(medium)
    // document.body.appendChild(hard)
    console.log("Making Levels")

    // Making solved grid equal original grid to test solvability
    for (let i = 0; i < 9; i++ ) {
        solvedGrid.push([])
        for (let j = 0; j < 9; j++) {
            solvedGrid[i][j] = grid[i][j]
        }
    }
    console.log(solvedGrid,grid)
}

function startEasy(){
    // Spaces to put numbers
    let filledSpaces = 25
    start = true    // Tests if the game just started
    console.log("start")
    startGame(filledSpaces)
}

function startGame(fill){

    do {
        generateGrid(fill)
        solveGrid()
    } while (!solveGrid())
    console.log("easy")

    resetScreen()
    updateDisplay()
}


