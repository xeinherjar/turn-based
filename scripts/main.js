/* ***************************************************************************
 * main.js
 * Contains game logic and loop
 *  *************************************************************************/

// Setup and Load
var canvas = document.getElementById('ctx');
var ctx = canvas.getContext('2d');
    ctx.font = "12px monospace";

var audio = document.getElementById('battle-theme');
var bg = document.getElementById('main');

bg.addEventListener('keydown', keyDown, true);
function keyDown(e) {
  if (activeHero.ready) {
    switch(e.keyCode) {
      case 38: //up
        console.log("UP");
        select = (select - 1 + monsterUnits.length) % monsterUnits.length;
        console.log(monsterUnits[select]);
        break;
      case 40: //down
        console.log("DOWN");
        select = (select + 1) % monsterUnits.length;
        console.log(monsterUnits[select]);
        break;
      case 37: //left
        console.log("LEFT");
        break;
      case 39: //right
        console.log("RIGHT");
        break;
      case 13: //enter
        console.log("ENTER");
        activeHero.attack(monsterUnits[select], ctx);
        activeHero.ready = false;
         if (monsterUnits[select].HP <= 0) {
          monsterUnits[select].fallen();
        }
        break;
    }
  }
}



var m2 = new Entity(monsterB);
var m3 = new Entity(monsterC);
var monsterUnits = [m2, m3];
var select = 0;

var h1 = new Hero(celes);
var h2 = new Hero(shadow);
var heroUnits = [h1, h2];
var heroUnitsFallen = [];
var activeHero = new Hero(celes);

var gameUnits = monsterUnits.concat(heroUnits);
var actionQueue = [];

var background = {};
background.img = new Image();
background.img.src = 'sprites/sprites.png';
background.sprite = {srcX: 1, srcY: 253, srcW: 240, srcH: 147,
                     destX: 0, destY: 0, destW: 256, destH: 164};

var cursor = new Sprite({src : 'sprites/sprites.png',
                        srcX: 101, srcY: 0, srcW: 17, srcH: 16,
                        destX: 0, destY: 0, destW: 17, destH: 16});

var hCursor = new Sprite({ src : 'sprites/sprites.png',
                          srcX: 118, srcY: 4, srcW: 12, srcH: 8,
                          destX: 0, destY: 0, destW: 12, destH: 8});

function drawCursor() {
  cursor.destX = monsterUnits[select].sprite.destX +
              (monsterUnits[select].sprite.srcH / 2);
  cursor.destY = monsterUnits[select].sprite.destY +
              (monsterUnits[select].sprite.srcW / 2);
  cursor.draw(ctx);
}

function drawHCursor() {
  hCursor.destX = activeHero.sprite.destX +
              (activeHero.sprite.srcW / 2) - 4;
  hCursor.destY = activeHero.sprite.destY - 10;
//              (activeHero.sprite.destY);
  hCursor.draw(ctx);
}

function drawStats() {
  var y = 200;
  var allHeros = [];

  allHeros = allHeros.concat(heroUnits, heroUnitsFallen);
  allHeros = allHeros.sort(function(u1, u2) {
    return u1.sprite.destY > u2.sprite.destY;
  });
  allHeros.forEach(function(unit) {
    var name = unit.name;
    if (name.length < 8) {
      var l = 8 - name.length;
      for (var i = 0; i < l; i++) {
        name += " ";
      }
    }
    var t = "" + name + "" + unit.HP + "/" + unit.maxHP;
    if (unit === activeHero && activeHero.ready === true) {font = "32px monospace";
      ctx.font = "12px monospace";
      ctx.fillStyle = "red";
    } else {
      ctx.font = "12px monospace";
      ctx.fillStyle = "black";
    }
    ctx.font = "12px monospace";
    ctx.fillText(t, 130, y);
    y += 15;
  });
}

var render = function() {
  ctx.clearRect(0,0,500,500);
  ctx.drawImage(background.img,
      background.sprite.srcX, background.sprite.srcY,
      background.sprite.srcW, background.sprite.srcH,
      background.sprite.destX, background.sprite.destY,
      background.sprite.destW, background.sprite.destH);
  gameUnits.forEach( function(unit) {
      unit.sprite.draw(ctx);
  });
  if (activeHero.ready && monsterUnits.length > 0) {
    drawCursor();
    drawHCursor();
  }
  drawStats();
};

var tick = function() {
  gameUnits.forEach(function(unit) {
    if (unit instanceof Hero && unit.down === true) { return; }
    unit.tick();
    if (unit.ready) { actionQueue.push(unit); }
  });
};


var atkImg1 = new Sprite({ src : 'sprites/sprites.png',
                          srcX: 151, srcY: 0, srcW: 35, srcH: 40,
                          destX: 0, destY: 0, destW: 35, destH: 40});

var atkImg = function(target, context) {
  var x = target.destX / 2;
  var y = target.destY / 2;
  atkImg1.sprite.draw(context);
};

var processActionQueue = function() {
  // Reset and update

  select = 0;
  var unit = actionQueue.shift();
  if (!(unit instanceof Hero)) {
    console.log(unit.name + " is attacking for " + unit.atk);
    // select Hero to attack
    var r = Math.floor(Math.random() * heroUnits.length);
    var hero = heroUnits[r];
    unit.attack(hero, ctx);
    console.log(hero.name + " has " + hero.HP + " HP");
    if (hero.HP <= 0) {
      hero.HP = 0;
      hero.fallen();
    }

    unit.ready = false;
  }

  if (unit instanceof Hero) {
    if (unit.down === true) { return; }
    console.log(unit.name + " who do you want to attack?");
    activeHero = unit;
    }
 };


// Game Loop
// Loop over array when first READY found allow action
// render()
// tick() moves up ready by speed
// Select turn, act, next
// if player == down, then skip they are fallen.
function gameloop() {
  if (monsterUnits.length === 0) {
    audio.src = 'sprites/Victory_Fanfare.mp3';
    ctx.clearRect(0,0,500,500);
    ctx.font = "18px monospace";
    ctx.fillStyle = 'green';
    ctx.fillText('You won the battle!', 20, 100);
    //audio.pause();
    return;
  }
  if (heroUnits.length === 0) {
    audio.src = 'sprites/Game_Over.mp3';
    ctx.clearRect(0,0,500,500);
    ctx.font = "18px monospace";
    ctx.fillStyle = 'red';
    ctx.fillText('You LOST the battle! :(', 5, 100);
    //audio.pause();
    return;
  }

  gameUnits = monsterUnits.concat(heroUnits, heroUnitsFallen);
  window.requestAnimationFrame(render);

  if (activeHero.ready) {
    return;
  }

  if (actionQueue.length !== 0) {
    processActionQueue();
  } else {
   tick();
  }
}




var interval = setInterval(gameloop, 700);
