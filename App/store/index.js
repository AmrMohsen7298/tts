import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_AUDIO_PLAYING,
  SHOW_NAVBAR,
  ADD_TO_LEARNED,
  REMOVE_FROM_LEARNED,
  SET_KEYWORDS,
  REMOVE_KEYWORDS,
  SET_KEYWORDS_LIST,
  SET_USER_KEYWORDS,
  REMOVE_USER_KEYWORDS,
  CURRENT_UID,
  IS_SUBSCRIBED,
} from '../Actions/StoryActions';

import {createStore, combineReducers} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  storyAudioPlaying: false,
  favorites: [],
  showNavbar: true,
  learned: [],
  keywords: [],
  userKeywords: [],
  uid: '',
  isSubscribed: false,
  // Define your initial state properties here
};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

  whitelist: ['storyReducer'],
};
const reducer = (state = initialState, action) => {
  const type = action && action.type;
  const payload = action && action.payload;
  console.log;
  switch (type) {
    case CURRENT_UID:
      return {
        ...state,
        uid: payload,
      };
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
    case SET_KEYWORDS:
      return {
        ...state,
        keywords: [
          ...state.keywords.filter(({text}) => text !== payload.text),
          {
            keyword_id: payload.keyword_id ?? 0,
            tutorialId: payload.tutorialId ?? 0,
            type: payload.type,
            description: payload.description ?? '',
            translation: payload.translation,
            keyFlag: payload.keyFlag,
            audio: payload.audio ?? [],
            text: payload.text,
            category: payload.category ?? 'new',
          },
        ],
      };
    case SET_USER_KEYWORDS:
      console.log('SETUSERWORDS', state);
      return {
        ...state,
        userKeywords: [
          ...state.userKeywords?.filter(({text}) => text !== payload.text),
          {
            keyword_id: payload.keyword_id ?? 0,
            tutorialId: payload.tutorialId ?? 0,
            type: payload.type,
            description: payload.description ?? '',
            translation: payload.translation,
            keyFlag: payload.keyFlag,
            audio: payload.audio ?? [],
            text: payload.text,
            category: payload.category ?? 'new',
          },
        ],
      };
    case REMOVE_USER_KEYWORDS:
      return {
        ...state,
        userKeywords: [
          ...state.userKeywords?.filter(({text}) => text !== payload.text),
        ],
      };
    case REMOVE_KEYWORDS:
      console.log('STATE', state.keywords);
      return {
        ...state,
        keywords: [...state.keywords.filter(({text}) => text !== payload.text)],
      };
    case SET_KEYWORDS_LIST:
      return {
        ...state,
        keywords: [...state.keywords, ...payload],
      };
    case IS_SUBSCRIBED:
      return {
        ...state,
        isSubscribed: payload,
      };
    default:
      return state;
  }
  // Handle different action types and update the state accordingly
};
const rootReducer = combineReducers({
  storyReducer: reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);
export {store, persistor};
