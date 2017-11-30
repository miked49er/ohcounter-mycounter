function startGame(game) {
  document.getElementById('content').innerHTML = '';

  loadFile('templates', 'template/game.html').then(function(res) {

    var gameTemp = 'games/MTG-Commander.json';

    loadFileContents('lib/json/game-list.json').then(function(data) {
      var json = JSON.parse(data).games;

      for (var i = 0; i < json.length; i++) {
        if (game === json[i].name) {
          gameTemp = json[i].template;
        }
      }
    }).then(function() {
      // Load selected template
      loadFileContents('lib/json/' + gameTemp).then(function(res) {
        var game = JSON.parse(res);
        var numPlayers = 1;

        // Loop through players
        for (var index = 0; index < numPlayers; index++) {
          var parent = document.createElement('div');
          parent.setAttribute('id', 'player' + index);
          parent.classList.add('player');

          if (index === 0) {
            parent.classList.add('active');
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
            loss = increment.getElementsByClassName('loss')[0];
            loss.innerHTML = primary.increments[0];
            loss.dataset.counter = primary.id;
            gain = increment.getElementsByClassName('gain')[0];
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
            inc = tTmp.increments[0];
            loss = temp.getElementsByClassName('loss')[0];
            loss.innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            loss.dataset.counter = tTmp.id;
            gain = temp.getElementsByClassName('gain')[0];
            gain.innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            gain.dataset.counter = tTmp.id;
            appendChildNodes(temp, parent);
          }
        }
      });
    });
  });

  newState('game-start');
}

function increment(elem){
  var value = document.getElementById(elem.dataset.counter);
  var cvalue = value.innerHTML;
  var increment = (elem.classList.contains('loss')) ? '-' + elem.innerHTML : elem.innerHTML;
  cvalue = parseInt(cvalue, 10) + parseInt(increment, 10);
  value.innerHTML = cvalue;
}
