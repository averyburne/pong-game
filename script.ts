const gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')

gameBoardContext.fillStyle = 'lightblue'
gameBoardContext.strokeStyle = 'darkblue'
gameBoardContext.fillRect(100, 100, 20, 100)
gameBoardContext.strokeRect(100, 100, 20, 100);