var newGameCookie = 'GameInitCookie';

document.addEventListener('DOMContentLoaded', function() {
  actionPrompt();

  window.addEventListener('popstate', function(e) {
    // console.log(e);
    domLoad(e.state);
  });
});

// User action prompt
/* option 1 { Continue Game }
 * option 2 { New Game }
 * option 3 { Load Game } TODO
 */
function actionPrompt() {
  clearScreen();
  var content = document.getElementById('content');

  loadFile('templates', 'template/action-prompt.html').then(function(res) {
    newTemplate('action-prompt-template', [], content);

    loadFileContents('lib/json/action-prompt.json').then(function(res) {
      var options = JSON.parse(res).options;

      var parent = document.getElementById('action-selection');
      var inputL = 'action-option';
      var labelL = 'action-option-label';
      for (var i = 0; i < options.length; i++) {
        if (options[i].value !== 'resume' || checkCookie(recentGameCookie)) {

          newTemplate('action-template', [], parent);
          var input = document.getElementById(inputL);
          input.setAttribute('value', options[i].value);
          input.setAttribute('id', inputL + options[i].id);
          var label = document.getElementById(labelL);
          label.setAttribute('for', inputL + options[i].id);
          label.setAttribute('id', labelL + options[i].id);
          label.innerHTML = options[i].name;
        }
      }
      parent.getElementsByTagName('input')[0].checked = true;
    });
  });

  newState('actionPrompt');
}

function startNewGame() {
  loadFileContents('lib/json/game-creation-cookie-template.json').then(function(res) {
    var json = JSON.parse(res);

    if (!checkCookie(newGameCookie)) {
      newCookie(newGameCookie,json,0.0069);
    }
    else {
      json = getCookie(newGameCookie);
    }

    openNumPlayerSelect(json);
  });
}

// Start a new game
function newGame() {
  toggleHamMenu();
  var data = getCookie(newGameCookie);
  openNumPlayerSelect(data);
  // openGameSelect(data);
}

// Launch number of players selector
function openNumPlayerSelect(data) {
  loadFile('templates', 'template/num-player-select.html').then(function(res) {
    var content = document.getElementById('content');
    clearScreen();
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
  clearScreen();
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
    newState('playerNames', newGameCookie);
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
  return names;
}

// Launch game selection
function openGameSelect(data) {

  loadFile('templates', 'template/game-select.html').then(function(res) {
    var content = document.getElementById('content');
    clearScreen();
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
        if (games[i].id === 0 || games[i].name === data.game) {
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

  newState('gameSelect', newGameCookie);
}
