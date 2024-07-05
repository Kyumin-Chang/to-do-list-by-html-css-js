import { addTask, addCompletedTask, saveTasks, loadTasks, clearTasks } from './taskFunctions.js';

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

    loadTasks(taskList, completedTaskList);

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText, taskList, () => saveTasks(taskList, completedTaskList));
            newTaskInput.value = '';
            message.textContent = '';
        } else {
            message.textContent = '할 일을 작성해주세요';
        }
    });

    taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task');
        if (!taskItem) return;

        if (e.target.type === 'checkbox') {
            taskList.removeChild(taskItem);
            addCompletedTask(taskItem, completedTaskList, () => saveTasks(taskList, completedTaskList));
        } else if (e.target.classList.contains('delete-task-button')) {
            taskList.removeChild(taskItem);
            saveTasks(taskList, completedTaskList);
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
            clearTasks(taskList, completedTaskList);
        }
    });
});
