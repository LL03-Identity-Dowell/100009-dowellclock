const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dowelltime = document.getElementById('dowelltime');
const updatingtime = document.getElementById('updatedowelltime');
const updatemillisecond = document.getElementById('updatemillisecond');
const starttime = document.getElementById('start_time');
const sessiontime = document.getElementById('sessiontime');
const oneMinutetime = document.getElementById('oneMinutetime');
const regionalhour = document.getElementById('regional-h');
const regionalminute = document.getElementById('regional-m');
const regionalsecond = document.getElementById('regional-s');
const regionalmillisecond = document.getElementById('regional-mi');
const systemhour = document.getElementById('system-h');
const systemminute = document.getElementById('system-m');
const systemsecond = document.getElementById('system-s');
const systemmillisecond = document.getElementById('system-mi');

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
      updatemilliseconds = 0; // reset the value to zero
    }, 60000);

    setInterval(() => {
      updatemilliseconds += 1;
      updatemillisecond.innerHTML = updatemilliseconds;
    }, 1); 
      
    // regional time
    setInterval(()=> {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var milliseconds = currentTime.getMilliseconds();

        regionalhour.innerHTML = hours;
        regionalminute.innerHTML = minutes;
        regionalsecond.innerHTML = seconds;
        regionalmillisecond.innerHTML = milliseconds;
    },1);

    // system time
    setInterval(()=> {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
      var milliseconds = currentTime.getMilliseconds();

      systemhour.innerHTML = hours;
      systemminute.innerHTML = minutes;
      systemsecond.innerHTML = seconds;
      systemmillisecond.innerHTML = milliseconds;
  },1);

  // session time 
  setInterval(()=> {
    var currentTime = new Date();
    let specifiedTime = new Date(data.current_time);
    let timeDifference = currentTime - specifiedTime;

    let timehours = Math.floor(timeDifference / 3600000);
    let timeminutes = Math.floor((timeDifference % 3600000) / 60000);
    let timeseconds = Math.floor((timeDifference % 60000) / 1000);
    let timemilliseconds = timeDifference % 1000;

    let formattedTime =
        ('0' + timehours).slice(-2) +
        ":" +
        ('0' + timeminutes).slice(-2) +
        ":" +
        ('0' + timeseconds).slice(-2) +
        ":" +
        ('00' + timemilliseconds).slice(-3);
    sessiontime.innerHTML = formattedTime;

  },1);

});