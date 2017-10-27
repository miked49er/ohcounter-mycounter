// Figure out which radio input is checked
function whichIsChecked(radioGroup) {
  for (var i=0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return radioGroup[i];
    }
  }
}
