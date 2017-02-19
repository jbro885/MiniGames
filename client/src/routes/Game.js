import React from 'react';
import { connect } from 'react-redux';
//import {Grid,Col} from 'react-bootstrap';
//import ChatWindow from '../components/ChatWindow';

import Clicker from '../games/Clicker';
import Space from '../games/Space';
import Matter from '../games/Matter';

function getGame(game,singlePlayer){

  switch (game) {
    case 'Clicker':
      return <Clicker></Clicker>;
      case 'Space':
      return <Space></Space>
    case 'Matter':
      return <Matter singlePlayer={singlePlayer}></Matter>
    default:
      return (<div>Invalid Game!</div>);
  }
}

class game extends React.Component{

  constructor(props){
    super(props);
    //console.log(props);
    this.setGame = props.setGame;
  }

  componentDidMount(){
    this.setGame(this.game);
  }

  render(){
    const {game,singlePlayer} = this.props;
    return(
      getGame(game,singlePlayer)
      )
  }

}

// <div className="container">
// </div>


function mapDispatchToProps(dispatch){
  return{
    setGame: (game) => {
      dispatch({type:'SET_GAME',payload:game})
    }
  }
}

function mapStateToProps (state,ownProps) {
  return {
    game:ownProps.params.game,
    singlePlayer: ownProps.params.singlePlayer
  }
}

game = connect(mapStateToProps,mapDispatchToProps)(game);

export default game;
