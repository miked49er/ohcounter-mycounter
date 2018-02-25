var recentGameCookie = 'RecentGame';

function startGame(data) {
  createGameCookie(data).then(function(res) {
    openGame(res);
  });

  newState('game', recentGameCookie);
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
          resetCounter(cookieData[i].primary);
          resetCounters(cookieData[i].secondary);
          resetCounters(cookieData[i].tertiary);
        }
        setCookie(recentGameCookie, cookieData);
        resolve(cookieData);
      });
    });
  });
}

// For reseting one particular counter
function resetCounter(counter) {
  counter.value = counter.start;
}

// For reseting all counters of type
function resetCounters(counters) {
  for (var i = 0; i < counters.length; i++) {
    counters[i].value = counters[i].start;
  }
}

// Reset all players counters
function resetGame() {
  var game = getCookie(recentGameCookie);

  for (var i = 0; i < game.length; i++) {
    resetCounter(game[i].primary);
    resetCounters(game[i].secondary);
    resetCounters(game[i].tertiary);
  }

  setCookie(recentGameCookie, game);
  openGame(game);
}

// Clear screen before setting up the game
function openGame(data) {
  clearScreen();
  setUpGame(data);
}

// Setup a game based on recentGameCookie
function setUpGame(data) {

  loadFile('templates', 'template/game.html').then(function(res) {
    var numPlayers = data.length;
    // Create the player tabs
    var playerTabs = document.createElement('div');
    playerTabs.setAttribute('id', 'player-tabs');
    var tabGroup = document.createElement('div');
    tabGroup.classList.add('horizontal-name-selection');
    tabGroup.classList.add('tabGroup1');
    tabGroup.classList.add('input-invert');
    var tabGroup2 = document.createElement('div');
    tabGroup2.classList.add('horizontal-name-selection');
    tabGroup2.classList.add('tabGroup2');
    tabGroup2.classList.add('input-invert');
    var players = document.createElement('div');
    players.setAttribute('id', 'players');

    // Loop through players
    for (var i = 0; i < numPlayers; i++) {
      var game = data[i];

      var playerTmp = convertToElement(document.getElementById('player-tab-template').innerHTML);
      var tab = playerTmp.getElementsByClassName('item')[0];
      tab.classList.add('item-' + numPlayers);
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

// Create an instance of a multi increment counter
function createCounterGroup(template, counter, parent, playerIndex) {
  var temp = createCounterValueGroup(template, counter, playerIndex);
  var group = temp.getElementsByClassName('multi-counter')[0];

  // Loop through each increment
  for (var i = 0; i < counter.increments.length; i++) {

    var increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
    var incr = counter.increments[i];
    createIncrement(increment, 'loss', incr, counter);
    createIncrement(increment, 'gain', incr, counter);
    appendChildNodes(increment, group);
  }
  appendChildNodes(temp, parent);
}

// Create a basic single increment counter
function createCounter(template, counter, parent, playerIndex) {

  var temp = createCounterValueGroup(template, counter, playerIndex);
  var incr = counter.increments[0];
  createIncrement(temp, 'loss', incr, counter);
  createIncrement(temp, 'gain', incr, counter);
  appendChildNodes(temp, parent);
}

// Create the counter value group that displays the name and value of the counter
function createCounterValueGroup(template, counter, playerIndex) {
  var temp = convertToElement(document.getElementById(template).innerHTML);
  temp.getElementsByClassName('counter-name')[0].innerHTML = counter.name;
  var count = temp.getElementsByClassName('counter-value')[0];
  count.innerHTML = counter.value;
  addDataset(count, counter, playerIndex);
  return temp;
}

// Create the individual increment or decrment for a counter
function createIncrement(temp, name, incr, counter) {
  var elem = temp.getElementsByClassName(name)[0];
  elem.innerHTML = (incr !== undefined) ? incr : counter.increments;
  elem.dataset.counter = counter.id;
}

// Add dataset variables to the counter
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

  // Dataset values for the counter to function
  elem.dataset.start = counter.start;
  elem.dataset.min = min;
  elem.dataset.max = max;
  elem.dataset.value = counter.value;

  // Dataset values to allow updating the cookie with the counter state
  elem.dataset.playerIndex = playerIndex;
  elem.dataset.id = counter.id;
}

// Increment or decrement a counter and update the cookie
function increment(elem){
  new Promise(function(resolve, reject) {

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

    resolve(data);
  }).then(function(data) {
    var cookieData = getCookie(recentGameCookie);
    var player = cookieData[data.playerIndex];

    // Check Primary Counter
    if (data.id === player.primary.id) {
      player.primary.value = data.value;
    }

    // Check Secondary Counters
    checkCounters(player.secondary, data);

    // Check Tertiary Counters
    checkCounters(player.tertiary, data);

    // Update Cookie
    cookieData[data.playerIndex] = player;
    setCookie(recentGameCookie, cookieData);
  });
}

// Checks each counter of `counters` to find the counter to update
function checkCounters(counters, data) {
  for (var i = 0; i < counters.length; i++) {
    if (data.id === counters[i].id) {
      counters[i].value = data.value;
    }
  }
}

// Show the counters for the player selected
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

// Get the value of the counter to be incremented
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
