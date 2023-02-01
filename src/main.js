import MiniCode from "./modules/minicode.js"
//const startBtn = document.getElementById("start-game")
const numSelect = document.getElementById("num-select")
const form = document.getElementById("form")
const panel = document.getElementById("game-panel")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  while (panel.firstChild) {
    panel.removeChild(panel.firstChild)
  }
  for (let i = 0; i < numSelect.value; i ++) {
    const gamePanel = document.createElement("div")
    panel.appendChild(gamePanel)
    const minigame = new MiniCode(gamePanel)
  }
})