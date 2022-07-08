const templateInput = document.querySelector('#template-input')

export const createInput = (action, value) => {
  removeSelector('#input')

  const input = templateInput.cloneNode(true)
  input.dataset.action = action
  input.value = value

  return input
}

const removeEL = (el) => {
  el && el.remove()
}

const removeSelector = (selector) => {
  removeEL(document.querySelector(selector))
}
