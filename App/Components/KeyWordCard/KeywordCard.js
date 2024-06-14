import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import user from './../../../assets/Images/userProfile.jpg';
import Colors from '../../Utils/Colors';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { text } from '@fortawesome/fontawesome-svg-core';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch } from 'react-redux';
import { setAudioPlaying } from '../../Actions/StoryActions';
const {width, height} = Dimensions.get('window');
export default function KeywordCard(props) {
  const [playPressed, setPlayPressed] = useState(false);
  const [trainingPressed, setTrainingPressed] = useState(false);
  const {type,description,translation,audio,text,level} = props
  const sound = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio-keyword${text}.mp3`;

    async function saveAudioToFileSystem() {
      try {
        // Save the audio Blob to the file system
        await RNFetchBlob.fs.writeFile(filePath, audio, 'base64');
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

    if (audio) {
      saveAudioToFileSystem();
    }
    const playSound = async () => {
      dispatch(setAudioPlaying(false))
      sound.current.play(success => {
        if (success) {
          setPlayPressed(false);
        }
      });
    };
    if (playPressed) {
      playSound();
    }
  }, [playPressed, audio]);
  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={{width: width * 0.8}}>
          <View style={styles.cardHead}>
            <Text
              style={{
                fontSize: 22,
                top: height * 0.05,
                left: width * 0.4,
                color: 'black',
              }}>
              {`${text}: (${type})`}
            </Text>
            <Text
              style={{
                fontSize: 18,
                top: height * 0.1,
                right: width * 0.1,
                color: 'black',
                maxWidth: width * 0.5,
              }}>
              {description}
            </Text>
          </View>
          <Text style={styles.cardDefinition}> {props?.definition}</Text>
        </View>
        <View style={styles.cardButtons}>
          <Pressable
            style={
              trainingPressed ? styles.cardButtonUpPressed : styles.cardButtonUp
            }
            onPress={() => {
              trainingPressed
                ? setTrainingPressed(false)
                : setTrainingPressed(true);
            }}>
            <FontAwesomeIcon icon="dumbbell"></FontAwesomeIcon>
          </Pressable>
          <Pressable
            style={
              playPressed ? styles.cardButtonDownPressed : styles.cardButtonDown
            }
            onPress={() => setPlayPressed(true)}>
            <FontAwesomeIcon icon="play"></FontAwesomeIcon>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: '#ebecf2',
    opacity: 0.8,
    borderRadius: 10,
    direction: 'rtl',
    marginHorizontal: width * 0.5,
    marginVertical: height * 0.02,
  },
  cardButtons: {
    // display: 'flex',
    // flexDirection: 'column',
    left: width * 0.7,
    bottom: height * 0.03,
    width: width * 0.2,
    height: height * 0.15,
  },
  cardButtonUp: {
    backgroundColor: '#dddfed',
    borderTopEndRadius: 10,
    height: '50%',
    width: width * 0.2,
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    bottom: height * 0.014,
  },
  cardButtonDown: {
    backgroundColor: '#dddfed',
    borderBottomEndRadius: 10,
    height: '50%',
    width: width * 0.2,
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.014,
  },
  cardButtonUpPressed: {
    backgroundColor: '#bdf0bd',
    borderTopEndRadius: 10,
    height: height * 0.04,
    width: width * 0.2,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    bottom: height * 0.014,
  },
  cardHead: {
    flexDirection: 'row',
    display: 'flex',
  },
  cardButtonDownPressed: {
    backgroundColor: '#bdf0bd',
    borderBottomEndRadius: 10,
    height: height * 0.04,
    width: width * 0.2,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.014,
  },
});
