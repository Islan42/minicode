export default class MiniCode {
  #root;
  #intBar;
  #lvlBar;
  #pointsBar; 
  #penaltiesBar;
  #boostBar;
  #prevNextBar;

  #coding;
  #lvl; 
  #score; 
  #penalties;
  #boost;
  #bugsLvl;

  #clicks; 
  #pointsMulti; 
  #boostMulti; 
  #preventPenalties;

  #decreaseInterval;
  #keyHandlerBind;
  #callGameStartBind

  #keytopress;
  #fatiguepower;
  #codepower;

  #bugsInterval;
  #bugsON;
  #bugsSaveNormal;
  #bugsCount;

  #canvas;
  #ctx;
  #gameOn;

  #controlFR;
  #spriteKey;
  #spriteLorem;
  #spritePen;
  #spriteRestart;
  #assets;
  #negativeAnim

  constructor(root) {
    this.#root = root;

    //addButton
    
    const para = document.createElement("p")
    para.textContent = "Atualmente não tenho nenhum projeto para apresentar mas estou trabalhando nisso. Espere aí... talvez você possa me ajudar. Que tal pôr a mão no meu código??"
    const startBtn = document.createElement("button");
    startBtn.textContent = "LA ELE";
    startBtn.addEventListener("click", this.gameStart.bind(this), {
      once: true,
    });
    
    this.#root.appendChild(para)
    this.#root.appendChild(startBtn);

    const lorem = new Image();
    lorem.src = "assets/lorem.png"
    //lorem.src = require("../assets/lorem.png"); //mudar para import() [?]
    const desk = new Image();
    desk.src = "assets/desk.png"
    //desk.src = require("../assets/desk.png");
    const key = new Image();
    key.src = "assets/key.png"
    //key.src = require("../assets/key.png");
    const spacebar = new Image();
    spacebar.src = "assets/spacebar.png"
    //spacebar.src = require("../assets/spacebar.png")
    const penalties = new Image();
    penalties.src = "assets/penalties.png"
    //penalties.src = require("../assets/penalties.png")
    const bugs = new Image()
    bugs.src = "assets/bugs.png"
    //bugs.src = require("../assets/bugs.png")
    this.#assets = { lorem, desk, key, spacebar, penalties, bugs };
  }

  gameStart() {
    //this.#canvas.removeEventListener("click", this.#callGameStartBind)
    //document.removeEventListener("keydown", this.#callGameStartBind)
    
    this.#gameOn = true;
    this.#coding = 50;
    this.#lvl = { lvl: 0, prevLvl: 0, nextLvl: 100, maxLvl: 0 };
    this.#codepower = 25;
    this.#fatiguepower = 5;
    this.#clicks = 0;
    this.#score = 0;
    this.#boost = 0;
    this.#penalties = 0;
    this.#pointsMulti = 1;
    this.#boostMulti = 1;
    this.#bugsLvl = { lvl: 0, prevLvl: 0, nextLvl: 1000 };
    this.#bugsON = { start: false, end: false };
    this.#bugsSaveNormal = { coding: 0, prevLvl: 0, nextLvl: 100 };
    this.#bugsCount = [];
    this.#preventPenalties = false;
    this.#keyHandlerBind = this.keyHandler.bind(this);
    this.#callGameStartBind = this.callGameStart.bind(this);
    this.#controlFR = 0;
    this.#spriteKey = 0;
    this.#spriteLorem = 0;
    this.#spritePen = 0;
    this.#spriteRestart = 0;
    this.#negativeAnim = false;

    //this.updateBars();
    this.setKey(" ");
    this.setDecreaseInter(500);
    this.setBugsInter(10, 18);
    
    if (!this.#canvas) {
      this.#intBar = document.createElement("p");
      this.#lvlBar = document.createElement("p");
      this.#pointsBar = document.createElement("p");
      this.#penaltiesBar = document.createElement("p");
      this.#boostBar = document.createElement("p");
      this.#prevNextBar = document.createElement("p");
      this.#canvas = document.createElement("canvas");
      while (this.#root.firstChild) {
        this.#root.removeChild(this.#root.firstChild);
      }
      this.#root.appendChild(this.#intBar);
      this.#root.appendChild(this.#lvlBar);
      this.#root.appendChild(this.#pointsBar);
      this.#root.appendChild(this.#penaltiesBar);
      this.#root.appendChild(this.#boostBar);
      this.#root.appendChild(this.#prevNextBar);
      this.#root.appendChild(this.#canvas);
      
      this.#ctx = this.#canvas.getContext("2d");
      this.#canvas.width = 500;
      this.#canvas.height = 200;
      this.animation();
    }

    
    
  }
  gameOver() {
    clearInterval(this.#decreaseInterval);
    document.removeEventListener("keydown", this.#keyHandlerBind);
    clearTimeout(this.#bugsInterval);
    this.#gameOn = false;

    this.#canvas.addEventListener("click", this.#callGameStartBind)
    document.addEventListener("keydown", this.#callGameStartBind)
  }
  callGameStart(event){
    event.stopPropagation()
    if (event.type === "click") {
      this.#canvas.removeEventListener("click", this.#callGameStartBind)
      document.removeEventListener("keydown", this.#callGameStartBind)
      this.gameStart()
    } else if (event.type === "keydown") {
      if (event.key === " ") {
        this.#canvas.removeEventListener("click", this.#callGameStartBind)
        document.removeEventListener("keydown", this.#callGameStartBind)
        event.preventDefault();
        this.gameStart()
      }
    }
  }

  updateBars() {
    if (
      this.#intBar &&
      this.#lvlBar &&
      this.#pointsBar &&
      this.#penaltiesBar &&
      this.#boostBar &&
      this.#prevNextBar
    ) {
      this.#intBar.textContent = `NIVEL DE INTENSIDADE: ${this.#coding}`;
      this.#lvlBar.textContent = this.#bugsON.end
        ? `BUGS LVL: ${this.#bugsLvl.lvl - 1}`
        : `LVL: ${this.#lvl.lvl}`;
      this.#pointsBar.textContent = `PTS: ${this.#score}`;
      this.#penaltiesBar.textContent = `PENALTIES: ${this.#penalties}`;
      this.#boostBar.textContent = `BOOST: ${
        this.#pointsMulti
      } x ${this.#boostMulti.toFixed(1)}: ${this.#boost} `;
      this.#prevNextBar.textContent = `PREV: ${this.#lvl.prevLvl} NEXT: ${
        this.#lvl.nextLvl
      }`;
    }
  }

  setKey(key) {
    if (this.#keytopress) {
      document.removeEventListener("keydown", this.#keyHandlerBind);
    }
    this.#keytopress = key;
    document.addEventListener("keydown", this.#keyHandlerBind);
  }
  setDecreaseInter(inter) {
    if (this.#decreaseInterval) {
      clearInterval(this.#decreaseInterval);
    }
    this.#decreaseInterval = setInterval(this.negativeCoding.bind(this), inter);
  }
  setBugsInter(min, max) {
    const time = this.random(min, max);
    if (this.#bugsInterval) {
      clearTimeout(this.#bugsInterval);
    }
    this.#bugsInterval = setTimeout(
      () => {
        this.#bugsON.start = true
        console.log("OK")
      },
      time * 1000
    );
    console.log(time);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  keyHandler(event) {
    //console.log("hy")
    if (event.key === " ") {
      event.preventDefault();
    }
    if (!event.repeat) {
      this.#clicks++;
      const match = event.key.toLowerCase() === this.#keytopress.toLowerCase();
      if (match) {
        this.positiveCoding(this.#codepower);
        this.updateBoost();
        this.updatePoints();
      } else {
        this.negativeCoding(Math.floor(this.#codepower * 0.9));
        this.#negativeAnim = true;
        setTimeout(() => this.#negativeAnim = false, 500)
      }
    }
  }
  updateBoost() {
    this.#boost++;
    setTimeout(() => {
      if (this.#boost > 0) {
        this.#boost--;
      }
    }, 6500); //BUG #02

    switch (true) {
      case this.#boost < 5:
        this.#boostMulti = 1;
        break;
      case this.#boost < 10:
        this.#boostMulti = 1.5;
        break;
      case this.#boost < 15:
        this.#boostMulti = 2;
        break;
      case this.#boost < 20:
        this.#boostMulti = 2.5;
        break;
      case this.#boost < 25:
        this.#boostMulti = 3.0;
        break;
      case this.#boost < 30:
        this.#boostMulti = 3.5;
        break;
      case this.#boost < 35:
        this.#boostMulti = 4.0;
        break;
      case this.#boost < 40:
        this.#boostMulti = 4.5;
        break;
      case this.#boost < 45:
        this.#boostMulti = 5.0;
        break;
      case this.#boost < 50:
        this.#boostMulti = 5.5;
        break;
      default:
        this.#boostMulti = 6.0;
        break;
    } //BUG #03
  }
  updatePoints() {
    const aux = this.#clicks % 10;
    if (aux === 0) {
      this.#score += 10 * this.#pointsMulti * this.#boostMulti;
      if (this.#spriteLorem % 3 === 0) {
        setTimeout(() => this.#spriteLorem++, 300);
      }
    }
  }
  negativeCoding(value = this.#fatiguepower) {
    this.#coding -= value;
    if (this.#coding <= this.#lvl.prevLvl) {
      if (!this.#preventPenalties && this.#penalties === 1) {
        this.gameOver();
      } else {
        this.lvlDown();
      }
    }
  }
  positiveCoding(value) {
    this.#coding += value;
    if (this.#coding > this.#lvl.nextLvl) {
      this.lvlUp();
    }
  }

  lvlDown() {
    if (this.#lvl.lvl > 0) {
      this.#lvl.lvl--;
      this.setPrevLvl();
    }

    if (!this.#preventPenalties) {
      this.#penalties++;
      this.#preventPenalties = true;
      setTimeout(() => (this.#preventPenalties = false), 2700);
      this.#spritePen = 0;
    }
  }
  lvlUp() {
    if (!this.#preventPenalties) {
      this.#preventPenalties = true;
      setTimeout(() => (this.#preventPenalties = false), 500);
    }
    if (this.#bugsON.start) {
      this.itsBugsTime();
    } else if (this.#bugsON.end) {
      this.itsNotBugsTime();
    }

    this.#lvl.lvl++;
    if (this.#lvl.lvl > this.#lvl.maxLvl) {
      this.#lvl.maxLvl ++;
    }
    this.setNextLvl();
    if (this.#bugsON.end) {
      this.itsBugsLvl();
    }
  }

  setNextLvl() {
    this.#lvl.prevLvl = this.#lvl.nextLvl;
    let skip;
    let newFatigue;
    let newDecInter;
    let newCodePower;
    switch (true) {
      case this.#lvl.lvl < 5:
        skip = 200;
        newFatigue = 15;
        newDecInter = 300;
        newCodePower = 30;
        break;
      case this.#lvl.lvl < 10:
        skip = 400;
        newFatigue = 18;
        newDecInter = 200;
        newCodePower = 40;
        break;
      case this.#lvl.lvl < 15:
        skip = 600;
        newFatigue = 22;
        newDecInter = 100;
        newCodePower = 45;
        break;
      case this.#lvl.lvl < 20:
        skip = 1000;
        newFatigue = 25;
        newDecInter = 100;
        newCodePower = 50;
        break;
      default:
        skip = 1500;
        newFatigue = 30;
        newDecInter = 100;
        newCodePower = 55;
    }
    this.#lvl.nextLvl += skip;
    this.#fatiguepower = newFatigue;
    this.#codepower = newCodePower;
    this.setDecreaseInter(newDecInter);
  }
  setPrevLvl() {
    this.#lvl.nextLvl = this.#lvl.prevLvl;
    let skip;
    let newFatigue;
    let newDecInter;
    let newCodePower;
    switch (true) {
      case this.#lvl.lvl < 5:
        skip = 200;
        newFatigue = 15;
        newDecInter = 500;
        newCodePower = 30;
        break;
      case this.#lvl.lvl < 10:
        skip = 400;
        newFatigue = 18;
        newDecInter = 300;
        newCodePower = 40;
        break;
      case this.#lvl.lvl < 15:
        skip = 600;
        newFatigue = 22;
        newDecInter = 200;
        newCodePower = 45;
        break;
      case this.#lvl.lvl < 20:
        skip = 1000;
        newFatigue = 25;
        newDecInter = 100;
        newCodePower = 50;
        break;
      default:
        skip = 1500;
        newFatigue = 30;
        newDecInter = 100;
        newCodePower = 55;
    }
    this.#lvl.prevLvl -= skip;
    this.#fatiguepower = newFatigue;
    this.#codepower = newCodePower;
    this.setDecreaseInter(newDecInter);
  }

  itsBugsTime() {
    //MUDAR VISUAL
    const keys = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const newKey = keys[this.random(0, 25)];
    this.setKey(newKey);
    this.#pointsMulti = 2;
    this.#penalties = 1;
    this.#preventPenalties = false;
    this.#spritePen = 0;
    this.#bugsON = {
      start: false,
      end: true,
    };
    this.#bugsCount = [];

    /*const showBugs = document.createElement("p");
    showBugs.textContent = `BUG TIME: Aperte o botao ${newKey}`;
    this.#root.appendChild(showBugs); */ //BUG #04 [SOLVED]
  }
  itsBugsLvl() {
    this.#bugsSaveNormal = {
      prevLvl: this.#lvl.prevLvl,
      nextLvl: this.#lvl.nextLvl,
    }; // coding: this.#coding  BUG #05 [SOLVED]
    this.#lvl.prevLvl = this.#bugsLvl.prevLvl;
    this.#lvl.nextLvl = this.#bugsLvl.nextLvl;
    this.#coding = this.#lvl.nextLvl / 4;
    let lvl = this.#bugsLvl.lvl;
    let newFatigue;
    let newDecInter;
    let nextNextLvl;

    switch (true) {
      case lvl === 0:
        newFatigue = 15;
        newDecInter = 200;
        nextNextLvl = 1200;
        break;
      case lvl === 1:
        newFatigue = 15;
        newDecInter = 200;
        nextNextLvl = 1400;
        break;
      case lvl === 2:
        newFatigue = 20;
        newDecInter = 150;
        nextNextLvl = 1600;
        break;
      case lvl === 3:
        newFatigue = 25;
        newDecInter = 100;
        nextNextLvl = 1800;
        break;
      default:
        newFatigue = 45;
        newDecInter = 100;
        nextNextLvl = 2000;
    }
    this.setDecreaseInter(newDecInter);
    this.#fatiguepower = newFatigue;
    this.#bugsLvl = { lvl: ++lvl, prevLvl: 0, nextLvl: nextNextLvl };
    console.log(this.#bugsLvl);
  }
  itsNotBugsTime() {
    //MUDAR VISUAL
    this.setKey(" ");
    this.setBugsInter(10, 18);
    this.#pointsMulti = 1;
    this.#penalties = 0;
    this.#bugsON = { start: false, end: false };

    this.#coding = this.#bugsSaveNormal.nextLvl;
    this.#lvl.prevLvl = this.#bugsSaveNormal.prevLvl;
    this.#lvl.nextLvl = this.#bugsSaveNormal.nextLvl;

    // this.#root.removeChild(this.#root.lastChild); //BUG #04 [SOLVED]
  }

  //ANIMATIONS

  animation() {
    /*
    function reset(){}
    this.drawDesk()
    this.drawLorem();
    this.drawEffects()
    this.updateBars(); // this.drawBars
    this.drawToPress(); 
    */
    if (this.#controlFR === 60) {
      this.#controlFR = 0;
    } else {
      this.#controlFR++;
    }
    
    if(this.#gameOn) {
      this.updateBars();
      drawDesk.call(this);
      drawLorem.call(this);
      drawBars.call(this);
      drawToPress.call(this);
      drawPenalties.call(this);
      if (this.#bugsON.end) {
        drawBugs.call(this)
      }
    } else {
      drawGameOver.call(this)
    }
    
    requestAnimationFrame(this.animation.bind(this))

    function drawDesk() {
      this.#ctx.save() // SAVE #01: DESK
      if (this.#negativeAnim) {
        let randX = this.random(-10,10)
        let randY = this.random(-10,10)
        this.#ctx.translate(randX,randY)
        //console.log(randX,randY)
      }
      
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
      this.#ctx.drawImage(this.#assets.desk, 0, 0);
      
    }
    function drawLorem() {
      const bgColor = this.#lvl.maxLvl < 10 ? "#ededed" : "#272822";
      const fgColor = this.#lvl.maxLvl < 10 ? "#000000" : "#ededed";
      
      this.#ctx.drawImage(
        this.#assets.lorem,
        0,
        21 * this.#spriteLorem,
        200,
        84,
        150,
        33,
        200,
        84
      );
      
      this.#ctx.save()
      this.#ctx.globalCompositeOperation = "source-atop"
      this.#ctx.fillStyle = fgColor;
      this.#ctx.fillRect(150,33,200,84)
      this.#ctx.restore()
      
      if (this.#bugsON.end) {
        this.#ctx.save()
        this.#ctx.globalCompositeOperation = "source-atop"
        this.#ctx.fillStyle = "#f4192c"
        this.#ctx.fillRect(150,33,200,84)
        this.#ctx.restore()
      }
      
      this.#ctx.save()
      this.#ctx.fillStyle = bgColor;
      this.#ctx.globalCompositeOperation = "destination-atop"
      this.#ctx.fillRect(0,0, this.#canvas.width, this.#canvas.height)
      this.#ctx.restore()
      
      this.#ctx.restore() // RESTORE #01: DESK
      
      if (this.#controlFR % 13 === 0) {
        if (!(this.#spriteLorem % 3 === 0)) {
          this.#spriteLorem++;
        } else if (this.#spriteLorem === 18) {
          this.#spriteLorem = 1;
        }
      }
    }
    function drawBars() {
      this.#ctx.save()
      
      
      //CODING
      const diference = this.#lvl.nextLvl - this.#lvl.prevLvl;
      const percentage = ((this.#coding - this.#lvl.prevLvl) / diference) * 100;
      this.#ctx.fillStyle = "rgb(0,0,0)";
      this.#ctx.fillRect(5, 23, 104, 17);
      if (percentage >= 0) {
        this.#ctx.fillStyle = "rgb(127, 127, 227)";
        this.#ctx.fillRect(7, 25, percentage, 13);
      }

      // LVL
      this.#ctx.font = "18px sans-serif";
      this.#ctx.fillStyle = "rgb(0,0,0)";
      const lvlText = this.#bugsON.end
        ? `BUGS LVL: ${this.#bugsLvl.lvl - 1}`
        : `LVL: ${this.#lvl.lvl}`;
      this.#ctx.fillText(lvlText, 5, 60);

      // SCORE
      this.#ctx.fillText(`SCORE: ${this.#score}`, 5, 80);

      //BOOST
      const boostText =
        this.#pointsMulti === 2
          ? `${this.#pointsMulti}x ${this.#boostMulti.toFixed(1)}`
          : `${this.#boostMulti.toFixed(1)}`;
      this.#ctx.fillText(boostText, 5, 100);
      
      this.#ctx.restore()
    }
    function drawToPress() {
      if (this.#keytopress === " ") {
        this.#ctx.drawImage(this.#assets.spacebar, 0, 27 * this.#spriteKey, 75, 26, 182, 143,150,52 )
      } else {
        this.#ctx.drawImage(
        this.#assets.key,
        26 * this.#spriteKey,
        0,
        25,
        26,
        229,
        143,
        50,
        52
      );
      }
      
      this.#ctx.save();
      this.#ctx.fillStyle = "rgb(255,0,0)";
      this.#ctx.font = "bold 18px sans-serif";
      this.#ctx.textAlign = "center"
      const keyText =
        this.#keytopress === " " ? "SPACEBAR" : `${this.#keytopress}`;
      this.#ctx.fillText(
        keyText,
        250 - 7 * this.#spriteKey,
        169 + 6 * this.#spriteKey
      );
      this.#ctx.restore();

      if (this.#controlFR % 31 === 0) {
        if (this.#spriteKey === 1) {
          this.#spriteKey = 0;
        } else {
          this.#spriteKey++;
        }
      }
    }
    function drawPenalties() {
      //this.#ctx.fillRect(470,5,20,20)
      if(this.#penalties === 1){
        this.#ctx.save()
        this.#ctx.translate(470,5)
        this.#ctx.rotate(Math.PI/4)
        this.#ctx.drawImage(this.#assets.penalties, 21 * this.#spritePen,0,21,21,0,0,21,21)
        this.#ctx.restore()
        
        if (this.#controlFR % 21 === 0) {
          if (this.#spritePen !== 6) {
            this.#spritePen++;
          }
        }
      }
    }
    function drawBugs() {
      if (this.#bugsCount.length) {
        for (let bug of this.#bugsCount) {
          this.#ctx.save()
          this.#ctx.translate(bug.posX,bug.posY)
          this.#ctx.rotate(bug.rads)
          this.#ctx.drawImage(this.#assets.bugs, 21 * bug.sprite, 0, 21, 21, 0, 0, bug.size, bug.size)
          this.#ctx.restore()
        }
        if (this.#controlFR % 61 === 0) {
          for (let i = 0; i < this.#bugsCount.length; i ++) {
            const rads = this.random(0, Math.PI * 2)
            const sprite = this.random(0,4)
            const size = this.random (5,42)
            const posX = this.random(0, this.#canvas.width - size/2)
            const posY = this.random(0, this.#canvas.height - size/2)
            
            this.#bugsCount[i] = { posX, posY, rads, sprite, size };
          }
        }
      }
      
      if (this.#controlFR % 60 === 0 && this.#bugsCount.length < 30) {
        const posX = this.random(0, this.#canvas.width)
        const posY = this.random(0, this.#canvas.height)
        const rads = this.random(0, Math.PI * 2)
        const sprite = this.random(0,4)
        const size = this.random (5,42)
        
        const newBug = { posX, posY, rads, sprite, size }
        this.#bugsCount.push(newBug)
      }
    }
    function drawGameOver() {
      const ctx = this.#ctx;
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

      ctx.save();
      ctx.lineWidth = 5;
      ctx.fillStyle = "rgb(220,220,220)";
      ctx.fillRect(100, 25, 300, 150);
      ctx.strokeRect(100, 25, 300, 150);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgb(220,0,0)";
      ctx.font = "bold 30px sans-serif";
      const measureGOX = ctx.measureText("GAME OVER");
      const posGOX = 100 + (300 - measureGOX.width) / 2;
      ctx.fillText("GAME OVER", posGOX, 80);
      ctx.font = "bold 18px sans-serif";
      const measureLvlX = ctx.measureText(`LVL: ${this.#lvl.maxLvl}`);
      const posLvlX = 100 + (300 - measureLvlX.width) / 2;
      ctx.fillText(`LVL: ${this.#lvl.maxLvl}`, posLvlX, 105);
      const measureScoreX = ctx.measureText(`SCORE: ${this.#score}`);
      const posScoreX = 100 + (300 - measureScoreX.width) / 2;
      ctx.fillText(`SCORE: ${this.#score}`, posScoreX, 130);
      
      if (this.#controlFR % 31 === 0) {
        if (this.#spriteRestart === 1) {
          this.#spriteRestart = 0
        } else {
          this.#spriteRestart = 1
        }
      }
      const measureRestartX = ctx.measureText(`RESTART`);
      const posRestartX = 100 + (300 - measureRestartX.width) / 2;
      ctx.fillText(`RESTART`, posRestartX + 3 * this.#spriteRestart, 155 - 3 * this.#spriteRestart);
      ctx.restore();
    }
  }
}
