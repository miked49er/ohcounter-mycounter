function startGame(data) {
  document.getElementById('content').innerHTML = '';
  console.log(data);
  loadFile('templates', 'template/game.html').then(function(res) {

    var gameTemp = 'games/MTG-Commander.json';

    loadFileContents('lib/json/game-list.json').then(function(gameRes) {
      var json = JSON.parse(gameRes).games;

      for (var i = 0; i < json.length; i++) {
        if (data.game === json[i].name) {
          gameTemp = json[i].template;
        }
      }
    }).then(function() {
      // Load selected template
      loadFileContents('lib/json/' + gameTemp).then(function(res) {
        var game = JSON.parse(res);
        var numPlayers = data.numPlayers;

        var playerTabs = document.createElement('div');
        playerTabs.setAttribute('id', 'player-tabs');

        // Loop through players
        for (var index = 0; index < numPlayers; index++) {
          // var parent = document.createElement('div');
          // parent.setAttribute('id', 'player' + index);
          // parent.classList.add('player');

          var playerTmp = convertToElement(document.getElementById('player-tabs-template').innerHTML);
          console.log(playerTmp);
          var tab = playerTmp.getElementsByClassName('player-tab')[0];
          tab.classList.remove('player-tab');
          tab.classList.add('player-tab-' + index);
          var label = playerTmp.getElementsByTagName('label')[0];
          label.setAttribute('for', 'player' + index);
          label.innerHTML = data.playerNames[index];
          var input = playerTmp.getElementsByTagName('input')[0];
          input.setAttribute('id', 'player' + index);
          var parent = playerTmp.getElementsByClassName('player')[0];

          if (index === 0) {
            // parent.classList.add('active');
            input.checked = true;
          }

          document.getElementById('content').appendChild(parent);
          // var parent = document.getElementById('player' + player);

          // Create each counter
          var temp, increment, inc, loss, gain, count;

          // Primary Counter
          var primary = game.primary;
          if (primary.increments.length > 1) {
            temp = convertToElement(document.getElementById('p-multi-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
            count = temp.getElementsByClassName('counter-value')[0];
            count.innerHTML = primary.start;
            count.setAttribute('id', primary.id);
            addDataset(count, primary);

            var pMulti = temp.getElementsByClassName('multi-counter')[0];
            for (var p = 0; p < primary.increments.length; p++) {
              increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
              loss = increment.getElementsByClassName('loss')[0];
              loss.innerHTML = primary.increments[p];
              loss.dataset.counter = primary.id;
              gain = increment.getElementsByClassName('gain')[0];
              gain.innerHTML = primary.increments[p];
              gain.dataset.counter = primary.id;
              appendChildNodes(increment, pMulti);
            }
            appendChildNodes(temp, parent);
          }
          else {
            temp = convertToElement(document.getElementById('p-single-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
            count = temp.getElementsByClassName('counter-value')[0];
            count.innerHTML = primary.start;
            count.setAttribute('id', primary.id);
            addDataset(count, primary);
            loss = temp.getElementsByClassName('loss')[0];
            loss.innerHTML = primary.increments[0];
            loss.dataset.counter = primary.id;
            gain = temp.getElementsByClassName('gain')[0];
            gain.innerHTML = primary.increments[0];
            gain.dataset.counter = primary.id;
            appendChildNodes(temp, parent);
          }

          // Secondary counter
          var secondary = game.secondary;
          for (var s = 0; s < secondary.length; s++) {
            var stmp = secondary[s];
            if (stmp.increments.length > 1) {
              temp = convertToElement(document.getElementById('s-multi-template').innerHTML);
              temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
              count = temp.getElementsByClassName('counter-value')[0];
              count.innerHTML = stmp.start;
              count.setAttribute('id', stmp.id);
              addDataset(count, stmp);

              var sMulti = temp.getElementsByClassName('multi-counter')[0];
              for (var si = 0; si < stmp.increments.length; si++) {
                increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
                loss = increment.getElementsByClassName('loss')[0];
                loss.innerHTML = stmp.increments[si];
                loss.dataset.counter = stmp.id;
                gain = increment.getElementsByClassName('gain')[0];
                gain.innerHTML = stmp.increments[si];
                gain.dataset.counter = stmp.id;
                appendChildNodes(increment, sMulti);
              }
              appendChildNodes(temp, parent);
            }
            else {
              temp = convertToElement(document.getElementById('s-single-template').innerHTML);
              temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
              count = temp.getElementsByClassName('counter-value')[0];
              count.innerHTML = stmp.start;
              count.setAttribute('id', stmp.id);
              addDataset(count, stmp);
              inc = stmp.increments[0];
              loss = temp.getElementsByClassName('loss')[0];
              loss.innerHTML = (inc !== undefined) ? inc : stmp.increments;
              loss.dataset.counter = stmp.id;
              gain = temp.getElementsByClassName('gain')[0];
              gain.innerHTML = (inc !== undefined) ? inc : stmp.increments;
              gain.dataset.counter = stmp.id;
              appendChildNodes(temp, parent);
            }
          }

          // Tertiary counter
          var tertiary = game.tertiary;
          for (var t = 0; t < tertiary.length; t++) {
            var tTmp = tertiary[t];
            temp = convertToElement(document.getElementById('t-single-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = tTmp.name;
            count = temp.getElementsByClassName('counter-value')[0];
            count.innerHTML = tTmp.start;
            count.setAttribute("id", tTmp.id);
            addDataset(count, tTmp);
            inc = tTmp.increments[0];
            loss = temp.getElementsByClassName('loss')[0];
            loss.innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            loss.dataset.counter = tTmp.id;
            gain = temp.getElementsByClassName('gain')[0];
            gain.innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            gain.dataset.counter = tTmp.id;
            appendChildNodes(temp, parent);
          }

          appendChildNodes(parent, playerTabs);
        }
        console.log(playerTabs);
        appendChildNodes(playerTabs, document.getElementById('content'));
      });
    });
  });

  newState('game-start');
}

function addDataset(elem, counter) {
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
}

function increment(elem){
  var value = document.getElementById(elem.dataset.counter);
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
}
