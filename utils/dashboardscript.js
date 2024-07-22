import { displaySingleTasks  } from "./displaySingleTasks.js";
import { piechart } from "./piecart.js";
import { calender } from "./calender.js";
import { kanban } from "./kanban.js";

let datetime = document.querySelector("#datetime");
let outer = document.querySelector('.project-boxes');
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let dtobj = new Date();
let td = dtobj.getDate();
let tm = month[dtobj.getMonth()];
datetime.innerText = `${tm}, ${td}`;



let logoutbtn = document.querySelector("#logoutbtn");
logoutbtn.addEventListener("click",()=>{
  let temp = localStorage.getItem("loggedUser");
  if(!temp){
    alert("no user is logged in, redirecting !!!");
    document.location.href="./login.html";
  }
  else{
    localStorage.removeItem("loggedUser");
    alert("logged out successfully");
    document.location.href="../index.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var modeSwitch = document.querySelector(".mode-switch");
  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    modeSwitch.classList.toggle("active");
  });
  var listView = document.querySelector(".list-view");
  var gridView = document.querySelector(".grid-view");
  var projectsList = document.querySelector(".project-boxes");
  listView.addEventListener("click", function () {
    gridView.classList.remove("active");
    listView.classList.add("active");
    projectsList.classList.remove("jsGridView");
    projectsList.classList.add("jsListView");
  });
  gridView.addEventListener("click", function () {
    gridView.classList.add("active");
    listView.classList.remove("active");
    projectsList.classList.remove("jsListView");
    projectsList.classList.add("jsGridView");
  });

  document
    .querySelector(".messages-close")
    .addEventListener("click", function () {
      document.querySelector(".messages-section").classList.remove("show");
    });



});


//add task pop up



const addTaskButton = document.getElementById('addnewtask');
const popupForm = document.getElementById('popupForm123');
const closeButton = document.getElementById('closeButton123');

addTaskButton.addEventListener('click', function() {
  console.log("inside");
    popupForm.style.display = 'block';
});

closeButton.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == popupForm) {
        popupForm.style.display = 'none';
    }
});


//add new task data to new server


let postsurl = "https://json-server-template-f7rf.onrender.com/tasks"
let j = localStorage.getItem("loggedUser")

    let u = JSON.parse(j);
    let disusername  =  document.querySelector("#disusername");
    disusername.innerText=u.username;
    console.log(u);
    let myform = document.querySelector("#myForm");

    myform.addEventListener('submit',(e)=>{
        e.preventDefault();
        let titlep = e.target[0].value;
        let descriptionp = e.target[1].value;
        let startdate = e.target[2].value;
        let enddate = e.target[3].value;
        let priorityp = e.target[4].value;
        let categoryp = e.target[5].value;
        // let collList = e.target[6];
        // collList.push(u.username);
        let d = new Date();
        let now = d.getDate();
        
        console.log(titlep,descriptionp,startdate,enddate);
        let obj = {
            "id":Math.floor(Math.random() * 10000000),
            "title":titlep,
            "description":descriptionp,
            "start_date":startdate,
            "end_date":enddate,
            "priority":priorityp,
            "category":categoryp,
            // "collaborators":[],
            "creation_date" : now,
            "username" : u.username,
            "kanban" : "todo"
            

        }
        console.log(obj);
        handlelogin(obj);
        totalTasks();
        
    })
    

    async function handlelogin(obj){
        await fetch(postsurl,{
                method: "POST",
                headers:{"Content-type":"application/json" },
                body : JSON.stringify(obj)
            }).then((res)=>{
                console.log(res);
                // alert("successfully added the task");
                // reload the form again
                displayhome();
            }).catch((e)=>{
                alert(e);
            })
    }
   
// }
// else{
//       alert("Log in first");
//       window.location.href = "/utils/login.html";
//    }
// }

displayhome();
async function displayhome(){
  try {
    outer.innerText="";
    let t = await fetch(`https://json-server-template-f7rf.onrender.com/tasks/`);
    let data = await t.json();

    let newd = data.filter((ele)=>{
      return ele.username===u.username ||ele.collaborators.includes(u.username);
    })

    console.log(newd);
    newd.forEach((ele)=>{
        displaySingleTasks(ele);
    });
  } 
  catch (error) {
    console.log(error);
    alert(error);
  }
}

totalTasks();

async function totalTasks(){
    let t = await fetch(`https://json-server-template-f7rf.onrender.com/tasks/`);
    let data = await t.json();
    length = data.length;
    document.querySelector("#alltasks").innerText = `${length}`;

    let now = new Date().getDate;
    let progresslength=0;
    let upcominglength = 0;
    data.forEach((ele)=>{
      if(now<=ele.start_date){
        upcominglength++;
      }
      else if(now<=ele.end_date && now>=ele.start_date){
        progresslength++;
      }

    })
    document.querySelector("#progressid").innerText = `${progresslength}`;
    document.querySelector("#Upcomingid").innerText = `${upcominglength}`;
}



document.querySelector("#home")
.addEventListener("click",()=>{
  displayhome();
});

document.querySelector("#piecharttab")
.addEventListener("click",()=>{
  piechart();
});

document.querySelector("#calendertab")
.addEventListener("click",()=>{
  document.location.href = "/utils/calenderNoUI.html";
});

document.querySelector("#kanban")
.addEventListener("click",()=>{
  window.location.href = "/utils/kanban.html"
});

let notificationbtn = document.querySelector(".notification-btn");
notificationbtn.addEventListener("click",()=>{
  alert("no notification");
});



let time = 30; // initial time in minutes
let timerInterval;

const decreaseTimeButton = document.getElementById('decrease-time');
const increaseTimeButton = document.getElementById('increase-time');
const startTimerButton = document.getElementById('start-timer');
const stopTimerButton = document.getElementById('stop-timer');
const timeDisplay = document.getElementById('time-display');


decreaseTimeButton.addEventListener('click', () => {
    if (time > 1) {
        time -= 1;
        updateTimeDisplay();
    }
});

increaseTimeButton.addEventListener('click', () => {
    time += 1;
    updateTimeDisplay();
});

startTimerButton.addEventListener('click', () => {
    startTimer();
});

stopTimerButton.addEventListener('click', () => {
    stopTimer();
});

function updateTimeDisplay() {
    timeDisplay.textContent = `${time} mins`;
}

function startTimer() {
    const endTime = Date.now() + time * 60 * 1000;
    timerInterval = setInterval(() => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = 'Time is up!';
        } else {
            const minutes = Math.floor(remainingTime / (60 * 1000));
            const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
            timeDisplay.textContent = `${minutes} mins ${seconds < 10 ? '0' : ''}${seconds} secs`;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timeDisplay.textContent = `0 mins : 0 secs`;

}