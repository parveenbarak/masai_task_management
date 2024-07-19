// import { v4 as uuidv4 } from './node_modules/uuid';
// const { v4: uuidv4 } = require('./node_modules/uuid');
let body = document.querySelector("body");
let darkb = document.querySelector("#darkb");

console.log(uuidv4());

// dark mode code
let dmodeflag = false;
darkb.addEventListener("click",()=>{
    if(dmodeflag==false){
        dmodeflag = true;
        body.style.backgroundColor = "grey";
    }
    else{
        dmodeflag = false;
        body.style.backgroundColor = "white";
    }
});



