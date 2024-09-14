// src/StateContext.js

import React, { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';

const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateValue = () => useContext(StateContext);

export { StateProvider, useStateValue };