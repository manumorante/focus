console.clear()
import { getTasks, appendTasks, saveData } from './tasks.js'
import './events.js'

const $ = (s) => document.querySelector(s)

const $tasks = document.querySelector('#tasks')

// Load all tasks
const TASKS = getTasks()
appendTasks(TASKS, $tasks)

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

saveData()
