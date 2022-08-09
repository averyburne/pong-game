"use strict";
exports.__esModule = true;
var gameBoard = document.getElementById("game-canvas");
var gameBoardContext = gameBoard.getContext('2d');
var boardBackground = 'white';
var boardBorder = 'black';
var leftBlock = {
    x: 100,
    y: 100,
    width: 20,
    height: 100,
    incoming: false
};
var rightBlock = {
    x: 400,
    y: 100,
    width: 20,
    height: 100,
    incoming: true
};
var gameBall = {
    x: 250,
    y: 100,
    radius: 15,
    dy: 0,
    dx: 3
};
var scores = {
    leftPlayerScore: 0,
    rightPlayerScore: 0
};
function main() {
    setTimeout(function () {
        clearCanvas();
        checkIfBounced();
        if (checkIfScored()) {
            setTimeout(function () {
                draw();
            }, 3000);
        }
        gameBall.x += gameBall.dx;
        gameBall.y += gameBall.dy;
        draw();
        main();
    }, 20);
}
var clearCanvas = function () {
    gameBoardContext.fillStyle = boardBackground;
    //  Select the colour for the border of the canvas
    gameBoardContext.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // Draw a "border" around the entire canvas
    gameBoardContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
};
var draw = function () {
    gameBoardContext.fillStyle = 'lightblue';
    gameBoardContext.strokeStyle = 'darkblue';
    gameBoardContext.fillRect(leftBlock.x, leftBlock.y, leftBlock.width, leftBlock.height);
    gameBoardContext.strokeRect(leftBlock.x, leftBlock.y, leftBlock.width, leftBlock.height);
    gameBoardContext.fillRect(rightBlock.x, rightBlock.y, rightBlock.width, rightBlock.height);
    gameBoardContext.strokeRect(rightBlock.x, rightBlock.y, rightBlock.width, rightBlock.height);
    gameBoardContext.beginPath();
    gameBoardContext.arc(gameBall.x, gameBall.y, gameBall.radius, 0, 2 * Math.PI);
    gameBoardContext.stroke();
};
var changeDirection = function (e) {
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var W_KEY = 87;
    var S_KEY = 83;
    var keyPressed = e.keyCode;
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
};
var checkIfHitLeftBlock = function () {
    if (((gameBall.x - gameBall.radius) <= (leftBlock.x + leftBlock.width) && (gameBall.x - gameBall.radius) >= (leftBlock.x))
        && ((gameBall.y + gameBall.radius) > leftBlock.y && (gameBall.y - gameBall.radius) < (leftBlock.y + 100))) {
        return true;
    }
    else {
        return false;
    }
};
var checkIfHitRightBlock = function () {
    if ((((gameBall.x + gameBall.radius) >= rightBlock.x) && ((gameBall.x + gameBall.radius) <= (rightBlock.x + rightBlock.width)))
        && ((gameBall.y + gameBall.radius) > rightBlock.y && (gameBall.y - gameBall.radius) < (rightBlock.y + 100))) {
        return true;
    }
    else {
        return false;
    }
};
var checkIfHitWall = function () {
    if (((gameBall.y - gameBall.radius) < 1) || ((gameBall.y + gameBall.radius) > 400)) {
        return true;
    }
    else {
        return false;
    }
};
var checkIfBounced = function () {
    if (rightBlock.incoming && checkIfHitRightBlock()) {
        gameBall.dx = -1 * gameBall.dx;
        if (Math.floor(Math.random())) {
            gameBall.dy += Math.floor(Math.random() * 3);
        }
        else {
            gameBall.dy -= Math.floor(Math.random() * 3);
        }
        rightBlock.incoming = false;
        leftBlock.incoming = true;
    }
    else if (leftBlock.incoming && checkIfHitLeftBlock()) {
        gameBall.dx = -1 * gameBall.dx;
        if (Math.floor(Math.random())) {
            gameBall.dy += Math.floor(Math.random() * 3);
        }
        else {
            gameBall.dy -= Math.floor(Math.random() * 3);
        }
        leftBlock.incoming = false;
        rightBlock.incoming = true;
    }
    else if (checkIfHitWall()) {
        gameBall.dy = -1 * gameBall.dy;
    }
};
var updateScore = function (side) {
    if (side === 'left') {
        document.getElementById('left-player-score').innerText = scores.leftPlayerScore.toString();
    }
    else if (side === 'right') {
        document.getElementById('right-player-score').innerText = scores.rightPlayerScore.toString();
    }
};
var checkIfScored = function () {
    if ((gameBall.x - gameBall.radius) <= 0) {
        scores.leftPlayerScore++;
        updateScore('left');
        gameBall.x = 250;
        gameBall.dx = -1 * gameBall.dx;
        gameBall.dy = 0;
        return true;
    }
    else if ((gameBall.x + gameBall.radius) >= 600) {
        scores.rightPlayerScore++;
        updateScore('right');
        gameBall.x = 250;
        gameBall.dx = -1 * gameBall.dx;
        gameBall.dy = 0;
        return true;
    }
    return false;
};
document.addEventListener("keydown", changeDirection);
