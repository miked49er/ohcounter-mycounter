function buttonOpenEnterNames() {
  var numPlayers = readPlayerNumbers();
  enterPlayerNames(numPlayers, null);
}

function buttonOpenGameSelect() {
  readPlayerNames();
  openGameSelect(null);
}

function menuOpenDice() {
  toggleHamMenu();
  openDice();
}

function buttonPlayGame() {
  var gameSelection = document.getElementsByName('game-selection');
  var game = whichIsChecked(gameSelection);
  // console.log(game.value);
  startGame(game.value);
}
