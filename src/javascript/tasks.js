// Load tasks from localStorage and render them as array
export function getTasks() {
  let data = localStorage.getItem('tasks')
  if (data && data.length) {
    return JSON.parse(data)
  }
}

// Append task to DOM
export function appendTasks(tasks, container) {
  if (!tasks || !container) return

  tasks.forEach((item) => {
    const task = tagTask(item.value, item.id, item.priority)
    container.appendChild(task)
  })
}

export function tagTask(value, id, priority = 1) {
  let task = document.createElement('input')
  task.dataset.id = id
  task.dataset.priority = priority
  task.style.setProperty('--grow', priority)
  task.classList.add('task')
  task.value = value
  task.setAttribute('readonly', 'readonly')

  return task
}

const selectTask = (id) => {
  return document.querySelector(`[data-id="${id}"]`)
}

export const editTask = (id) => {
  console.log('editTask', id)
  window.focus = true
  const task = selectTask(id)
  task.removeAttribute('readonly')
  task.classList.add('editing')
}

export const addPriority = (id) => {
  let task = selectTask(id)
  let priority = parseInt(task.dataset.priority || 1) + 1
  task.dataset.priority = priority
  task.style.setProperty('--grow', priority)
  saveData()
}

const exampleData = [
  { id: 0, value: 'Task 1', priority: 1 },
  { id: 1, value: 'Task 2', priority: 3 },
  { id: 2, value: 'Task 3', priority: 1 },
  { id: 3, value: 'Task 4', priority: 2 },
  { id: 4, value: 'Task 5', priority: 1 },
]

const readDataFromDOM = () => {
  let tasks = document.querySelectorAll('.task')
  if (!tasks || !tasks.length) return exampleData

  let data = []
  tasks.forEach((task) => {
    const taskObj = {
      id: task.dataset.id,
      value: task.value,
      priority: task.dataset.priority,
    }
    data.push(taskObj)
  })

  return data
}

export const saveData = () => {
  let data = readDataFromDOM()
  localStorage.setItem('tasks', JSON.stringify(data))
}

// Save last deleted task
const saveLastDeletedTask = (value) => {
  if (!value) return
  localStorage.setItem('lastDeletedTask', value)
}
