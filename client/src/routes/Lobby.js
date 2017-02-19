import React from 'react';

import {Tabs,Tab,Button} from 'react-bootstrap';
import Private from './PrivateLobby';
import Public from './PublicLobby';
import Create from './CreateLobby';
import { connect } from 'react-redux';

import {hashHistory} from 'react-router';



import QuickJoin from '../components/QuickJoin';



let  lobby = ({game,waiting,quickJoin,connectSocket,setWindow,cancelQuickJoin}) =>{


  connectSocket(game);
  function handleClick(){
    quickJoin(game);
    setWindow(true);
  }
  function singlePlayer(){
    hashHistory.push(`game/${game}/Single`);
  }


  const lobby = (
    <div>
    <h3>{game}</h3>
    <Button bsStyle="success" onClick={e =>handleClick()}>Quick Join</Button>
    <span> </span>
    <Button bsStyle="success" onClick={e =>singlePlayer()}>Single Player</Button>
    <div><br/></div>
    <Tabs defaultActiveKey={1} id="loginTabs">
      <Tab eventKey={1} title="Public">
        <Public></Public>
      </Tab>

      <Tab eventKey={2} title="Private">
        <Private></Private>
      </Tab>
      <Tab eventKey={3} title="Create">
        <Create></Create>
      </Tab>
    </Tabs>
  </div>

  )


  if(waiting){
    return (
        <div className="container">
          <QuickJoin game={game} setWindow={setWindow} cancelQuickJoin={cancelQuickJoin}></QuickJoin>
          {lobby}
        </div>
    )
  }else{
    return (
      <div className="container">
        {lobby}
      </div>
    )

  }

}


function mapDispatchToProps(dispatch){
  return{
    connectSocket: (game) => {
      dispatch({type:'JOIN_LOBBY',payload:game})
    },
    quickJoin: (game) =>{
      dispatch({type:'QUICK_JOIN',payload:game});
    },
    cancelQuickJoin:() =>{
      dispatch({type:'CANCEL_QUICK_JOIN'});
    },
    setWindow:(open) =>{
      dispatch({type:'SET_WAITING_WINDOW',payload:open});
    }


  }
}

function mapStateToProps(state,ownProps){
  return{
    game: ownProps.params.game,
    waiting: state.lobby.waiting,
  }
}


lobby = connect(mapStateToProps, mapDispatchToProps)(lobby);


export default lobby;
