const items = document.querySelectorAll(".item")
items.forEach((item) => {
  item.addEventListener("click", (item) => {
    add(item.target)
  })
})

const add = (el) => {
  let style = window.getComputedStyle(el)
  let grow = parseInt("0" + style.getPropertyValue("--grow")) + 1

  const i = el.querySelector("i")
  i.innerHTML = grow
  el.style.setProperty("--grow", grow)
}
