var currentContent = document.getElementById('myinput');
var curr = document.querySelector('div');
function add(currentContent) {
    if (!currentContent.value) {
        alert('You cannot add an empty task');
    }
    else {
        var newTaskElements = createTaskElements(currentContent.value);
        attachTaskHandlers(newTaskElements);
        curr === null || curr === void 0 ? void 0 : curr.appendChild(newTaskElements.container);
        currentContent.value = '';
    }
}
function createTaskElements(taskValue) {
    var container = document.createElement('div');
    var task = document.createElement('p');
    var node = document.createTextNode(taskValue);
    task.appendChild(node);
    var editButton = document.createElement('button');
    editButton.id = 'Edit';
    editButton.textContent = 'Edit';
    var deleteCheckbox = document.createElement('input');
    deleteCheckbox.id = 'Delete';
    deleteCheckbox.type = 'checkbox';
    container.appendChild(deleteCheckbox);
    container.appendChild(task);
    container.appendChild(editButton);
    return { container: container, task: task, editButton: editButton, deleteCheckbox: deleteCheckbox };
}
function attachTaskHandlers(taskElements) {
    taskElements.editButton.onclick = function () { return edit(taskElements.task); };
    taskElements.deleteCheckbox.onclick = function () { return del(taskElements.container); };
}
function edit(task) {
    var editedVal = prompt('Enter the task name');
    if (!editedVal) {
        edit(task);
    }
    else {
        task.textContent = editedVal;
    }
}
function del(taskContainer) {
    taskContainer.remove();
}
var addButton = document.getElementById('Add');
addButton.onclick = function () { return add(currentContent); };
