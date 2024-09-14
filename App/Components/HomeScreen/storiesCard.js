import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

// You can import from local files

import {Colors} from '../../Utils/Colors';
import {useNavigation} from '@react-navigation/native';

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

const {width, height} = Dimensions.get('window');

export default function App(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Image style={styles.card_image} source={{uri: props?.image}} />
        <View style={styles.level_container}>
          <Text style={styles.card_level}>A1</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.card_title}>{props?.title}</Text>
          <Text style={styles.card_desc}>{props?.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_template: {
    width: 280,
    height: 280,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  card_image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  text_container: {
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.007,
    position: 'absolute',
    alignSelf: 'center',
    width: '94%',
    height: 'auto',
    bottom: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  card_title: {
    color: 'black',
    fontFamily: 'outfit',
    fontSize: 18,
    // padding:2
  },
  card_desc: {
    color: 'black',
    fontFamily: 'outfitLight',
    fontSize: 11,
    padding: 2,
  },
  card_level: {
    color: 'black',
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 2,
  },
  level_container: {
    position: 'absolute',
    alignSelf: 'center',
    width: '12%',
    height: '12%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: 1,
    top: '3%',
    left: '3.5%',
    padding: 5,
    backgroundColor: '#ffffff',
    opacity: 0.90,
    borderRadius: 50,
  },
});
