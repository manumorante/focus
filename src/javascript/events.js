import { editTask, addPriority } from './tasks.js'
window.focus = false

const keyActions = {
  // Undo
  z: (e) => {
    if (e.metaKey) {
      console.log('Undo')
    }
  },
  n: (e) => {
    console.log('n', e)
  },
  Escape: (e) => {
    console.log('Escape', e)
  },
  Enter: (e) => {
    console.log('Enter', e)
    // Check if focus is on input
    // if (el.tagName === 'INPUT') {
    //   if (action === 'write') {
    //     e.preventDefault()
    //     addTask(el.value)
    //     return true
    //   }
    //   if (action === 'edit') {
    //     e.preventDefault()
    //     editTask(el.dataset.id, el.value)
    //     return true
    //   }
    // }
  },
}

const clickActions = {
  '.task': (e) => {
    addPriority(e.target.dataset.id)
  },
}

const dblclickActions = {
  '.task': (e) => {
    editTask(e.target.dataset.id)
  },
}

// Event: Double click
document.addEventListener('dblclick', (e) => {
  if (window.focus) return

  window.lastEvent = 'dblclick'

  Object.keys(dblclickActions).forEach((key) => {
    e.target.matches(key) && dblclickActions[key](e)
  })
})

// Event: click
let timerclick
document.addEventListener('click', (e) => {
  clearTimeout(timerclick)
  if (window.focus) return

  timerclick = setTimeout(() => {
    if (window.lastEvent === 'dblclick') {
      window.lastEvent = ''
      return
    }

    Object.keys(clickActions).forEach((key) => {
      clearTimeout(timerclick)
      e.target.matches(key) && clickActions[key](e)
    })
  }, 150)
})

// Event: keydown
document.addEventListener('keydown', (e) => {
  keyActions[e.key] && keyActions[e.key](e)
})
