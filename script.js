// START CLOCK SCRIPT
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var apires;
fetch('https://100009.pythonanywhere.com/dowellclock/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "timezone": timezone
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {   document.getElementById("dowellTime").innerHTML = "Dowell Time: " + data.dowelltime;
     apires = data.dowelltime;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  apires++;
  var now = new Date();
  var unix = new Date().getTime();
  var dowelltime = unix - 1609459200;
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours();
  var tags = ["unix", "dowell", "dowellup", "h", "m", "s", "mi"],
    corr = [unix, dowelltime, apires, hou.pad(2), min.pad(2), sec.pad(2), milli];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

// END CLOCK SCRIPT