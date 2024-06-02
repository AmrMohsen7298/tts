import React, {useEffect, useRef, useState} from 'react';
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
  removeFavorite,
  setAudioPlaying,
} from '../Actions/StoryActions';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
// import CustomAudioPlayer from "../Components/AudioPlayer/CustomAudioPlayer";

const {width, height} = Dimensions.get('window');

const DoneLearning = () => {
  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.touchableText}>
            <Ionicons name="checkmark-outline" size={20} color="white" /> تم
            التعلم
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function LessonScreen(props) {
  const favorites = useSelector(state => state.storyReducer.favorites);
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
  const [favoriteButton, setfavoriteButton] = useState(
    favorites.some(id => id == props?.route?.params?.lessonId),
  );
  const dispatch = useDispatch();
  const re = new RegExp('[.,;:\\s?!]+');
  const [timePoints, setTimePoints] = useState([]);
  const sound = useRef();
  const storyAudioPlaying = useSelector(
    state => state.storyReducer.storyAudioPlaying,
  );
  useEffect(() => {
    console.log('props', props?.route?.params?.lessonId);
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
      console.log('sentences', storyParagraph.split(['.']));
    }
  }, [storyParagraph]);

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
  setFavorites = (flag, lessonId) => {
    if (flag) {
      dispatch(addFavorite(lessonId));
    } else {
      dispatch(removeFavorite(lessonId));
    }
    console.log('FAVORITEBUTTON', favoriteButton);

    setfavoriteButton(!favoriteButton);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <ScrollView
            style={{bottom: 'auto', backgroundColor: 'white'}}
            horizontal={false}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{paddingHorizontal: 'auto'}}>
            <View style={{display: 'flex', marginVertical: height * 0.02}}>
              <Text style={{fontSize: 30, color: 'black'}}>{name}</Text>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                direction: 'rtl',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 15,
                  padding: 'auto',
                  paddingBottom: '5%',
                  position: 'absolute',
                  right: 1,
                }}>
                <View>
                  <Text style={styles.card_level}>A1</Text>
                </View>

                <MaterialIcons
                  name="translate"
                  size={22}
                  color={translateButton ? 'green' : 'rgba(0, 0, 0, 0.2)'}
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
                  paddingTop: '15%',
                }}>
                {translateButton
                  ? translation?.split(' ').map((word, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => onPressWord(word, index)}
                          style={{
                            flex: 0,
                            textAlign: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            borderRadius: 5,
                            backgroundColor:
                              index == highlightIndex
                                ? '#42BB7E'
                                : 'transparent',
                          }}>
                          <Text>
                            <Text
                              style={{
                                color:
                                  index == highlightIndex ? 'white' : 'black',
                                borderRadius: 20,
                                fontFamily: 'outfit',
                                fontSize: 20,
                                textAlign: 'center',
                              }}>
                              {word}
                            </Text>
                          </Text>
                        </Pressable>
                      );
                    })
                  : storyParagraph?.split(' ').map((word, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => onPressWord(word, index)}
                          style={{
                            flex: 0,
                            textAlign: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            borderRadius: storyAudioPlaying ? 1.5 : 5,
                            backgroundColor:
                              highlightIndex?.length > 0 &&
                              highlightIndex?.some(idx => idx == index)
                                ? '#42BB7E'
                                : 'transparent',
                            paddingHorizontal: 3,
                          }}>
                          <Text>
                            <Text
                              style={{
                                color: highlightIndex?.some(idx => idx == index)
                                  ? 'white'
                                  : 'black',
                                fontFamily: 'outfit',
                                fontSize: 20,
                                textAlign: 'center',
                              }}>
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
          <ScrollView>
          <View
            style={{flexDirection: 'column', gap: 40, alignItems: 'center'}}>
            <AntDesign name="sound" size={25} color="#42BB7E" />
            <Text
              style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                fontSize: 24,
                color: 'black',
              }}>
              عدم اهتمام ___ مجالات البحث العلميّ في استخدام اللّغة العربيّة
              كلغةٍ خاصّة في الأبحاث الأكاديميّة والعلميّة
            </Text>
            <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>مُعظم</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>بعض</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>شيئ</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        );
      case 2:
        return <KeywordCard></KeywordCard>;
      case 3:
        return <Card></Card>;
      default:
        return null;
    }
  };
  renderphoto = () => {
    switch (activeTab) {
      case 0:
        return (
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.photo}
              source={{uri: props?.route?.params?.image}}
              resizeMode="cover">
              <View style={styles.outerContainer}>
                <DoneLearning />

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
                            trainingPressed
                              ? styles.cardButtonUpPressed
                              : styles.cardButtonUp
                          }
                          onPress={() => {
                            trainingPressed
                              ? setTrainingPressed(false)
                              : setTrainingPressed(true);
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
          <View style={{...styles.photoContainer, backgroundColor: '#42BB7E'}}>
            <AnimatedCircularProgress
              size={150}
              width={15}
              fill={(1 / 4) * 100}
              tintColor="white"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
              rotation={0}>
              {fill => (
                <Text
                  style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
                  {1 + ' / ' + 4}
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
              <DoneLearning />
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
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#42BB7E',

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
                          style={{marginHorizontal: width * 0.01}}
                          size={20}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={styles.cardDefinition}>
                        {' '}
                        {props?.definition}
                      </Text> */}
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
              <DoneLearning />
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
      <View style={styles.contentContainer}>
        <View style={styles.hairlineLeft}></View>
        {renderContent()}
      </View>
      <CustomAudioPlayer
        audioUrl={audioSrc}
        setHighlightIndex={setHighlightIndex}
        timePoints={timePoints}
        storyParagraph={storyParagraph}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
    backgroundColor: '#42BB7E',
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
    borderColor: '#42BB7E',
    borderWidth: 1,
    width: 200,
    height: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'outfitSemi',
    fontSize: 16,
    color: '#42BB7E',
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
    marginVertical:height * 0.055,
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
    backgroundColor: '#42BB7E',
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
    backgroundColor: '#42BB7E',
    borderRadius: 10,
    width: width * 0.15,
    height: height * 0.05,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hairlineLeft: {
    borderBlockColor: '#ddd',
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
  },

});
