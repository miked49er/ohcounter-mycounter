// Figure out which radio input is checked
function whichIsChecked(radioGroup) {
  for (var i=0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return radioGroup[i];
    }
  }
}

// Figure out which checkbox inputs are checked
function whichAreChecked(checkboxGroup) {
  var group = [];
  for (var i = 0; i < checkboxGroup.length; i++) {
    if (checkboxGroup[i].checked) {
      group[group.length] = checkboxGroup[i];
    }
  }
  return group;
}

// Select all of the checkboxes
function selectAll(checkboxGroup) {
  for (var i = 0; i < checkboxGroup.length; i++) {
    checkboxGroup[i].checked = true;
  }
}

// Clear the screen
function clearScreen() {
  document.getElementById('content').innerHTML = '';
}
