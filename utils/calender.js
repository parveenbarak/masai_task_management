let outer = document.querySelector('.project-boxes');

export function calender(){
    outer.innerText="";

    let  calendar =  document.createElement("div");
    calendar.className = "calender";

    let calendarheader = document.createElement("div");
    calendarheader.className = "calendar-header";

    let prevMonthtt = document.createElement("button");
    prevMonthtt.id = "prevMonth";
    prevMonthtt.innerText = "‹";

    let monthYeartt = document.createElement("h2");
    monthYeartt.id = "monthYear";
    
    let nextMonthtt = document.createElement("button");
    nextMonthtt.id = "nextMonth";
    nextMonthtt.innerText = "›";

    calendarheader.append(prevMonth,monthYeartt,nextMonthtt);

    let calendarbody = document.createElement("div");
    calendarbody.className = "calendar-body";

    let calendarweekdays = document.createElement("div");
    calendarweekdays.className = "calendar-weekdays";

    let sun = document.createElement("div");
    sun.innerText="sun";

    let mon = document.createElement("div");
    mon.innerText="mon";

    let tue = document.createElement("div");
    tue.innerText="tue";

    let wed = document.createElement("div");
    wed.innerText="wed";

    let thu = document.createElement("div");
    thu.innerText="thu";

    let fri = document.createElement("div");
    fri.innerText="fri";

    let sat = document.createElement("div");
    sat.innerText="sat";

    let calendarDaystt =document.createElement("div");
    calendarDaystt.id = "calendarDays";
    calendarDaystt.className = "calendar-days";

    calendarweekdays.append(sun,mon,tue,wed,thu,fri,sat);
    calendarbody.append(calendarweekdays,calendarDaystt);
    calendar.append(calendarheader,calendarbody);

    let taskPopuptt = document.createElement("div");
    taskPopuptt.className = "popupc";
    taskPopuptt.id = "taskPopup";

    let popupcontentc = document.createElement("div");
    popupcontentc.className = "popup-contentc";
    const popup = document.createElement('div');
    popup.id = 'popup';

    // Create close button
    const closePopuptt = document.createElement('span');
    closePopuptt.className = 'close';
    closePopuptt.id = 'closePopup';
    closePopuptt.innerText = '&times;';

    // Create date header
    const popupDatett = document.createElement('h3');
    popupDatett.id = 'popupDate';

    // Create task list
    const taskListtt = document.createElement('ul');
    taskListtt.id = 'taskList';

    // Create task input
    const taskInputtt = document.createElement('input');
    taskInputtt.type = 'text';
    taskInputtt.id = 'taskInput';
    taskInputtt.placeholder = 'Add a new task';

    // Create add task button
    const addTaskButtontt = document.createElement('button');
    addTaskButtontt.id = 'addTaskButton';
    addTaskButtontt.textContent = 'Add Task';

    // Append elements to popup
    popupcontentc.appendChild(closePopuptt);
    popupcontentc.appendChild(popupDatett);
    popupcontentc.appendChild(taskListtt);
    popupcontentc.appendChild(taskInputtt);
    popupcontentc.appendChild(addTaskButtontt);

    taskPopuptt.append(popupcontentc);
    outer.append(calendar,taskPopuptt);
    document.addEventListener("DOMContentLoaded", function () {
        const calendarDays = document.getElementById('calendarDays');
        const monthYear = document.getElementById('monthYear');
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');
    
        const taskPopup = document.getElementById('taskPopup');
        const closePopup = document.getElementById('closePopup');
        const popupDate = document.getElementById('popupDate');
        const taskList = document.getElementById('taskList');
        const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTaskButton');
    
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let selectedDate = new Date();
    
        let tasks = {};  // To store tasks
    
        function generateCalendar(month, year) {
            calendarDays.innerHTML = '';
            monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
            const firstDay = new Date(year, month).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();
    
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                calendarDays.appendChild(emptyDiv);
            }
    
            for (let date = 1; date <= lastDate; date++) {
                const dateDiv = document.createElement('div');
                dateDiv.textContent = date;
    
                const dateString = new Date(year, month, date).toDateString();
                if (tasks[dateString]) {
                    dateDiv.classList.add('has-tasks');
                }
    
                if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    dateDiv.classList.add('today');
                }
    
                if (date === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                    dateDiv.classList.add('selected');
                }
    
                dateDiv.addEventListener('click', () => {
                    selectedDate = new Date(year, month, date);
                    showTasksPopup(selectedDate);
                    generateCalendar(currentMonth, currentYear);
                });
    
                calendarDays.appendChild(dateDiv);
            }
        }
    
        function showTasksPopup(date) {
            popupDate.textContent = date.toDateString();
            taskList.innerHTML = '';
            const dateString = date.toDateString();
            if (tasks[dateString]) {
                tasks[dateString].forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = task;
                    taskList.appendChild(taskItem);
                });
            }
            taskPopup.style.display = 'flex';
        }
    
        addTaskButton.addEventListener('click', () => {
            const dateString = selectedDate.toDateString();
            const task = taskInput.value.trim();
            if (task) {
                if (!tasks[dateString]) {
                    tasks[dateString] = [];
                }
                tasks[dateString].push(task);
                taskInput.value = '';
                showTasksPopup(selectedDate);
                generateCalendar(currentMonth, currentYear);
            }
        });
    
        closePopup.addEventListener('click', () => {
            taskPopup.style.display = 'none';
        });
    
        window.addEventListener('click', (event) => {
            if (event.target === taskPopup) {
                taskPopup.style.display = 'none';
            }
        });
    
        prevMonth.addEventListener('click', () => {
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
            generateCalendar(currentMonth, currentYear);
        });
    
        nextMonth.addEventListener('click', () => {
            currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
            currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
            generateCalendar(currentMonth, currentYear);
        });
    
        generateCalendar(currentMonth, currentYear);
    });

}