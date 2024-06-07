// src/reducer.js

const initialState = {
    showNavbar: true,
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'SHOW_NAVBAR':
        return { ...state, showNavbar: action.payload };
      default:
        return state;
    }
  }
  
  export { initialState, reducer };
  