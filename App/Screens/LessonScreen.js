import React, {useEffect, useRef, useState,useCallback, useLayoutEffect } from 'react';
// import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  findNodeHandle,
  measureLayout,
  ActivityIndicator ,
  measure
} from 'react-native';
import TextHighlighter from './../Components/TextHighlighter';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import { faDumbbell, faPlay } from "@fortawesome/free-solid-svg-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';

import pic from '../../assets/Images/bird.jpg';
import Colors from '../Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import KeywordCard from '../Components/KeyWordCard/KeywordCard';
import Card from '../Components/Card';
import {LessonTabs} from '../Utils/constants';
import {
  getAudioTimePoints,
  getGrammerByTutorialId,
  getKeywordsbyTutorialId,
  getQuizByTutorialId,
  getStoryAudio,
  getStoryById,
  getWordByText,
} from '../Services/LessonServices';

import CircularProgress from '../Utils/pie';
import {useFocusEffect} from '@react-navigation/native';
import {connect, useDispatch, useSelector} from 'react-redux';
import CustomAudioPlayer from '../Components/AudioPlayer/CustomAudioPlayer';
import {
  addFavorite,
  addToLearned,
  removeFavorite,
  removeFromLearned,
  removeUserWords,
  removeWordTraining,
  setAudioPlaying,
  setUserWords,
  setWordTraining,
  setWordsTrainingList,
} from '../Actions/StoryActions';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import {useStateValue} from '../store/contextStore/StateContext';
import { text } from '@fortawesome/fontawesome-svg-core';
import { FlatList } from 'react-native-gesture-handler';
// import CustomAudioPlayer from "../Components/AudioPlayer/CustomAudioPlayer";

const {width, height} = Dimensions.get('window');

// const quizData = [
//   {
//     question_ID: 1,
//     quiz_id: 1,
//     code: 'vcr4', // Assuming there's no code associated with these questions
//     text: 'عدم اهتمام ___ مجالات البحث العلميّ في استخدام اللّغة العربيّة للتعلم الكلغةٍ خاصّة في الأبحاث الأكاديميّة والعلميّة',
//     choices: 'مُعظم,بعض,شيئ',
//     answer: 'مُعظم', // No answer provided in the data
//   },
//   {
//     question_ID: 2,
//     quiz_id: 1,
//     code: 'cdw2',
//     text: 'تُعدّ ___ من أهمّ العواملِ المؤثّرةِ على نموّ الشركاتِ الناشئةِ في الدولِ الناميةِ.',
//     choices: 'التمويل,الابتكار,المواردُ البشريّةُ',
//     answer: 'التمويل',
//   },
//   {
//     question_ID: 3,
//     quiz_id: 1,
//     code: 'ncd7',
//     text: 'يواجهُ ___ من الطلاب صعوباتٍ في فهمِ مفاهيمِ الرياضياتِ، خاصّةً في المراحلِ الثانويّةِ.',
//     choices: 'معظم,بعض,عددٌ قليلٌ',
//     answer: 'معظم',
//   },
//   {
//     question_ID: 4,
//     quiz_id: 1,
//     code: 'fn37',
//     text: 'يُؤدّي ___ من التغيّراتِ المناخيّةِ إلى تفاقمِ ظاهرةِ الجفافِ في مختلفِ أنحاءِ العالمِ.',
//     choices: 'ارتفاعُ درجاتِ الحرارة,تغيّرُ أنماطِ الهطول,زيادةُ ظاهرةِ التصحر',
//     answer: 'ارتفاعُ درجاتِ الحرارة',
//   },
// ];

const DoneLearning = ({lessonId}) => {
  const learned = useSelector(state => state.storyReducer.learned);
  const dispatch = useDispatch();
if(!learned){
  learned=[]
}
else{

  return (
    <View style={styles.buttonWrapper}>
      <View
        style={{
          ...styles.buttonContainer,
          backgroundColor: learned?.some(id => id == lessonId)
            ? '#eaaa00'
            : '#333',
        }}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            !learned?.some(id => id == lessonId)
              ? dispatch(addToLearned(lessonId))
              : dispatch(removeFromLearned(lessonId));
          }}>
          <Text style={styles.touchableText}>
            <Ionicons name="checkmark-outline" size={20} color="white" /> تم
            التعلم
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
};

