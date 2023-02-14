const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


const dowelltime = document.getElementById('dowelltime');
const hour = document.getElementById('h');
const minute = document.getElementById('m');
const second = document.getElementById('s');
const millisecond = document.getElementById('mi');
const updatingtime = document.getElementById('updatingtime');
const starttime = document.getElementById('start_time');
const sessiontime = document.getElementById('sessiontime');
const oneMinutetime = document.getElementById('oneMinutetime');

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
    console.log(data);
    dowelltime.innerHTML = data.dowelltime;
    starttime.innerHTML = data.currenttime;
    let dowell_time = data.dowelltime;
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

        dowell_time = dowell_time + 1/1000;
        var updateTime = dowell_time.toFixed(3).toString().replace(".", "");
        updatingtime.innerHTML = updateTime;

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

  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const dowellTimeAfterOneMin = setInterval(()=>{
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
      console.log(data);
      oneMinutetime.innerHTML = data.dowelltime;
      })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
},60000)
  