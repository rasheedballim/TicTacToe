// interacting with index.html for element representation
let playerText = document.getElementById('playerText')
let restartButton = document.getElementById('restartButton')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// Player Symbols
const O = "O"
const X = "X"

// Start with X initially & initialize all the block as null at first
let currentPlayer = X
 let spaces = Array(9).fill(null)

// Function that essentially waits for boxes to be ticked
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// Once a box has been ticked
function boxClicked(e) {
    const id = e.target.id

    // If space is empty and clicked, update with players symbol
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        // Switch to next player
        currentPlayer = currentPlayer == X ? O : X
    }
}

// Possible winning combinations
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// Checking if player has won
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        // Checks winning combinations
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

// Resets boxes to null
restartButton.addEventListener('click', restart)
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X
}

// Starts Game
startGame()