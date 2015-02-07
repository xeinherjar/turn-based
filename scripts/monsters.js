var monsterA = {
  name : 'Chimera', 

  HP : 100,
  MP : 0,

  atk : 10,
  def : 10,
  evade : 0,
  magicAtk : 0,
  magicDef : 0,
  magicEvade : 0,
  speed : 30,
  stamina : 0,
  strength : 0,

  items : {},
  
  sprite : {srcX: 390, srcY: 345, srcW: 95, srcH: 75,
            destX: 0, destY: 0, destW: 95, destH: 75},
};

var monsterB = {
  name : 'Ridder', 

  HP : 600,
  MP : 0,

  atk : 50,
  def : 10,
  evade : 0,
  magicAtk : 0,
  magicDef : 0,
  magicEvade : 0,
  speed : 80,
  stamina : 0,
  strength : 0,

  items : {},
 
  sprite : new Sprite({
            src : 'sprites/ruin-monsters.png', 
            srcX: 325, srcY: 142, srcW: 96, srcH: 90,
            destX: 0, destY: 125, destW: 96, destH: 90}),
};

var monsterC = {
  name : 'Samurai', 

  HP : 100,
  MP : 0,

  atk : 50,
  def : 10,
  evade : 0,
  magicAtk : 0,
  magicDef : 0,
  magicEvade : 0,
  speed : 100,
  stamina : 0,
  strength : 0,

  items : {},
   
  sprite : new Sprite({
            src : 'sprites/ruin-monsters.png', 
            srcX: 265, srcY: 844, srcW: 65, srcH: 70,
            destX: 75, destY: 72, destW: 65, destH: 65}),

};
