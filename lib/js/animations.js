function revealCircle(e) {
  var circle = e.getElementsByClassName('circle')[0];
  circle.classList.add('opened');

  setTimeout(function() {
    document.getElementsByClassName('opened')[0].classList.remove('opened');
  }, (0.55*1000));
}

function revealShape(e) {
  var shape = e.getElementsByClassName(e.dataset.shape)[0];
  shape.classList.add('opened');

  setTimeout(function() {
    document.getElementsByClassName('opened')[0].classList.remove('opened');
  }, (0.55*1000));
}

function rotateIcon(e) {
  var icon = e.getElementsByTagName('svg')[0];
  if (icon.classList.contains('spinLeft')) {
    icon.classList.toggle('spinLeft', false);
    icon.classList.toggle('spinRight', true);
  }
  else if (icon.classList.contains('spinRight')) {
    icon.classList.toggle('spinLeft', true);
    icon.classList.toggle('spinRight', false);
  }
  else {
    icon.classList.toggle('spinLeft');
  }
}

function shrinkElement(e) {
  e.classList.add('grow');
  setTimeout(function() {
    e.classList.remove('grow');
  }, (0.55*1000));
}
