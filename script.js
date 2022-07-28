"use strict";
exports.__esModule = true;
var gameBoard = document.getElementById("game-canvas");
var gameBoardContext = gameBoard.getContext('2d');
var draw = function () {
    console.log('drawing');
    gameBoardContext.fillStyle = 'lightblue';
    gameBoardContext.strokeStyle = 'darkblue';
    gameBoardContext.fillRect(100, 100, 20, 100);
    gameBoardContext.strokeRect(100, 100, 20, 100);
    gameBoardContext.fillRect(400, 100, 20, 100);
    gameBoardContext.strokeRect(400, 100, 20, 100);
    gameBoardContext.arc(250, 100, 50, 0, 2 * Math.PI);
};
var changeDirection = function (e) {
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var W_KEY = 87;
    var S_KEY = 83;
};
