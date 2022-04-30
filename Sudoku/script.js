const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const available = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] // The available numbers to type

const sleep = ms => new Promise(r => setTimeout(r, ms)) // Miliseconds

// Selection info
let selected = false // If a square is selected or not
let selectedX = 0   // the x position of the selected square
let selectedY = 0   // the y position of the selected square
let prevSelectedX = 0 // The previously selected x point on the board
let prevSelectedY = 0 // The previously selected y point on the board

// Colours:
let selectedSpot = 'lightcyan'
let textCol = 'darkBlue'

let played = []    // locations where numbers were pre-placed - added to in generated


/// ****************************** vvv GRID INFO vvv ***************************************

// Sizes for grid
const width = height = 450
const w = width/9
const h = height/9
ctx.canvas.width = width
ctx.canvas.height = height

let grid = []      // Grid
let solvedGrid = []  // The solved grid

function makeGrid(){
    // Making basic grid
    for (let i = 0; i < 9; i++){
        grid.push([])
        for (let j = 0; j < 9; j++){
            grid[i].push(0)
        }
    }

    console.table(grid)
    textCol = 'black'
}

function drawGrid() {
    for (let i = 0; i <= 9; i++){
        
        if (i % 3 === 0){
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
        }

        else{
            ctx.strokeStyle = 'grey'
            ctx.lineWidth = 1.3
        }
        
        ctx.beginPath()
        ctx.moveTo(0, i * w)
        ctx.lineTo(width, i * w)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(i * w, 0)
        ctx.lineTo(i * w, width)
        ctx.stroke()
    }
}

/// ****************************** ^^^ GRID INFO ^^^ ****************************************


countClick = 0  // Counts the amount of times a spot has been clicked twice

canvas.addEventListener('mousedown', (e) => {
    textCol = 'darkBlue'
    const x = e.offsetX;
    const y = e.offsetY;

    selectedX = Math.floor(x / w)
    selectedY = Math.floor(y / w)

    resetScreen()
    console.log(selectedX, selectedY, prevSelectedX, prevSelectedY)
    
    if (selected && ((selectedX === -1) || (selectedX === prevSelectedX && selectedY === prevSelectedY))){
        // If a grid spot is selected it will be unselected if clicked again
        ctx.fillStyle = 'white'
        ctx.fillRect(selectedX * w, selectedY * h, w, h)

        selected = false

        countClick = 1;
    }
    
    else{
        // reveals the grid spot selected with a colour
        selected = true
        ctx.fillStyle = selectedSpot
        ctx.fillRect(selectedX * w, selectedY * h, w, h)
    }

    updateDisplay()
    prevSelectedX = selectedX
    prevSelectedY = selectedY
})


document.addEventListener('keydown', (e) => {
    console.log(played)
    const num = e.key;
    
    (available.includes(num) && selected) && placeNumber(num)
})


function placeNumber(number){ 
    resetScreen()
    ctx.fillStyle = selectedSpot
    ctx.fillRect(selectedX * w, selectedY * h, w, h)
    grid[selectedX][selectedY] = number
    
    updateDisplay()
}

function resetScreen(){
    // Reset the screen
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
}

async function displayGrid(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            const num = grid[i][j]

            if (num === 0) continue;

            ctx.font = '26px Cursive'
            ctx.fillStyle = textCol
            ctx.textAlign = 'center'

            if (start){
                for (let k = 1; k <= 10; k++){
                    let a = k * 0.1
                    ctx.globalAlphs = a
    
                    ctx.fillStyle = 'white'
                    ctx.fillRect(i * w +1, j * w +1, w-2, h-2)
    
                    ctx.fillStyle = textCol
                    placeText(num, i, j)
                    await sleep(15)
                    if (i === 8) start = false;
                }
            } 
            
            else {
                placeText(num, i, j)
            }   

        }
    }
}

function placeText(num, i, j){
    console.log(selectedX, selectedY, i + ", " + j)

    if (played.includes(i + ", " + j)){
        textCol = 'black'
    }

    else {
        textCol = 'darkBlue'
    }
    ctx.fillStyle = textCol
    ctx.fillText(num, i * w + w/2, (j + 1) * w - w/4)
}


function getRandomInt() {
    min = Math.ceil(0)
    max = Math.floor(9)
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateDisplay(){
    drawGrid()
    displayGrid()
}

makeGrid()
updateDisplay()