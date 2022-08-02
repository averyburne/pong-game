"use strict";
exports.__esModule = true;
var gameBoard = document.getElementById("game-canvas");
var gameBoardContext = gameBoard.getContext('2d');
var boardBackground = 'white';
var boardBorder = 'black';
var rightBlock = [400, 100, 20, 100];
var leftBlock = [100, 100, 20, 100];
var ballX = 250;
var ballY = 100;
var ballRadius = 15;
var dy = 0;
var dx = 10;
function main() {
    setTimeout(function () {
        clearCanvas();
        checkIfBounced();
        ballX += dx;
        ballY += dy;
        draw();
        main();
    }, 200);
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
    gameBoardContext.fillRect.apply(gameBoardContext, leftBlock);
    gameBoardContext.strokeRect.apply(gameBoardContext, leftBlock);
    gameBoardContext.fillRect.apply(gameBoardContext, rightBlock);
    gameBoardContext.strokeRect.apply(gameBoardContext, rightBlock);
    gameBoardContext.beginPath();
    gameBoardContext.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    gameBoardContext.stroke();
};
var changeDirection = function (e) {
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var W_KEY = 87;
    var S_KEY = 83;
    var keyPressed = e.keyCode;
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
};
var checkIfHitLeftBlock = function () {
    if (((ballX - ballRadius) <= (leftBlock[0] + leftBlock[2]) && (ballX - ballRadius) >= (leftBlock[0]))
        && ((ballY + ballRadius) > leftBlock[1] && (ballY - ballRadius) < (leftBlock[1] + 100))) {
        return true;
    }
    else {
        return false;
    }
};
var checkIfHitRightBlock = function () {
    if ((((ballX + ballRadius) >= rightBlock[0]) && ((ballX + ballRadius) <= (rightBlock[0] + rightBlock[2])))
        && ((ballY + ballRadius) > rightBlock[1] && (ballY - ballRadius) < (rightBlock[1] + 100))) {
        return true;
    }
    else {
        return false;
    }
};
var checkIfBounced = function () {
    if (checkIfHitRightBlock()) {
        dx = -1 * dx;
    }
    else if (checkIfHitLeftBlock()) {
        dx = -1 * dx;
    }
};
document.addEventListener("keydown", changeDirection);
