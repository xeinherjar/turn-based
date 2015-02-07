/* ***************************************************************************
 * main.js
 * Contains game logic and loop
 *  *************************************************************************/

// Setup and Load
var canvas = document.getElementById('ctx');
var ctx = canvas.getContext('2d');
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
        activeHero.attack(monsterUnits[select]);
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
background.img.src = 'sprites/battle-backgrounds.png';
background.sprite = {srcX: 526, srcY: 1296, srcW: 240, srcH: 148,
                     destX: 0, destY: 0, destW: 256, destH: 164};

var cursor = new Sprite({src : 'sprites/icons.png',
                        srcX: 0, srcY: 0, srcW: 17, srcH: 17,
                        destX: 0, destY: 0, destW: 17, destH: 17});

var hCursor = new Sprite({ src : 'sprites/icons.png',
                          srcX: 18, srcY: 4, srcW: 12, srcH: 8,
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
};

var tick = function() {
  gameUnits.forEach(function(unit) {
    if (unit instanceof Hero && unit.down === true) { return; }
    unit.tick();
    if (unit.ready) { actionQueue.push(unit); }
  });
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
    unit.attack(hero);
    console.log(hero.name + " has " + hero.HP + " HP");
    if (hero.HP <= 0) { hero.fallen(); }
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
  gameUnits = monsterUnits.concat(heroUnits, heroUnitsFallen);
  window.requestAnimationFrame(render);
  console.log(actionQueue);
  if (monsterUnits.length === 0) {
    console.log("WIN");
    return;
  }
  if (heroUnits.length === 0) {
    console.log("LOST");
    return;
  }
  if (activeHero.ready) {
    return;
  }

  if (actionQueue.length !== 0) {
    processActionQueue();
  } else {
   tick();
  }
}




var interval = setInterval(gameloop, 500);