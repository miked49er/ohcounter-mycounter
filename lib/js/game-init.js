openNumPlayerSelect();

// Start a new game
function newGame() {
  toggleHamMenu();
  openNumPlayerSelect();
}

// Launch number of players selector
function openNumPlayerSelect() {
  loadFile('templates', 'template/num-player-select.html').then(function(res) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    newTemplate('num-players-template', [], content);
  }, function(error) {
    console.error('Failed!', error);
  });
}

// Launch entering player names interface
function enterPlayerNames() {
  var radioGroup = document.getElementsByName('player-selection');
  var numPlayers = whichIsChecked(radioGroup).value;
  var content = document.getElementById('content');
  content.innerHTML = '';
  newTemplate('player-names-template', [], content);

  var parent = document.getElementsByClassName('player-names-input')[0];
  var inputTag = 'player';
  var labelTag = 'playerLabel';
  for (var i=0; i<numPlayers; i++) {
    newTemplate('new-name-template', [], parent);
    var input = document.getElementById(inputTag);
    input.setAttribute('name', inputTag + i);
    input.setAttribute('id', inputTag + i);
    var label = document.getElementById(labelTag);
    label.setAttribute('for', inputTag + i);
    label.setAttribute('id', labelTag + i);
  }
}

// Launch game selection
function openGameSelect() {

  // Collect names
  var nameInputs = document.getElementsByClassName('player-name');
  var names = [];
  for (var i=0; i<nameInputs.length; i++) {
    var name = document.getElementById('player' + i).value;
    names[i] = name;
  }
  // TODO persist names

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
}
