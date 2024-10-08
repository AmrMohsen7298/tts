import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Pressable,
} from 'react-native';
import user from './../../../assets/Images/userProfile.jpg';
import Colors from '../../Utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setUserWords, setWordTraining} from '../../Actions/StoryActions';
import {useNavigation} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';
import FILETRAYFULL from '../../../assets/file-tray-full.png';
import VOLUMEHIGHOUTLINE from '../../../assets/volume-high-outline.png';
import REPEAT from '../../../assets/repeat.png';

const {width, height} = Dimensions.get('screen');

export default function TrainingKeywords(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sound = useRef();

  const newKeywords = useSelector(
    state => state.storyReducer.userKeywords,
  ).filter(item => item.category === 'new');

  const [translate, setTranslate] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [playPressed, setPlayPressed] = useState(false);

  const handleLoginPress = () => {
    setShowAns(prev => !prev);
    // Add your login logic here
    console.log('Login pressed');
  };

  useEffect(() => {
    const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio-keyword${newKeywords?.[0]?.text}.mp3`;

    async function saveAudioToFileSystem() {
      try {
        // Save the audio Blob to the file system
        await RNFetchBlob.fs.writeFile(
          filePath,
          newKeywords?.[0]?.audio,
          'base64',
        );
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

    if (newKeywords?.[0]?.audio) {
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
  }, [playPressed, newKeywords]);

  useEffect(() => {
    if (newKeywords.length < 1) {
      navigation.navigate('TrainingScreen');
    }
  }, [newKeywords]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabelLeft}>A1</Text>
        <Text style={styles.headerLabelRight}>جديد</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={FILETRAYFULL} style={{width: 25, height: 25}} />
        <Text style={styles.iconText}>{newKeywords?.length}</Text>
      </View>
      <View style={{gap: 20}}>
        <View style={styles.centerContainer}>
          <Text style={styles.keywordText}>
            {translate ? newKeywords?.[0]?.translation : newKeywords?.[0]?.text}
          </Text>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ddd',
                padding: width * 0.01,
                borderRadius: width * 0.03,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>
                قاعدة المرافقة
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 18}}>كلمة</Text>
          </View> */}
        </View>
        <View
          style={{
            ...styles.iconContainer,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              ...styles.centerContainer,
              backgroundColor: '#ddd',
              padding: width * 0.01,
              borderRadius: width * 0.02,
            }}>
            <TouchableOpacity onPress={() => setPlayPressed(true)}>
              <Image
                source={VOLUMEHIGHOUTLINE}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              ...styles.centerContainer,
              backgroundColor: '#ddd',
              padding: width * 0.01,
              borderRadius: width * 0.02,
            }}>
            <TouchableOpacity>
              <Text
                style={{color: 'black', fontSize: 14, padding: width * 0.01}}>
                sentence
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.hairlineContainer}>
          <View style={styles.hairlineLeft}></View>
          <View style={styles.headerLabelCenterContainer}>
            <TouchableOpacity onPress={() => setTranslate(prev => !prev)}>
              <Image
                source={REPEAT}
                style={{...styles.repeatIcon, width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.hairlineRight}></View>
        </View>
        <View style={styles.centerContainer}>
          {showAns && (
            <Text style={styles.keywordText}>
              {!translate
                ? newKeywords?.[0]?.translation
                : newKeywords?.[0]?.text}
            </Text>
          )}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ddd',
                padding: width * 0.01,
                borderRadius: width * 0.03,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>
                قاعدة المرافقة
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 18}}>كلمة</Text>
          </View> */}
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button_} onPress={handleLoginPress}>
          <Text style={styles.buttonText_}> اظهر الاجابة</Text>
        </TouchableOpacity>
      </View>
      {showAns && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <Pressable
            style={{
              width: '25%',
              backgroundColor: '#d7abf7',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.1,
            }}
            onPress={() =>
              dispatch(
                setUserWords({...newKeywords?.[0], category: 'hard'}),
                setShowAns(false),
              )
            }>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 20}}>
              صعب
            </Text>
            <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 14}}>
              حاول مجدداً
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: '25%',
              backgroundColor: 'lightblue',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.1,
            }}
            onPress={() =>
              dispatch(
                setUserWords({...newKeywords?.[0], category: 'medium'}),
                setShowAns(false),
              )
            }>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 20}}>
              متوسط
            </Text>
            <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 14}}>
              أعدها بعد يوم
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: '25%',
              backgroundColor: '#bae3bc',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.1,
            }}
            onPress={() =>
              dispatch(
                setUserWords({...newKeywords?.[0], category: 'easy'}),
                setShowAns(false),
              )
            }>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 20}}>
              سهل
            </Text>
            <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 14}}>
              أعدها بعد ٤ أيام
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: '25%',
              backgroundColor: '#eaaa00',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.1,
            }}
            onPress={() =>
              dispatch(
                setUserWords({...newKeywords?.[0], category: 'done'}),
                setShowAns(false),
              )
            }>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              تم
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
              أعدها بعد ٣٠ يوم
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 'auto',
    paddingVertical: 'auto',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderRadius: 20,
    borderBottomColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
  },
  headerLabelLeft: {
    display: 'flex',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#eaaa00',
    width: '20%',
    height: '100%',
    minHeight: height * 0.05,
    alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    // right: 'auto',
    // bottom: 'auto',
    // padding: 'auto',
  },
  headerLabelRight: {
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#aaa',
    width: '20%',
    height: '100%',
    alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    // left: 'auto',
    // bottom: 'auto',
    // padding: 'auto',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    padding: 'auto',
  },
  iconText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  keywordText: {
    fontSize: 40,
    fontWeight: 'normal',
    color: 'black',
  },
  button: {
    backgroundColor: '#eaaa00',
    paddingVertical: 'auto',
    paddingHorizontal: 'auto',
    width: '100%',
    height: '20%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '2%',
  },
  hairlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginVertical: height * 0.05,
  },
  hairlineLeft: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: '45%',
    marginRight: '5%',
  },
  hairlineRight: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: '45%',
    marginLeft: '5%',
  },
  headerLabelCenterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: '45%',
    alignItems: 'center',
  },
  repeatIcon: {
    bottom: 'auto',
  },
  bottomButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '50%',
    width: '80%',
    paddingVertical: '5%',
    alignSelf: 'center',
  },
  button_: {
    backgroundColor: '#eaaa00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    borderRadius: 10,
  },
  buttonText_: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '3%',
  },
});
