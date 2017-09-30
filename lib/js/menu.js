function toggleSlide(element) {
    document.getElementById(element).classList.toggle('show');

    if (document.getElementById(element + '-active')) {
        document.getElementById(element + '-active').classList.toggle('hide');
    }
}
