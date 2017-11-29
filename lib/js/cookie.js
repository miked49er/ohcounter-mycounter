// TODO make a function to check for cookie exists.
//assume json input for cvalue

//creates a new cookie with default settings if no input
function newCookie(cname){
  var str=cname;

  //default name
  if(str==null){
  str="defaultGameCookie"
  }
  loadFileContents('lib/json/game-creation-cookie-template.json').then(function(res) {
  var json = JSON.parse(res);
  setCookie(str,json,0.0069);

}

function setCookie(cname, cvalue, exdays) {

    if(exdays==null){
      exdays=99999;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Check if cookie exist
function checkCookie(cookieName) {
    var game = getCookie(cookieName);
    if (game != "") {
        alert("Continue Game");
    } else {
      newCookie(cookieName);
    }
    }
}
