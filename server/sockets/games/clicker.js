const uuidV4 = require('uuid/v4');
var al = require('../../logger')();

al.moduleLoaded();


var app  = {};



app.initClicker = function(io){

  let clicker = {
    queue:[],
    room: 'Clicker',
    io:io
  };

  clicker.click = click.bind(clicker);
  clicker.addSocket = addSocket.bind(clicker);
  clicker.handleQuickJoin = handleQuickJoin.bind(clicker);
  clicker.handleCancelQuickJoin = handleCancelQuickJoin.bind(clicker);
  clicker.startGame = startGame.bind(clicker);
  clicker.chat = chat.bind(clicker);
  return clicker;
}

// Keeps a list of all the sockets
function addSocket(socket){
  //al.info('adding Socket');
  socket.join(this.room);

  //console.log(this);
  //var foo = handleQuickJoin.bind(this);
  //var bar = handleCancelQuickJoin.bind(this)
  socket.removeAllListeners('quick-join');
  socket.removeAllListeners('cancel-quick-join');
  socket.on('quick-join',(msg) => this.handleQuickJoin(socket,msg));
  socket.on('cancel-quick-join', () => this.handleCancelQuickJoin(socket));




}

function startGame(player1,player2){
    //TODO
    //al.info(sock);

    let rand = uuidV4();
    player1.join(rand);
    player2.join(rand);

    let game = new Map();


    player2.on('click',()=>click(socket,io,rand));
    player2.on('chat',(msg)=>chat(socket,io,rand,msg));
    var sockets = [player1,player2];
    sockets.forEach(socket=>{
      socket.removeAllListeners('click');
      socket.removeAllListeners('chat');
      socket.on('click',()=>this.click(socket,game,rand));
      socket.on('chat',(msg)=>this.chat(socket,rand,msg));
      //socket.emit('match-found','found a match');
      game.set(socket.id,{count:0,won:false,lost:false});
    });

    // should emit to all players... but it doesn't
    //this.io.emit('match-found','found a match mofo');

    this.io.in(rand).emit('match-found','found a match mofo');


    this.chat({id:'Server'},rand,{name: 'Server',message:'Welcome to the game! Begin!'});
}

function chat(socket,room,msg){
  al.log(socket.id +' Chat message' ,msg);
//  console.log(room);
  //console.log(this.io.sockets);
  this.io.in(room).emit('chat',msg);
  //this.io.emit('chat',msg);
}

function handleQuickJoin(socket,msg){

      al.info('User looking for quick game: ' + msg);

      // the socket has already requested to be quick joined
      if(this.queue.indexOf(socket) >= 0)
        return;
      this.queue.push(socket);

      var num = this.queue.length;
      al.info(num + " players in queue!");

      if(num > 1){
        var player1 = this.queue[0];
        var player2 = this.queue[1];
        this.queue.shift();
        this.queue.shift();
        this.startGame(player1,player2);
    }
}


function click(socket,game,room){

  if(game.get('game over') === true)
      return;


  game.get(socket.id).count ++;
  // Send click event back to clicker
  //this.io.in(room).
  socket.emit('click',game.get(socket.id).count);
  // forward enemy click to the rest of the room should only be 1 player
  socket.broadcast.to(room).emit('click-enemy',game.get(socket.id).count);


  if(game.get(socket.id).count === 100 ){
    socket.emit('win',{});
    socket.broadcast.to(room).emit('loss',{});
    game.set('game over',true);
  }


}

function handleCancelQuickJoin(socket,msg){
    //console.log(this.queue.length);
    var index = this.queue.indexOf(socket);
    if(index > -1){
      this.queue.splice(index,1);
    }else{
      al.warn('Tried to remove an element that didnt exsist');
    }

}




module.exports = app;
