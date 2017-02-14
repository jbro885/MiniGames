import React from 'react';
import { connect } from 'react-redux';
//import {Grid,Col} from 'react-bootstrap';
//import ChatWindow from '../components/ChatWindow';

import Clicker from '../games/Clicker';
import Space from '../games/Space';

function getGame(game){
  switch (game) {
    case 'Clicker':
      return <Clicker></Clicker>;
      case 'Space':
      return <Space></Space>
    default:
      return (<div>Invalid Game!</div>);
  }
}

class game extends React.Component{

  constructor(props){
    super(props);
    console.log(props);
    this.setGame = props.setGame;
  }

  componentDidMount(){
    this.setGame(this.game);
  }

  render(){
    const {game} = this.props;
    return(
      <div className="container">
        {getGame(game)}
      </div>
      )
  }

}



function mapDispatchToProps(dispatch){
  return{
    setGame: (game) => {
      dispatch({type:'SET_GAME',payload:game})
    }
  }
}

function mapStateToProps (state,ownProps) {
  return {
    game:ownProps.params.game
  }
}

game = connect(mapStateToProps,mapDispatchToProps)(game);

export default game;
