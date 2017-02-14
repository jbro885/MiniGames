import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// <li><Link to="/Lobby/TicTacToe">Tic Tac Toe</Link></li>
// <li><Link to="/Lobby/Blobs">Blobs</Link></li>

let app = function({joinGameLobby}){
  return (
    <div className="container">
      <h3>Site Navigation</h3>
      <ul>
        <li><Link to="/Lobby/Clicker">Clicker</Link></li>
        <li><Link to="/game/Space">Space</Link></li>
      </ul>
    </div>
  )
}


function mapDispatchToProps(dispatch){
  return{
    joinGameLobby: (game) => {
      dispatch({type:'JOIN_LOBBY',payload:game});
    }
  }
}

function mapStateToProps(state){
  return{
  }
}

app = connect(mapStateToProps, mapDispatchToProps)(app);

export default app;
