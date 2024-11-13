// src/reducer.js

const initialState = {
  showNavbar: true,
  user: null,
  isSubscribed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_NAVBAR':
      return {...state, showNavbar: action.payload};
    case 'CURRENT_USER':
      return {...state, user: action.payload};
    case 'IS_SUBSCRIBED':
      return {...state, isSubscribed: action.payload};
    default:
      return state;
  }
}

export { initialState, reducer };

