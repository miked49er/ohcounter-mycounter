function startGame(data) {
  document.getElementById('content').innerHTML = '';

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
          var temp, increment, inc, loss, gain;

          // Primary Counter
          var primary = game.primary;
          if (primary.increments.length > 1) {
            temp = convertToElement(document.getElementById('p-multi-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
            var count = temp.getElementsByClassName('counter-value')[0];
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
            /*
              TODO
              Set Counter-Value id
              Add dataset counter to increments and decrements
            */
            temp = convertToElement(document.getElementById('p-single-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = primary.name;
            temp.getElementsByClassName('counter-value')[0].innerHTML = primary.start;
            temp.getElementsByClassName('loss')[0].innerHTML = primary.increments[0];
            temp.getElementsByClassName('gain')[0].innerHTML = primary.increments[0];
            appendChildNodes(temp, parent);
          }

          // Secondary counter
          var secondary = game.secondary;
          for (var s = 0; s < secondary.length; s++) {
            var stmp = secondary[s];
            if (stmp.increments.length > 1) {
              /*
                TODO
                Set Counter-Value id
                Add dataset counter to increments and decrements
              */
              temp = convertToElement(document.getElementById('s-multi-template').innerHTML);
              temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
              temp.getElementsByClassName('counter-value')[0].innerHTML = stmp.start;

              var sMulti = temp.getElementsByClassName('multi-counter')[0];
              for (var si = 0; si < stmp.increments.length; si++) {
                increment = convertToElement(document.getElementById('increment-group-template').innerHTML);
                increment.getElementsByClassName('loss')[0].innerHTML = stmp.increments[si];
                increment.getElementsByClassName('gain')[0].innerHTML = stmp.increments[si];
                appendChildNodes(increment, sMulti);
              }
              appendChildNodes(temp, parent);
            }
            else {
              /*
                TODO
                Set Counter-Value id
                Add dataset counter to increments and decrements
              */
              temp = convertToElement(document.getElementById('s-single-template').innerHTML);
              temp.getElementsByClassName('counter-name')[0].innerHTML = stmp.name;
              temp.getElementsByClassName('counter-value')[0].innerHTML = stmp.start;
              inc = stmp.increments[0];
              temp.getElementsByClassName('loss')[0].innerHTML = (inc !== undefined) ? inc : stmp.increments;
              temp.getElementsByClassName('gain')[0].innerHTML = (inc !== undefined) ? inc : stmp.increments;
              appendChildNodes(temp, parent);
            }
          }

          // Tertiary counter
          var tertiary = game.tertiary;
          for (var t = 0; t < tertiary.length; t++) {
            /*
              TODO
              Set Counter-Value id
              Add dataset counter to increments and decrements
            */
            var tTmp = tertiary[t];
            temp = convertToElement(document.getElementById('t-single-template').innerHTML);
            temp.getElementsByClassName('counter-name')[0].innerHTML = tTmp.name;
            temp.getElementsByClassName('counter-value')[0].innerHTML = tTmp.start;
            inc = tTmp.increments[0];
            temp.getElementsByClassName('loss')[0].innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            temp.getElementsByClassName('gain')[0].innerHTML = (inc !== undefined) ? inc : tTmp.increments;
            appendChildNodes(temp, parent);
          }
        }
      });
    });
  });

  newState('game-start');
}

function increment(){

}
