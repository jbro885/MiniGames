const uuidV4 = require('uuid/v4');

var al = require('../../common/logger')();

var clickerGame = require('./games/clicker');
var matterGame = require('./games/matter');

var app  = {};

var lobby;
var clickerLobby;
var matterLobby;


app.initSocket = function(io){
  lobby = io.of('/game-lobby');
  clickerLobby = clickerGame.initClicker(lobby);
  matterLobby = matterGame.initGame(lobby);
  al.log('setting up lobby info');
  lobby.on('connection',socket=>handleConnection(socket,lobby));

}

function handleConnection(socket){
  al.log('user connected to the lobby');
  socket.on('disconnect', () => handleDisconnect(socket));
  socket.on('join', msg => handleJoin(socket,msg));
}

function handleJoin(socket,msg,io){

  al.info(msg);
  al.info(socket.id + ' Joining ' + msg + ' Lobby');
  switch (msg) {
    case 'Clicker':
      clickerLobby.addSocket(socket);
      break;
    case 'Matter':
      matterLobby.addSocket(socket);
      break;
    default:
      al.info(socket.id + ' Passed an invalid lobby name');
    return;
  }
}


function handleDisconnect(socket){
  al.log('A user dissconnected from lobby');
}

al.moduleLoaded();
module.exports = app;
