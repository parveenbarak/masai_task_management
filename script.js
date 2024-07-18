let body = document.querySelector("body");
let darkb = document.querySelector("#darkb");


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



