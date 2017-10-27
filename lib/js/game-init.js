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
  for (var i=0; i<numPlayers; i++) {
    newTemplate('new-name-template', [], parent);
  }
}

openNumPlayerSelect();
