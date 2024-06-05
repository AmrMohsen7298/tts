import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
// import Constants from "expo-constants";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// You can import from local files
import pic from '../../../assets/Images/bird.jpg';
import Colors from '../../Utils/Colors';

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

const {width, height} = Dimensions.get('window');

export default function App(props) {
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Image style={styles.card_image} source={{uri: props?.image}} />
        <View style={styles.lock_container}>
          <Entypo name="lock" size={15} color="white" />
        </View>
        <View style={styles.text_container}>
          <Text style={styles.card_title}>{props?.title}</Text>
          <Text style={styles.card_desc} numberOfLines={1}>
            {props?.description}
          </Text>
          <View style={styles.info_row}>
            <View style={styles.level_container}>
              <Text style={styles.card_level}>A1</Text>
            </View>
            <Text style={styles.date}>1 ابريل 2024</Text>
            <MaterialIcons
              name="favorite"
              size={22}
              color="rgba(0, 0, 0, 0.2)"
              style={styles.favorite_icon}
            />
          </View>
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
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
  },
  card_template: {
    width: '100%', // Use 90% of the container's width
    aspectRatio: 1.25, // Maintain an aspect ratio
    borderRadius: 30,
    overflow: 'hidden', // Ensure children are clipped to the rounded corners
  },
  card_image: {
    width: '100%',
    height: '90%',
  },
  lock_container: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  text_container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  card_title: {
    color: 'black',
    fontFamily: 'outfitSemi',
    fontSize: 18,
    paddingBottom: 5,
  },
  card_desc: {
    color: 'black',
    fontFamily: 'outfitLight',
    fontSize: 14,
    paddingBottom: 5,
  },
  info_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  level_container: {
    width: width * 0.07,
    height: width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42BB7E50',
    borderRadius: 50,
  },
  card_level: {
    color: 'black',
    fontFamily: 'outfit',
    fontSize: 14,
  },
  date: {
    fontSize: 13,
    fontFamily: 'outfitLight',
  },
  favorite_icon: {
    padding: 5,
  },
});
