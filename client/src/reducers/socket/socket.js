import io from 'socket.io-client';


import socketClicker from './socketClicker';
import socketLobby from './socketLobby';
import socketChat from './socketChat';

let defaultAddress = location.origin;
//TODO make this more better
defaultAddress = defaultAddress.replace('3000','8080');
//console.log(temp);
console.log(defaultAddress);
function initSocket(state, address = defaultAddress){
  console.log('init socket quick join socket');

  if(state.socket != null && state.socket.open){
    return state;
  }

  try{
    state.socket.close();
  }catch(e){}

  var socket = {};
  socket = io.connect(address+'/game-lobby');

  socketClicker(socket);
  socketLobby(socket);
  socketChat(socket);

  //console.log(socket);

  return {...state,socket:socket, init:true}

}

const defaultSocketState = {
  socket: null,
  init: false
}
const socket = (state = defaultSocketState, action)=>{
  switch (action.type) {
    case 'INIT_SOCKET':{
        return initSocket(state);
    }
    default:
    return state;


  }
}

export default socket;
