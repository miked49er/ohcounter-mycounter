function addPlayer(){
  var name = document.getElementById("name").value;
  var para = document.createElement("p");
  para.setAttribute('class', 'player');
  var node = document.createTextNode(name);
  para.appendChild(node);
  var element = document.getElementById("playerList");
  element.appendChild(para);
}

function randPlayer(){
  var x = document.getElementsByClassName("player");
  var numPlayers = x.length;
  var pick = Math.floor(Math.random() * numPlayers);
  document.getElementById("testArea").innerHTML = x[pick].innerHTML;
}
