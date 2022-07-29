export {}

let gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')
const boardBackground = 'white'
const boardBorder = 'black'

let rightBlock = [400, 100, 20, 100]
let leftBlock = [100, 100, 20, 100]

const draw = () => {
    gameBoardContext.fillStyle = 'lightblue'
    gameBoardContext.strokeStyle = 'darkblue'
    gameBoardContext.fillRect(...leftBlock)
    gameBoardContext.strokeRect(...leftBlock); 

    gameBoardContext.fillRect(...rightBlock)
    gameBoardContext.strokeRect(...rightBlock); 
    gameBoardContext.arc(250, 100, 50, 0, 2 * Math.PI)
}

const clearCanvas = () => {
    gameBoardContext.fillStyle = boardBackground;
    //  Select the colour for the border of the canvas
    gameBoardContext.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // Draw a "border" around the entire canvas
    gameBoardContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

const changeDirection = (e) => {
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const W_KEY = 87;
    const S_KEY = 83;

    const keyPressed = e.keyCode

    if (keyPressed === UP_KEY && rightBlock[1] > 0) {
        rightBlock[1] -= 20;
    }
    if (keyPressed === DOWN_KEY && rightBlock[1] > 300) {
        rightBlock[1] += 20;
    }
    if (keyPressed === W_KEY && leftBlock[1] > 0) {
        leftBlock[1] -= 20;
    }
    if (keyPressed === S_KEY && leftBlock[1] > 300) {
        leftBlock[1] += 20;
    }
    clearCanvas();
    draw();
}

document.addEventListener("keydown", changeDirection)
