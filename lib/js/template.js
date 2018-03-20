// Creates a html element that can be used in appendChild
function convertToElement(html) {
  // Create a temportary div
  var temp = document.createElement('div');
  // Place the html in the div's innerhtml
  temp.innerHTML = html;

  return temp;
}

// Append all children nodes to parent
function appendChildNodes(child, parent) {
  while (child.firstChild) {
    var tmp = child.firstChild;
    child.removeChild(tmp);
    if (tmp.nodeType !== 3) {
      parent.appendChild(tmp);
    }
  }
}

// Load a file into a div
// element to load the contents of file into
// file the location of the file you want to load
/* Children is
  1 if all content is wrapped by a div
  null if multiple children
*/
function loadFile(element, file, children) {
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
      var contents = convertToElement(req.response);
      contents.dataset.temp = file;

      if (children === 1) {
        htmlElement.appendChild(contents.childNodes[0]);
      }
      else {
        if (checkForTemplates(htmlElement, contents)) {
          htmlElement.appendChild(contents);
        }
      }

      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

// Load a file
// file the location of the file you want to load
function loadFileContents(file) {
  // Ensure that the file has loaded before certain functions are called
  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', file, true);
    req.onload = function() {
      // if (req.readyState!==4) reject(Error(req.statusText));
      if (req.status!==200) reject(Error(req.statusText));

      resolve(req.response);
    };

    req.onerror = function() {
      reject(Error('Network Error'));
    };

    req.send();
  });
}

/* newTemplate will grab a template and populate the template with content
  templateName is the name of the template element
  content is a json of for the template content
  content uses the following format
    {
      "className": "value",
      "className": "value"
    }
*/
function newTemplate(templateName, content, parent) {
  var temp = document.getElementById(templateName).innerHTML;
  var template = convertToElement(temp);

  for (var key in content) {
    var value = content[key];
    template.getElementsByClassName(key)[0].innerHTML = value;
  }

  appendChildNodes(template, parent);
}

function checkForTemplates(element, template) {
  for (var i = 0; i < element.childNodes.length; i++) {
    if (template.dataset.temp === element.childNodes[i].dataset.temp) {
      return false;
    }
  }
  return true;
}
