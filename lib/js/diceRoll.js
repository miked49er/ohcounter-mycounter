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
