var celes = {
  name : 'Celes', 

  HP : 100,
  MP : 0,

  atk : 70,
  def : 10,
  evade : 0,
  magicAtk : 0,
  magicDef : 0,
  magicEvade : 0,
  speed : 90,
  stamina : 0,
  strength : 0,

  items : {},
  
  sprite : new Sprite({
            src : 'sprites/celes.png',
            srcX: 34 , srcY: 96, srcW: 16, srcH: 23,
            destX: 230, destY: 60, destW: 16, destH: 23}),

  fallenSprite : new Sprite({
            src : 'sprites/celes.png',
            srcX: 46, srcY: 155, srcW: 24, srcH: 15,
            destX: 230, destY: 60, destW: 24, destH: 23}),
};

var shadow = {
  name : 'Shadow', 

  HP : 100,
  MP : 0,

  atk : 70,
  def : 10,
  evade : 0,
  magicAtk : 0,
  magicDef : 0,
  magicEvade : 0,
  speed : 120,
  stamina : 0,
  strength : 0,

  items : {},
  
  sprite : new Sprite({
            src : 'sprites/shadow.png',
            srcX: 24, srcY: 138, srcW: 16, srcH: 24,
            destX: 230, destY: 100, destW: 16, destH: 24}),

  fallenSprite : new Sprite({
            src : 'sprites/shadow.png',
            srcX: 16, srcY: 172, srcW: 24, srcH: 14,
            destX: 230, destY: 100, destW: 24, destH: 14}),

};


