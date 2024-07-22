
let outer = document.querySelector('.project-boxes');
export function displaySingleTasks(e){
  
  

    let projectboxwrapper = document.createElement("div");
    projectboxwrapper.className = "project-box-wrapper";
    //projectbox wrpper
    let projectbox = document.createElement("div");
    projectbox.className = "project-box";
    projectbox.style.backgroundColor = colorsCat[`${e.category}`];
    //projectbox
  
    let projectboxheader = document.createElement("div");
    projectboxheader.className = "project-box-header";
    //projectboxheader
  
  
  
    let projectStartDateSpan = document.createElement("span");
    projectStartDateSpan.className = "projectStartDateSpan";
    projectStartDateSpan.innerText = `${e.start_date}`
  
    
  
    projectboxheader.append(projectStartDateSpan);
    
    let projectboxcontentheader = document.createElement("div");
    projectboxcontentheader.className = "project-box-content-header";
    //projectboxcontentheder
  
    let boxcontentheader = document.createElement("p");
    boxcontentheader.className = "box-content-header";
    boxcontentheader.innerText=`${e.title}`;
  
    let boxcontentsubheader = document.createElement("p");
    boxcontentsubheader.className = "box-content-subheader";
    boxcontentsubheader.innerText = `${e.category}`;
  
    projectboxcontentheader.append(boxcontentheader,boxcontentsubheader);
  
    let boxprogresswrapper = document.createElement("div");
    boxprogresswrapper.className = "box-progress-wrapper";
    //boxprogresswrapper
  
    let boxprogressheader = document.createElement("p");
    boxprogressheader.className = "box-progress-header";
    boxprogressheader.innerText = "Progress";
  
    let per = calculatepercentage(e);
  
    // let per = 60;
    let boxprogressbar = document.createElement("div");
    boxprogressbar.className = "box-progress-bar";
  
    let boxprogress = document.createElement("span");
    boxprogress.className  = "box-progress";
    boxprogress.style.width = `${per}%`;
    boxprogressbar.append(boxprogress);
  
    
    let boxprogresspercentage = document.createElement("p");
    boxprogresspercentage.className = "box-progress-percentage";
    boxprogresspercentage.innerText =`${per}%`;
  
    boxprogresswrapper.append(boxprogressheader,boxprogressbar,boxprogresspercentage);
    projectbox.append(projectboxheader,projectboxcontentheader,boxprogresswrapper);
    projectboxwrapper.append(projectbox);
    outer.append(projectboxwrapper);
  
  }

  function calculatepercentage(e) {
    // Ensure valid Date objects
    const now = new Date();
    const start = new Date(e.start_date);
    const end = new Date(e.end_date);
  
    if(now.getDate()<=start.getDate()){
      return 0;
    }
    if(now.getDate()>=end.getDate()){
      return 100;
    }
  
      let diffInMs = end.getTime() - start.getTime();
      let rem = end.getTime() - now.getTime();
      let t1 = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      let t2 = Math.floor(rem / (1000 * 60 * 60 * 24));
      
      const days = Math.floor((t1-t2)/t1);
      return 100*days;
  
  }

  
  let colorsCat= {
    "work": "#e9e7fd",
    "home":"#ffd3e2",
    "today":"#c8f7dc",
    "shopping":"#d5deff",
    "general":"#DBF6FD"
  }
  