const uuidV4 = require('uuid/v4');
var al = require('../../../common/logger')();

var Matter = require('matter-js');
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

al.moduleLoaded();



var app  = {};


let state = {
    foo:{
      x: 0,
      y: 0
    }
}

app.initGame = function(io){

  let game = {

  }

  var engine = Engine.create();

  let bouncy = {
    restitution: 0.5,
    frictionAir: 0,
    friction: 0,
    frictionStatic:0,
    inertia: Infinity
  }
  let tps = 1000/20; // in miliseconds

  // create two boxes and a ground
  var boxA = Bodies.rectangle(200, 200, 80, 80,bouncy);
  //var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, {...bouncy, isStatic: true});

  // add all of the bodies to the world
  World.add(engine.world, [boxA, ground]);

  //console.log(engine.world.bodies[0]);

  //console.log(bodies);
  //console.log(bodies[0]);

  game.addSocket = addSocket.bind(game);
  game.handleQuickJoin = handleQuickJoin.bind(game);
  setInterval(function () {
    state.foo.x ++;
    Engine.update(engine,tps);
    var bodies = reduce(engine.world.bodies);
    io.in('Matter').emit('tick-matter',bodies);
  }, (tps));

  return game;
}

function reduce(bodies){
  return bodies.map(function(body){
    return{id:body.id,position:body.position,velocity:body.velocity};
  });
}

// Keeps a list of all the sockets
function addSocket(socket){

  //al.info('adding Socket');
  //console.log(this);
  //var foo = handleQuickJoin.bind(this);
  //var bar = handleCancelQuickJoin.bind(this)
  //socket.removeAllListeners('quick-join');
  //socket.removeAllListeners('cancel-quick-join');
  //socket.on('cancel-quick-join', () => this.handleCancelQuickJoin(socket));

  socket.on('quick-join',(msg) => { this.handleQuickJoin(socket,msg)});

}
function handleQuickJoin(socket,msg){
  socket.join('Matter');
  socket.emit('match-found','found a match mofo');
}


module.exports = app;
