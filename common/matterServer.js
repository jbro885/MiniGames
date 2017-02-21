var appLogger = require('./logger')();

var Matter = require('matter-js');
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Vector = Matter.Vector;



var matterServer = function(){
  console.log('Starting Game');
  let tps = 60;
  let callback = undefined;
  let callbackContext = undefined;
  let engine = Engine.create();
  engine.world.gravity.y = 0.0;
  createCicrle(550,475,450,{isSensor: true,isStatic:true});
  let player = createPlayer(100, 200, 16,  { isStatic: false});
  let player2 = createPlayer(564, 500, 16,  { isStatic: false});
  player.input = {};
  //Body.setVelocity(player,{x:15,y:0});
  //let rotater = createRect(364, 300, 4*16, 4*16 , { isStatic: true });
  //createRect(300, 600, 16*16, 16*16, { isStatic: true });
//  World.add(engine.world, [createRect(300, 700, 16*16, 2*16, { isStatic: true })]);

  // var render = Render.create({
  //     element: document.getElementById('matter-js'),
  //     engine: engine,
  //     options:{
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     }
  // });
  //
  // Render.run(render);


  let game = {
    setCallBack : function(cb){
      callback = cb
    },
    sendInput: function(msg,player){
      handleInput(msg,player);
    }
  }


  function gameLoop(){

    //  Body.applyForce(player,player.position,{x:-.03/tps,y:-.03/tps});
    //console.log('wowowow');

    if(player.input.cursor)
    if(player.input.cursor.isDown){
      let v = Vector.sub(player.input.cursor,player.position) ;
      v = Vector.normalise(v);
      v = Vector.mult(v,.3 / tps );
      Body.applyForce(player,player.position,v);

    }
    clampPlayer(player,15);

  }

  function createCicrle(x,y,r,args){
    let circle = Bodies.circle(x,y,r,args);
    circle.rusd = {type: 'circle', radius:r };
    World.add(engine.world,circle);
    //console.log(circle);
    return circle;
  }

  function createPlayer(x,y,r,args){
    let player = createCicrle(x,y,r,args);
    player.rusd.type = 'player';
    console.log(player);
    return player;
  }

  function createRect(x,y,w,h,args){
    let box = Bodies.rectangle(x,y,w,h,args);
    //console.log(box);
    box.rusd = {type : 'box',width:w ,height:h};
    //console.log('adding world');
    World.add(engine.world,[box]);
    return box;
  }

  function handleInput(msg,playerId){
//  console.log('handling input server',msg,playerId);
    if(msg === null || msg === undefined || typeof msg !=='object'){
      return;
    }


    //TODO figure out why the spread operator wont work
    player.input = Object.assign({},player.input, {cursor:msg.cursor});
    if(msg.space){
    //  console.log(player);
      player.position.x = 350;
      player.position.y = 350;
      Body.setVelocity(player,{x:0,y:0});
      Body.applyForce(player,player.position,{x:0,y:0.0});
    }


  }

//  console.log(engine.world);

  // Main game Incrementer;
//  Engine.run()

  (function run(){
    window.requestAnimationFrame(run);
    //console.log('help');
    Engine.update(engine,1000/tps);
    gameLoop();
      if(callback){
      //  console.log('callback')
        var bodies = reduce(engine.world.bodies);
        callback(bodies);
      }
    })();
  // setInterval(function () {
  //
  //   Engine.update(engine,1000/tps);
  //   gameLoop();
  //   if(callback){
  //     var bodies = reduce(engine.world.bodies);
  //     callback(bodies);
  //   }
  // }, 1000/tps);


  return game;
};

function reduce(bodies){
  return bodies.map(function(body){
    return{id:body.id,position:body.position,velocity:body.velocity,
      angle: body.angle,
      type: body.rusd.type,
      radius: body.rusd.radius,
      width : body.rusd.width,
      height: body.rusd.height};
  });
}

function clampPlayer(player,max){
  let vector = player.velocity;
  let mag = Vector.magnitude(vector);

  if (Math.abs(mag) < max)
    return vector;

    console.log('clammped');
  //  console.log(player);
  vector = Vector.normalise(vector);
  vector = Vector.mult(vector,max);
  Body.setVelocity(player,vector);
  Body.applyForce(player,player.position,{x:0,y:0.0});
  //return vector;

}

function clampVector(vector,max){
  let mag = Vector.magnitude(vector);

  if (Math.abs(mag) < max)
    return vector;

  vector = Vector.normalise(vector);
  vector = Vector.mult(vector,max);
  return vector;

}

module.exports =  matterServer;
