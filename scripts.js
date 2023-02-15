const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dowelltime = document.getElementById("dowelltime");
const updatingtime = document.getElementById("updatedowelltime");
const updatemillisecond = document.getElementById("updatemillisecond");
const starttime = document.getElementById("start_time");
const sessiontime = document.getElementById("sessiontime");
const hour = document.getElementById("h");
const minute = document.getElementById("m");
const second = document.getElementById("s");
const millisecond = document.getElementById("mi");
const regionaltime = document.getElementById("regionaltime");


let update = 0,
      up = 0;

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://100009.pythonanywhere.com/dowellclock/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
// dowell time
fetchData().then((data) => {
  // set the initial dowelltime and start time values
  dowelltime.innerHTML = data.dowelltime;
  starttime.innerHTML = data.currenttime;
  updatetime();

  // update oneMinutetime after 1 minute
  updatingtime.innerHTML = data.dowelltime;
  setInterval(() => {
    fetchData().then((data) => {
      updatingtime.innerHTML = data.dowelltime;
      update = 0, up = 0;
    });
  }, 60000);

  // regional time
  let datetimeString = data.current_time;
  regionaltime.innerHTML = datetimeString.substr(11, 12);

  setInterval(() => {
    fetchData().then((data) => {
      const datetimeString = data.current_time;
      const timeString = datetimeString.substr(11, 12);
      regionaltime.innerHTML = timeString;
    });
  }, 60000);

  // system time
  setInterval(() => {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var milliseconds = currentTime.getMilliseconds();

    hour.innerHTML = hours;
    minute.innerHTML = minutes;
    second.innerHTML = seconds;
    millisecond.innerHTML = milliseconds;
  }, 1);

  function updatetime() {
    const updateInterval = setInterval(() => {
      update++;
      setInterval(() => {
        var curr = new Date();
        let mill = curr.getMilliseconds();

        up = update + "" + mill;
        updatemillisecond.innerHTML = up;
      }, 1);
    }, 1000);
  }
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
