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
Entity.prototype.attack = function(target) { 
  target.HP -= this.atk;  
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
  };
}
