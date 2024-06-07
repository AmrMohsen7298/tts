export const SET_AUDIO_PLAYING = "SET_AUDIO_PLAYING"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const SHOW_NAVBAR = "SHOW_NAVBAR"
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
export const addFavorite = (lessonId) =>{
    return {
        type: ADD_FAVORITE,
        payload: lessonId
    }
}
export const removeFavorite = (lessonId) =>{
    console.log("REMOVEFAV", lessonId)
    return {
        type: REMOVE_FAVORITE,
        payload: lessonId
    }
}