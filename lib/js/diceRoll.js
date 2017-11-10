// Open the dice interface
function openDice() {
  toggleHamMenu();
  document.getElementById('content').innerHTML = '';
  loadFile('content', 'template/dice.html', 1).then(function(res) {
    loadFile('dice-group', 'images/dice/d4.svg', 1);
    loadFile('dice-group', 'images/dice/d6.svg', 1);
    loadFile('dice-group', 'images/dice/d8.svg', 1);
    loadFile('dice-group', 'images/dice/d10.svg', 1);
    loadFile('dice-group', 'images/dice/d12.svg', 1);
    loadFile('dice-group', 'images/dice/d20.svg', 1);
    loadFile('dice-group', 'images/dice/Coin.svg', 1);
  });
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
