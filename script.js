// START CLOCK SCRIPT
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var apires;
let start = new Date();
fetch("https://100009.pythonanywhere.com/dowellclock/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    timezone: timezone
  })
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    document.getElementById("dowellTime").innerHTML =
      "Dowell Time: " + data.dowelltime;
    apires = data.dowelltime;
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

Number.prototype.pad = function (n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  apires++;
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours();
  
  //session time
  let time = now - start;
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  let formattedTime =
    hours.pad(2) +
    ":" +
    minutes.pad(2) +
    ":" +
    seconds.pad(2) +
    ":" +
    milliseconds.pad(3);
  //end of session time code

  var tags = ["dowellup", "h", "m", "s", "mi", "sessionTime"],
    corr = [apires, hou.pad(2), min.pad(2), sec.pad(2), milli.pad(3), formattedTime];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

// END CLOCK SCRIPT
