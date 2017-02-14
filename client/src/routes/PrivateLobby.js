import React from 'react';
import {Button,FormControl,Grid,Col} from 'react-bootstrap';


const PrivateLobby = () =>{
  return (
    <div>
    <div><br/></div>
    <Grid>
      <Col md={12}>
        <FormControl type="text" placeholder="Search Private Games"/>
      </Col>
    </Grid>
      <div><br/></div>
    <Grid>
      <Col md={4}>
        <FormControl type="text" placeholder="Name"/>
      </Col>
      <Col md={4}>
        <FormControl type="password" placeholder="Password"/>
      </Col>
      <Col md={4}>
        <Button bsStyle="success">Join</Button>
      </Col>
    </Grid>
    <div><br/></div>

      <ul>
        <li>Secret Game</li>
        <li>Dont join pass is "dog"</li>
      </ul>
      </div>
  )
}

export default PrivateLobby;
