import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';


import store from './store';
// make sure to connect the socket before rendering the page.
store.dispatch({type:'INIT_SOCKET'});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
//store.dispatch({type:'GET_MESSAGE',payload:{name: 'Shane', message: 'Hatters gonna hate'}});
//store.dispatch({type:'GET_MESSAGE',payload:{name: 'Shane', message: 'What is wrong with me'}});
//store.dispatch({type:'CONNECT_SOCKET',payload:{}});
