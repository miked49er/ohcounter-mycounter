// Creates a html element that can be used in appendChild
function convertToElement(html) {
  // Create a temportary div
  var temp = document.createElement('div');
  // Place the html in the div's innerhtml
  temp.innerHTML = html;
  // Then return the first node
  return temp;
}

// Load a file into a div
// element to load the contents of file into
// file the location of the file you want to load
function loadFile(element, file) {
  // Ensure that the file has loaded before certain functions are called
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', file, true);
    req.onload = function() {
      // if (req.readyState!==4) reject(Error(req.statusText));
      if (req.status!==200) reject(Error(req.statusText));

      // Find the element you are trying to load the file into
      var htmlElement = document.getElementById(element);
      // Append it in
      htmlElement.appendChild(convertToElement(req.response));

      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}
