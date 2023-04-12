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
    // while (!solveGrid(solvedGrid)){S
    //     makeGrid()
    //     fillGrid()
    //     console.log("New grid:", solvedGrid, grid)
    // }

    document.body.appendChild(easy)
    // document.body.appendChild(medium)
    // document.body.appendChild(hard)
    console.log("Making Levels")

    console.log(solvedGrid, grid)
    console.log(solvedGrid === grid)
}

function startEasy(){
    const startAmnt = 30; // The starting value of numbers to remove on the board, to solve
    start = true    // Tests if the game just started
    console.log("start")
    startGame(startAmnt)
}

async function startGame(startAmnt){
    makeGrid()
    console.log("empty:", solvedGrid)
    
    generateGrid(startAmnt)
    console.log("easy:", solvedGrid, grid)

    resetScreen()
    updateDisplay()
}


