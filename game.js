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

const startAmnt = 5; // The starting value of numbers to fill on the board

function makeLevels(){

    // make a solvable grid
    makeGrid()
    fillGrid()
    // while (!solveGrid(solvedGrid)){S
    //     makeGrid()
    //     fillGrid()
    //     console.log("New grid:", solvedGrid, grid)
    // }
    displayStartGrid(startAmnt)

    document.body.appendChild(easy)
    // document.body.appendChild(medium)
    // document.body.appendChild(hard)
    console.log("Making Levels")

    console.log(solvedGrid, grid)
    console.log(solvedGrid === grid)
}

function startEasy(){
    // Spaces to put numbers
    let filledSpaces = 25
    start = true    // Tests if the game just started
    console.log("start")
}

async function startGame(){
    // do {
    //     await makeGrid()
    //     console.log("New grid:", solvedGrid, grid)
    //     await generateGrid(fill)

    //     // Making solved grid equal original grid to test solvability
    //     // solvedGrid = grid.map(function(array){
    //     //     return array.slice()
    //     // })

    // }while (!solveGrid(solvedGrid))
    makeGrid()
    console.log("empty:", solvedGrid)
    generateGrid(startAmnt)
    console.log("easy:", solvedGrid, grid)

    resetScreen()
    updateDisplay()
}


