import store from '../store';

const defaultGameState{
  game: "Not Provided",

}

const getGame = (state = defaultGameState, action) => {
//  console.log(action);
  switch (action.type) {
    case 'SET_GAME':
      return {...state,game:action.payload};
    default:
      return state;
  }

}

export default getGame;
