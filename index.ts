interface TaskElements {
    container: HTMLDivElement;
    task: HTMLParagraphElement;
    editButton: HTMLButtonElement;
    deleteCheckbox: HTMLInputElement;
}

const currentContent = document.getElementById('myinput') as HTMLInputElement;
const curr = document.querySelector('div');

function add(currentContent: HTMLInputElement): void {
    if (!currentContent.value) {
        alert('You cannot add an empty task');
    } else {
        const newTaskElements: TaskElements = createTaskElements(currentContent.value);
        attachTaskHandlers(newTaskElements);
        curr?.appendChild(newTaskElements.container);
        currentContent.value = '';
    }
}

function createTaskElements(taskValue: string): TaskElements {
    const container = document.createElement('div') as HTMLDivElement;
    const task = document.createElement('p') as HTMLParagraphElement;
    const node = document.createTextNode(taskValue);
    task.appendChild(node);

    const editButton = document.createElement('button') as HTMLButtonElement;
    editButton.id = 'Edit';
    editButton.textContent = 'Edit';

    const deleteCheckbox = document.createElement('input') as HTMLInputElement;
    deleteCheckbox.id = 'Delete';
    deleteCheckbox.type = 'checkbox';

    container.appendChild(deleteCheckbox);
    container.appendChild(task);
    container.appendChild(editButton);

    return { container, task, editButton, deleteCheckbox };
}

function attachTaskHandlers(taskElements: TaskElements): void {
    taskElements.editButton.onclick = () => edit(taskElements.task);
    taskElements.deleteCheckbox.onclick = () => del(taskElements.container);
}

function edit(task: HTMLParagraphElement): void {
    const editedVal = prompt('Enter the task name');
    if (!editedVal) {
        edit(task);
    } else {
        task.textContent = editedVal;
    }
}

function del(taskContainer: HTMLDivElement): void {
    taskContainer.remove();
}

const addButton = document.getElementById('Add') as HTMLButtonElement;
addButton.onclick = () => add(currentContent);
