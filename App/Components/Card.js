import * as React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
// import Constants from "expo-constants";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// You can import from local files

import Colors from '../Utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

const {width, height} = Dimensions.get('window');

export default function App(props) {
  const {topic, header, example, description} = props;
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Text
          style={{
            fontFamily: 'outfitBold',
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'right',
            padding: '5%',
            color: 'white',
          }}>
          {topic}
        </Text>

        <View style={styles.text_container}>
          <Text style={styles.example_title}>مثال</Text>
          <Text style={styles.card_desc}>{example}</Text>
          <View style={styles.hairlineLeft}></View>
          <Text style={styles.example_title}>الوصف</Text>
          <Text style={styles.card_title}>{description}</Text>
          <View style={styles.innerBox}>
            <Text style={styles.card_desc}>
              مثال: الرجل، الجبل، المدينة، الكتاب
            </Text>
            <View style={styles.hairlineLeft2}></View>
            <Text style={styles.card_desc}>
              مثال: الرجل، الجبل، المدينة، الكتاب
            </Text>
          </View>
          <View style={styles.innerBox}>
            <Text style={styles.card_desc}>
              مثال: الرجل، الجبل، المدينة، الكتاب
            </Text>
          </View>
          <View style={styles.innerBox}>
            <Text style={styles.card_desc}>
              مثال: الرجل، الجبل، المدينة، الكتاب
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerBox: {
    backgroundColor: '#eee',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#eaaa0090',
    padding: 5,
    margin: 5,
    justifyContent: 'center',
  },
  container: {
    paddingTop: height * 0.03,
    alignItems: 'center',
  },
  card_template: {
    width: 350,
    height: 'fit-content',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
    backgroundColor: '#eaaa00',
    borderRadius: 10,
  },
  card_image: {
    width: '100%',
    height: 'fit-content',
    borderRadius: 10,
  },
  text_container: {
    // position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: 'fit-content',
    bottom: '0.001%',
    padding: 5,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#eaaa00',
    borderWidth: 1,
  },
  card_title: {
    color: Colors.black,
    fontFamily: 'outfitSemi',
    fontSize: 18,
    padding: '2%',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  hairlineLeft: {
    borderBlockColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: height * 0.01,
    width: '100%',
    bottom: 'auto',
  },
  hairlineLeft2: {
    borderBlockColor: '#dddddd90',
    borderWidth: 1,
    borderColor: '#dddddd90',
    marginVertical: height * 0.01,
    width: '100%',
    bottom: 'auto',
  },
  example_title: {
    color: '#eaaa00',
    fontFamily: 'outfitSemi',
    fontSize: 22,
    fontWeight: 'bold',
    padding: '2%',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  card_desc: {
    color: Colors.black,
    fontFamily: 'outfitLight',
    fontSize: 18,
    padding: '2%',
    textAlign: 'right',
  },
  card_level: {
    color: Colors.black,
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 2,
  },
  lock_container: {
    // position: 'absolute',
    alignSelf: 'center',
    width: 'auto',
    height: 'auto',
    // bottom: 1,
    top: '3%',
    left: '3.5%',
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  date: {
    fontSize: 13,
    fontFamily: 'outfitLight',
    color: 'black',
  },
  level_container: {
    // position: "absolute",
    // alignSelf: "center",
    width: 'auto',
    height: 'auto',
    padding: '1%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
});
