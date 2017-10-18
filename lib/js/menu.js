// Toggle show on element
function toggleShow(element) {
  document.getElementById(element).classList.toggle('show');
}

// Toggle hide on cover
function toggleCover(element) {
    document.getElementById(element).classList.toggle('hide');
}

// Open fab menu
function toggleFabMenu() {
  var fab = document.getElementById('fab');
  rotateIcon(fab);
  toggleShow('fab-menu-items');
  toggleCover('fab-menu-items-active');
}

// Open the hamburger menu
function toggleHamMenu() {
  toggleShow('menu');
  toggleCover('menu-active');
}
