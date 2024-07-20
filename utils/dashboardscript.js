let datetime = document.querySelector("#datetime");
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
    .querySelector(".messages-btn")
    .addEventListener("click", function () {
      document.querySelector(".messages-section").classList.add("show");
    });
  document
    .querySelector(".messages-close")
    .addEventListener("click", function () {
      document.querySelector(".messages-section").classList.remove("show");
    });
});

// add new task
let addnewtask = document.querySelector("#addnewtask");
addnewtask.addEventListener("click",()=>{
  document.location.href = "../utils/addTask.html"
});