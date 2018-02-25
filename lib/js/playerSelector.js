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
  input.checked = true;
  var label = temp.getElementsByTagName('label')[0];
  label.setAttribute('for', inputId);
  label.innerHTML = data[index].playerName;
  appendChildNodes(temp, parent);
}

function randPlayer(){
  var players = whichAreChecked(document.getElementsByName('rand-player-selection'));
  var pick = Math.floor(Math.random() * players.length);
  return players[pick].value;
}
