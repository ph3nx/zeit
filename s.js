document.forms[0].onsubmit = function(){
  var anfang = this.anfang.value || '7:00',
      ende = this.ende.value || '15:50',
      pflicht = this.pflicht.value || '7:42',
      pause = this.pause.value || '45';
  if (anfang && ende && pflicht && pause){
    anfang = toMin(anfang);
    ende = toMin(ende);
    pflicht = toMin(pflicht);
    pause = parseInt(pause);
    if (anfang && ende && pflicht && pause){
      var gleitzeit = ende - anfang - pause - pflicht,
          msg = 'Sie haben ';
      if (gleitzeit < 0){
        msg += display(gleitzeit * (-1)) + ' abgebaut.';
      } else if (gleitzeit === 0){
        msg += 'die perfekte Zeit getroffen.';
      } else {
        msg += display(gleitzeit) + ' aufgebaut.';
      }
      var pMsg = document.getElementById('msg');
      pMsg.innerHTML = msg;
      pMsg.style.display = 'block';
    } else {
      alert('Ein oder mehrere Felder nicht gültig.');
    }
  } else {
    alert('Bitte alle Felder füllen.');
  }
  return false;
};

function toMin(s){
  var timeArr = s.match(/(\d+):(\d+)/);
  var h = parseInt(timeArr[1]),
      m = parseInt(timeArr[2]);
  return h * 60 + m;
}

function display(minutes){
  if (minutes > 60){
    var hours = Math.floor(minutes / 60);
    return hours + ':' + (minutes - hours * 60);
  } else {
    return minutes == 1 ? ' eine Minute' : minutes + ' Minuten';
  }
}
