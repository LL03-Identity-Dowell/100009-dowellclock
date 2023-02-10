const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const n = 1;
// https://100009.pythonanywhere.com/dowellclock/
// http://127.0.0.1:8000/dowellclock/
const intervalId = setInterval(() => {
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
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}, n * 1000);
