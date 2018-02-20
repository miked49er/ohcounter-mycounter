var recentGameCookie = 'RecentGame';

function startGame(data) {
  document.getElementById('content').innerHTML = '';
  createGameCookie(data).then(function(res) {
    setUpGame(res);
  });

  newState('game-start');
}

function createGameCookie(data) {
  return new Promise(function(resolve, reject) {
    var gameTemp = 'games/MTG-Commander.json';

    loadFileContents('lib/json/game-list.json').then(function(gameRes) {
      var json = JSON.parse(gameRes).games;

      for (var i = 0; i < json.length; i++) {
        if (data.game === json[i].name) {
          gameTemp = json[i].template;
        }
      }
    }).then(function() {
      loadFileContents('lib/json/' + gameTemp).then(function(res) {
        var game = res;
        var numPlayers = data.numPlayers;
        var cookieData = [];

        for (var i = 0; i < numPlayers; i++) {

          cookieData[i] = JSON.parse(game);
          cookieData[i].playerName = data.playerNames[i];
        }
        newCookie(recentGameCookie, cookieData);
        resolve(cookieData);
      });
    });
  });
}

function setUpGame(data) {

  loadFile('templates', 'template/game.html').then(function(res) {
    var numPlayers = data.length;
    // Create the player tabs
    var playerTabs = document.createElement('div');
    playerTabs.setAttribute('id', 'player-tabs');
    var tabGroup = document.createElement('div');
    tabGroup.classList.add('player-tabs');
    tabGroup.classList.add('tabGroup1');
    var tabGroup2 = document.createElement('div');
    tabGroup2.classList.add('player-tabs');
    tabGroup2.classList.add('tabGroup2');
    var players = document.createElement('div');
    players.setAttribute('id', 'players');

    // Loop through players
    for (var i = 0; i < numPlayers; i++) {
      var game = data[i];

      var playerTmp = convertToElement(document.getElementById('player-tab-template').innerHTML);
      var tab = playerTmp.getElementsByClassName('player-tab')[0];
      tab.classList.add('player-tab-' + numPlayers);
      var label = playerTmp.getElementsByTagName('label')[0];
      label.setAttribute('for', 'player' + i);
      label.innerHTML = game.playerName;
      var input = playerTmp.getElementsByTagName('input')[0];
      input.setAttribute('id', 'player' + i);

      var parent = document.createElement('div');
      parent.classList.add('player');
      parent.classList.add(input.id);

      if (i === 0) {
        // parent.classList.add('active');
        input.checked = true;
      }

      // Primary Counter
      var primary = game.primary;
      if (primary.increments.length > 1) {
        createCounterGroup('p-multi-template', primary, parent, i);
      }
      else {
        createCounter('p-single-template', primary, parent, i);
      }

      // Secondary counter
      var secondary = game.secondary;
      for (var s = 0; s < secondary.length; s++) {
        var stmp = secondary[s];
        if (stmp.increments.length > 1) {
          createCounterGroup('s-multi-template', stmp, parent, i);
        }
        else {
          createCounter('s-single-template', stmp, parent, i);
        }
      }

      // Tertiary counter
      var tertiary = game.tertiary;
      for (var t = 0; t < tertiary.length; t++) {
        var tTmp = tertiary[t];
        createCounter('t-single-template', tTmp, parent, i);
      }

      if (i > 3) {
        appendChildNodes(playerTmp, tabGroup2);
      }
      else {
        appendChildNodes(playerTmp, tabGroup);
      }

      players.appendChild(parent);
    }

    playerTabs.appendChild(tabGroup);

    if (numPlayers > 4) {
      playerTabs.appendChild(tabGroup2);
    }

    document.getElementById('content').appendChild(playerTabs);
    document.getElementById('content').appendChild(players);
    document.getElementsByClassName('player')[0].classList.add('active');
  });
}

function createCounterGroup(template, counter, parent, playerIndex) {
  var temp = createCounterValueGroup(template, counter, playerIndex);
  var group = temp.getElementsByClassName('multi-counter')[0];

  for (var i = 0; i < counter.increments.length; i++) {

    var increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
    var incr = counter.increments[i];
    createIncrement(increment, 'loss', incr, counter);
    createIncrement(increment, 'gain', incr, counter);
    appendChildNodes(increment, group);
  }
  appendChildNodes(temp, parent);
}

function createCounter(template, counter, parent, playerIndex) {

  var temp = createCounterValueGroup(template, counter, playerIndex);
  var incr = counter.increments[0];
  createIncrement(temp, 'loss', incr, counter);
  createIncrement(temp, 'gain', incr, counter);
  appendChildNodes(temp, parent);
}

function createCounterValueGroup(template, counter, playerIndex) {
  var temp = convertToElement(document.getElementById(template).innerHTML);
  temp.getElementsByClassName('counter-name')[0].innerHTML = counter.name;
  var count = temp.getElementsByClassName('counter-value')[0];
  count.innerHTML = counter.start;
  addDataset(count, counter, playerIndex);
  return temp;
}

function createIncrement(temp, name, incr, counter) {
  var elem = temp.getElementsByClassName(name)[0];
  elem.innerHTML = (incr !== undefined) ? incr : counter.increments;
  elem.dataset.counter = counter.id;
}

function addDataset(elem, counter, playerIndex) {
  var min, max;

  if (counter.min === 'null') {
    min = '';
  }
  else {
    min = counter.min;
  }

  if (counter.max === null) {
    max = '';
  }
  else {
    max = counter.max;
  }

  elem.dataset.start = counter.start;
  elem.dataset.min = min;
  elem.dataset.max = max;
  elem.dataset.value = counter.value;
  elem.dataset.playerIndex = playerIndex;
}

function increment(elem){
  var value = getCounterValue(elem);
  var cvalue = value.innerHTML;
  var increment = (elem.classList.contains('loss')) ? '-' + elem.innerHTML : elem.innerHTML;
  cvalue = parseInt(cvalue, 10) + parseInt(increment, 10);

  data = value.dataset;
  var min = data.min;
  var max = data.max;

  if (min !== 'null' && min !== null && min !== undefined && min !== '') {
    cvalue = (parseInt(cvalue, 10) >= parseInt(min, 10)) ? cvalue : min;
  }
  if (max !== 'null' && max !== null && max !== undefined && max !== '') {
    cvalue = (parseInt(cvalue, 10) <= parseInt(max, 10)) ? cvalue : max;
  }
  value.innerHTML = cvalue;
  value.dataset.value = cvalue;

  // var cookieData = getCookie(recentGameCookie);
  //
}

function activatePlayer() {
  var tabs = document.getElementById('player-tabs');

  for (var j = 0; j < tabs.childElementCount; j++) {
    var group = tabs.childNodes[j];

    for (var i = 0; i < group.childElementCount; i++) {
      var elem = group.childNodes[i].getElementsByTagName('input')[0];
      var player = document.getElementsByClassName(elem.id)[0];
      player.classList.toggle('active', elem.checked);
    }
  }
}

function getCounterValue(elem) {
  var value = null;
  var curElem = elem.parentNode;

  while (value === null) {
    if (curElem.classList.contains('primary') || curElem.classList.contains('secondary') || curElem.classList.contains('tertiary')) {
      value = curElem.getElementsByClassName('counter-value')[0];
    }
    else {
       curElem = curElem.parentNode;
    }
  }

  return value;
}
