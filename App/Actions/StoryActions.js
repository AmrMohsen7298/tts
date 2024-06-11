export const SET_AUDIO_PLAYING = "SET_AUDIO_PLAYING"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const SHOW_NAVBAR = "SHOW_NAVBAR"
export const ADD_TO_LEARNED = "ADD_TO_LEARNED"
export const REMOVE_FROM_LEARNED = "REMOVE_FROM_LEARNED"
export const setAudioPlaying = (playingFlag) =>{
    return {
        type:  SET_AUDIO_PLAYING,
        payload: playingFlag
    }

}
export const setShowNavbar = (showNavbar) =>{
    return {
        type:  SHOW_NAVBAR,
        payload: showNavbar
    }
}
export const addToLearned = (lessonId) =>{
    return {
        type: ADD_TO_LEARNED,
        payload: lessonId
    }
}

export const removeFromLearned = (lessonId) =>{
    return {
        type: REMOVE_FROM_LEARNED,
        payload: lessonId
    }
}

export const addFavorite = (lessonId) =>{
    return {
        type: ADD_FAVORITE,
        payload: lessonId
    }
}
export const removeFavorite = (lessonId) =>{
    return {
        type: REMOVE_FAVORITE,
        payload: lessonId
    }
}