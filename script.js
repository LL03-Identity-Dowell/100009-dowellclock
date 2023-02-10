const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    let intervalId = 1;
    setInterval(() => {
        data.dowelltime = data.dowelltime + 1 / 1000;
        intervalId = data.dowelltime
        document.getElementById("updatetime").innerHTML = "Update Time: " + intervalId;
      }, 1000);
    
    document.getElementById("unixtime").innerHTML = "Regional Time: " + data.currenttime;
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });