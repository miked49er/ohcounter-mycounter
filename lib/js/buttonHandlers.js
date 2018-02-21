function buttonActionPrompt() {
  var actionSelection = document.getElementsByName('action-prompt-selection');
  var option = whichIsChecked(actionSelection);

  // Retrieve proper cookie and launch action
  switch (option.value) {
    case 'resume':
      if (checkCookie(recentGameCookie)) {
        openGame(getCookie(recentGameCookie));
      }
      break;
    case 'newGame':
      startNewGame();
      break;
    default:
      startNewGame();
  }
}

function buttonOpenEnterNames() {
  var numPlayers = readPlayerNumbers();
  var data = getCookie(newGameCookie);
  data.numPlayers = numPlayers;
  setCookie(newGameCookie, data);
  enterPlayerNames(data);
}

function buttonOpenGameSelect() {
  var playerNames = readPlayerNames();
  var data = getCookie(newGameCookie);
  data.playerNames = (playerNames !== undefined) ? playerNames : null;
  setCookie(newGameCookie, data);
  openGameSelect(data);
}

function menuOpenDice() {
  toggleHamMenu();
  openDice();
}

function menuResetGame() {
  toggleHamMenu();
  resetGame();
}

function buttonPlayGame() {
  var gameSelection = document.getElementsByName('game-selection');
  var data = getCookie(newGameCookie);
  var game = whichIsChecked(gameSelection);
  data.game = game.value;
  setCookie(newGameCookie, data);
  // console.log(game.value);
  startGame(data);
}

function decrementCounter(elem) {
  increment(elem);
}

function incrementCounter(elem) {
  increment(elem);
}
