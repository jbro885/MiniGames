import React, { Component } from 'react';
import {Router, Route, hashHistory} from 'react-router';
import home from './routes/GameList';
import lobby from './routes/Lobby';
import game from './routes/Game';
//import quickJoin from './routes/QuickJoin';
//import game from './routes/games/Clicker';
let logger = require('../../common/logger')(true);
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={home}/>
          <Route path="/lobby/:game" component={lobby}></Route>
          <Route path="/game/:game" component={game}></Route>
          <Route path="/game/:game/:singlePlayer" component={game}></Route>
        </Router>
    </div>
    );
  }
}

logger.info('App setup done');
export default App;
