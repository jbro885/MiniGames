
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers'
import { createStore , applyMiddleware } from 'redux'

const middleware = applyMiddleware(logger(),thunk);
const store = createStore(reducer,middleware);

export default store;
