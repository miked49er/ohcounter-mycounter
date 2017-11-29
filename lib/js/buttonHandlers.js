function buttonOpenEnterNames() {
  var numPlayers = readPlayerNumbers();
  var data = getCookie(newGameCookie);
  enterPlayerNames(data);
}

function buttonOpenGameSelect() {
  readPlayerNames();
  var data = getCookie(newGameCookie);
  openGameSelect(data);
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
