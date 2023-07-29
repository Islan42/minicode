import {teste} from "./utils.js"

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
  clickHandlerBind
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
      this.setCanvasArea()
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
    this.clickHandlerBind = this.clickHandler.bind(this);
    this.keyHandlerBind = this.keyHandler.bind(this);
    this.callGameStartBind = this.callGameStart.bind(this);
    this.controlFR = 0;
    this.spriteKey = 0;
    this.spriteLorem = 0;
    this.spritePen = 0;
    this.spriteRestart = 0;
    this.negativeAnim = false;
    
    if (this.desktop) {
      this.setKey(" ");
    } else {
      this.setPivot("initial")
      this.setClick()
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
  
  setCanvasArea() {
    if (this.root.clientWidth > 500) {
      this.canvas.width = 500;
    } else {
      this.canvas.width = this.root.clientWidth
    }
    const b = this.canvas.width/2.5
    this.canvas.height = b;
    
    if (this.cacheRootWidth !== this.root.clientWidth && this.bugsON) {
      const pos = this.bugsON.end ? "random" : "initial"
      this.setPivot(pos)
    }
    this.cacheRootWidth = this.root.clientWidth
  }
  setPivot(pos){
    let aux = (this.root.clientWidth - this.canvas.width)/2
    if (aux < 0) {
      aux = 0
    }
    const width = this.canvas.width
    const height = this.canvas.height
    if (pos === "initial") {
      const mid = this.canvas.width / 2 - 25
      this.pivot.style.top = `${height - 50}px`
      this.pivot.style.left = `${aux + mid}px`
    } else {
      const randX = this.random(0, width - 50)
      const randY = this.random(0, height - 50)
      this.pivot.style.top = `${randY}px`
      this.pivot.style.left = `${aux + randX}px`
    }
  }
  setClick() {
    if (this.pivot){
      this.root.addEventListener("click", this.clickHandlerBind)
    }
  }
  setKey(key) {
    if (this.keytopress) {
      document.removeEventListener("keydown", this.keyHandlerBind);
    }
    this.keytopress = key;
    document.addEventListener("keydown", this.keyHandlerBind);
  }
  setDecreaseInter(inter) {
    if (this.decreaseInterval) {
      clearInterval(this.decreaseInterval);
    }
    this.decreaseInterval = setInterval(this.negativeCoding.bind(this), inter);
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
  setRandomKey() {
    const keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const newKey = keys[this.random(0, 25)];
    this.setKey(newKey);
  }

  clickHandler(event) {
    if (event.target === this.pivot) {
      this.clicks++;
      this.positiveCoding(this.codepower);
      this.updateBoost();
      this.updatePoints();
      if (this.bugsON.end) {
        this.setPivot("random")
      }
    } else {
      this.negativeCoding(Math.floor(this.codepower * 0.6));
        this.negativeAnim = true;
        setTimeout(() => this.negativeAnim = false, 500)
    }
  }
  keyHandler(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
    if (!event.repeat) {
      const match = event.key.toLowerCase() === this.keytopress.toLowerCase();
      if (match) {
        this.clicks++;
        this.positiveCoding(this.codepower);
        this.updateBoost();
        this.updatePoints();
        if (this.bugsON.end) {
          this.setRandomKey()
        }
      } else {
        this.negativeCoding(Math.floor(this.codepower * 0.6));
        this.negativeAnim = true;
        setTimeout(() => this.negativeAnim = false, 500)
      }
    }
  }
  updateBoost() {
    this.boost++;
    const timeout = setTimeout(() => this.boost --, 7000);
    this.boostTimeouts.push(timeout); 
  }
  checkBoost(){
    switch (true) {
      case this.boost < 5:
        this.boostMulti = 1;
        break;
      case this.boost < 10:
        this.boostMulti = 1.5;
        break;
      case this.boost < 15:
        this.boostMulti = 2;
        break;
      case this.boost < 20:
        this.boostMulti = 2.5;
        break;
      case this.boost < 25:
        this.boostMulti = 3.0;
        break;
      case this.boost < 30:
        this.boostMulti = 3.5;
        break;
      case this.boost < 35:
        this.boostMulti = 4.0;
        break;
      case this.boost < 40:
        this.boostMulti = 4.5;
        break;
      case this.boost < 45:
        this.boostMulti = 5.0;
        break;
      case this.boost < 50:
        this.boostMulti = 5.5;
        break;
      default:
        this.boostMulti = 6.0;
        break;
    }
  }
  updatePoints() {
    const aux = this.clicks % 10;
    if (aux === 0) {
      this.score += 10 * this.pointsMulti * this.boostMulti;
      if (this.spriteLorem % 3 === 0) {
        setTimeout(() => this.spriteLorem++, 300);
      }
    }
  }
  negativeCoding(value = this.fatiguepower) {
    this.coding -= value;
    if (this.coding <= this.lvl.prevLvl) {
      if (!this.preventPenalties && this.penalties === 1) {
        this.gameOver();
      } else {
        this.lvlDown();
      }
    }
  }
  positiveCoding(value) {
    this.coding += value;
    if (this.coding > this.lvl.nextLvl) {
      this.lvlUp();
    }
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
      this.setRandomKey()
    } else {
      this.setPivot("random")
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
      this.setKey(" ");
    } else {
      this.setPivot("initial")
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
    
    this.setCanvasArea()
    
    if(this.gameOn) {
      this.checkBoost();
      drawDesk.call(this);
      drawLorem.call(this);
      drawBars.call(this);
      if (this.desktop) {
        drawToPress.call(this);
      }
      drawPenalties.call(this);
      if (this.bugsON.end) {
        drawBugs.call(this)
      }
    } else {
      drawGameOver.call(this)
    }

    function drawDesk() {
      this.ctx.save() // SAVE 01: DESK
      if (this.negativeAnim) {
        let randX = this.random(-10,10)
        let randY = this.random(-10,10)
        this.ctx.translate(randX,randY)
      }
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.assets.desk, 0, 0, this.canvas.width, this.canvas.height);
      
    }
    function drawLorem() {
      const bgColor = this.lvl.maxLvl < 10 ? "#ededed" : "#272822";
      const fgColor = this.lvl.maxLvl < 10 ? "#000000" : "#ededed";
      const width = this.canvas.width
      
      const dWidth = width / (500/200)
      const dHeight = width / (500/84)
      const dX = (width - dWidth)/2
      const dY = width / (500/33)
      
      this.ctx.drawImage(
        this.assets.lorem,
        0,
        21 * this.spriteLorem + 1,
        200,
        83,
        dX,
        dY,
        dWidth,
        dHeight
      );
      
      this.ctx.save()
      this.ctx.globalCompositeOperation = "source-atop"
      this.ctx.fillStyle = fgColor;
      this.ctx.fillRect(dX,dY,dWidth,dHeight)
      this.ctx.restore()
      
      if (this.bugsON.end) {
        this.ctx.save()
        this.ctx.globalCompositeOperation = "source-atop"
        this.ctx.fillStyle = "#f4192c"
        this.ctx.fillRect(dX,dY,dWidth,dHeight)
        this.ctx.restore()
      }
      
      this.ctx.save()
      this.ctx.fillStyle = bgColor;
      this.ctx.globalCompositeOperation = "destination-atop"
      this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
      this.ctx.restore()
      
      this.ctx.restore() // RESTORE 01: DESK
      
      if (this.controlFR % 13 === 0) {
        if (!(this.spriteLorem % 3 === 0)) {
          this.spriteLorem++;
        } else if (this.spriteLorem === 18) {
          this.spriteLorem = 1;
        }
      }
    }
    function drawBars() {
      this.ctx.save()
      const width = this.canvas.width
      
      //CODING
      const dWidth = width/(500/100)
      const dHeight = width/(500/13)
      const dY = width/(500/25)
      
      const diference = this.lvl.nextLvl - this.lvl.prevLvl;
      const percentage = ((this.coding - this.lvl.prevLvl) / diference);
      this.ctx.fillStyle = "rgb(0,0,0)";
      this.ctx.fillRect(5, dY - 2, dWidth + 4, dHeight + 4);
      if (percentage >= 0) {
        this.ctx.fillStyle = "rgb(127, 127, 227)";
        this.ctx.fillRect(7, dY, percentage * dWidth, dHeight);
      }

      // LVL
      const font = width/(500/18);
      this.ctx.font = `${font}px sans-serif`;
      this.ctx.fillStyle = "rgb(0,0,0)";
      const lvlText = this.bugsON.end
        ? `BUGS LVL: ${this.bugsLvl.lvl - 1}`
        : `LVL: ${this.lvl.lvl}`;
      this.ctx.fillText(lvlText, 5, width/(500/60));

      // SCORE
      this.ctx.fillText(`SCORE: ${this.score}`, 5, width/(500/80));

      //BOOST
      const boostText =
        this.bugsON.end
          ? `${this.pointsMulti}x ${this.boostMulti.toFixed(1)}`
          : `${this.boostMulti.toFixed(1)}`;
      this.ctx.fillText(boostText, 5, width/(500/100));
      
      this.ctx.restore()
    }
    function drawToPress() {
      const width = this.canvas.width
      const height = this.canvas.height
       
      const dHeight = width / (500/52)
      const dY = height - dHeight - 5
      if (this.keytopress === " ") {
        const dWidth = width / (500/150)
        const dX = width / 2 - dWidth/2
        this.ctx.drawImage(this.assets.spacebar, 0, 27 * this.spriteKey, 75, 26, dX, dY, dWidth,dHeight )
      } else {
        const dWidth = width / (500/50)
        const dX = width / 2 - dWidth/2
        this.ctx.drawImage(
        this.assets.key,
        26 * this.spriteKey,
        0,
        25,
        26,
        dX,
        dY,
        dWidth,
        dHeight
      );
      }
      
      this.ctx.save();
      this.ctx.fillStyle = "rgb(255,0,0)";
      const font = width < 500 ? 16 : 18;
      this.ctx.font = `bold ${font}px sans-serif`;
      this.ctx.textAlign = "center"
      const keyText =
        this.keytopress === " " ? "SPACEBAR" : `${this.keytopress}`;
      this.ctx.fillText(
        keyText,
        width/(500/250) - 7 * this.spriteKey,
        width/(500/169) + 6 * this.spriteKey
      );
      this.ctx.restore();

      if (this.controlFR % 31 === 0) {
        if (this.spriteKey === 1) {
          this.spriteKey = 0;
        } else {
          this.spriteKey++;
        }
      }
    }
    function drawPenalties() {
      const width = this.canvas.width
      const tlX = width/(500/470)
      const tlY = width/(500/5)
      const size = width/(500/21)
      if(this.penalties === 1){
        this.ctx.save()
        this.ctx.translate(tlX,tlY)
        this.ctx.rotate(Math.PI/4)
        this.ctx.drawImage(this.assets.penalties, 21 * this.spritePen,0,21,21,0,0,size,size)
        this.ctx.restore()
        
        if (this.controlFR % 21 === 0) {
          if (this.spritePen !== 6) {
            this.spritePen++;
          }
        }
      }
    }
    function drawBugs() {
      const width = this.canvas.width
      if (this.bugsCount.length) {
        for (let bug of this.bugsCount) {
          this.ctx.save()
          this.ctx.translate(bug.posX,bug.posY)
          this.ctx.rotate(bug.rads)
          this.ctx.drawImage(this.assets.bugs, 21 * bug.sprite, 0, 21, 21, 0, 0, bug.size, bug.size)
          this.ctx.restore()
        }
        if (this.controlFR % 61 === 0) {
          for (let i = 0; i < this.bugsCount.length; i ++) {
            const rads = this.random(0, Math.PI * 2)
            const sprite = this.random(0,4)
            const size = this.random (width/(500/15),width/(500/42))
            const posX = this.random(0, this.canvas.width - size/2)
            const posY = this.random(0, this.canvas.height - size/2)
            
            this.bugsCount[i] = { posX, posY, rads, sprite, size };
          }
        }
      }
      
      if (this.controlFR % 60 === 0 && this.bugsCount.length < 30) {
        const posX = this.random(0, this.canvas.width)
        const posY = this.random(0, this.canvas.height)
        const rads = this.random(0, Math.PI * 2)
        const sprite = this.random(0,4)
        const size = this.random (width/(500/15),width/(500/42))
        
        const newBug = { posX, posY, rads, sprite, size }
        this.bugsCount.push(newBug)
      }
    }
    function drawGameOver() {
      const width = this.canvas.width
      const ctx = this.ctx;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.save();
      const a = width/(500/100)
      const b = width/(500/25)
      const c = width/(500/300)
      const d = width/(500/150)
      ctx.lineWidth = 5;
      ctx.fillStyle = "rgb(220,220,220)";
      ctx.fillRect(a, b, c, d);
      ctx.strokeRect(a, b, c, d);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgb(220,0,0)";
      let font = width/(500/30)
      ctx.font = `bold ${font}px sans-serif`;
      const measureGOX = ctx.measureText("GAME OVER");
      const posGOX = width/2 - measureGOX.width/2;
      
      ctx.fillText("GAME OVER", posGOX, width/(500/80));
      font = width/(500/18)
      ctx.font = `bold ${font}px sans-serif`;
      const measureLvlX = ctx.measureText(`LVL: ${this.lvl.maxLvl}`);
      const posLvlX = width/2 - measureLvlX.width/2;
      ctx.fillText(`LVL: ${this.lvl.maxLvl}`, posLvlX, width/(500/105));
      const measureScoreX = ctx.measureText(`SCORE: ${this.score}`);
      const posScoreX = width/2 - measureScoreX.width/2;
      ctx.fillText(`SCORE: ${this.score}`, posScoreX, width/(500/130));
      
      if (this.controlFR % 31 === 0) {
        if (this.spriteRestart === 1) {
          this.spriteRestart = 0
        } else {
          this.spriteRestart = 1
        }
      }
      const measureRestartX = ctx.measureText(`RESTART`);
      const posRestartX = width/2 - measureRestartX.width/2;
      ctx.fillText(`RESTART`, posRestartX + 3 * this.spriteRestart, width/(500/155) - 3 * this.spriteRestart);
      ctx.restore();
    }
  }
  
  deleteThis(){
    this.gameOver()
    this.canvas.removeEventListener("click", this.callGameStartBind)
    document.removeEventListener("keydown", this.callGameStartBind)
    cancelAnimationFrame(this.idRAF)
  }
}
