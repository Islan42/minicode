import { animate, canvasAux, inputGame, gameControl, lvlControl, bugsTimeControl, timeControl, } from "./utils.js"

export default class MiniCode {
  root;
  
  gameOn;

  coding;
  lvl; 
  score; 
  boost;
  penalties;
  keytopress
  
  clicks; 
  pointsMulti; 
  boostMulti; 
  preventPenalties;

  decreaseInterval;
  boostTimeouts;
  
  keyHandlerBind;
  clickHandlerBind
  callGameStartBind
  
  fatiguepower;
  codepower;

  bugsLvl;
  bugsTimeout;
  bugsTimeoutParam;
  bugsON;
  bugsSaveNormal;
  bugsCount;

  canvas;
  ctx;

  controlFR;
  controlBugsTimerFR;
  spriteKey;
  spriteLorem;
  spritePen;
  spriteRestart;
  assets;
  negativeAnim;
  
  pivot;
  desktop;
  
  cacheRootWidth
  
  idRAF

  constructor(root, desktop) {
    this.root = root;
    this.desktop = desktop;
    
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }
    
    if (!this.desktop) {
      this.pivot = document.createElement("div")
      this.root.appendChild(this.pivot);
      
      this.pivot.id = "pivot"
    }
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      this.root.appendChild(this.canvas);
      
      this.ctx = this.canvas.getContext("2d");
      canvasAux.setCanvasArea.call(this)
    }
    
    const aux = this.random(1,2)
    const lorem = new Image();
    lorem.src = "assets/lorem.png"
    const desk = new Image();
    desk.src = `assets/desk${aux}.png`
    const key = new Image();
    key.src = "assets/key.png"
    const spacebar = new Image();
    spacebar.src = "assets/spacebar.png"
    const penalties = new Image();
    penalties.src = "assets/penalties.png"
    const bugs = new Image()
    bugs.src = "assets/bugs.png"
    this.assets = { lorem, desk, key, spacebar, penalties, bugs };
    
    this.gameStart()
    this.main()
  }
  
  main(){
    timeControl.nextFrame.call(this)
    timeControl.updateBugsTimer.call(this)  //
    gameControl.checkBoost.call(this)
    this.animation()
    this.idRAF = requestAnimationFrame(this.main.bind(this))

    
  }
  
  gameStart() {
    this.gameOn = true;
    this.coding = 50;
    this.lvl = { lvl: 0, prevLvl: 0, nextLvl: 100, maxLvl: 0 };
    this.score = 0;
    this.boost = 0;
    this.penalties = 0;
    this.codepower = 25;
    this.fatiguepower = 5;
    this.clicks = 0;
    this.pointsMulti = 1;
    this.boostMulti = 1;
    this.bugsLvl = { lvl: 0, prevLvl: 0, nextLvl: 1000, bugs: 30, timer: 30 };
    this.bugsTimeoutParam = { min: 10, max: 16 }
    this.bugsON = { start: false, end: false };
    this.bugsSaveNormal = { prevLvl: 0, nextLvl: 100 };
    this.bugsCount = [];
    this.preventPenalties = false;
    this.boostTimeouts = []
    this.clickHandlerBind = inputGame.clickHandler.bind(this);
    this.keyHandlerBind = inputGame.keyHandler.bind(this);
    this.callGameStartBind = this.callGameStart.bind(this);
    this.controlFR = 0;
    this.controlBugsTimerFR = 0;
    this.spriteKey = 0;
    this.spriteLorem = 0;
    this.spritePen = 0;
    this.spriteRestart = 0;
    this.negativeAnim = false;
    
    if (this.desktop) {
      inputGame.setKeyInputListener.call(this, " ");
    } else {
      canvasAux.setPivot.call(this, "initial")
      inputGame.setClickInputListener.call(this)
    }
    
    gameControl.setDecreaseInterval.call(this, 500);
    bugsTimeControl.setBugsTimeout.call(this, this.bugsTimeoutParam.min, this.bugsTimeoutParam.max);
  }
  gameOver() {
    if (this.desktop) {
      document.removeEventListener("keydown", this.keyHandlerBind);
    } else {
      this.root.removeEventListener("click", this.clickHandlerBind)
    }
    clearInterval(this.decreaseInterval);
    clearTimeout(this.bugsTimeout);
    for (let timeout of this.boostTimeouts){
      clearTimeout(timeout)
    }
    this.gameOn = false;

    this.canvas.addEventListener("click", this.callGameStartBind)
    document.addEventListener("keydown", this.callGameStartBind)
  }
  
  callGameStart(event){
    event.stopPropagation()
    if (event.type === "click") {
      this.canvas.removeEventListener("click", this.callGameStartBind)
      document.removeEventListener("keydown", this.callGameStartBind)
      this.gameStart()
    } else if (event.type === "keydown") {
      if (event.key === " ") {
        this.canvas.removeEventListener("click", this.callGameStartBind)
        document.removeEventListener("keydown", this.callGameStartBind)
        event.preventDefault();
        this.gameStart()
      }
    }
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  animation() {
    canvasAux.setCanvasArea.call(this)
    
    if(this.gameOn) {
      animate.drawDesk.call(this);
      animate.drawLorem.call(this); 
      animate.drawBars.call(this);
      if (this.desktop) {
        animate.drawToPress.call(this);
      }
      animate.drawPenalties.call(this);
      if (this.bugsON.end) {
        animate.drawBugs.call(this)
        animate.drawBugsTimer.call(this)
      }
    } else {
      animate.drawGameOver.call(this)
    }
  }
  
  deleteThis(){
    this.gameOver()
    this.canvas.removeEventListener("click", this.callGameStartBind)
    document.removeEventListener("keydown", this.callGameStartBind)
    cancelAnimationFrame(this.idRAF)
  }
  
  debug(){
    // Implement Later
  }
}
