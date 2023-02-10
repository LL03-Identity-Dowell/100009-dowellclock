const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function displayTime() {
  var date = new Date();
  var time = date.toTimeString().split(' ')[0];
  var milliseconds = date.getMilliseconds();

  var formattedTime = time + ":" + milliseconds;
  return formattedTime;
}

// https://100009.pythonanywhere.com/dowellclock/
// http://127.0.0.1:8000/dowellclock/

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
  .then(data => {
    document.getElementById("dowellTime").innerHTML = "Dowell Time: " + data.dowelltime;
    
    document.getElementById("unixtime").innerHTML = "Regional Time: " + data.currenttime;
    
    let intervalId = 1;
    setInterval(() => {
        data.dowelltime = (data.dowelltime) + (new Date().getTime());
        intervalId = data.dowelltime
        document.getElementById("updatetime").innerHTML = "Update DowellTime: " + Math.floor(intervalId);
      }, 1000);
      
    setInterval(() => {
      document.getElementById("Updateregional").innerHTML = "Updated regional Time: " + displayTime()}, 1000);
      
          
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });