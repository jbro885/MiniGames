window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
let Phaser = require('phaser/build/custom/phaser-split');



let initGame = function(){
  let state = {
    game:{},
    player:null,
    cursors: null,
    keys: {},
    lasers: null,
    enemies: null,
    galaxy: null,
    score: 0

  };

  state.init = init.bind(state);
  state.destroy = destroy.bind(state);
  state.preload = preload.bind(state);
  state.create = create.bind(state);
  state.update = update.bind(state);
  state.shootLaser = shootLaser.bind(state);
  state.createEnemy = createEnemy.bind(state);
  state.killEnemy = killEnemy.bind(state);
  state.enemyAI = enemyAI.bind(state);
  state.initEnemies = initEnemies.bind(state);
  return state;

}

// setTimeout(function () {
//   game.destroy();
// }, 1000);

function init(){
  this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'space-game', { preload: this.preload, create: this.create, update: this.update });
}

function destroy(){
  this.game.destroy();
}



function preload() {
  let game = this.game;
  //this.game.scale.scaleMode = Phasor.ScaleManager.USER_SCALE;
  this.game.stage.smoothed = false;

  // set up input
  this.cursors = game.input.keyboard.createCursorKeys();
  //console.log(this);
  this.keys.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
  this.keys.spacebar.onDown.add(this.shootLaser);
  //console.log(this);
  //console.log(this.keys);
  //console.log(Phaser.KeyCode.SPACEBAR);


  //game.input.keyboard.addKeyCapture(game.KeyCode.SPACEBAR);

  game.load.image('ship','assets/ship.png');
  game.load.image('laser','assets/laser.png');
  game.load.image('enemy','assets/enemy.png');
  game.load.image('galaxy','assets/galaxy.png');

}

function create() {
  let game = this.game;
  this.galaxy = game.add.tileSprite(0,0,800,600,'galaxy');
  this.galaxy.scale.setTo(2,2);
  //game.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';

  //  A simple background for our game
  this.player = game.add.sprite(32,game.world.height - 150,'ship');

  let player = this.player;
  player.scale.setTo(3,3);
  game.physics.arcade.enable(player);
  //player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  //game.add.sprite(0, 0, 'ship');
  this.lasers = game.add.group();
  this.enemies = game.add.group();
  this.initEnemies();
  this.scoreText = game.add.text(8, 4, 'Score: 0', { fontSize: '32px', fill: '#fff' });

}

function initEnemies(){
  for(var i = 0; i < 100; i ++){
    this.createEnemy();
  }
}

function killEnemy(laser,enemy){
  //console.log(enemy);

  if(! enemy.alive || ! laser.alive)
    return;


  this.score += 10;
  this.scoreText.text = 'Score: ' + this.score;
  enemy.kill();
  laser.kill();
}

function update() {
  let {player,cursors} = this;

  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if(cursors.up.isDown){
    player.body.velocity.y = -250;
  }
  else if(cursors.down.isDown){
    player.body.velocity.y = 250;
  }

  if(cursors.left.isDown){
    player.body.velocity.x = -250;
  }
  else if(cursors.right.isDown){
    player.body.velocity.x = 250;
  }

  this.game.physics.arcade.overlap(this.lasers,this.enemies,this.killEnemy,null,this);
  this.enemies.forEachAlive(this.enemyAI,this.true);
  this.galaxy.tilePosition.y +=2;

}

function createEnemy(){
  //console.log('Created Enemy');
  let game = this.game;
  let x = this.game.world.width / 2;
  let y = 16;
  let enemy = this.enemies.create(x,y,'enemy');
  enemy.scale.setTo(3,3);
  game.physics.arcade.enable(enemy);
  enemy.body.velocity.x = Math.random() * 200  -100;
  enemy.body.velocity.y = Math.random() * 200  -100;
  //console.log(enemy.body);
  return enemy;
}

function shootLaser(){
  console.log('shot a laser');
  let game = this.game;

  let x = this.player.body.x;
  let y = this.player.body.y;
  let laser = this.lasers.create(x,y,'laser');

  laser.scale.setTo(3,3);
  game.physics.arcade.enable(laser);
  laser.body.checkWorldBounds = true;
  laser.body.onWorldBounds = new Phaser.Signal();
  laser.body.velocity.y = -550;

  setTimeout(function () {
   laser.destroy();
  }, 2000);
}


function enemyAI(enemy){

  if(enemy.body.x > this.game.world.width - enemy.body.width){
    enemy.body.velocity.x =  -150;
  }else if(enemy.body.x < 0) {
    enemy.body.velocity.x = 150;
  }

  if(enemy.body.y > this.game.world.height - enemy.body.height){
    enemy.body.velocity.y =  -150;
  }else if(enemy.body.y < 0) {
    enemy.body.velocity.y = 150;
  }



}
export default initGame();
