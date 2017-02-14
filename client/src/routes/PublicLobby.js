import React from 'react';
import {FormControl,Grid,Col} from 'react-bootstrap';

let names = ['Joe','Sam','Shane','Bob'];
let text = '\'s Game';
let games = names.map((str) => <li key={str}>{str}{text}</li>);
const PublicLobby = () =>{
  return (
    <div>
    <div><br/></div>
      <Grid>
        <Col md={12}>
          <FormControl type="text" placeholder="Search Public Games"/>
        </Col>
      </Grid>
      <br/>
      <ul>
          {games}
      </ul>
    </div>
  )
}

export default PublicLobby;
