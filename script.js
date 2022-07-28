"use strict";
exports.__esModule = true;
var gameBoard = document.getElementById("game-canvas");
var gameBoardContext = gameBoard.getContext('2d');
var rightBlock = [400, 100, 20, 100];
var leftBlock = [100, 100, 20, 100];
var draw = function () {
    console.log('drawing');
    gameBoardContext.fillStyle = 'lightblue';
    gameBoardContext.strokeStyle = 'darkblue';
    gameBoardContext.fillRect.apply(gameBoardContext, leftBlock);
    gameBoardContext.strokeRect.apply(gameBoardContext, leftBlock);
    gameBoardContext.fillRect.apply(gameBoardContext, rightBlock);
    gameBoardContext.strokeRect.apply(gameBoardContext, rightBlock);
    gameBoardContext.arc(250, 100, 50, 0, 2 * Math.PI);
};
var changeDirection = function (e) {
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var W_KEY = 87;
    var S_KEY = 83;
    var keyPressed = e.keyCode;
    if (keyPressed === UP_KEY) {
        rightBlock[1] -= 20;
    }
    draw();
};
document.addEventListener("keydown", changeDirection);
