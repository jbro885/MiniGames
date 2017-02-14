import React from 'react';
import {Button,FormControl,FormGroup,InputGroup, Well} from 'react-bootstrap';
import { connect } from 'react-redux';



let chatWindow = ({sendMessage,setInput,inputText,messages,name,setName})=>{

  let hrrms = messages.map((m,index)=>
  (<span key={index}>
      {m.name}: {m.message}
      <br/>
      </span>)
  );

  function handleChange(event){
    setInput(event.target.value);
  }
  function handleBlur(event){
    setName(event.target.value);
  }


  function enterPressed(event){
    if(event.key === 'Enter'){
      sendMessage(inputText);
    }
  }


  return(
    <div>
      <br/>
      <Well>
        {hrrms}

      </Well>
      <FormGroup>
      <InputGroup>
        <InputGroup.Addon>
          Name
        </InputGroup.Addon>
        <FormControl type="text" placeholder="Type Message..." value={name} onChange={handleBlur}></FormControl>
      </InputGroup>
      <br/>

        <InputGroup>
          <InputGroup.Addon>
            Msg:
          </InputGroup.Addon>
        <FormControl type="text" placeholder="Type Message..." value={inputText} onChange={handleChange} onKeyPress={enterPressed}></FormControl>
        <InputGroup.Button>
          <Button bsStyle="success" onClick={(event)=>sendMessage()}>Send</Button>
        </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </div>
  )
}


function mapDispatchToProps(dispatch){
  return{
    sendMessage: (msg) => {
      dispatch({type:'SEND_MESSAGE'})
    },
    setInput:(msg)=>{
      dispatch({type:'SET_INPUT',payload:msg});
    },
    setName:(name)=>{
      dispatch({type:'SET_NAME',payload:name})
    }
  }
}

function mapStateToProps(state){
  return{
    inputText: state.chatWindow.inputText,
    name: state.chatWindow.name,
    messages: state.chatWindow.messages

  }
}

chatWindow = connect(mapStateToProps, mapDispatchToProps)(chatWindow);

export default chatWindow;
