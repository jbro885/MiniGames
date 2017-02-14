import React from 'react';
import {Button,Grid,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import ChatWindow from '../components/ChatWindow';


function getBottom(won,lost,incrementOnClick){
  if(won){
    return <h2>Congratulations You Won!</h2>
  }
  if(lost){
    return <h2>Sorry, You Lost!</h2>
  }
  return <Button onClick={incrementOnClick}>Click</Button>

}

let game = ({count,enemyCount,incrementOnClick,won,lost}) =>{

  return (

      <Grid>
        <Col md={9}>
          <div>
            <h1>Clicker Race</h1>
            <h2>Your Count: {count}</h2>
            <h2>Enemy Count: {enemyCount}</h2>
            {getBottom(won,lost,incrementOnClick)}
          </div>
        </Col>
        <Col md={3}>
          <ChatWindow></ChatWindow>
        </Col>
      </Grid>
  )
}


function mapDispatchToProps(dispatch){
  return{
    incrementOnClick: () => {
      dispatch({type:'SEND_CLICK'})
    }
  }
}

const mapStateToProps = (state) =>{
  return {
    count:state.gameClicker.count,
    enemyCount:state.gameClicker.enemyCount,
    won:state.gameClicker.won,
    lost:state.gameClicker.lost,
  }
}
game = connect(mapStateToProps,mapDispatchToProps)(game);

export default game;
