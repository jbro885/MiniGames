import React from 'react';
import { Jumbotron,Button,Modal} from 'react-bootstrap';

 class QuickJoin extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      time : 0
    }
  }
  componentDidMount(){
    this.timerID = setInterval(
      ()=> this.tick(),
      1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      time: this.state.time + 1
    })
  }



  render(){
    //TODO get estimated wait times

    return (
      <Modal.Dialog>
        <br/>
        <Jumbotron style={{textAlign:'center'}}>
          <h1>Game: {this.props.game}</h1>
          <p>Wating on a match</p>

          <p>Time Elapsed: {this.state.time } sec </p>

            <Button bsStyle="success" disabled onClick={this.handleAccept}>Accept</Button>
            <Button bsStyle="danger" onClick={()=>{
              this.props.setWindow(false);
              this.props.cancelQuickJoin();
            }}>Cancel</Button>

        </Jumbotron>
      </Modal.Dialog>

    )
  }
}
export default QuickJoin;
