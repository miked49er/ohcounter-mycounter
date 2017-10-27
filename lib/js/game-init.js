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
  }, function(error) {
    console.error('Failed!', error);
  });
}

openNumPlayerSelect();
