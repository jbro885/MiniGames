var chalk = require('chalk');






function AppLogger(DEBUG=false,dirName){

    this.DEBUG = DEBUG;
    this.dir = dirName;

}

//TODO implement logLevel
AppLogger.prototype.log = function(msg,obj,logLevel = 'INFO'){

  var out = chalk.white('['+logLevel+']');
  out += AppLogger.prototype.timeStamp();
  if(! browser){
    out += AppLogger.prototype.stackString();
  }

  if(typeof msg === 'object')
    msg = JSON.stringify(msg);

  out += chalk.white(' : "'+msg + '"');
  if(obj)
    out += chalk.white( ' : ' + JSON.stringify(obj));
  console.log(out);
}
AppLogger.prototype.info = function(msg,obj){
  AppLogger.prototype.log(msg,obj,'INFO');
}
AppLogger.prototype.warn = function(msg,obj){
  AppLogger.prototype.log(msg,obj,'WARN')
}


AppLogger.prototype.error = function(msg,error){

  var out = chalk.red('[ERROR]')
  console.log(out + " : " +  msg);
  if(error)
    console.log(error.stack);
}


AppLogger.prototype.timeStamp = function(){
  const date = new Date();
  let time = '[' + date.getFullYear() + '-';
  time += date.getMonth()   + '-';
  time += date.getDate()    + ' (';
  time += date.getHours()   + ':';
  time += date.getMinutes() + ':';
  time += date.getSeconds() + ')';
  time += ']';
  return chalk.yellow(time);
}

AppLogger.prototype.moduleLoaded = function (msg = "") {

    //var file = 'test';

    var out = chalk.magenta('[Module Loaded]');
    out += AppLogger.prototype.timeStamp();
    out += AppLogger.prototype.stackString();
    console.log(out);
};

AppLogger.prototype.stackString = function(){
  let {fileName:fileName, lineNumber:lineNumber,colNumber:colNumber} = (AppLogger.prototype.getStackInfo());
  var msg = chalk.blue(' ~'+fileName);
  msg += chalk.green(':[ln:'+ lineNumber+"]");
  msg += chalk.cyan(':[col:'+ colNumber+"]");
  return msg;
}

AppLogger.prototype.getStackInfo = function(){


  var originalFunction = Error.prepareStackTrace;
  var stackInfo = {
    fileName: 'Not Found',
    lineNumber: -1,
    colNumber: -1
  }

  try{
    var err = new Error('Stack Trace Faux Error');
    var currentFile;
    Error.prepareStackTrace = function(err,stack){return stack};
    currentFile = err.stack.shift().getFileName();    //console.log(currentFile);
    var stack;
    while(err.stack.length){
      //console.log(err.stack.getFileName());
      stack = err.stack.shift();
      if(currentFile !== stack.getFileName()){
        stackInfo.fileName = stack.getFileName().replace(appLoggerSingleton.dir,"");;
        stackInfo.lineNumber = stack.getLineNumber();
        stackInfo.colNumber = stack.getColumnNumber();
        break;
      }
    }

  }catch(err){
    console.error(err);
   }

 Error.prepareStackTrace = originalFunction;
  return stackInfo;


}

let appLoggerSingleton;
let inited = false;
let browser = false;

const singleton = function(debug){

    if(inited !== true){      
      var mainPath = "";
      if(require.main.filename === undefined){
        //console.log(require.main.filename);
        browser = true;
      }else{
        mainPath = require.main.filename;
        var int = mainPath.lastIndexOf('/');
        if(int === -1)
        int = mainPath.lastIndexOf('\\');
        mainPath = mainPath.substr(0,int+1);
      }


      inited = true;
      appLoggerSingleton = new AppLogger(debug,mainPath);
    }

    return appLoggerSingleton;

}


module.exports = singleton;
