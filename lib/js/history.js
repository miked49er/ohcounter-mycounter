function domLoad(state) {
  var name = state.name;
  var cookie = state.cookie;
  // retrieve cookie data and pass to functions
  var data = getCookie(cookie);
  // if cookie should not be null
  console.log('pop: ' + name);
  switch (name) {
    case 'numPlayers':
      openNumPlayerSelect(data);
      break;
    case 'playerNames':
      enterPlayerNames(data);
      break;
    case 'gameSelect':
      openGameSelect(data);
      break;
    case 'dice':
      openDice(data);
      break;
    case 'game':
      openGame(data);
      break;
    default:

  }
}

function newState(name, cookie) {
  var state = {
    "name": name,
    "cookie": cookie
  };
  console.log('push: ' + name);
  history.pushState(state, null, null);
}
