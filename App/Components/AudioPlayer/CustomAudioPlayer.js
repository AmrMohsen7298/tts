import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text,Dimensions } from "react-native";
import Sound from "react-native-sound";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlaying } from "../../Actions/StoryActions";
import RNFetchBlob from 'rn-fetch-blob';
const {width, height} = Dimensions.get('window');
const CustomAudioPlayer = ({ audioUrl, setHighlightIndex, selectedSentence, timePoints, storyParagraph, setTranslationHighlightIndex }) => {
  const sound = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const [onRepeat, setOnRepeat] = useState(false);
  const [onRepeatHighlight, setOnRepeatHighlight] = useState();
  const storyAudioPlaying = useSelector(state=>state.storyReducer.storyAudioPlaying)
  let timeouts = []
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsPlaying(false);
        dispatch(setAudioPlaying(false));
        setHighlightIndex([]);
        if (sound.current) {
          sound.current.release();
        }
      };
    }, [])
  );
  useEffect(() => {
    if (timePoints && storyParagraph && isPlaying) {
      setHighlightIndex([]); // Reset highlight index array
      const sentences = storyParagraph.split('.').filter(sentence => sentence.trim() !== '');
      let delay = 0; // Initialize delay for setTimeout
      const words = storyParagraph.split(/[\s.]+/).map((word, index) => index);
      let sentenceIndex = 0;
  
      const highlightWordsRecursive = async () => {
        if (sentenceIndex < sentences.length) {
          let wordIndexes = [];
          const sentence = sentences[sentenceIndex];
          console.log("SENTENCES",sentence)
          const sentenceWords = sentence.split(" ");
          for (let i = 0; i < sentenceWords.length; i++) {
            wordIndexes.push(words.shift()); // Collect word indexes for the current sentence
          }
          if(sentenceIndex == 0){
            setHighlightIndex([...wordIndexes])
            setTranslationHighlightIndex([sentenceIndex])
          }else{
          delay =timePoints[sentenceIndex - 1] * 1000; 
          console.log("timePoints", timePoints)
           timeouts.push(ZOBREMANGA(delay, wordIndexes, sentenceIndex)); 
          }// Await ZOBREMANGA function
//           if (sentenceIndex !== 0) {
// // Update delay
//           }
          sentenceIndex++;
          highlightWordsRecursive(); // Call recursively for the next sentence
        }
      };
  
      highlightWordsRecursive(); // Start highlighting recursively
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts =[] // Clear all timeouts
      };
    }
  }, [timePoints, storyParagraph, isPlaying, onRepeatHighlight]);
  
  const ZOBREMANGA = (delay, wordIndexes, sentenceIndex) => {
      return setTimeout(() => {
        setHighlightIndex([...wordIndexes]);
        setTranslationHighlightIndex([sentenceIndex])
 // Resolve the promise after setting highlight index
      }, delay);
  };
  useEffect(() => {
    if(audioUrl){
    const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio.mp3`;

    async function saveAudioToFileSystem() {
      try {
        // Save the audio Blob to the file system
        await RNFetchBlob.fs.writeFile(filePath, audioUrl, 'base64');
        sound.current = new Sound(filePath, "", (error) => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          console.log("duration in seconds: " + sound.current.getDuration() + "number of channels: " + sound.current.getNumberOfChannels());
        });
      } catch (error) {
        console.error("Error while saving audio to file system:", error);
      }
    }
  
    saveAudioToFileSystem();
    transcribeAudio(filePath)
  }
  
    // return () => {
    //   if (sound.current) {
    //     sound.current.release();
    //   }
    }, [audioUrl]);
    useEffect(()=>{
      if(!storyAudioPlaying){
        stopSound()
      }

    },[storyAudioPlaying])

    const transcribeAudio = async (audioFilePath) => {
      try {
        const audioData = await RNFetchBlob.fs.readFile(audioFilePath, 'base64');
        const response = await fetch('https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBQtRaiCZXfOMkgn4gQAcw46TKROwPzkbs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: {
              content: audioData,
            },
            config: {
              encoding: 'LINEAR16',
              sampleRateHertz: 16000,
              languageCode: 'en-US',
              alternativeLanguageCodes: [
                'ar-EG',
                'en-US'
              ],
              enableWordTimeOffsets: true,
            },
          }),
        });
    
        const data = await response.json();
        // Process the response data containing the transcription and timestamps
        console.log("GOOGLE_DATA",data);
      } catch (error) {
        console.error('Error transcribing audio:', error);
      }
    };

  const playSound = async () => {
          sound.current.play(((success)=>{
            if(success){
                setIsPlaying(false);
                dispatch(setAudioPlaying(false));
                setHighlightIndex([]);
                setTranslationHighlightIndex([])
            }
          }));
          setIsPlaying(true);
          dispatch(setAudioPlaying(true));
  };

  const stopSound = () => {
    if (sound.current) {
      sound.current.stop();
      setIsPlaying(false);
      dispatch(setAudioPlaying(false));
      setHighlightIndex([]);
      setTranslationHighlightIndex([])
      timeouts.forEach(timeout => clearTimeout(timeout));
      timeouts =[]
    }
  };
  
  const repeatSound = () =>{
    let timeout;
    if(!onRepeat){
        sound.current.setNumberOfLoops(-1)
        timeout = setTimeout(()=>{
          if(onRepeat){
              sound.current.getCurrentTime((sec)=>{
              if(sec >= sound.current.getDuration()){
              console.log("sec la", sec)
              setHighlightIndex([])
              setOnRepeatHighlight(true)
              }
          })
        }
        },1000)
    }else{
        sound.current.setNumberOfLoops(0)
        timeout = null;
    }
    setOnRepeat(!onRepeat)
  }

  const RoundedButton = ({ onPress, disabled, iconName, width, height }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : "#42BB7E",
        borderRadius: 25,
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:width*0.18,
        marginVertical:height*0.05
      }}
    >
      <Ionicons name={iconName} size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.08)",
           
            paddingVertical:height*0.033,
            width: width * 0.4,
            borderRadius: 50,
            height: height * 0.06,
          }}
        >
          <RoundedButton onPress={playSound} disabled={isPlaying} iconName="play" width={width * 0.1} height={height * 0.05} onRepeat={false} />
          <RoundedButton onPress={stopSound} disabled={!isPlaying} iconName="stop" width={width * 0.1} height={height * 0.05} onRepeat={true} />
          <TouchableOpacity
      onPress={repeatSound}
      disabled={false}
      style={{
        backgroundColor: !onRepeat ? "#ccc" : "#42BB7E",
        borderRadius: 25,
        width: width * 0.1,
        height: height * 0.05,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:width*0.02,
        marginVertical:height*0.02
      }}
    >
      <Ionicons name="repeat" size={20} color="white" />
    </TouchableOpacity>
        </View>
        {selectedSentence && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.08)",
              padding: 1,
              width: width * 0.35,
              borderRadius: 60,
              height: height * 0.06,
            }}
          >
            <RoundedButton onPress={playSound} disabled={isPlaying} iconName="play" width={width * 0.1} height={height * 0.05} />
            <Text>sentences</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default CustomAudioPlayer;
