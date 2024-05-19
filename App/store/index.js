
import { SET_AUDIO_PLAYING } from "../Actions/StoryActions";
import { combineReducers, createStore } from "redux";

const initialState = {
    storyAudioPlaying: false

    // Define your initial state properties here
    
    };
const reducer = (state = initialState, action) => {
    const type = action && action.type;
    const payload = action && action.payload;
    switch(type){
        case SET_AUDIO_PLAYING:
            return{
                ...state,
                storyAudioPlaying: payload
            }
    }
    return state;
    // Handle different action types and update the state accordingly
    };
    const rootReducer = combineReducers({
        storyReducer: reducer
    })
 const store = createStore(rootReducer);
 export default store;