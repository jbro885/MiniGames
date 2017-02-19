var appLogger = require('./logger')();

var Matter = require('matter-js');
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;



var matterServer = function(){
  console.log('Starting Game');
  let tps = 60;
  let callback = undefined;
  let callbackContext = undefined;
  let engine = Engine.create();

  var boxA = Bodies.rectangle(300, 300, 4*16, 4*16 , { isStatic: false });
  var ground = Bodies.rectangle(300, 700, 16*16, 2*16, { isStatic: true });
  World.add(engine.world, [boxA, ground]);

  let game = {
    setCallBack : function(cb){
      callback = cb

    }
  }


  function gameLoop(){

    //console.log('wowowow');

  }


  // Main game Incrementer;
  setInterval(function () {
    Engine.update(engine,1000/tps);
    gameLoop();
    if(callback){
      var bodies = reduce(engine.world.bodies);
      callback(bodies);
    }
  }, 1000/tps);


  return game;
};

function reduce(bodies){
  return bodies.map(function(body){
    return{id:body.id,position:body.position,velocity:body.velocity};
  });
}

module.exports =  matterServer;
