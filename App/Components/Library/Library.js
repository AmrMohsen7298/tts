import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../Utils/Colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
export default function Library() {
  const navigator = useNavigation();
  const {favorites, learned} = useSelector(state => state.storyReducer);
  const {width, height} = Dimensions.get('screen');
  return (
    <View style={{paddingHorizontal: width * 0.05}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontFamily: 'outfit',
            marginHorizontal: width * 0.05,
            marginVertical: width * 0.08,
          }}>
          مكتبتي
        </Text>
      </View>
      <View
        style={{
          // marginTop: height * 0.02,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
        <TouchableOpacity
          style={styles.easyButton}
          onPress={() => {
            navigator.navigate('المفضله');
          }}>
          <FontAwesomeIcon
            icon="angle-left"
            style={{color: 'grey'}}></FontAwesomeIcon>
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
              }}>
              المفضلة
            </Text>
            <Text style={styles.easyText}>{favorites?.length ?? 0} اغراض</Text>
          </View>
          <FontAwesomeIcon
            icon="heart"
            size={25}
            color={'#eaaa00'}></FontAwesomeIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediumButton}  onPress={() => {
            navigator.navigate('الدروس المتعلمه');
          }}>
          <FontAwesomeIcon
            icon="angle-left"
            style={styles.mediumText}></FontAwesomeIcon>
          <View style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                width: '100%',
                fontSize: 18,
                fontWeight: '500',
                color: 'black',
              }}>
              الدروس المتعلمة
            </Text>
            <Text style={styles.mediumText}>{learned?.length ?? 0} اغراض</Text>
          </View>
          <FontAwesomeIcon
            icon="circle-check"
            size={25}
            color={'#eaaa00'}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  easyButton: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    gap: 20,
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  easyText: {
    width: '100%',
    fontSize: 20,
    color: 'black',
  },
  mediumButton: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  mediumText: {
    width: 'auto',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  hardButton: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#dcc1e0',
    borderRadius: 10,
  },
  hardText: {
    width: '33%',
    fontSize: 20,
    flexBasis: 140,
    color: 'black',
  },
  newButton: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    width: '48.8%',
    height: 80,
    gap: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  reviewButton: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    height: '30%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  modalHeader: {
    marginBottom: 20,
    fontSize: 23,
  },
});
