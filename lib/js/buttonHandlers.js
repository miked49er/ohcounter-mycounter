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
