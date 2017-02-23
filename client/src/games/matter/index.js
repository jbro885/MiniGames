

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
let Phaser = require('phaser/build/custom/phaser-split');

let server = require('../../../../common/matterServer');


import store from '../../store';

let ips = 20;

let app = function(){
  //console.log(logger);

  let game ={
    game:{},
    doneLoading:false,
    sprites : new Map(),
    keys:{}

  }
  game.preload = preload.bind(game);
  game.create = create.bind(game);
  game.update = update.bind(game);
  game.init = init.bind(game);
  game.handleTick = handleTick.bind(game);
  game.handleInput = handleInput.bind(game);
  game.handleSpace = handleSpace.bind(game);
  game.continousInput = continousInput.bind(game);

  return game;
}


function init(singlePlayer = false){
//  console.log(window.innerWidth);
//  console.log(window.innerHeight);
 this.game = new Phaser.Game( window.innerWidth, window.innerHeight, Phaser.AUTO, 'matter-js', { preload: this.preload, create: this.create, update: this.update });

  if(singlePlayer){
    this.server = server();
    this.server.addPlayer(1);
    this.server.setCallBack(this.handleTick);
    this.sendInput = sendInputSingle.bind(this);
  }
//  continousInput();

}

function preload(){
  let game = this.game;
  this.game.stage.smoothed = false;
  game.load.image('player','assets/enemy.png');
  game.load.image('box','assets/white.png');
  game.load.image('circle','assets/circle.png');
  this.graphics = game.add.graphics(0,0);

  this.keys.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
  this.keys.spacebar.onDown.add(this.handleSpace);
}

function create(){
  // initSocket.apply(this);
  let game = this.game;
  game.stage.backgroundColor = 'rgba(80, 80, 80, 1)';
  this.doneLoading = true;
  this.continousInput();

}

function update(){
  if(this.game.input.mousePointer.isDown){
    //console.log(this.game.input.mousePointer.position);
  }
  //this.handleInput
}

function initSocket(game){
  let socket = store.getState().connection.socket;
  socket.on('tick-matter',this.handleTick);
}

function continousInput(){
//  console.log('this.game.input.mousePointer');
  let game = this.game;
  setInterval((function () {

    let point = game.input.mousePointer;
    let cur = {x:point.position.x,y:point.position.y, isDown: point.isDown};
    let input ={
      cursor: cur
    }

    this.sendInput(input);
  }).bind(this), 1000/ips);
}

function handleSpace(){
  //console.log('space down');
  this.sendInput({space:true});
}

function sendInputSingle(msg){
  //console.log('input single');
  this.server.sendInput(msg,1);
}

function sendInputServer(msg){

}

function handleInput(){
  // let input = {
  //     up:
  // }


}


function handleTick(msg){

  if(this.doneLoading === false)
    return;

  if(msg.length <1)
    return;

  msg.forEach(body => {
    let sprite = this.sprites.get(body.id);
    if(!sprite){
      sprite = this.enemy1 = this.game.add.sprite(0 , 0,body.type);
      sprite.anchor.setTo(.5,.5);
      switch (body.type) {
        case 'circle':
        // sprite.scale.setTo(body.radius / sprite.width,body.radius / sprite.height);
        //   break;
        case 'player':
        sprite.scale.setTo(body.radius / (sprite.width /2),body.radius / (sprite.height /2));
          break;

        default:
          sprite.scale.setTo(body.width/sprite.width, body.height/sprite.height);
      }

      this.sprites.set(body.id,sprite);
    }
    sprite.rotation = body.angle ;
    sprite.x = body.position.x ;
    sprite.y = body.position.y ;
  });

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
