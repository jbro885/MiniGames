var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chalk = require('chalk');

var appLogger = require('./server/logger')(true);

var appSocket = require('./server/socket').initSocket(io);
//var clean = require('./server/cleanUp');

appLogger.moduleLoaded();
app.use(express.static(__dirname+'/client/build'));

//
// app.get('/*',function(req,res){
//   res.sendFile(path.join(__dirname, 'client/public/index.html'));
// });

var port = 8080;



http.listen(port,function(){
  appLogger.log('Express Server Running!!');
});
