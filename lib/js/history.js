function domLoad(state) {
  var name = state[0].name;
  var data = state[1];

  console.log('pop: ' + name);
  switch (name) {
    case 'numPlayers':
      openNumPlayerSelect(data);
      break;
    case 'playerNames':
      enterPlayerNames(data.players.length, data);
      break;
    case 'gameSelect':
      openGameSelect(data);
      break;
    case 'dice':
      openDice(data);
      break;
    default:

  }
}

function addHistory(name, data) {
  var state = [
    {"name": name},
    data
  ];
  console.log('replace: ' + name);
  history.replaceState(state, null, null);
}

function newState(name) {
  var state = [
    {"name": name},
    null
  ];
  console.log('push: ' + name);
  history.pushState(state, null, null);
}
