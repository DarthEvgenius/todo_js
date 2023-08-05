document.addEventListener('DOMContentLoaded', function () {

  // Variables with DOM elements
  const list = document.getElementById('todo-list')
  const itemCountSpan = document.getElementById('item-count')
  const uncheckedCountSpan = document.getElementById('unchecked-count')
  const newTodo = document.querySelector('.newTodo')

  // List of tasks
  let tasks = []
  // Get list from storage
  let storageTasks = localStorage.getItem('todo_list')

  // Check local storage for the tasks and add them to the array
  if (storageTasks) {
    tasks = JSON.parse(storageTasks);
    tasks.forEach(element => {
      showList(element)
    });
  }

  setCounters();


  // Main event - create new task, press the main button
  newTodo.addEventListener('click', function () {
    // New task object
    let task = {
      point: '',
      done: false,
    }

    // Get input
    let newInput = prompt('Add a new task!');

    // Check input
    if (newInput === null) return;
    // RegEx for excepting whitespaces and empty
    const re = /\S+/
    if (!newInput.match(re)) {
      return
    }

    task.point = newInput;

    // Add new task to tasks array
    tasks.push(task);
    // Save tasks arr to local storage
    localStorage.setItem('todo_list', JSON.stringify(tasks));

    // Add new task to the list and show it
    showList(task);

    setCounters()
  })


  // Shows new task, add todo list
  function showList(item) {
    // Create id for item from it's index in tasks array
    const id = tasks.lastIndexOf(item)

    // Create DOM elements
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${id}`;
    checkbox.classList.add('todo-checkbox');
    if (item.done) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    checkbox.addEventListener('change', (event) => {
      uncheckedCountSpan.innerHTML = checkToggle(event);
    });

    // Add text of the task
    const label = document.createElement('label');
    label.htmlFor = id;
    label.appendChild(document.createTextNode(item.point));

    // Remove button
    const remove = document.createElement('button');
    remove.classList.add('todo-delete');
    remove.dataset.taskId = id;
    remove.innerHTML = 'Delete task';
    remove.addEventListener('click', (event) => {
      removeTask(event);
    })

    // Add elements to the DOM
    li.append(checkbox);
    li.append(label);
    li.append(remove);
    list.append(li);
  }

  // Check/uncheck handler
  function checkToggle(event) {
    id = event.target.id;

    // Invert status of the task when clicked
    tasks[id].done = !tasks[id].done

    // Rewrite local storage
    localStorage.setItem('todo_list', JSON.stringify(tasks))

    // Count unchecked boxes
    return unchecked()
  }

  // Unchecked counter
  function unchecked() {
    let counter = 0;
    // Counts checked boxes
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(elem => { if (elem.checked) counter++ })
    return checkboxes.length - counter
  }

  // Delete the task
  function removeTask(event) {
    item = event.target;
    id = item.dataset.taskId;

    // Remove from DOM
    item.parentElement.remove();

    // Remove  from the tasks array
    tasks.splice(id, 1)

    // Rewrite local storage
    localStorage.setItem('todo_list', JSON.stringify(tasks))

    setCounters();
  }

  // Sets counters for tasks and unchecked
  function setCounters() {
    // Set item counter
    itemCountSpan.innerHTML = tasks.length;
    // Set unchecked counter
    uncheckedCountSpan.innerHTML = unchecked()
  }

})



// // Remove checked element from the storage list
// tasks.splice(item.target.id, 1)
// // Rewrite local storage
// localStorage.setItem('todo_list', JSON.stringify(tasks))