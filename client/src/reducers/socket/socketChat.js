
import store from '../../store';

// this has all the methods that  handle what to do when reciving stuff
//
const socketChat = function(socket){

  console.log('setting up chat listener');
  socket.on('chat',function(msg){
    console.log(msg);
    handleChat(msg);
  });


}
function handleChat(data){
  store.dispatch({type:'GET_MESSAGE',payload:data});
}


export default socketChat;
