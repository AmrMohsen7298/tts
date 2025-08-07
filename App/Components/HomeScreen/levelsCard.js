import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import Constants from "expo-constants";
// import Entypo from 'react-native-vector-icons/Entypo';
import { faHeart, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Actions/StoryActions';
import { tabsNamesMapper } from '../../Screens/HomeScreen';
import { levels } from '../../Utils/constants';
// You can import from local files

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

const {width, height} = Dimensions.get('window');

export default function App(props) {
  const favorites = useSelector(state => state.storyReducer.favorites);
  const dispatch = useDispatch();
  const [favoriteButton, setfavoriteButton] = useState(
    favorites.some(id => id == props?.lessonId),
  );

  const setFavorites = (flag, lessonId) => {
    if (!favorites) {
      favorites = [];
    } else {
      if (flag) {
        dispatch(addFavorite(lessonId));
      } else {
        dispatch(removeFavorite(lessonId));
      }

      setfavoriteButton(!favoriteButton);
    }
  };

  const tabs = [
    levels.A1.text,
    levels.A2.text,
    levels.A3.text,
    levels.A4.text,
    levels.A5.text,
    levels.A6.text,
    levels.B1.text,
    levels.B2.text,
    levels.B3.text,
    levels.C1.text,
    levels.C2.text,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Image style={styles.card_image} source={{uri: props?.image}} />
        {props.showLock ? (
          <View style={styles.lock_container}>
            {/* <Entypo name="lock" size={15} color="white" /> */}
            <FontAwesomeIcon icon={faLock} size={15} color="white" />
          </View>
        ) : (
          <View style={styles.lock_container}>
            {/* <Entypo name="lock" size={15} color="white" /> */}
            <FontAwesomeIcon icon={faLockOpen} size={15} color="white" />
          </View>
        )}
        <View style={styles.text_container}>
          <Text style={styles.card_title}>{props?.title}</Text>
          <Text style={styles.card_desc} numberOfLines={1}>
            {props?.description}
          </Text>
          <View style={styles.info_row}>
            <View style={styles.level_container}>
              <Text style={styles.card_level}>
                {tabsNamesMapper[tabs.indexOf(props?.level)]}
              </Text>
            </View>
            <Text style={styles.date}>{props?.date}</Text>
            <Pressable
              onPress={() => setFavorites(!favoriteButton, props?.lessonId)}>
              <FontAwesomeIcon
                icon={faHeart}
                size={22}
                color={favoriteButton ? 'red' : 'rgba(0, 0, 0, 0.2)'}
              />
            </Pressable>
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
    // width: width * 0.07,
    height: width * 0.07,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaaa0050',
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
