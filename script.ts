export {}

let gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')

let rightBlock = [400, 100, 20, 100]
let leftBlock = [100, 100, 20, 100]

const draw = () => {
    console.log('drawing')
    gameBoardContext.fillStyle = 'lightblue'
    gameBoardContext.strokeStyle = 'darkblue'
    gameBoardContext.fillRect(...leftBlock)
    gameBoardContext.strokeRect(...leftBlock); 

    gameBoardContext.fillRect(...rightBlock)
    gameBoardContext.strokeRect(...rightBlock); 
    gameBoardContext.arc(250, 100, 50, 0, 2 * Math.PI)
}

const changeDirection = (e) => {
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const W_KEY = 87;
    const S_KEY = 83;

    const keyPressed = e.keyCode

    if (keyPressed === UP_KEY) {
        rightBlock[1] -= 20;
    }
    draw();
}

document.addEventListener("keydown", changeDirection)
