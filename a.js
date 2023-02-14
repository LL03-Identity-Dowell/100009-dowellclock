const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


const dowelltime = document.getElementById('dowelltime');
const hour = document.getElementById('h');
const minute = document.getElementById('m');
const second = document.getElementById('s');
const millisecond = document.getElementById('mi');
const updatingtime = document.getElementById('updatingtime');
const starttime = document.getElementById('start_time');
const sessiontime = document.getElementById('sessiontime');

// fetch data from api

const fetchData = async () => {
  try {
    const response = await fetch('https://100009.pythonanywhere.com/dowellclock/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        timezone: timezone
      })
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    console.log(data);
    // dowell time 
    dowelltime.innerHTML = data.dowelltime;
    
    // start time
    starttime.innerHTML = data.currenttime;
    
    // increment 
    let newDowelltime = data.dowelltime;
    var currentTime = new Date();
    var milliseconds = currentTime.getMilliseconds();
    let newMilliseconds = ()=> setInterval(() => {
    if (milliseconds % 60000 === 0) {
    newDowelltime = newDowelltime + 60
}
        if (milliseconds > 999) {
            milliseconds = milliseconds % 999
        }
        else{
            milliseconds = milliseconds + 1
        }
        DowellUpdateTime = `${newDowelltime} + ${milliseconds}` ; 
        updatingtime.innerHTML = DowellUpdateTime;
        // console.log(milliseconds);
    }, 1)

    newMilliseconds();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

fetchData();
