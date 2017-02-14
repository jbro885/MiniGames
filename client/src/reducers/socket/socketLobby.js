import store from '../../store';
import { hashHistory } from 'react-router';



// this has all the methods that  handle what to do when reciving stuff
//
const socketLobby = function(socket){

  socket.on('match-found',matchFound);


}

function matchFound(data){
  hashHistory.push('/game/'+store.getState().lobby.game);
  store.dispatch({type:'GO_TO_GAME',payload:data});
};

export default socketLobby;
