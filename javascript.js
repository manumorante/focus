console.clear()
const $ = (s) => document.querySelector(s)

const $tasks = document.querySelector('.js-tasks')
let TASKS_ARRAY = []

// Load all tasks
const loadTasks = () => {
  let tasks = localStorage.getItem('tasks')
  if (tasks) {
    tasks = JSON.parse(tasks)
    TASKS_ARRAY = tasks
    tasks.forEach((value, i) => {
      let task = document.createElement('div')
      task.id = i
      task.dataset.id = i
      task.classList.add('task', 'p-2')
      task.innerHTML = value
      $tasks.appendChild(task)
    })
  }
}

loadTasks()

// DOM constructor

// Create and return input (remove)
const createInput = (action, value) => {
  let input = $('#input')
  if (!!input) input.remove()

  input = document.createElement('input')
  input.type = 'text'
  input.id = 'input'
  input.dataset.action = action
  input.classList.add('p-2')
  input.value = value

  return input
}

// Check when key is pressed
document.addEventListener('keydown', (e) => {
  const key = e.key
  const el = e.target
  const action = el.dataset.action || false

  if (key === 'Escape') {
    cancelAddTask()
  }

  if (key === 'Enter') {
    // Check if focus is on input
    if (el.tagName === 'INPUT') {
      if (action === 'write') {
        e.preventDefault()
        addTask(el.value)
        return true
      }

      if (action === 'edit') {
        e.preventDefault()
        editTask(el.dataset.id, el.value)
        return true
      }
    }
  }

  if (key === 'n') {
    if ($('#input')) return

    e.preventDefault()
    writeTask()
  }

  // Command + z
  if (e.key === 'z' && e.metaKey) {
    e.preventDefault()
    let lastDeletedTask = localStorage.getItem('lastDeletedTask')
    console.log('Restore last deleted task: ' + lastDeletedTask)
    if (lastDeletedTask) {
      writeTask(lastDeletedTask)
    }
  }
})

// Edit task
const editTask = (id, value) => {
  if (!value) return

  let task = $('#task-' + id)
  task.innerHTML = value
  saveTasks()
}

// Write task
const writeTask = (text = '') => {
  let input = createInput('', 'write')

  if (!input) {
    // input = document.createElement('input')
    // input.id = 'input'
    // input.type = 'text'
    // input.dataset.action = 'write'
    // input.classList.add('p-2')
    // input.placeholder = 'Add task'
    $tasks.appendChild(input)
  }

  if (text) {
    input.value = text
  }

  input.focus()
}

// Add task
const addTask = (value) => {
  if (!value) return

  let task = document.createElement('div')
  let id = TASKS_ARRAY.length
  task.id = 'task-' + id
  task.dataset.id = id
  task.classList.add('task', 'p-2')
  task.innerHTML = value
  $tasks.appendChild(task)
  cleanWriteTask()
  saveTasks()
}



// Check the mouse click and if it is on the task
document.addEventListener('click', (e) => {
  // Edit task
  const task = e.target
  if (task.classList.contains('task')) {
    let input = $('#input')
    if (!!input) return

    input = document.createElement('input')
    input.type = 'text'
    input.id = 'input'
    input.dataset.action = 'edit'
    input.classList.add('p-2')
    input.value = task.innerHTML
    task.insertAdjacentElement('afterend', input)
    input.focus()
    task.style.display = 'none'
  }
})

const cancelAddTask = () => {
  const value = cleanWriteTask()
  saveLastDeletedTask(value)
}

const cleanWriteTask = () => {
  let input = $('#input')
  let value = ''
  if (input) {
    value = input.value
    input.remove()
  }
  return value
}

// Save all tasks
const saveTasks = () => {
  let tasks = document.querySelectorAll('.task')
  let tasksArray = []
  tasks.forEach((task) => {
    tasksArray.push(task.innerHTML)
  })

  localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

// Save last deleted task
const saveLastDeletedTask = (value) => {
  if (!value) return
  localStorage.setItem('lastDeletedTask', value)
}

const colors = [
  'd9ed92',
  'b5e48c',
  '99d98c',
  '76c893',
  '52b69a',
  '34a0a4',
  '168aad',
  '1a759f',
  '1e6091',
  '184e77',
]
