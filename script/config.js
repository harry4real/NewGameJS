function openPlayerConfig(event) {
    // + in the beginning of event is to convert string to number 
    editedPlayer = +event.target.dataset.playerid;

    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display= 'block';
};

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';

    //to remove an error class in first div
    formElement.firstElementChild.classList.remove('error');

    //to remove an error text
    errorOutputElement.textContent = '';

    formElement.firstElementChild.lastElementChild.value = '';
};

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('playername').trim();

    // console.log(enteredPlayerName);

    // if (enteredPlayerName === '') equivalent to if (!enteredPlayerName)

    if (!enteredPlayerName) {
        // adding a new class using transversal method
        event.target.firstElementChild.classList.add('error');

        // write a content inside an empty p tag 
        errorOutputElement.textContent = 'Please enter a valid name!';
        return;
    }

    const updatePlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatePlayerDataElement.children[1].textContent = enteredPlayerName;

    players[editedPlayer - 1].name = enteredPlayerName;

    closePlayerConfig();
}

