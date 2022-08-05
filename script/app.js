const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name : '',
        symbol : 'X'
    },
    {
        name : '',
        symbol : 'O'
    },
];

const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorOutputElement = document.getElementById('config-error');
const gameAreaElement = document.getElementById('active-game');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');

const openPlayer1BtnElement = document.getElementById('edit-player-1-btn');
const openPlayer2BtnElement = document.getElementById('edit-player-2-btn');
const cancelConfigElement = document.getElementById('cancel-config-btn');
const startNewGameBtnElement = document.getElementById('start-game-btn');
// main way
// const gameFieldElements = document.querySelectorAll('#game-board li');

// alternative way to finish the task 
const gameBoardElement = document.getElementById('game-board');

openPlayer1BtnElement.addEventListener('click', openPlayerConfig);
openPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancelConfigElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startNewGameBtnElement.addEventListener('click', startNewGame);

// to loop inside an array (main way)
/*
for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
}
*/

// alternative way to finish this part 
gameBoardElement.addEventListener('click', selectGameField);
