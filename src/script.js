document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const dateDisplay = document.getElementById('date-display');
    const message = document.getElementById('message');
    const toggleCompletedTasksButton = document.getElementById('toggle-completed-tasks');
    const completedTaskList = document.getElementById('completed-task-list');
    const clearTasksButton = document.getElementById('clear-tasks-button');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const todayString = today.toLocaleDateString('ko-KR', options);
    dateDisplay.textContent = todayString;

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = '';
            message.textContent = '';
        } else {
            message.textContent = '할 일을 작성해주세요';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const taskItem = e.target.parentElement;
            taskList.removeChild(taskItem);
            addCompletedTask(taskItem);
        } else if (e.target.classList.contains('delete-task-button')) {
            const taskItem = e.target.parentElement;
            taskList.removeChild(taskItem);
            saveTasks();
        }
    });

    toggleCompletedTasksButton.addEventListener('click', () => {
        if (completedTaskList.classList.contains('hidden')) {
            completedTaskList.classList.remove('hidden');
            toggleCompletedTasksButton.textContent = '완료한 할 일 숨기기';
        } else {
            completedTaskList.classList.add('hidden');
            toggleCompletedTasksButton.textContent = '완료한 할 일 보기';
        }
    });

    clearTasksButton.addEventListener('click', () => {
        const confirmClear = confirm('기록되었던 모든 내역이 삭제됩니다. 삭제하시겠습니까?');
        if (confirmClear) {
            clearTasks();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'delete-task-button';

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

        saveTasks();
    }

    function addCompletedTask(taskItem) {
        taskItem.querySelector('input[type="checkbox"]').remove();
        taskItem.querySelector('.delete-task-button').remove();
        taskItem.classList.add('completed');
        completedTaskList.appendChild(taskItem);

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task').forEach(task => {
            tasks.push({ text: task.textContent, completed: false });
        });
        completedTaskList.querySelectorAll('.task').forEach(task => {
            tasks.push({ text: task.textContent, completed: true });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            if (task.completed) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task';
                const taskContent = document.createElement('span');
                taskContent.textContent = task.text;
                taskItem.appendChild(taskContent);
                completedTaskList.appendChild(taskItem);
            } else {
                const taskItem = document.createElement('li');
                taskItem.className = 'task';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                const taskContent = document.createElement('span');
                taskContent.textContent = task.text;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.className = 'delete-task-button';

                taskItem.appendChild(checkbox);
                taskItem.appendChild(taskContent);
                taskItem.appendChild(deleteButton);

                taskList.appendChild(taskItem);
            }
        });
    }

    function clearTasks() {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        localStorage.removeItem('tasks');
    }
});
