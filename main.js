import Minicode from "./modules/minicode.js"

const panel = document.getElementById("game-panel")
const button = document.getElementById("startBtn")
let minigame;

button.addEventListener("click", () => {
  button.blur()
  const desktop = document.getElementById("desktop")
  if (minigame) {
    minigame.deleteThis()
  }
  while(panel.firstChild) {
    panel.removeChild(panel.firstChild)
  }
  minigame = new Minicode(panel, desktop.checked)
})
