export {}

let gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')
const boardBackground: string = 'white'
const boardBorder: string = 'black'

let leftBlock = {
    x: 100,
    y: 100,
    width: 20,
    height: 100,
    incoming: false
}

let rightBlock = {
    x: 400,
    y: 100,
    width: 20,
    height: 100,
    incoming: true
}

let gameBall = {
    x: 250,
    y: 100,
    radius: 15,
    dy: 0,
    dx: 3
}

let scores = {
    leftPlayerScore: 0,
    rightPlayerScore: 0
}

function main(): void {
    setTimeout(() => {
        clearCanvas()
        checkIfBounced()
        if(checkIfScored()) {
            setTimeout(() => {
                draw()
            }, 3000)
        }
        gameBall.x += gameBall.dx
        gameBall.y += gameBall.dy
        draw()
        main()
    }, 20)
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
    gameBoardContext.fillRect(leftBlock.x, leftBlock.y, leftBlock.width, leftBlock.height)
    gameBoardContext.strokeRect(leftBlock.x, leftBlock.y, leftBlock.width, leftBlock.height); 

    gameBoardContext.fillRect(rightBlock.x, rightBlock.y, rightBlock.width, rightBlock.height)
    gameBoardContext.strokeRect(rightBlock.x, rightBlock.y, rightBlock.width, rightBlock.height);
    gameBoardContext.beginPath()
    gameBoardContext.arc(gameBall.x, gameBall.y, gameBall.radius, 0, 2 * Math.PI)
    gameBoardContext.stroke()
}

const changeDirection = (e): void => {
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const W_KEY = 87;
    const S_KEY = 83;

    const keyPressed = e.keyCode
    if (keyPressed === UP_KEY && rightBlock.y > 0) {
        rightBlock.y -= 20;
    }
    else if (keyPressed === DOWN_KEY && rightBlock.y < (400 - rightBlock.height)) {
        rightBlock.y += 20;
    }
    else if (keyPressed === W_KEY && leftBlock.y > 0) {
        leftBlock.y -= 20;
    }
    else if (keyPressed === S_KEY && leftBlock.y < (400 - leftBlock.height)) {
        leftBlock.y += 20;
    }
    clearCanvas();
    draw();
}

const checkIfHitLeftBlock = (): boolean => {
    if (
        ((gameBall.x - gameBall.radius) <= (leftBlock.x + leftBlock.width) && (gameBall.x - gameBall.radius) >= (leftBlock.x))
        && ((gameBall.y + gameBall.radius) > leftBlock.y && (gameBall.y - gameBall.radius) < (leftBlock.y + 100))
    ) {
        return true
    } else {
        return false
    }
}

const checkIfHitRightBlock = (): boolean => {
    if (
        (((gameBall.x + gameBall.radius) >= rightBlock.x) && ((gameBall.x + gameBall.radius) <= (rightBlock.x + rightBlock.width)))
        && ((gameBall.y + gameBall.radius) > rightBlock.y && (gameBall.y - gameBall.radius) < (rightBlock.y + 100))) {
            return true
        }
    else {
        return false
    }
}

const checkIfHitWall = (): boolean => {
    if (((gameBall.y - gameBall.radius) < 1) || ((gameBall.y + gameBall.radius) > 400)) {
        return true
    } else {
        return false
    }
}

const checkIfBounced = (): void => {
    if (checkIfHitRightBlock()) {
        gameBall.dx = -1*gameBall.dx
        if (Math.floor(Math.random())) {
            gameBall.dy += Math.floor(Math.random() * 3)
        }
        else {
            gameBall.dy -= Math.floor(Math.random() * 3)
        }
    } else if (checkIfHitLeftBlock()) {
        gameBall.dx = -1*gameBall.dx
        if (Math.floor(Math.random())) {
            gameBall.dy += Math.floor(Math.random() * 3)
        }
        else {
            gameBall.dy -= Math.floor(Math.random() * 3)
        }
    } else if (checkIfHitWall()) {
        gameBall.dy = -1*gameBall.dy
    }

}

const updateScore = side => {
    if (side === 'left') {
        document.getElementById('left-player-score').innerText = scores.leftPlayerScore.toString()
    } else if (side === 'right') {
        document.getElementById('right-player-score').innerText = scores.rightPlayerScore.toString()
    }
}

const checkIfScored = (): boolean => {
    if ((gameBall.x - gameBall.radius) <= 0) {
        scores.leftPlayerScore++
        updateScore('left')
        gameBall.x = 250
        gameBall.dx = -1*gameBall.dx
        gameBall.dy = 0
        return true
    } else if ((gameBall.x + gameBall.radius) >= 600) {
        scores.rightPlayerScore++
        updateScore('right')
        gameBall.x = 250
        gameBall.dx = -1*gameBall.dx
        gameBall.dy = 0
        return true
    }
    return false
}

document.addEventListener("keydown", changeDirection)
