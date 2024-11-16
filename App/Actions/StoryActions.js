export const SET_AUDIO_PLAYING = 'SET_AUDIO_PLAYING';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SHOW_NAVBAR = 'SHOW_NAVBAR';
export const ADD_TO_LEARNED = 'ADD_TO_LEARNED';
export const REMOVE_FROM_LEARNED = 'REMOVE_FROM_LEARNED';
export const SET_KEYWORDS = 'SET_KEYWORDS';
export const REMOVE_KEYWORDS = 'REMOVE_KEYWORDS';
export const SET_KEYWORDS_LIST = 'SET_KEYWORDS_LIST';
export const SET_USER_KEYWORDS = 'SET_USER_WORDS';
export const REMOVE_USER_KEYWORDS = 'REMOVE_USER_WORDS';
export const CURRENT_USER = 'CURRENT_USER';
export const IS_SUBSCRIBED = 'IS_SUBSCRIBED';

export const setCurrentUser = uid => {
  return {
    type: CURRENT_USER,
    payload: uid,
  };
};
export const setAudioPlaying = playingFlag => {
  return {
    type: SET_AUDIO_PLAYING,
    payload: playingFlag,
  };
};
export const setShowNavbar = showNavbar => {
  return {
    type: SHOW_NAVBAR,
    payload: showNavbar,
  };
};
export const addToLearned = lessonId => {
  return {
    type: ADD_TO_LEARNED,
    payload: lessonId,
  };
};

export const removeFromLearned = lessonId => {
  return {
    type: REMOVE_FROM_LEARNED,
    payload: lessonId,
  };
};

export const addFavorite = lessonId => {
  return {
    type: ADD_FAVORITE,
    payload: lessonId,
  };
};
export const removeFavorite = lessonId => {
  return {
    type: REMOVE_FAVORITE,
    payload: lessonId,
  };
};

export const setWordTraining = payload => {
  return {
    type: SET_KEYWORDS,
    payload,
  };
};

export const removeWordTraining = payload => {
  return {
    type: REMOVE_KEYWORDS,
    payload,
  };
};
export const setWordsTrainingList = payload => {
  return {
    type: SET_KEYWORDS_LIST,
    payload,
  };
};
export const setUserWords = payload => {
  return {
    type: SET_USER_KEYWORDS,
    payload,
  };
};

export const removeUserWords = payload => {
  return {
    type: REMOVE_USER_KEYWORDS,
    payload,
  };
};

export const setIsSubscribed = payload => {
  return {
    type: IS_SUBSCRIBED,
    payload,
  };
};
