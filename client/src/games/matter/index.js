

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
let Phaser = require('phaser/build/custom/phaser-split');

let server = require('../../../../common/matterServer');


import store from '../../store';


let app = function(){
  //console.log(logger);

  let game ={
    game:{},
    doneLoading:false
  }
  game.preload = preload.bind(game);
  game.create = create.bind(game);
  game.update = update.bind(game);
  game.init = init.bind(game);
  game.handleTick = handleTick.bind(game);


  return game;
}


function init(singlePlayer = false){
//  console.log(window.innerWidth);
//  console.log(window.innerHeight);
  this.game = new Phaser.Game( window.innerWidth, window.innerHeight, Phaser.AUTO, 'matter-js', { preload: this.preload, create: this.create, update: this.update });

  if(singlePlayer){
    this.server = server();
    this.server.setCallBack(this.handleTick);
  }

}

function preload(){
  let game = this.game;
  this.game.stage.smoothed = false;
  game.load.image('enemy','assets/enemy.png');
  game.load.image('white','assets/white.png');
}

function create(){
  // initSocket.apply(this);
  let game = this.game;
  game.stage.backgroundColor = 'rgba(80, 80, 80, 1)';
  this.enemy1 = game.add.sprite(0 , 0,'enemy');
  this.enemy1.scale.setTo(4,4);
  this.enemy2 = game.add.sprite(400,550,'white');
  this.enemy2.scale.setTo(16,2);
  this.doneLoading = true;
}

function update(){

}

function initSocket(game){
  let socket = store.getState().connection.socket;
  socket.on('tick-matter',this.handleTick);
}



function handleTick(msg){

  if(this.doneLoading === false)
    return;
//  console.log(msg[0].position);
  //console.log(this);
  // return;
  //console.clear();
  //console.log(msg[0].position);
  //console.log(msg[1].position);
  this.enemy1.x = msg[0].position.x;
  this.enemy1.y = msg[0].position.y;
  //interpolate(this.enemy1,msg[0]);

  this.enemy2.x = msg[1].position.x;
  this.enemy2.y = msg[1].position.y;
  //interpolate(this.enemy2,msg[1]);
  //console.log(msg);
}

function interpolate(enemy,msg){
  let time = 1/60;

  setTimeout(function () {
    enemy.x += msg.velocity.x *time;
    enemy.y += msg.velocity.y *time;
  }, time);
  setTimeout(function () {
    enemy.x += msg.velocity.x *time*2;
    enemy.y += msg.velocity.y *time*2;
  }, time*2);

}



export default app();
