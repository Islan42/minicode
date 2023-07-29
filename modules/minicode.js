import {animate, canvasAux, inputGame, gameControl, lvlControl, bugsTimeControl, } from "./utils.js"

export default class MiniCode {
  root;
  
  gameOn;

  coding;
  lvl; 
  score; 
  boost;
  penalties;
  
  clicks; 
  pointsMulti; 
  boostMulti; 
  preventPenalties;

  decreaseInterval;
  boostTimeouts;
  
  keyHandlerBind;
  clickHandlerBind
  callGameStartBind

  keytopress;
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
    nextFrame.call(this)
    gameControl.checkBoost.call(this)
    this.animation()
    this.idRAF = requestAnimationFrame(this.main.bind(this))

    function nextFrame(){
      if (this.controlFR === 60) {
        this.controlFR = 0;
      } else {
        this.controlFR++;
      }      
    }
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
    this.bugsLvl = { lvl: 0, prevLvl: 0, nextLvl: 1000 };
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
    
    this.setDecreaseInter(500);
    this.setBugsTimeout(this.bugsTimeoutParam.min, this.bugsTimeoutParam.max);
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
  
  setDecreaseInter(inter) {
    if (this.decreaseInterval) {
      clearInterval(this.decreaseInterval);
    }
    this.decreaseInterval = setInterval(gameControl.negativeCoding.bind(this), inter);
  }
  setBugsTimeout(min, max) {
    const time = this.random(min, max);
    if (this.bugsTimeout) {
      clearTimeout(this.bugsTimeout);
    }
    this.bugsTimeout = setTimeout(
      () => {
        this.bugsON.start = true
      },
      time * 1000
    );
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  lvlDown() {
    if (this.lvl.lvl > 0) {
      this.lvl.lvl--;
      this.setPrevLvl();
    }

    if (!this.preventPenalties) {
      this.penalties++;
      this.preventPenalties = true;
      setTimeout(() => (this.preventPenalties = false), 2600);
      this.spritePen = 0;
    }
  }
  lvlUp() {
    if (!this.preventPenalties) {
      this.preventPenalties = true;
      setTimeout(() => (this.preventPenalties = false), 500);
    }
    if (this.bugsON.start) {
      this.itsBugsTime();
    } else if (this.bugsON.end) {
      this.itsNotBugsTime();
    }

    this.lvl.lvl++;
    if (this.lvl.lvl > this.lvl.maxLvl) {
      this.lvl.maxLvl ++;
    }
    this.setNextLvl();
    if (this.bugsON.end) {
      this.itsBugsLvl();
    }
  }

  setNextLvl() {
    this.lvl.prevLvl = this.lvl.nextLvl;
    let skip;
    let newFatigue;
    let newDecInter;
    let newCodePower;  
    let bugsParam = {}
    switch (true) {
      case this.lvl.lvl < 5: 
        skip = 200;
        newFatigue = 15;
        newDecInter = 250;
        newCodePower = 30;
        bugsParam = {min: 10, max: 16}
        break;
      case this.lvl.lvl < 10: 
        skip = 400;
        newFatigue = 18;
        newDecInter = 250;
        newCodePower = 40;
        bugsParam = {min: 12, max: 18}
        break;
      case this.lvl.lvl < 15:
        skip = 600;
        newFatigue = 21;
        newDecInter = 200;
        newCodePower = 45;
        bugsParam = {min: 14, max: 22}
        break;
      case this.lvl.lvl < 20:
        skip = 1000;
        newFatigue = 24;
        newDecInter = 200;
        newCodePower = 50;
        bugsParam = {min: 18, max: 28}
        break;
      default:
        skip = 1500;
        newFatigue = 27;
        newDecInter = 150;
        newCodePower = 55;
        bugsParam = {min: 20, max: 32}
    }
    this.lvl.nextLvl += skip;
    this.fatiguepower = newFatigue;
    this.codepower = newCodePower;
    this.setDecreaseInter(newDecInter);
    this.bugsTimeoutParam = bugsParam;
  }
  setPrevLvl() {
    this.lvl.nextLvl = this.lvl.prevLvl;
    let skip;
    let newFatigue;
    let newDecInter;
    let newCodePower;
    let bugsParam = {}
    switch (true) {
      case this.lvl.lvl === 0:
        skip = 100;
        newFatigue = 5;
        newDecInter = 500;
        newCodePower = 25;
        bugsParam = {min: 10, max: 16}
        break;
      case this.lvl.lvl < 5:
        skip = 200;
        newFatigue = 15;
        newDecInter = 250;
        newCodePower = 30;
        bugsParam = {min: 10, max: 16}
        break;
      case this.lvl.lvl < 10:
        skip = 400;
        newFatigue = 18;
        newDecInter = 250;
        newCodePower = 40;
        bugsParam = {min: 12, max: 18}
        break;
      case this.lvl.lvl < 15:
        skip = 600;
        newFatigue = 21;
        newDecInter = 200;
        newCodePower = 45;
        bugsParam = {min: 14, max: 22}
        break;
      case this.lvl.lvl < 20:
        skip = 1000;
        newFatigue = 24;
        newDecInter = 200;
        newCodePower = 50;
        bugsParam = {min: 18, max: 28}
        break;
      default:
        skip = 1500;
        newFatigue = 27;
        newDecInter = 150;
        newCodePower = 55;
        bugsParam = {min: 20, max: 32}
    }
    this.lvl.prevLvl -= skip;
    this.fatiguepower = newFatigue;
    this.codepower = newCodePower;
    this.setDecreaseInter(newDecInter);
    this.bugsTimeoutParam = {}
  }

  itsBugsTime() { 
    if (this.desktop) {
      inputGame.setRandomKey.call(this)
    } else {
      canvasAux.setPivot.call(this, "random") //UTILS . SET PIVOT
    }
    this.pointsMulti = 5;
    this.penalties = 1;
    this.preventPenalties = false;
    this.spritePen = 0;
    this.bugsON = {
      start: false,
      end: true,
    };
    this.bugsCount = [];
  }
  itsBugsLvl() {
    this.bugsSaveNormal = {
      prevLvl: this.lvl.prevLvl,
      nextLvl: this.lvl.nextLvl,
    };
    this.lvl.prevLvl = this.bugsLvl.prevLvl;
    this.lvl.nextLvl = this.bugsLvl.nextLvl;
    this.coding = this.lvl.nextLvl * (4/10);
    let lvl = this.bugsLvl.lvl;
    let newFatigue;
    let newDecInter;
    let nextNextLvl;

    switch (true) {
      case lvl === 0:
        newFatigue = 7;
        newDecInter = 500;
        nextNextLvl = 1200;
        break;
      case lvl === 1:
        newFatigue = 8;
        newDecInter = 450;
        nextNextLvl = 1400;
        break;
      case lvl === 2:
        newFatigue = 9;
        newDecInter = 350;
        nextNextLvl = 1600;
        break;
      case lvl === 3:
        newFatigue = 10;
        newDecInter = 300;
        nextNextLvl = 1800;
        break;
      default:
        newFatigue = 13;
        newDecInter = 200;
        nextNextLvl = 2000;
    }
    this.setDecreaseInter(newDecInter);
    this.fatiguepower = newFatigue;
    this.bugsLvl = { lvl: ++lvl, prevLvl: 0, nextLvl: nextNextLvl };
  }
  itsNotBugsTime() {
    if (this.desktop) {
      inputGame.setKeyInputListener.call(this, " ");
    } else {
      canvasAux.setPivot.call(this, "initial")  //UTILS . SET PIVOT
    }
    this.setBugsTimeout(this.bugsTimeoutParam.min, this.bugsTimeoutParam.max);
    this.pointsMulti = 1;
    this.penalties = 0;
    this.bugsON = { start: false, end: false };

    this.coding = this.bugsSaveNormal.nextLvl;
    this.lvl.prevLvl = this.bugsSaveNormal.prevLvl;
    this.lvl.nextLvl = this.bugsSaveNormal.nextLvl;
  }

  animation() {
    
    canvasAux.setCanvasArea.call(this)
    
    if(this.gameOn) {
      animate.drawDesk.call(this);
      animate.drawLorem.call(this); //
      animate.drawBars.call(this); //
      if (this.desktop) {
        animate.drawToPress.call(this); //
      }
      animate.drawPenalties.call(this); //
      if (this.bugsON.end) {
        animate.drawBugs.call(this) //
      }
    } else {
      animate.drawGameOver.call(this) //
    }
  }
  
  deleteThis(){
    this.gameOver()
    this.canvas.removeEventListener("click", this.callGameStartBind)
    document.removeEventListener("keydown", this.callGameStartBind)
    cancelAnimationFrame(this.idRAF)
  }
}
