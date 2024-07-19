let body = document.querySelector("body");
let darkb = document.querySelector("#darkb");
let theme=document.querySelector("#theme")


// dark mode code
let dmodeflag = false;
darkb.addEventListener("click",()=>{
    if(dmodeflag==false){
        dmodeflag = true;
        body.style.backgroundColor = "black";
        theme.style.backgroundColor="black"
       
        
        
    }
    else{
        dmodeflag = false;
        body.style.backgroundColor = "white";
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the element is visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    elements.forEach(element => {
        observer.observe(element);
    });
});



