/* ***************************************************************************
 * entity.js
 * Contains prototypes for entity types: Monster, Boss, Player
 *  *************************************************************************/

// CONSTRUCTORS

function Entity(options) {
  options = options || {};
  // Properties
  this.name = options.name || "Default";

  this.HP = options.HP || 0;
  this.maxHP = options.HP || 0;
  this.MP = options.MP || 0;

  this.atk = options.atk || 0;
  this.def = 0;
  this.evade = 0;
  this.magicAtk = 0;
  this.magicDef = 0;
  this.magicEvade = 0;
  this.speed = options.speed || 0;
  this.stamina = 0;
  this.strength = 0;

  this.items = {};

  this.sprite = options.sprite || {};
//  this.sprite.img = new Image();
//  this.sprite.img.src = 'sprites/ruin-monsters.png';

  this.ready = false;
  this.r_speed = 0;
}

Entity.prototype.cast = function() { console.log("Cast"); };
Entity.prototype.useItem = function() { console.log("Item"); };
Entity.prototype.attack = function(target, context) {
  var atk = Math.floor(Math.random() * this.atk);
  target.HP -= atk;
  var x = target.sprite.destX + 5;
  var y = target.sprite.destY;
  context.fillStyle = "red";
  context.font = "32px monospace";
  context.fillText(atk, x, y);
};
Entity.prototype.fallen = function() {
  // remove from enemey array
  monsterUnits.splice(monsterUnits.indexOf(this), 1);
  select = 0;
  // remove from screen

  console.log(this.name + " has fallen.");
};

Entity.prototype.tick = function() {
  this.r_speed += this.speed;
  if (this.r_speed >= 255) {
    this.r_speed = 0;
    this.ready = true;
  }
};


function Hero(options) {
  Entity.call(this, options);
  this.down = false;
  this.fallenSprite = options.fallenSprite;
}
Hero.prototype = Object.create(Entity.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.specialAtk = function() { console.log("SpecialAtk"); };
Hero.prototype.fallen = function() {
  this.down = true;
  this.ready = false;
  heroUnitsFallen.push(this);
  heroUnits.splice(heroUnits.indexOf(this), 1);
  console.log(this.name + " has fallen... revive them!");

  var oldSprite = this.sprite;
  this.sprite = this.fallenSprite;
};
Hero.prototype.action = function() {
  // get player input
};


function Sprite(options) {
  this.img = new Image();
  this.img.src = options.src;
  this.srcX = options.srcX;
  this.srcY = options.srcY;
  this.srcW = options.srcW;
  this.srcH = options.srcH;

  this.destX = options.destX;
  this.destY = options.destY;
  this.destW = options.destW;
  this.destH = options.destH;

  this.draw = function(context) {
    context.drawImage(this.img,
        this.srcX, this.srcY, this.srcW, this.srcH,
        this.destX, this.destY, this.destW, this.destH);

  var img = context.getImageData(this.destX, this.destY, this.destW, this.destH);
  var imgData = img.data;
  var transparent = {r: 0, g: 0, b: 0, a: 0};
  var cKey1 = {r: 255, g: 0, b: 255, a: 0};
  var cKey2 = {r: 0, g: 128, b: 128, a: 0}; 
  for(var i = 0; i < imgData.length; i+=4) {
    var r = imgData[i],
        g = imgData[i+1],
        b = imgData[i+2];
    if ( (r === cKey1.r &&
          g === cKey1.g &&
          b === cKey1.b) ||
        ( r === cKey2.r &&
          g === cKey2.g &&
          b === cKey2.b) ) {
      imgData[i] = transparent.r;
      imgData[i+1] = transparent.g;
      imgData[i+2] = transparent.b;
      imgData[i+3] = transparent.a;
    }

  }

  context.putImageData(img, this.destX, this.destY);



  };
}
