export function addTask(taskText, taskList, saveTasks) {
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

export function addCompletedTask(taskItem, completedTaskList, saveTasks) {
    taskItem.querySelector('input[type="checkbox"]').remove();
    taskItem.querySelector('.delete-task-button').remove();
    taskItem.classList.add('completed');
    completedTaskList.appendChild(taskItem);

    saveTasks();
}

export function saveTasks(taskList, completedTaskList) {
    const tasks = [];
    taskList.querySelectorAll('.task').forEach(task => {
        tasks.push({ text: task.querySelector('span').textContent, completed: false });
    });
    completedTaskList.querySelectorAll('.task').forEach(task => {
        tasks.push({ text: task.querySelector('span').textContent, completed: true });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks(taskList, completedTaskList) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        const taskContent = document.createElement('span');
        taskContent.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
            taskItem.appendChild(taskContent);
            completedTaskList.appendChild(taskItem);
        } else {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

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

export function clearTasks(taskList, completedTaskList) {
    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    localStorage.removeItem('tasks');
}
