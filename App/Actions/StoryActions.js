export const SET_AUDIO_PLAYING = "SET_AUDIO_PLAYING"
export const setAudioPlaying = (playingFlag) =>{
    return {
        type:  SET_AUDIO_PLAYING,
        payload: playingFlag
    }

}