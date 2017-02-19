import React from 'react';
//import {Button,FormControl,Grid,Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import game from './matter/index.js';



class matter extends React.Component{
  constructor(props){
    super(props);
    //console.log(props);
    this.singlePlayer = props.singlePlayer;
    //console.log(this.singlePlayer);
  }

  componentDidMount(){
    console.log('componentDidMount');
    //game();
    //console.log(this.singlePlayer);
    if(this.singlePlayer)
      game.init(true);

  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    //game.destroy();

  }

  render(){
    return (
      <div id="matter-js">
      </div>
    )
  }
  //<h1>Matter JS Demo</h1>

}


function mapDispatchToProps(dispatch){
  return{
  }
}


function mapStateToProps (state,ownProps) {
  return {
    hrmm:state,
    hrmmm:ownProps
  }
}


matter = connect(mapStateToProps,mapDispatchToProps)(matter);
export default matter;
