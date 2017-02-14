import React from 'react';
import {Button,FormControl,Grid,Col} from 'react-bootstrap';


const CreateLobby = () =>{
  return (
    <div>
    <div><br/></div>
    <Grid>
      <Col md={4}>
        <FormControl type="text" placeholder="Game name"/>
      </Col>
      <Col md={4}>
        <FormControl type="password" placeholder="Game password"/>
      </Col>
      <Col md={4}>
        <Button bsStyle="success">Create Game</Button>
      </Col>
    </Grid>
    <div><br/></div>
    </div>
  )
}

export default CreateLobby;
