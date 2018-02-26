var alertTimer;

window.alert = function(title, msg, type, timeout) {
  var alert = document.getElementsByClassName('alert')[0];
  alert.getElementsByClassName('title')[0].innerHTML = (title !== undefined || title !== null) ? title : '';
  alert.getElementsByClassName('message')[0].innerHTML = msg;
  alert.classList.toggle('hide', false);
  var activeAlert = document.getElementById('alert-active');
  activeAlert.classList.toggle('hide', false);

  switch (type) {
    case 'anounce':
      alert.classList.toggle('alert-anounce', true);
      alert.classList.toggle('alert-error', false);
      break;
    case 'error':
      alert.classList.toggle('alert-anounce', false);
      alert.classList.toggle('alert-error', true);
      break;
    default:
      alert.classList.toggle('alert-anounce', false);
      alert.classList.toggle('alert-error', false);
  }

  alertTimer = window.setTimeout(function() {
    alert.classList.toggle('hide', true);
    activeAlert.classList.toggle('hide', true);
  }, (timeout !== undefined) ? timeout : 5000);
};

function closeAlert() {
  window.clearTimeout(alertTimer);
  var alert = document.getElementsByClassName('alert')[0];
  alert.classList.toggle('hide', true);
  var activeAlert = document.getElementById('alert-active');
  activeAlert.classList.toggle('hide', true);
}
