
// START CLOCK SCRIPT
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let apires, startTime;

fetch('https://100009.pythonanywhere.com/dowellclock/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    timezone
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("dowellTime").innerHTML = "Dowell Time: " + data.dowelltime;
    apires = data.dowelltime;
    startTime = Date.now();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

const updateClock = () => {
  apires++;
  const now = new Date();
  const milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours();
  const tags = ["dowellup", "h", "m", "s", "mi"],
    corr = [apires, hou.pad(2), min.pad(2), sec.pad(2), milli];
  for (let i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
  document.getElementById("sessionTime").innerHTML = (Date.now() - startTime) / 1000;
};

const initClock = () => {
  updateClock();
  setInterval(updateClock, 1);
};
