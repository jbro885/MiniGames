
import store from '../../store';

// this has all the methods that  handle what to do when reciving stuff
//
const socketClicker = function(socket){

  socket.on('click',handleClick);
  socket.on('click-enemy',handleEnemyClick);
  socket.on('win',handleWin);
  socket.on('loss',handleLoss)

}
function handleWin(msg){
  store.dispatch({type: 'CLICKER_WIN'});
}
function handleLoss(msg){
  store.dispatch({type: 'CLICKER_LOSS'});
}
function handleClick(msg){
  store.dispatch({type:'SET_COUNT',payload:msg})
}
function handleEnemyClick(msg){
  store.dispatch({type:'SET_ENENMY_COUNT',payload:msg})
}

export default socketClicker;
