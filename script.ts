export {}

let gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')
const boardBackground = 'white'
const boardBorder = 'black'

let rightBlock: number[] = [400, 100, 20, 100]
let leftBlock: number[]  = [100, 100, 20, 100]
let ballX: number = 250
let ballY: number = 100
let ballRadius: number = 15
let dy: number = 0
let dx: number = 10

let scores = {
    leftPlayerScore: 0,
    rightPlayerScore: 0
}

function main(): void {
    setTimeout(() => {
        clearCanvas()
        checkIfBounced()
        checkIfScored()
        ballX += dx
        ballY += dy
        draw()
        main()
    }, 200)
}

const clearCanvas = (): void => {
    gameBoardContext.fillStyle = boardBackground;
    //  Select the colour for the border of the canvas
    gameBoardContext.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // Draw a "border" around the entire canvas
    gameBoardContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

const draw = ():void => {
    gameBoardContext.fillStyle = 'lightblue'
    gameBoardContext.strokeStyle = 'darkblue'
    gameBoardContext.fillRect(...leftBlock)
    gameBoardContext.strokeRect(...leftBlock); 

    gameBoardContext.fillRect(...rightBlock)
    gameBoardContext.strokeRect(...rightBlock);
    gameBoardContext.beginPath()
    gameBoardContext.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
    gameBoardContext.stroke()
}

const changeDirection = (e): void => {
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const W_KEY = 87;
    const S_KEY = 83;

    const keyPressed = e.keyCode
    if (keyPressed === UP_KEY && rightBlock[1] > 0) {
        rightBlock[1] -= 20;
    }
    else if (keyPressed === DOWN_KEY && rightBlock[1] < 300) {
        rightBlock[1] += 20;
    }
    else if (keyPressed === W_KEY && leftBlock[1] > 0) {
        leftBlock[1] -= 20;
    }
    else if (keyPressed === S_KEY && leftBlock[1] < 300) {
        leftBlock[1] += 20;
    }
    clearCanvas();
    draw();
}

const checkIfHitLeftBlock = (): boolean => {
    if (
        ((ballX - ballRadius) <= (leftBlock[0] + leftBlock[2]) && (ballX -      ballRadius) >= (leftBlock[0]))
        && ((ballY + ballRadius) > leftBlock[1] && (ballY - ballRadius) <       (leftBlock[1] + 100))
    ) {
        return true
    } else {
        return false
    }
}

const checkIfHitRightBlock = (): boolean => {
    if (
        (((ballX + ballRadius) >= rightBlock[0]) && ((ballX + ballRadius)       <= (rightBlock[0] + rightBlock[2])))
        && ((ballY + ballRadius) > rightBlock[1] && (ballY - ballRadius) <         (rightBlock[1] + 100))) {
            return true
        }
    else {
        return false
    }
}

const checkIfBounced = (): void => {
    if (checkIfHitRightBlock()) {
        dx = -1*dx 
    } else if (checkIfHitLeftBlock()) {
        dx = -1*dx
    }
}

const updateScore = side => {
    if (side === 'left') {
        document.getElementById('left-player-score').innerText = scores.leftPlayerScore.toString()
    } else if (side === 'right') {
        document.getElementById('right-player-score').innerText = scores.rightPlayerScore.toString()
    }
}

const checkIfScored = (): void => {
    if ((ballX - ballRadius) <= 0) {
        scores.leftPlayerScore++
        updateScore('left')
    } else if ((ballX + ballRadius) >= 600) {
        scores.rightPlayerScore++
        updateScore('right')
    }
}

document.addEventListener("keydown", changeDirection)
