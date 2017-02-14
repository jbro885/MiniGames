
import store from '../store';
const defaultClickerState ={
    count:0,
    enemyCount:0,
    won:false,
    lost: false,
}
const getCounter = (state = defaultClickerState, action) => {
//  console.log(action);
  switch (action.type) {
    case 'INCREMENT':{
      return {...state, count:state.count +1};
    }
    case 'INCREMENT_ENEMY':{
      return {...state, enemyCount:state.enemyCount +1};
    }
    case 'SET_COUNT':{
      return {...state, count:action.payload};
    }
    case 'SET_ENENMY_COUNT':{
      return {...state, enemyCount:action.payload};
    }
    case 'CLICKER_WIN':{
      return {...state,won:true};
    }
    case 'CLICKER_LOSS':{
      return {...state,lost:true};
    }
    case 'GO_TO_GAME':{
      return {...defaultClickerState};
    }

    case 'DECREMENT':
      return state;
    case 'SEND_CLICK':{
      try{
        store.getState().connection.socket.emit('click');
      }catch(err){
        console.error('socket likely not initilazied');
      }
      return state;
    }
    default:
      return state;
  }

}

export default getCounter
