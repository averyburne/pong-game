export {}

let gameBoard: any = document.getElementById("game-canvas")
const gameBoardContext = gameBoard.getContext('2d')

const draw = () => {
    console.log('drawing')
    gameBoardContext.fillStyle = 'lightblue'
    gameBoardContext.strokeStyle = 'darkblue'
    gameBoardContext.fillRect(100, 100, 20, 100)
    gameBoardContext.strokeRect(100, 100, 20, 100); 

    gameBoardContext.fillRect(400, 100, 20, 100)
    gameBoardContext.strokeRect(400, 100, 20, 100); 
    gameBoardContext.arc(250, 100, 50, 0, 2 * Math.PI)
}
