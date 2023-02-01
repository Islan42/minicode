const startBtn = document.getElementById("start-game")
const numSelect = document.getElementById("num-select")
const form = document.getElementById("form")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log(numSelect.value)
})