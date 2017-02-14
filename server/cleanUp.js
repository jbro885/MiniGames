
// TODO this doest really do anything right now...

var chalk = require('chalk');
var appLogger = require('./logger')();

var app  = function(){

  var clean = {};
  appLogger.log('starting');
  process.stdin.resume();

  process.on('exit',code => {
    appLogger.log('exiting' + code);
    process.exit(code);
  });

  process.on('SIGHUP',code=>{
    appLogger.log('SIGHUP' + code);
    process.exit(code);
  });

  process.on('SIGINT',function(){
    appLogger.log('sigint');
    process.exit(2);
  });

  process.on('uncaughtException', function(e) {
   appLogger.error('Uncaught Exception...',e);
   process.exit(99);
 });

  return clean;

};
//console.log(chalk.green('Clean Up Js loaded'));


appLogger.moduleLoaded();
module.exports = app();
