// Open the dice interface
function openDice() {
  document.getElementById('content').innerHTML = '';
  loadFile('content', 'template/dice.html', 1).then(function(res) {
    Promise.all([
      loadFileContents('images/dice/d4.svg'),
      loadFileContents('images/dice/d6.svg'),
      loadFileContents('images/dice/d8.svg'),
      loadFileContents('images/dice/d10.svg'),
      loadFileContents('images/dice/d12.svg'),
      loadFileContents('images/dice/d20.svg'),
      loadFileContents('images/dice/Coin.svg')
    ]).then(function(res) {
      var holder = document.getElementById('dice-holder');
      // console.log(res);

      for (var index in res) {
        holder.appendChild(convertToElement(res[index]).childNodes[0]);
      }
    });
  });
  newState('dice');
}

function rollDie(num) {
    var x = Math.floor(Math.random() * num) + 1;
    document.getElementById("result").innerHTML = x;
}

function rollDice(){
  var numSides = document.getElementById("dice");
  var x = Math.floor(Math.random() * numSides.value) + 1;
  document.getElementById("result").innerHTML = x;
}

function coinFlip(){
  var x = Math.floor(Math.random() * 2) + 1;
  if(x == 1)
    document.getElementById("result").innerHTML = "Heads";
  else
    document.getElementById("result").innerHTML = "Tails";
}
