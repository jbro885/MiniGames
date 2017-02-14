
import store from '../store';

const defaultChatState = {
  messages : [],
  inputText: "",
  name: 'N00B'
}
const chat = (state = defaultChatState, action)=>{
  switch (action.type) {
    case'SET_INPUT':{
      if( typeof action.payload  !== "string")
        throw new Error("Payload for action.type 'SET_INPUT'  must be type string. Provided "+ typeof action.payload + " instead! " );
      return {...state,inputText:action.payload};
    }
    case 'SET_NAME':{
      return {...state,name:action.payload};
    }
    case 'GO_TO_GAME':{
      return {...state,messages:[]};
    }

    case 'SEND_MESSAGE':
      try{
        store.getState().connection.socket.emit('chat',{name:state.name,message:state.inputText});
      }catch(err){
        console.error('socket likely not initilazied');
      }
      return {...state,inputText: ""};
    case 'GET_MESSAGE':{
      console.log(action.payload);
      const obj = {...state, messages: [...state.messages,action.payload]};
      console.log(obj);
      //return state;
      return obj;
    }
    default:
    return state;


  }
}
export default chat;
