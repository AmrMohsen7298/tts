export const SET_AUDIO_PLAYING = "SET_AUDIO_PLAYING"
export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const setAudioPlaying = (playingFlag) =>{
    return {
        type:  SET_AUDIO_PLAYING,
        payload: playingFlag
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