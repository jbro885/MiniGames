
var al = require('./logger')();
var lobby = require('./sockets/lobby');

var app  = {};

app.initSocket = function(io){
  al.info('Setting up initial socket');
  lobby.initSocket(io);
}

al.moduleLoaded();
module.exports = app;
