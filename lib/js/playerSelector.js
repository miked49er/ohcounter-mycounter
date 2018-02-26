function openRandPlayer(data) {
  clearScreen();

  loadFile('templates', 'template/random-player-selector.html').then(function(res) {
    var content = document.getElementById('content');
    newTemplate('rand-player-selection-template', [], content);
    // var parent = document.getElementsByClassName('player-tabs')[0];
    var parent = document.getElementById('rand-player-selection');
    var inputs;

    for (var i = 0; i < data.length; i++) {
      if (i % 2 === 0) {
        inputs = createRandInputGroup(parent);
      }
      addPlayer(i, data, inputs);
    }
  });
}

function createRandInputGroup(parent) {
  var tmp = document.createElement('div');
  tmp.classList.add('horizontal-name-selection');
  tmp.classList.add('tabGroup1');
  parent.appendChild(tmp);
  return tmp;
}

function addPlayer(index, data, parent){
  var temp = convertToElement(document.getElementById('rand-player-template').innerHTML);
  var inputId = 'rand-player-option' + index;
  var input = temp.getElementsByTagName('input')[0];
  input.setAttribute('id', inputId);
  input.value = data[index].playerName;
  var label = temp.getElementsByTagName('label')[0];
  label.setAttribute('for', inputId);
  label.innerHTML = data[index].playerName;
  appendChildNodes(temp, parent);
}

function selectAllPlayers() {
  selectAll(document.getElementsByName('rand-player-selection'));
}

function randPlayer(){
  var players = whichAreChecked(document.getElementsByName('rand-player-selection'));
  if (players.length > 0) {
    var pick = Math.floor(Math.random() * players.length);
    alert('Player', players[pick].value, 'anounce', 5000);
  }
  else {
    alert('Error', 'At least one player must be selected.', 'error', 3000);
  }
}
