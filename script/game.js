function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;

    for(let i = 0 ; i < 3 ; i++) {
        for(let j = 0 ; j < 3 ; j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoadElement.children[gameBoardIndex];
            gameBoardElement.children[gameBoardIndex].textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {

    // to check whether the name of both player has already fill the name
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names for both player');
        return;
    }
    
    resetGameStatus();

    // to show an active player
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
};

//to switch between player
function switchPlayer() {
    if (activePlayer === 0){
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    activePlayerNameElement.textContent = players[activePlayer].name;
}

/*
Main way
function selectGameField(event) {
    // for filling symbol in a board 
    event.target.textContent = players[activePlayer].symbol; // player [0]\
    event.target.classList.add('disabled');
    switchPlayer();
}
*/

function selectGameField(event) {

    // to prevent user click a gap between a grid
    if (event.target.tagName !== 'LI' || gameIsOver){
        return;
    };

    const selectedField = event.target;
     // because we need to itereation with index of an array which start from 0
     const selectedColumn = selectedField.dataset.col - 1;
     const selectedRow = selectedField.dataset.row - 1;

     if (gameData[selectedRow][selectedColumn] > 0){
        alert('Please select an empty field!');
        return;
     }

    // for filling symbol in a board 
    selectedField.textContent = players[activePlayer].symbol; // player [0]\
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();
    
    if (winnerId !== 0) {
        endGame(winnerId);
    }
    
    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    // for row checking 
    // using a column logic (fixed column)
    for(let i = 0; i < 3 ; i++){
        if (gameData[i][0] > 0 && 
            gameData[i][0] == gameData[i][1] && 
            gameData[i][1] == gameData[i][2]){
                return gameData[i][0];
            }
    }
     
    // for column checking 
    // using a row logic (fixed row)
    for(let i = 0 ; i < 3 ; i++){
        if (gameData[0][i] > 0 &&
            gameData[0][i] == gameData[1][i] &&
            gameData[0][i] == gameData[2][i]){
            return gameData[0][i];
        }
    }

    // for top left to bottom right 
    if (gameData[0][0] > 0 &&
        gameData[0][0] == gameData[1][1] &&
        gameData[1][1] == gameData[2][2]){
            return gameData[0][0];
        }

    // for bottom left to top right 
    if (gameData[2][0] > 0 &&
        gameData[2][0] == gameData[1][1] &&
        gameData[1][1] == gameData[0][2]){
            return gameData[2][0];
        }

    if (currentRound === 9){
        return -1;
    }

    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if(winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a draw';
    }
}