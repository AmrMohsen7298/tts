import axios from "axios";

export const getAllLessons = async (level = 'اولي ابتدائي', page = 0, size = 10) => {
    try {
        console.log(level, page, size);
        const response = await axios.get(`https://bel-arabi.com/api/tutorials/level/${level}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        console.error("errorlessons", error);  // Optional: throw the error so it can be caught where the function is called
    }
}
export const getFreeLessons = async (page = 0) => {
    try {
        
        const response = await axios.get(`https://bel-arabi.com/api/tutorials/free`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        });
       
        return response.data;
    } catch (error) {
        console.error("errorlessons", error);  // Optional: throw the error so it can be caught where the function is called
    }
}


export const getStoryAudio = async(storyId)=>{
    return await fetch(`https://bel-arabi.com/tts/paragraph/${storyId}`)
    .then( response => response.blob())


    .catch(error => {
      console.error("erroraudio",error);
    });
}
export const getAudioTimePoints = async(storyId)=>{
    return await axios.get(`https://bel-arabi.com/tts/paragraph/timepoint/${storyId}`,{method: 'GET',
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
    return await axios.get(`https://bel-arabi.com/api/tutorials/${lessonId}`,{method: 'GET',
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
    return await axios.get(`https://bel-arabi.com/api/v1/story/tutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getquestionbyId = async(lessonId)=>{
    console.log("getquestionbyId", lessonId)
    return await axios.get(`https://bel-arabi.com/api/v1/quiz/tutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getKeywordsbyTutorialId = async(lessonId)=>{
    console.log("getkeywordsbyId", lessonId)
    return await axios.get(`https://bel-arabi.com/keywords/getByTutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}

export const getGrammerByTutorialId = async(lessonId)=>{
    console.log("getgrammerByid", lessonId)
    return await axios.get(`https://bel-arabi.com/api/grammars/getTutorial/${lessonId}`)
    .then(resp=> resp.data)
    .catch(error=>{
        console.log("error",error)
    }
    )
}
export const getWordByText = async(word, tutorialId) =>{
    return await  axios.get(`https://bel-arabi.com/keywords/text`,{params:{
        word,
        tutorialId
    }})
    .then(res => res.data)
    .catch(error=>{
        console.log("error", error)
    })
}
export const getQuizByTutorialId = async(lessonId) =>{
    return await  axios.get(`https://bel-arabi.com/api/v1/quiz/tutorial/${lessonId}`)
    .then(res => res.data)
    .catch(error=>{
        console.log("error", error)
    })
}
export const getKeyWordsForTraining =async()=>{
    return await  axios.get(`https://bel-arabi.com/keywords/getForTraining`)
    .then(res => res.data)
    .catch(error=>{
        console.log("error", error)
    })
}