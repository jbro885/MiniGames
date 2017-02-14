window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
let Phaser = require('phaser/build/custom/phaser-split');



let initGame = function(){
  let state = {
    game:{},
    player:null,
    cursors: null,
    keys: {}
  };

  state.init = init.bind(state);
  state.destroy = destroy.bind(state);
  state.preload = preload.bind(state);
  state.create = create.bind(state);
  state.update = update.bind(state);
  state.shootLaser = shootLaser.bind(state);

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

}

function create() {
  let game = this.game;
  game.stage.backgroundColor = 'rgba(68, 136, 170, 0.5)';

  //  A simple background for our game
  this.player = game.add.sprite(32,game.world.height - 150,'ship');
  let player = this.player;
  player.scale.setTo(3,3);
  game.physics.arcade.enable(player);
  //player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  //game.add.sprite(0, 0, 'ship');

}

function update() {
  let {player,cursors,keys} = this;

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

}

function shootLaser(){
  console.log('shot a laser');
  let game = this.game;

  let x = this.player.body.x;
  let y = this.player.body.y;
  let laser = game.add.sprite(x,y,'laser');

  laser.scale.setTo(3,3);
  game.physics.arcade.enable(laser);
  laser.body.checkWorldBounds = true;
  laser.body.onWorldBounds = new Phaser.Signal();
  laser.body.velocity.y = -550;

  setTimeout(function () {
   laser.destroy();
  }, 2000);
}


export default initGame();