export default function LessonScreen(props) {
  const favorites = useSelector(state => state.storyReducer.favorites);
  const userKeywords = useSelector(state => state.storyReducer.userKeywords);

  const [activeTab, setActiveTab] = useState(0);
  const [playPressed, setPlayPressed] = useState(false);
  const [trainingPressed, setTrainingPressed] = useState(false);

  const tabs = [
    LessonTabs.STORY,
    LessonTabs.QUIZ,
    LessonTabs.KEYWORDS,
    LessonTabs.GRAMMAR,
  ];
  const [storyParagraph, setStoryParagraph] = useState();
  const [storySentences, setStorySentences] = useState();
  const [audioSrc, setAudioSrc] = useState();
  const [highlightIndex, setHighlightIndex] = useState();
  const [selectedWord, setSelectedWord] = useState();
  const [selectedWordAudio, setSelectedWordAudio] = useState();
  const [SelectedWordTranslation, setSelectedWordTranslation] = useState();
  const [translation, setTranslation] = useState();
  const [name, setName] = useState();
  const [translateButton, setTranslateButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerPressed, setAnswerPressed] = useState(false);
  const [quizData, setQuizData] = useState();
  const [lessonKeyWords, setLessonKeyWords] = useState();
  const [grammar, setGrammar] = useState();
  const [score, setScore] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [favoriteButton, setfavoriteButton] = useState(
    favorites.some(id => id == props?.route?.params?.lessonId),
  );
  const {state, dispatch: contextDispatch} = useStateValue();
  const dispatch = useDispatch();
  const re = new RegExp('[.,;:\\s?!]+');
  const [timePoints, setTimePoints] = useState([]);
  const sound = useRef();
  const storyAudioPlaying = useSelector(
    state => state.storyReducer.storyAudioPlaying,
  );
  const [translationHighlightIndex, setTranslationHighlightIndex] = useState();
  const [layoutIds, setLayoutIds] = useState([])
  const scrollStory = useRef();
  const textRef = useRef();
  const [loading, setLoading] = useState(false);
  let scrollView
  // const [sentenceHeights, setSentenceHeights] = useState([]);
  const [wordHeights, setWordHeights] = useState([]);
  const translationRef = useRef({});
  const wordsRef = useRef({})
  const pressableRefs = useRef({})
  const sentenceHeights = useRef([])

  // useLayoutEffect(()=>{
  //   setWordHeights(pressablePositions)
  // },[])
  // useEffect(()=>{
  //   setWordHeights(pressablePositions)
  // },[pressablePositions])
  useEffect(()=>{
    if(wordHeights.length-1 == storyParagraph?.split(/[\s.,!?؛؟«»؟،٫]+/).filter(sentence => sentence.trim() !== '')?.length-1){
      setLoading(false)
    }
  },[wordHeights])
  const handleWordLayout = useCallback((index, event)=>{
    console.log("word index",index)
    const { y } = event.nativeEvent.layout;
    if(!wordsRef.current[index]){
    setWordHeights((prevHeights) => {
        wordsRef.current[index] = true
        console.log("prevHeights",prevHeights)
        const newHeights = [...prevHeights];
    
        newHeights[index] = y;
        return newHeights;
      })
    }
  },[wordHeights])
  // useEffect(()=>{
  //   const pressables = Object.values(pressableRefs.current);
  //   const heights = {};

  //   pressables.forEach((pressableRef) => {
  //     const rect = pressableRef.current.getBoundingClientRect();
  //     heights[pressableRef.key] = rect.top;

  //   });
  //   setWordHeights(heights)
  // },[pressableRefs])
 

  const handleSentenceLayout = useCallback((index, event) => {
  const { y } = event.nativeEvent.layout;
  if(!translationRef.current[index]){
    console.log("sentence", event.nativeEvent.layout)
    sentenceHeights.current[index] = y
  // setSentenceHeights((prevHeights) => {
  //   translationRef.current[index] = true
  //   console.log("prevHeights",prevHeights)
  //   const newHeights = [...prevHeights];

  //   newHeights[index] = y;

  //   return newHeights;
  // })
}
}, [sentenceHeights]); 


// const scrollTo = (index) => {

//   console.log("Scrolling to index", index);

//   console.log("Time points", timePoints);

//   console.log("Sentence heights", sentenceHeights);


//   let cumulativeHeight = 0;

//   for (let i = 0; i <= index; i++) {

//     cumulativeHeight += sentenceHeights[i];

//   }


//   if (scrollStory.current) {

//     scrollStory.current.scrollTo({ y: cumulativeHeight, animated: true });

//   }

// };



const scrollTo = (sentenceIndex, wordIndexes) => {



  // let cumulativeHeight = 0;


  // for (let i = 0; i <= index; i++) {

  //   cumulativeHeight += sentenceHeights[i];

  // }


  if (scrollStory.current) {

    scrollStory.current.scrollTo({ x:0, y: translateButton? sentenceHeights.current[sentenceIndex] : wordHeights?.[wordIndexes?.pop()], animated: true });

  }
  console.log("SENTENCEHEIGHTS", sentenceHeights.current[sentenceIndex])
  console.log("Checking if index is last element:",wordIndexes, sentenceIndex, sentenceHeights.current.length - 1,wordHeights.length -1); 
  console.log("PRESABLE", wordHeights)
  sentenceIndex++

 console.log("last word index :value",wordIndexes.filter(x => x !== undefined).pop())
  if (sentenceIndex ==sentenceHeights.current.length - 1|| ((wordIndexes.filter(x => x !== undefined).pop())+1) == wordHeights.length -1) {

    console.log("Reached the last element, setting timer for last timepoint");
    console.log("Time points", timePoints);
    setTimeout(() => {

      console.log("Timer expired, incrementing index and scrolling back to top");

       // Reset the index to 0

       if (scrollStory.current) {

        scrollStory.current.scrollTo({y: 0, animated: true });
    
      }

    }, (timePoints[0])*1000);

  } else {

    console.log("Not the last element, incrementing index");
  
    

  }

};


  useEffect(() => {
    setLoading(true);
    contextDispatch({type: 'SHOW_NAVBAR', payload: false});
   
    getQuizByTutorialId(props?.route?.params?.lessonId).then(res => {
      setQuizData(res?.questions);
     
    });
    getKeywordsbyTutorialId(props?.route?.params?.lessonId).then(res => {
      res?.map((key)=>{
        dispatch(setWordTraining(key))
      })

      setLessonKeyWords(res)
    
    });
    getGrammerByTutorialId(props?.route?.params?.lessonId).then(res => {
      setGrammar(res);
    });
    getStoryById(props?.route?.params?.lessonId).then(resp => {
     
      setStoryParagraph(resp?.paragraph);
      setTranslation(resp?.translation);
      setName(resp?.name);
      getStoryAudio(resp?.id).then(res => {
        var reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          setAudioSrc(reader?.result?.split(',')[1]);
        };
      });
      getAudioTimePoints(resp?.id).then(res => {
        res?.map(time => {
          setTimePoints(prevTimePoints => [
            ...prevTimePoints,
            time?.['timeSeconds_'],
           
          ]);

        });
      });
    });
  }, []);
  useEffect(() => {
    if (storyParagraph) {
      setStorySentences(storyParagraph.split(['.']));
      
    }
  }, [storyParagraph]);
  // useEffect(()=>{
  //   console.log("TEXTREF", textRef.current)
  //   if(textRef.current){
  //   // console.log("Texttref", textRef.current)
  //   // if(highlightIndex?.some(s=> s ==textRef.current.key)){
  //     console.log("Texttref", textRef.current.rowGap)
  //   //   scrollStory.current.scrollToEnd()
  //     textRef.current.measure((x,y,width,height) => {
  //       const location = {
  //         px: x,
  //         py: y,
  //         width: width,
  //         height: height,
  //       };
  //       console.log('location', location);

  //       textRef.current.focus()
  //     });
  //   // }


  //     // textRef.current.measureLayout(
  //     //   findNodeHandle(scrollStory),
  //     //   (x, y) => {
  //     //     scrollStory.current.scrollTo({x: x, y: y, animated: true});
  //     //   }
  //     // )
  //   }
  // },[highlightIndex])

  useEffect(() => {
    const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio-wordAudio.mp3`;

    async function saveAudioToFileSystem() {
      try {
        // Save the audio Blob to the file system
        await RNFetchBlob.fs.writeFile(filePath, selectedWordAudio, 'base64');
        console.log(filePath);
        sound.current = new Sound(filePath, '', error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          console.log(
            'duration in seconds: ' +
              sound.current.getDuration() +
              'number of channels: ' +
              sound.current.getNumberOfChannels(),
          );
        });
      } catch (error) {
        console.error('Error while saving audio to file system:', error);
      }
    }

    if (selectedWordAudio) {
      saveAudioToFileSystem();
    }
    const playSound = async () => {
      sound.current.play(success => {
        if (success) {
          setPlayPressed(false);
        }
      });
    };
    if (playPressed) {
      playSound();
    }
  }, [playPressed, selectedWordAudio]);

  onPressWord = (word, index) => {
    // storySentences.map((sentence, index)=>{
    //   if(sentence.includes(word))
    //     storySentences.split(" ").findIndex
    // })
    dispatch(setAudioPlaying(false));
    setHighlightIndex([index]);
    //get word logic
    getWordByText(word.split(re)[0], props?.route?.params?.lessonId).then(
      res => {
        setSelectedWord(res?.text);
        setSelectedWordTranslation(res?.translation);
        setSelectedWordAudio(res?.audio);
      },
    );
    setPlayPressed(false);
  };
  const setFavorites = (flag, lessonId) => {
   if(!favorites){
    favorites = []
   }
   else{

     if (flag) {
       dispatch(addFavorite(lessonId));
     } else {
       dispatch(removeFavorite(lessonId));
     }
  
 
     setfavoriteButton(!favoriteButton);
   }
  };

  const checkAnswer = ({question, answer}) => {
    setChosenAnswers(prev => ({...prev, [question.code]: answer}));
    setAnswerPressed(true);
    setChosenAnswer(answer);
    if (question.answer === answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      if (currentIndex + 1 < quizData?.length) {
        setAnswerPressed(false);
      }
    }, 2000);
  };

  const getAnsBgColor = ({question, choice}) => {
    if (!answerPressed) return 'white';
    if (choice === question.answer) return '#eaaa00';
    if (chosenAnswer !== question.answer && choice === chosenAnswer)
      return '#FF3333';
    return 'white';
  };

  const getAnsBorderColor = ({question, choice}) => {
    if (!answerPressed) return '#eaaa00';
    if (choice === question.answer) return '#eaaa00';
    if (chosenAnswer !== question.answer && choice === chosenAnswer)
      return '#FF3333';
    return '#eaaa00';
  };

  const getAnsTextColor = ({question, choice}) => {
    if (!answerPressed) return '#eaaa00';
    if (choice === question.answer) return 'white';
    if (chosenAnswer !== question.answer && choice === chosenAnswer)
      return 'white';
    return '#eaaa00';
  };

  const getResultAnsColor = ({question, chosenAns, currentChoice}) => {
    if (question.answer === currentChoice) return '#eaaa00';
    if (question.answer !== chosenAns && chosenAns === currentChoice)
      return '#FF0000';
    return 'black';
  };

  const renderContent = lessonId => {
    switch (activeTab) {
      case 0:
        return (
          <ScrollView
          ref={scrollStory}
            style={{bottom: 'auto', backgroundColor: 'white',overflow: 'croll'}}
            horizontal={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingHorizontal: 'auto'}}>
            <View style={{display: 'flex', marginVertical: height * 0.02}}>
              <Text style={{fontSize: 30, color: 'black'}}>{name}</Text>
            </View>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: 'white',
                display: 'flex',
                direction: 'rtl',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 15,
                  // padding: 'auto',
                  paddingBottom: height * 0.02,
                  position: 'absolute',
                  right: 1,
                }}>
                <View>
                  <Text style={styles.card_level}>A1</Text>
                </View>

                <MaterialIcons
                  name="translate"
                  size={22}
                  color={translateButton ? '#eaaa00' : 'rgba(0, 0, 0, 0.2)'}
                  onPress={() => setTranslateButton(!translateButton)}
                />
                <MaterialIcons
                  name="favorite"
                  size={22}
                  color={favoriteButton ? 'red' : 'rgba(0, 0, 0, 0.2)'}
                  onPress={() =>
                    favoriteButton
                      ? setFavorites(false, props?.route?.params?.lessonId)
                      : setFavorites(true, props?.route?.params?.lessonId)
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: translateButton ? 'row' : 'row-reverse',
                  flexWrap: 'wrap',
                  gap: translateButton ? 3 : 0,
                  position: 'relative',
                  paddingTop: height * 0.06,
                }}>
                {translateButton
                  ? storyParagraph?.split(".").map((word, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flex: 0,
                            textAlign: 'center',
                            justifyContent: 'center',
                            // overflow: 'hidden',
                            // borderRadius: storyAudioPlaying && (index == highlightIndex[highlightIndex.length-1] || index == highlightIndex[0]) ? 5: 0,
                            borderTopRightRadius:
                              (storyAudioPlaying &&
                                index == translationHighlightIndex?.[0]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderBottomRightRadius:
                              (storyAudioPlaying &&
                                index == translationHighlightIndex?.[0]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderTopLeftRadius:
                              (storyAudioPlaying &&
                                index ==
                                  translationHighlightIndex?.[
                                    translationHighlightIndex?.length - 1
                                  ]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderBottomLeftRadius:
                              (storyAudioPlaying &&
                                index ==
                                  translationHighlightIndex?.[
                                    translationHighlightIndex?.length - 1
                                  ]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            backgroundColor:
                              translationHighlightIndex?.length > 0 &&
                              translationHighlightIndex?.some(idx => idx == index)
                                ? '#eaaa00'
                                : 'transparent',
                            paddingHorizontal: 3,
                            marginVertical: height * 0.005,
                          }}
                          onLayout={(event) => handleSentenceLayout(index, event)}
                          >
                          <Text >
                            <Text
                              style={{
                                color:
                                   'black',
                                borderRadius: 20,
                                fontFamily: 'outfit',
                                fontSize: 20,
                                textAlign: 'center',

                              }} >
                              {word}
                            </Text>
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                            <Text                               style={{
                                color:
                                   'black',
                                borderRadius: 20,
                                fontFamily: 'outfit',
                                fontSize: 20,
                                textAlign: 'center'}}>
                                  {translation?.split(".")?.[index]}</Text>
                          </Text>
                        </View>
                      );
                    })
                  : storyParagraph?.split(/[\s.,!?؛؟«»؟،٫]+/).filter(sentence => sentence.trim() !== '').map((word, index) => {
                  
                      return (
                      
                        <Pressable
                          focusable={true}
                          key={index}
                          ref={(ref) => {

                            pressableRefs.current[index] = ref;
              
                          }}
                          onPress={() => onPressWord(word, index)}
                          style={{
                            flex: 0,
                            textAlign: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            // borderRadius: storyAudioPlaying && (index == highlightIndex[highlightIndex.length-1] || index == highlightIndex[0]) ? 5: 0,
                            borderTopRightRadius:
                              (storyAudioPlaying &&
                                index == highlightIndex?.[0]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderBottomRightRadius:
                              (storyAudioPlaying &&
                                index == highlightIndex?.[0]) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderTopLeftRadius:
                              (storyAudioPlaying &&
                                index ==
                                highlightIndex?.filter(x => x !== undefined).pop() ) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            borderBottomLeftRadius:
                              (storyAudioPlaying &&
                                index ==
                                highlightIndex?.filter(x => x !== undefined).pop() ) ||
                              (!storyAudioPlaying && selectedWord)
                                ? 5
                                : 0,
                            backgroundColor:
                              highlightIndex?.length > 0 &&
                              highlightIndex?.some(idx => idx == index)
                                ? '#eaaa00'
                                : 'transparent',
                            paddingHorizontal: 3,
                            marginVertical: height * 0.005,
                          }}
                          onLayout={(event) => handleWordLayout(index, event)}
                          // onLayout={(event) => {

                          //     const {y} = event.nativeEvent.layout
              
                          //     pressablePositions[index] = y;
              
                          //   }}
                          >
                          <Text
                            // onLayout={(event)=> {
                            //     // console.log("event", event.nativeEvent)
                            //     const {x, y, height, width} = event.nativeEvent.layout;
                            //     setLayoutIds([...layoutIds, y ])
                            //   }
                            // }>
                           
                            >
                            <Text
                              ref={textRef}
                              collapsable={false}
                              samaga={index}
                              style={{
                                color: highlightIndex?.some(idx => idx == index)
                                  ? 'white'
                                  : 'black',
                                fontFamily: 'outfit',
                                fontSize: 20,
                                textAlign: 'center',
                              }} >
                              {word}
                            </Text>
                          </Text>
                        </Pressable>
                      );
                    })}
              </View>
            </View>
          </ScrollView>
        );
      case 1:
        return (
          <>
            {currentIndex < quizData?.length ? (
              <View
                style={{
                  flexDirection: 'column',
                  gap: 40,
                  alignItems: 'center',
                }}>
                {/* <AntDesign
                  name="sound"
                  size={25}
                  color="#eaaa00"
                  style={{marginTop: height * 0.02}}
                /> */}
                <View style={{marginTop: height * 0.02}}>

                </View>
                <Text
                  style={{
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    fontSize: 24,
                    color: 'black',
                  }}>
                  {quizData[currentIndex].text}
                </Text>
                <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
                  {quizData[currentIndex].choices.map(choice => (
                    <TouchableOpacity
                      disabled={answerPressed}
                      style={{
                        ...styles.button,
                        backgroundColor: getAnsBgColor({
                          question: quizData[currentIndex],
                          choice,
                        }),
                        borderColor: getAnsBorderColor({
                          question: quizData[currentIndex],
                          choice,
                        }),
                      }}
                      onPress={() =>
                        checkAnswer({
                          question: quizData[currentIndex],
                          answer: choice,
                        })
                      }>
                      <Text
                        style={{
                          ...styles.buttonText,
                          color: getAnsTextColor({
                            question: quizData[currentIndex],
                            choice,
                          }),
                        }}>
                        {choice}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <ScrollView style={styles.scrollableResults}>
                <View style={styles.resultsHeader}>
                  <View style={styles.resultsHeaderTextContainer}>
                    <Text style={styles.resultsHeaderText}>عمل رائع!</Text>
                    <Text style={styles.resultsBodyText}>
                      لقد حصلت على {score} من {quizData?.length}. إستمر على
                      مستواك!
                    </Text>
                  </View>
                  <View style={styles.resultsHeaderIconContainer}>
                    <Ionicons name="trophy" size={80} color="orange" />
                  </View>
                </View>
                <View style={styles.quizResults}>
                  <Text style={styles.resultsHeaderText}>نتيجتك</Text>
                  <View style={styles.resultsDetailsBox}>
                    <Text style={styles.resultsHeaderText}>
                      <AnimatedCircularProgress
                        size={60}
                        width={6}
                        fill={(score / quizData?.length) * 100}
                        tintColor="#eaaa00"
                        onAnimationComplete={() =>
                          console.log('onAnimationComplete')
                        }
                        backgroundColor="#c73434"
                        rotation={0}>
                        {fill => (
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            {(score / quizData?.length) * 100}%
                          </Text>
                        )}
                      </AnimatedCircularProgress>
                    </Text>
                    <View style={styles.correctIncorrect}>
                      <Text style={styles.correctIncorrectText}>
                        إجابة صحيحة
                      </Text>
                      <Text style={styles.correctIncorrectText}>
                        إجابة غير صحيحة
                      </Text>
                    </View>
                    <View style={styles.correctIncorrect}>
                      <Text
                        style={{
                          ...styles.correctIncorrectNumbers,
                          color: '#eaaa00',
                          backgroundColor: '#eaaa0030',
                        }}>
                        {score}
                      </Text>
                      <Text
                        style={{
                          ...styles.correctIncorrectNumbers,
                          color: '#ff0000',
                          backgroundColor: '#ff000020',
                        }}>
                        {quizData?.length - score}
                      </Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  style={{
                    ...styles.button,
                    borderRadius: width * 0.05,
                    backgroundColor: '#eaaa00',
                    width: width * 0.9,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    setScore(0);
                    setCurrentIndex(0);
                    setAnswerPressed(false);
                  }}>
                  <Text
                    style={{
                      ...styles.buttonText,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 22,
                    }}>
                    إعادة الإمتحان
                  </Text>
                </Pressable>
                <Text
                  style={{
                    ...styles.resultsHeaderText,
                    marginTop: height * 0.03,
                    marginRight: width * 0.05,
                  }}>
                  إجاباتك
                </Text>
                <View
                  style={{
                    ...styles.quizResults,
                    marginTop: 0,
                    gap: height * 0.01,
                  }}>
                  {quizData?.map(question => (
                    <View
                      style={{
                        ...styles.questionResultsDetailsBox,
                        marginTop: 0,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row-reverse',
                          alignItems: 'center',
                          gap: width * 0.02,
                          paddingHorizontal: width * 0.02,
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            width: '80%',
                            textAlign: 'right',
                            fontSize: 17,
                            fontWeight: 'bold',
                          }}>
                          {question.text}
                        </Text>
                        <View
                          style={{
                            color: 'black',
                            width: '20%',
                            textAlign: 'right',
                          }}>
                          <Ionicons
                            name={
                              question.answer === chosenAnswers[question.code]
                                ? 'checkmark-circle'
                                : 'close-circle'
                            }
                            size={width * 0.07}
                            color={
                              question.answer === chosenAnswers[question.code]
                                ? '#eaaa00'
                                : '#ff0000'
                            }
                          />
                        </View>
                      </View>
                      {question.choices.map(choice => (
                        <>
                          <View
                            style={{
                              ...styles.hairlineLeft,
                              marginTop: height * 0.02,
                              marginBottom: height * 0.01,
                            }}></View>
                          <Text
                            style={{
                              color: getResultAnsColor({
                                question,
                                chosenAns: chosenAnswers[question.code],
                                currentChoice: choice,
                              }),
                              textAlign: 'right',
                              fontWeight: 'bold',
                              fontSize: 15,
                            }}>
                            {choice}
                          </Text>
                        </>
                      ))}
                    </View>
                  ))}
                  <Pressable
                    style={{
                      ...styles.button,
                      borderRadius: width * 0.05,
                      backgroundColor: '#eaaa00',
                      width: width * 0.9,
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      setScore(0);
                      setCurrentIndex(0);
                      setAnswerPressed(false);
                    }}>
                    <Text
                      style={{
                        ...styles.buttonText,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 22,
                      }}>
                      إعادة الإمتحان
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            )}
          </>
        );
      case 2:
        return (
          <ScrollView
            style={{
              paddingTop: '3%',
            }}>
            {lessonKeyWords?.map((keyword, index) => {
              return <KeywordCard key={index} {...keyword}></KeywordCard>;
            })}
          </ScrollView>
        );
      case 3:
        return (
          <ScrollView>
            {grammar?.map((g, index) => {
              return <Card key={index} {...g}></Card>;
            })}
          </ScrollView>
        );
      default:
        return null;
    }
  };
  renderphoto = lessonId => {
    switch (activeTab) {
      case 0:
        return (
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.photo}
              source={{uri: props?.route?.params?.image}}
              resizeMode="cover">
              <View style={styles.outerContainer}>
                <DoneLearning lessonId={props?.route?.params?.lessonId} />

                <View style={styles.textContainer}>
                  {selectedWord && SelectedWordTranslation && (
                    <View style={styles.translationContainer}>
                      <View style={styles.cardContainer_}>
                        <View style={styles.cardHead}>
                          <Text style={styles.selectedWordText}>
                            {selectedWord}
                          </Text>
                        </View>
                        <Text style={styles.translationText}>
                          {SelectedWordTranslation}
                        </Text>
                      </View>

                      <View style={styles.cardButtons}>
                        <Pressable
                          style={
                            userKeywords.filter(({text}) => text === selectedWord)
                              .length > 0
                              ? // trainingPressed
                                styles.cardButtonUpPressed
                              : styles.cardButtonUp
                          }
                          onPress={() => {
                            userKeywords.filter(({text}) => text === selectedWord)
                              .length > 0
                              ? //setTrainingPressed(false)
                                dispatch(
                                  removeUserWords({
                                    word: selectedWord,
                                  }),
                                )
                              : dispatch(
                                  setUserWords({
                                    text: selectedWord,
                                    translation: SelectedWordTranslation,
                                    audio:selectedWordAudio,
                                    category: 'new',
                                  }),
                                );
                          }}>
                          <FontAwesomeIcon icon="dumbbell" />
                        </Pressable>
                        <Pressable
                          style={
                            playPressed
                              ? styles.cardButtonDownPressed
                              : styles.cardButtonDown
                          }
                          onPress={() => {
                            playPressed
                              ? setPlayPressed(false)
                              : setPlayPressed(true);
                          }}>
                          <FontAwesomeIcon icon="play" />
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      case 1:
        return (
          <View style={{...styles.photoContainer, backgroundColor: '#eaaa00'}}>
            <AnimatedCircularProgress
              size={150}
              width={15}
              fill={((currentIndex + 1) / quizData?.length) * 100}
              tintColor="white"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
              rotation={0}>
              {fill => (
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
                  {currentIndex + 1 > quizData?.length ? (
                    <Ionicons name="checkmark" size={80} color="white" />
                  ) : (
                    currentIndex + 1 + ' / ' + quizData?.length
                  )}
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
        );
      case 2:
        return (
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.photo}
              source={{uri: props?.route?.params?.image}}
              resizeMode="cover">
              <DoneLearning lessonId={props?.route?.params?.lessonId} />
              <View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: width,
                    height: height * 0.27,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <TouchableOpacity
                      style={{
                        backgroundColor: '#eaaa00',

                        borderRadius: 10, // Adjust this value to control the roundness of the button
                        width: width * 0.4, // Adjust this value to control the width of the button
                        height: height * 0.04, // Adjust this value to control the height of the button
                        // alignItems: 'baseline',
                        justifyContent: 'center',
                        // margin: '11%',

                        // Adjust this value to control the margin between buttons
                      }}>
                      <View style={styles.rememberWords}>
                        <Ionicons
                          name={'arrow-back-outline'}
                          size={20}
                          color="white"
                          style={{marginHorizontal: width * 0.01}}
                        />
                        <Text
                          style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginHorizontal: width * 0.01,
                            color: 'white',
                            alignContent: 'space-between',
                            // justifyContent: 'space-evenly',
                          }}>
                          تذكر الكلمات
                        </Text>
                        <Ionicons
                          name={'file-tray-full-outline'}
                          style={{
                            marginHorizontal: width * 0.01,
                          }}
                          size={20}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      case 3:
        return (
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.photo}
              source={{uri: props?.route?.params?.image}}
              resizeMode="cover">
              <DoneLearning lessonId={props?.route?.params?.lessonId} />
            </ImageBackground>
          </View>
        );
    }
  };
  return (
    <View style={styles.container}>
      {this.renderphoto()}
      

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContentContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === index && styles.activeTab]}
              onPress={() => setActiveTab(index)}>
              <Text
                style={
                  activeTab === index ? styles.tabTextActive : styles.tabText
                }>
                {tab.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {(
      <View style={styles.contentContainer}>
        {loading && (<View style={styles.loadingContainer}>

<       ActivityIndicator  size="large" color="#eaaa00" style={{

flex: 1,

justifyContent: 'center',

alignItems: 'center',

transform: [{ scale: 2 }] // increase the size

}}  />
</View>)}

      <View style={styles.hairlineLeft}></View>
        {renderContent()}
      </View>
      )}
      <CustomAudioPlayer
     
        audioUrl={audioSrc}
        setHighlightIndex={setHighlightIndex}
        setTranslationHighlightIndex={setTranslationHighlightIndex}
        timePoints={timePoints}
        storyParagraph={storyParagraph}
        textRef={textRef}
        scrollTo={scrollTo}
      />
     
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%"
  },
  scrollableResults: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#eeeeee90',
    width: width,
  },
  quizResults: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    width: width,
    // backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  resultsHeader: {
    display: 'flex',
    width: width,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.05,
  },
  resultsHeaderTextContainer: {
    width: (width - width * 0.05 * 2) * 0.7,
    // paddingHorizontal: width * 0.05,
  },
  resultsHeaderIconContainer: {
    width: (width - width * 0.05 * 2) * 0.3,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsDetailsBox: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginVertical: height * 0.01,
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: width * 0.1,
    justifyContent: 'space-around',
  },
  questionResultsDetailsBox: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginVertical: height * 0.01,
    justifyContent: 'space-around',
  },
  resultsHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  resultsBodyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctIncorrect: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  correctIncorrectText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  correctIncorrectNumbers: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  photoContainer: {
    height: height * 0.27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  tabsContainer: {
    alignItems: 'center',
    color: 'white',
  },
  tabsContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
    width: width,
    color: 'white',
  },
  tab: {
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
    marginHorizontal: width * 0.04,
  },
  activeTab: {
    backgroundColor: '#eaaa00',
    color: 'white',
    borderRadius: 13,
  },
  tabTextActive: {
    fontSize: 20,
    color: 'white',
  },
  tabText: {
    fontSize: 20,
    color: '#3d3d3d95',
  },
  contentContainer: {
    flex: 1,
    marginTop: height * 0.009,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '3%',
  },
  card_level: {
    color: Colors.black,
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 'auto',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderColor: '#eaaa00',
    borderWidth: 1,
    width: 200,
    minHeight: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'outfitSemi',
    fontSize: 16,
    color: '#eaaa00',
    width: '100%',
    textAlign: 'center',
  },
  cardContainer_: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: width * 0.4,
    // height: height * 0.6,
    backgroundColor: 'transparent',
    borderRadius: 20,
    marginHorizontal: width * 0.13,
    marginVertical: height * 0.04,
  },
  cardButtons: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    width: width * 0.15,
    height: height * 0.07,
    // paddingBottom: '0%',
    // paddingTop: '0%',
    marginHorizontal: width * 0.14,
    marginVertical: height * 0.055,
    gap: 5,
  },
  cardButtonUp: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.05,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'transparent',
  },
  cardButtonUpPressed: {
    backgroundColor: '#eaaa00',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.05,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'transparent',
  },
  cardButtonDown: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.05,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHead_: {
    flexDirection: 'row',
  },
  cardButtonDownPressed: {
    backgroundColor: '#eaaa00',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.05,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hairlineLeft: {
    borderBlockColor: '#eee',
    borderColor: '#eee',
    borderWidth: 1,
    width: '100%',
    bottom: 'auto',
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
  },
  buttonWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingTop: 'auto',
    position: 'absolute',
    right: width * 0.07,
    top: height * 0.03,
  },
  buttonContainer: {
    width: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    marginHorizontal: width * 0.005,
    paddingVertical: height * 0.002,
  },
  touchable: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.035,
    width: width * 0.88,
    height: height * 0.15,
  },
  translationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    opacity: 0.8,
    backgroundColor: '#ccc',
    width: width * 0.88,
    height: height * 0.15,

    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHead: {
    flexDirection: 'column',
    // width: width ,
    flexWrap: 'wrap',
  },
  selectedWordText: {
    fontSize: 18,
    color: 'black',
  },
  translationText: {
    fontSize: 18,
    color: 'black',
  },
  rememberWords: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-around',
    alignItems: 'center',
  },
});
