// src/reducer.js

const initialState = {
  showNavbar: true,
  user: null,
    isSubscribed: false,
  currentTab : "",
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_NAVBAR':
      return {...state, showNavbar: action.payload};
    case 'CURRENT_USER':
      return {...state, user: action.payload};
    case 'IS_SUBSCRIBED':
          return { ...state, isSubscribed: action.payload };
      case 'activeTab':
          return { ...state, currentTab: action.payload }
    default:
      return state;
  }
}

export { initialState, reducer };

