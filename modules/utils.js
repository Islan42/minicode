const animate = {
  drawDesk() {
    this.ctx.save() // SAVE 01: DESK
    if (this.negativeAnim) {
      let randX = this.random(-10,10)
      let randY = this.random(-10,10)
      this.ctx.translate(randX,randY)
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.assets.desk, 0, 0, this.canvas.width, this.canvas.height);
    
  },
  
  drawLorem() {
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
  },
  
  drawBars() {
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
  },
  
  drawToPress() {
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
  },
  
  drawPenalties() {
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
  },
  
  drawBugs() {
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
    
    if (this.controlFR % 61 === 0 && this.bugsCount.length < this.bugsLvl.bugs) {
      const maxIterator = Math.ceil(this.bugsLvl.bugs / 15) // Velocidade com que a tela enche de bugs
      // console.log(maxIterator)  //DEBUG
      for (let i = 0; i < maxIterator; i++){
        const posX = this.random(0, this.canvas.width)
        const posY = this.random(0, this.canvas.height)
        const rads = this.random(0, Math.PI * 2)
        const sprite = this.random(0,4)
        const size = this.random (width/(500/15),width/(500/42))
        
        const newBug = { posX, posY, rads, sprite, size }
        this.bugsCount.push(newBug)        
      }
      // console.log(this.bugsCount.length)  //DEBUG
    }
  },
  
  drawBugsTimer(){
    const ctx = this.ctx
    const width = this.canvas.width
    
    const posX = width / (500/430)
    const posY = width / (500/28)
    const fontSize = width / (500/20) > 15 ? width / (500/20) : 15
    // ctx.lineWidth = 0.5    // VAI DEPENDER DA COR
    
    ctx.save()
    ctx.fillStyle = "rgb(255,0,0)"
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.fillText(this.bugsLvl.timer, posX, posY)
    ctx.strokeText(this.bugsLvl.timer, posX, posY)
    ctx.restore()
  },
  
  drawGameOver() {
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
  },
}

const canvasAux = {
  setCanvasArea() {
    if (this.root.clientWidth > 500) {
      this.canvas.width = 500;
    } else {
      this.canvas.width = this.root.clientWidth
    }
    const b = this.canvas.width/2.5
    this.canvas.height = b;
    
    if (this.cacheRootWidth !== this.root.clientWidth && this.bugsON && this.pivot) {
      const pos = this.bugsON.end ? "random" : "initial"
      canvasAux.setPivot.call(this, pos)  //GAMBIARRA???? KKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    }
    this.cacheRootWidth = this.root.clientWidth
  },
  
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
  },
}

const inputGame = {
  setClickInputListener() {
    if (this.pivot){
      this.root.addEventListener("click", this.clickHandlerBind)
    }
  },
  
  setKeyInputListener(key) {
    if (this.keytopress) {
      document.removeEventListener("keydown", this.keyHandlerBind);
    }
    this.keytopress = key;
    document.addEventListener("keydown", this.keyHandlerBind);
  },
  
  clickHandler(event) {
    if (event.target === this.pivot) {
      this.clicks++;
      gameControl.positiveCoding.call(this, this.codepower);  
      gameControl.updateBoost.call(this); 
      gameControl.updatePoints.call(this);  
      if (this.bugsON.end) {
        canvasAux.setPivot.call(this, "random")   
      }
    } else {
      gameControl.negativeCoding.call(this, Math.floor(this.codepower * 0.6)); 
        this.negativeAnim = true;
        setTimeout(() => this.negativeAnim = false, 500)
    }
  },
  
  keyHandler(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
    if (!event.repeat) {
      const match = event.key.toLowerCase() === this.keytopress.toLowerCase();
      if (match) {
        this.clicks++;
        gameControl.positiveCoding.call(this, this.codepower); 
        gameControl.updateBoost.call(this); 
        gameControl.updatePoints.call(this);
        if (this.bugsON.end) {
          inputGame.setRandomKey.call(this)
        }
      } else {
        gameControl.negativeCoding.call(this, Math.floor(this.codepower * 0.6));
        this.negativeAnim = true;
        setTimeout(() => this.negativeAnim = false, 500)
      }
    }
  },
  
  setRandomKey() {
    const keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const newKey = keys[this.random(0, 25)];
    inputGame.setKeyInputListener.call(this, newKey);
  },
}

const gameControl = {
  updateBoost() {
    this.boost++;
    const timeout = setTimeout(() => this.boost --, 7000);
    this.boostTimeouts.push(timeout); 
  },
  
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
  },
  
  updatePoints() {
    const aux = this.clicks % 10;
    if (aux === 0) {
      this.score += 10 * this.pointsMulti * this.boostMulti;
      if (this.spriteLorem % 3 === 0) {
        setTimeout(() => this.spriteLorem++, 300);
      }
    }
  },
  
  negativeCoding(value = this.fatiguepower) {
    this.coding -= value;
    if (this.coding <= this.lvl.prevLvl) {
      if (!this.preventPenalties && this.penalties === 1) {
        this.gameOver();
      } else {
        lvlControl.lvlDown.call(this);
      }
    }
  },
  
  positiveCoding(value) {
    this.coding += value;
    if (this.coding > this.lvl.nextLvl) {
      lvlControl.lvlUp.call(this);
    }
  },
  
  setDecreaseInterval(inter) {
    if (this.decreaseInterval) {
      clearInterval(this.decreaseInterval);
    }
    this.decreaseInterval = setInterval(gameControl.negativeCoding.bind(this), inter);
  },
  
}

