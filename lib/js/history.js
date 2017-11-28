function domLoad(state) {
  var name = state.name;
  var data = null; // TODO
  // retrieve cookie data and pass to functions
  var 
  // if cookie should not be null
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

function newState(name) {
  var state = {"name": name};
  console.log('push: ' + name);
  history.pushState(state, null, null);
}
