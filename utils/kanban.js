let outer = document.querySelector('.project-boxes');

export function kanban(){

        // Create the main container
        outer.innerText = "";
        const kanbanBoard = document.createElement('div');
        kanbanBoard.className = 'kanban-board';
    
        // Define column data
        const columnss = [
            { header: 'To Do', tasks: ['Task 1', 'Task 2'] },
            { header: 'In Progress', tasks: ['Task 3'] },
            { header: 'Done', tasks: ['Task 4'] }
        ];
    
        // Create each column
        columnss.forEach(column => {
            // Create the column
            const kanbanColumn = document.createElement('div');
            kanbanColumn.className = 'kanban-column';
    
            // Create the column header
            const kanbanColumnHeader = document.createElement('div');
            kanbanColumnHeader.className = 'kanban-column-header';
            kanbanColumnHeader.textContent = column.header;
    
            // Create the tasks container
            const kanbanTasks = document.createElement('div');
            kanbanTasks.className = 'kanban-tasks';
    
            // Create each task
            column.tasks.forEach((taskText, index) => {
                const kanbanTask = document.createElement('div');
                kanbanTask.className = 'kanban-task';
                kanbanTask.id = `task-${index + 1}`;
                kanbanTask.draggable = true;
                kanbanTask.textContent = taskText;
                kanbanTasks.appendChild(kanbanTask);
            });
    
            // Append header and tasks to the column
            kanbanColumn.appendChild(kanbanColumnHeader);
            kanbanColumn.appendChild(kanbanTasks);
    
            // Append column to the board
            kanbanBoard.appendChild(kanbanColumn);
        });
    
        // Append the board to the body
        outer.appendChild(kanbanBoard);


        const tasks = document.querySelectorAll('.kanban-task');
    const columns = document.querySelectorAll('.kanban-tasks');

    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    function dragEnd(e) {
        e.target.classList.remove('hide');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        e.target.closest('.kanban-tasks').appendChild(draggable);
    }



    
}