const lvlControl = {
  lvlUp() {
    if (!this.preventPenalties) {
      this.preventPenalties = true;
      setTimeout(() => (this.preventPenalties = false), 500);
    }
    if (this.bugsON.start) {
      bugsTimeControl.itsBugsTime.call(this);
    } else if (this.bugsON.end) {
      bugsTimeControl.itsNotBugsTime.call(this);
    }

    this.lvl.lvl++;
    if (this.lvl.lvl > this.lvl.maxLvl) {
      this.lvl.maxLvl ++;
    }
    lvlControl.setNextLvl.call(this);
    if (this.bugsON.end) {
      bugsTimeControl.itsBugsLvl.call(this);
    }
  },
  
  lvlDown() {
    if (this.lvl.lvl > 0) {
      this.lvl.lvl--;
      lvlControl.setPrevLvl.call(this);
    }

    if (!this.preventPenalties) {
      this.penalties++;
      this.preventPenalties = true;
      setTimeout(() => (this.preventPenalties = false), 2600);
      this.spritePen = 0;
    }
  },
  
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
    gameControl.setDecreaseInterval.call(this, newDecInter);
    this.bugsTimeoutParam = bugsParam;
  },
  
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
    gameControl.setDecreaseInterval.call(this, newDecInter);
    this.bugsTimeoutParam = bugsParam
  },
  
}

const bugsTimeControl = {
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
  },
  
  itsBugsTime() { 
    if (this.desktop) {
      inputGame.setRandomKey.call(this)
    } else {
      canvasAux.setPivot.call(this, "random")
    }
    this.pointsMulti = 2 + this.bugsLvl.lvl <= 5 ? 1 + this.bugsLvl.lvl : 5;
    this.penalties = 1;
    this.preventPenalties = false;
    this.spritePen = 0;
    this.bugsON = {
      start: false,
      end: true,
    };
    this.bugsCount = [];
  },
  
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
    // let newBugs; //CONST ABAIXO
    // let newTimer;  //CONST ABAIXO

    switch (lvl) {
      case 0:
        newFatigue = 7;
        newDecInter = 500;
        nextNextLvl = 1200;
        break;
      case 1:
        newFatigue = 8;
        newDecInter = 450;
        nextNextLvl = 1400;
        break;
      case 2:
        newFatigue = 9;
        newDecInter = 350;
        nextNextLvl = 1600;
        break;
      case 3:
        newFatigue = 10;
        newDecInter = 300;
        nextNextLvl = 1800;
        break;
      default:
        newFatigue = 13;
        newDecInter = 200;
        nextNextLvl = 2000;
    }
    const newBugs = 50 + (10 * lvl)
    const newTimer = 30 - (2 * lvl) > 20 ? 30 - (2 * lvl) : 20
    console.log(newBugs, newTimer)  //DEBUG
    gameControl.setDecreaseInterval.call(this, newDecInter);
    this.fatiguepower = newFatigue;
    this.bugsLvl = { lvl: ++lvl, prevLvl: 0, nextLvl: nextNextLvl, bugs: newBugs, timer: newTimer };
  },
  
  itsNotBugsTime() {
    if (this.desktop) {
      inputGame.setKeyInputListener.call(this, " ");
    } else {
      canvasAux.setPivot.call(this, "initial")  
    }
    bugsTimeControl.setBugsTimeout.call(this, this.bugsTimeoutParam.min, this.bugsTimeoutParam.max);
    this.pointsMulti = 1;
    this.penalties = 0;
    this.bugsON = { start: false, end: false };

    this.coding = this.bugsSaveNormal.nextLvl;
    this.lvl.prevLvl = this.bugsSaveNormal.prevLvl;
    this.lvl.nextLvl = this.bugsSaveNormal.nextLvl;
  },
}

const timeControl = {
  nextFrame(){
    if (this.controlFR === 60) {
      this.controlFR = 0;
    } else {
      this.controlFR++;
    }      
  },
  
  updateBugsTimer(){
    if (this.bugsON.end){
      if (this.controlBugsTimerFR === 60){
        this.controlBugsTimerFR = 0
        
        if (this.bugsLvl.timer > 0){
          this.bugsLvl.timer--
        } else {
          this.gameOver()
        }
      } else {
        this.controlBugsTimerFR++
      }
    }
  },
  
}

export { animate, canvasAux, inputGame, gameControl, lvlControl, bugsTimeControl, timeControl, }