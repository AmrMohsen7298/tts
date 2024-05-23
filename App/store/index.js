
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_AUDIO_PLAYING } from "../Actions/StoryActions";
import { combineReducers, createStore } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {
    storyAudioPlaying: false,
    favorites: []

    // Define your initial state properties here
    
    };
const persistConfig = {
        key: 'root',
        storage,
    }
const reducer = (state = initialState, action) => {
    const type = action && action.type;
    const payload = action && action.payload;
    switch(type){
        case SET_AUDIO_PLAYING:
            return{
                ...state,
                storyAudioPlaying: payload
            }
        case ADD_FAVORITE:
            return{
                ...state,
                favorites: [...state.favorites, payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorties: state.favorites.filter((id)=>id !== payload)
            }
    }
    return state;
    // Handle different action types and update the state accordingly
    };
    const rootReducer = combineReducers({
        storyReducer: reducer
    })
    const persistedReducer = persistReducer(persistConfig, rootReducer)
 const store = createStore(rootReducer);
 const persistor = persistStore(store)
 export {store,persistor}