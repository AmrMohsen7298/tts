import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_AUDIO_PLAYING,
  SHOW_NAVBAR,
  ADD_TO_LEARNED,
  REMOVE_FROM_LEARNED,
} from '../Actions/StoryActions';
import {combineReducers, createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  storyAudioPlaying: false,
  favorites: [],
  showNavbar: true,
  learned: [],
  // Define your initial state properties here
};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducer = (state = initialState, action) => {
  const type = action && action.type;
  const payload = action && action.payload;
  console.log;
  switch (type) {
    case SET_AUDIO_PLAYING:
      return {
        ...state,
        storyAudioPlaying: payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: !state.favorites.some(id => id == payload)
          ? [...state.favorites, payload]
          : state.favorites,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== payload),
      };
    case SHOW_NAVBAR:
      return {
        ...state,
        showNavbar: payload,
      };
    case ADD_TO_LEARNED:
      return {
        ...state,
        learned: !state.learned.some(id => id == payload)
          ? [...state.learned, payload]
          : state.learned,
      };
    case REMOVE_FROM_LEARNED:
      return {
        ...state,
        learned: state.learned.filter(id => id !== payload),
      };
  }
  return state;
  // Handle different action types and update the state accordingly
};
const rootReducer = combineReducers({
  storyReducer: reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
