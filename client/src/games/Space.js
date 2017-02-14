import React from 'react';
//import {Button,FormControl,Grid,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import game from './space/index.js';


class space extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  componentDidMount(){
    console.log('componentDidMount');
    game.init();

  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    game.destroy();

  }

  render(){
    return (
      <div id="space-game">
        <h1>Space game</h1>
      </div>
    )
  }

}


function mapDispatchToProps(dispatch){
  return{
  }
}

const mapStateToProps = (state) =>{
  return {
  }
}


space = connect(mapStateToProps,mapDispatchToProps)(space);
export default space;
