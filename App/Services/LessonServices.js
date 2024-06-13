import axios from "axios";

export const getAllLessons = async() =>{
    return await axios.get('https://tts.eliteacademyeg.com/api/tutorials',{method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response => response.data)

    .catch(error => {
      console.error("errorlessons",error);
    });
}

export const getStoryAudio = async(storyId)=>{
    return await fetch(`https://tts.eliteacademyeg.com/tts/paragraph/${storyId}`)
    .then( response => response.blob())


    .catch(error => {
      console.error("erroraudio",error);
    });
}
export const getAudioTimePoints = async(storyId)=>{
    return await axios.get(`https://tts.eliteacademyeg.com/tts/paragraph/timepoint/${storyId}`,{method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response=> response.data)
    .catch(error=>{
        console.log("errortimepoints", error)
    })
}
export const getLessonById = async(lessonId)=>{
    return await axios.get(`https://tts.eliteacademyeg.com/api/tutorials/${lessonId}`,{method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getStoryById = async(lessonId)=>{
    console.log("getSTory", lessonId)
    return await axios.get(`https://tts.eliteacademyeg.com/api/v1/story/tutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getquestionbyId = async(lessonId)=>{
    console.log("getquestionbyId", lessonId)
    return await axios.get(`https://tts.eliteacademyeg.com/api/v1/quiz/tutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getkeywordsbyId = async(lessonId)=>{
    console.log("getkeywordsbyId", lessonId)
    return await axios.get(`https://tts.eliteacademyeg.com/keywords/getByTutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}

export const getgrammerByid = async(lessonId)=>{
    console.log("getgrammerByid", lessonId)
    return await axios.get(`https://tts.eliteacademyeg.com/api/grammars/getTutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getWordByText = async(word, tutorialId) =>{
    return await  axios.get(`https://tts.eliteacademyeg.com/keywords/text`,{params:{
        word,
        tutorialId
    }})
    .then(res => res.data)
    .catch(error=>{
        console.log("error", error)
    })
}