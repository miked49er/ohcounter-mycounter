var newGameCookie = 'GameInitCookie';

document.addEventListener('DOMContentLoaded', function() {
  loadFileContents('lib/json/game-creation-cookie-template.json').then(function(res) {
    var json = JSON.parse(res);

    newCookie(newGameCookie,json,0.0069);
    // var tmp = getCookie("GameInitCookie");
    // console.log(JSON.parse(tmp));

    openNumPlayerSelect(json);
  });

  window.addEventListener('popstate', function(e) {
    // console.log(e);
    domLoad(e.state);
  });
});

// Start a new game
function newGame() {
  toggleHamMenu();
  openNumPlayerSelect();
}

// Launch number of players selector
function openNumPlayerSelect(data) {
  loadFile('templates', 'template/num-player-select.html').then(function(res) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    newTemplate('num-players-template', [], content);

    if (data.numPlayers !== null) {
      var inputs = document.getElementsByName('player-selection');
      var iLabel = 'player-option-';

      for (var i in inputs) {
        if ((iLabel + data.numPlayers) === inputs[i].id) {
          inputs[i].checked = true;
        }
      }
    }
    else {
      newState('numPlayers', newGameCookie);
    }
  }, function(error) {
    console.error('Failed!', error);
  });
}

function readPlayerNumbers() {
  var radioGroup = document.getElementsByName('player-selection');
  var numPlayers = whichIsChecked(radioGroup).value;
  return numPlayers;
}

// Launch entering player names interface
function enterPlayerNames(data) {
  var content = document.getElementById('content');
  content.innerHTML = '';
  newTemplate('player-names-template', [], content);

  var parent = document.getElementsByClassName('player-names-input')[0];
  var inputTag = 'player';
  var labelTag = 'playerLabel';
  for (var i=0; i<data.numPlayers; i++) {
    newTemplate('new-name-template', [], parent);
    var input = document.getElementById(inputTag);
    input.setAttribute('name', inputTag + i);
    input.setAttribute('id', inputTag + i);
    var label = document.getElementById(labelTag);
    label.setAttribute('for', inputTag + i);
    label.setAttribute('id', labelTag + i);
    if (data.playerNames !== null) {
      var player = data.playerNames[i];
      input.value = (player != undefined) ? player : '';
    }
  }

  if (data.playerNames === null || data.playerNames === undefined) {
    newState('playerNames');
  }
}

function readPlayerNames() {
  // Collect names
  var nameInputs = document.getElementsByClassName('player-name');
  var names = [];
  for (var i=0; i<nameInputs.length; i++) {
    var name = document.getElementById('player' + i).value;
    names[i] = name;
  }
}

// Launch game selection
function openGameSelect(data) {

  loadFile('templates', 'template/game-select.html').then(function(res) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    newTemplate('game-selection-template', [], content);

    loadFileContents('lib/json/game-list.json').then(function(res) {
      var games = JSON.parse(res).games;

      var parent = document.getElementById('game-selection');
      var inputL = 'game-option';
      var labelL = 'game-option-label';
      for (var i=0; i<games.length; i++) {
        newTemplate('game-template', [], parent);
        var input = document.getElementById(inputL);
        input.setAttribute('value', games[i].name);
        input.setAttribute('id', inputL + games[i].id);
        if (games[i].id === 0) {
          input.checked = true;
        }
        var label = document.getElementById(labelL);
        label.setAttribute('for', inputL + games[i].id);
        label.setAttribute('id', labelL + games[i].id);
        label.innerHTML = games[i].name;
      }
    }, function(error) {
      console.error('Failed to load game-list');
    });
  }, function(error) {
    console.error('Failed to load game-select!', error);
  });

  newState('gameSelect');
}
