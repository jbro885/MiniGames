import { combineReducers } from 'redux'
import clickerReducer from './clicker'
import chatReducer  from './chat';
import socketReducer from './socket/socket';
import lobbyReducer from './lobby'

const reducer = combineReducers({
  gameClicker: clickerReducer,
  chatWindow: chatReducer,
  connection: socketReducer,
  lobby: lobbyReducer,
})

export default reducer;
