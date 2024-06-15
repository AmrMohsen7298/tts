import React, {useEffect, useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from the correct package
import user from './../../../assets/Images/userProfile.jpg';
import Colors from '../../Utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {setWordTraining} from '../../Actions/StoryActions';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

export default function TrainingKeywords(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const newKeywords = useSelector(state => state.storyReducer.keywords).filter(
    item => item.type === 'new',
  );

  const [translate, setTranslate] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleLoginPress = () => {
    setShowAns(prev => !prev);
    // Add your login logic here
    console.log('Login pressed');
  };

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
        <Ionicons name={'file-tray-full-outline'} size={25} color="black" />
        <Text style={styles.iconText}>{newKeywords?.length}</Text>
      </View>
      <View style={{gap: 20}}>
        <View style={styles.centerContainer}>
          <Text style={styles.keywordText}>
            {translate ? newKeywords?.[0]?.translation : newKeywords?.[0]?.word}
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
            <TouchableOpacity>
              <Ionicons name="volume-high-outline" size={25} color="black" />
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
              <Ionicons
                style={styles.repeatIcon}
                name={'repeat-outline'}
                size={25}
                color="black"
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
                : newKeywords?.[0]?.word}
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
              dispatch(setWordTraining({...newKeywords?.[0], type: 'hard'}),setShowAns(false))
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
              dispatch(setWordTraining({...newKeywords?.[0], type: 'medium'}),setShowAns(false))
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
              dispatch(setWordTraining({...newKeywords?.[0], type: 'easy'}),setShowAns(false))
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
              backgroundColor: '#42BB7E',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.1,
            }}
            onPress={() =>
              dispatch(setWordTraining({...newKeywords?.[0], type: 'done'}),setShowAns(false))
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
    backgroundColor: '#ade08b',
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
    backgroundColor: '#42BB7E',
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
    backgroundColor: '#42BB7E',
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
