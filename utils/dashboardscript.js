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


let postsurl = "http://localhost:3000/tasks"
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

    })
    

    async function handlelogin(obj){
        fetch(postsurl,{
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
    let t = await fetch(`http://localhost:3000/tasks/`);
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
  calender();
});

document.querySelector("#kanban")
.addEventListener("click",()=>{
  window.location.href = "/utils/kanban.html"
});





