const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dowelltime = document.getElementById('dowelltime');
const updatingtime = document.getElementById('updatedowelltime');
const updatemillisecond = document.getElementById('updatemillisecond');
const starttime = document.getElementById('start_time');
const sessiontime = document.getElementById('sessiontime');
const oneMinutetime = document.getElementById('oneMinutetime');
const hour = document.getElementById('h');
const minute = document.getElementById('m');
const second = document.getElementById('s');
const millisecond = document.getElementById('mi');

const fetchData = async () => {
    try {
      const response = await fetch('https://100009.pythonanywhere.com/dowellclock/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
// dowell time
fetchData().then((data) => {
    // set the initial dowelltime and start time values
    dowelltime.innerHTML = data.dowelltime;
    starttime.innerHTML = data.currenttime;

    // update oneMinutetime after 1 minute
    oneMinutetime.innerHTML= data.dowelltime;
    setInterval(() => {
        fetchData().then((data) => {
            oneMinutetime.innerHTML = data.dowelltime;
        });
    }, 60000);

    // update the updating time values
    updatingtime.innerHTML = data.dowelltime;
    setInterval(() => {
        fetchData().then((data) => {
            updatingtime.innerHTML = data.dowelltime;
        });
    }, 60000);

    // correct this nitesh
    let updatemilliseconds = 0;
    const updateInterval = setInterval(() => {
        updatemilliseconds += 1;
        if (updatemilliseconds >= 60000) {
            updatemilliseconds = 0; // reset the counter to 0 after 1 minute
        }
        updatemillisecond.innerHTML = updatemilliseconds;
    }, 1); 
    
    // regional time
    setInterval(()=> {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var milliseconds = currentTime.getMilliseconds();

        hour.innerHTML = hours;
        minute.innerHTML = minutes;
        second.innerHTML = seconds;
        millisecond.innerHTML = milliseconds;
    },1);
});