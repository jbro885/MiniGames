
import store from '../store';


const defaultLobbyState= {
  waiting: false,
  game: ""
}

const lobby = (state = defaultLobbyState, action)=>{
  switch (action.type) {
    case 'JOIN_LOBBY':{
      if(typeof action.payload !== 'string')
        throw new Error('Must provide lobby name!');
        console.log('Tring to join lobby' + action.payload);
      store.getState().connection.socket.emit('join',action.payload);
      return {...state,game:action.payload};
    }

    case 'QUICK_JOIN':{
      if(typeof action.payload !== 'string')
        throw new Error('Must provide lobby name!');
      store.getState().connection.socket.emit('quick-join',action.payload);
      return {...state,game:action.payload};
    }
    case 'SET_WAITING_WINDOW':{
        return{...state,waiting:action.payload};
    }
    case 'CANCEL_QUICK_JOIN':{
      store.getState().connection.socket.emit('cancel-quick-join',action.payload);
      return {...state, game:""};
    }

    case 'GO_TO_GAME':{
        return{...state,waiting:false};
    }
    default:
    return state;


  }
}

export default lobby;
