import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getLessonById } from '../../Services/LessonServices';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import { tabsNamesMapper } from '../../Screens/HomeScreen';
import { useStateValue } from '../../store/contextStore/StateContext';
import { tabs } from '../../Utils/constants';
const {width, height} = Dimensions.get('window');
export default function Favorites() {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const {state, dispatch} = useStateValue();
  const favorites = useSelector(state => state.storyReducer.favorites);
  const [favoritesLocal, setFavoritesLocal] = useState([]);

  useEffect(() => {
    console.log(favorites);

    favorites.map(id => {
      console.log('FAVORITESLOCAL', favoritesLocal);
      console.log('ID', id);
      getLessonById(id).then(lesson => {
        setLoading(true);
        setLessons(prevLessons => [...prevLessons, lesson], setLoading(false));
      });
      if (
        favoritesLocal.some(idx => idx == id) &&
        favorites.some(idx => idx == id)
      ) {
        setLessons(lessons.filter(idx => idx !== id));
      }
    });
    if (favorites.length == 0) {
      setLessons([]);
    }
    setFavoritesLocal(favorites);
  }, [favorites]);

  useEffect(() => {
    console.log(lessons.length);
  }, [lessons]);

  const handleOnPress = (lessonId, lessonImage) => {
    const isSubscribed = state.isSubscribed;
    const isLessonPaid = lessons.find(lesson => lesson.id === lessonId).paid;
    if (!isSubscribed && isLessonPaid) {
      Alert.alert(
        'عملية غير مقبولة',
        'يجب الاشتراك للحصول على هذا الدرس',
      );
      return;
    }
    getLessonById(lessonId).then(resp => {
      navigation.navigate('LessonScreen', {lessonId, image: lessonImage});
    });
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: '10%',
      }}>
      {loading ? (
        <View style={{paddingTop: height * 0.37}}>
          <ActivityIndicator
            size="large"
            color="#eaaa00"
            style={{
              flex: 1,

              justifyContent: 'center',

              alignItems: 'center',

              transform: [{scale: 2}], // increase the size
            }}
          />
        </View>
      ) : (
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              justifyContent: 'flex-end',
              borderRadius: 6,
              padding: 5,
              left: '3%',
            }}>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: 'black',
                paddingRight: '15%',
              }}>
              بحث بالمستوي : {tabsNamesMapper[activeTab]}{' '}
            </Text>
          </View>
          <View style={styles.tabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsContentContainer}>
              {tabs.slice(0, 6).map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, activeTab === index && styles.activeTab]}
                  onPress={() => setActiveTab(index)}>
                  <Text style={styles.tabText}>{tabsNamesMapper[index]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 10, gap: 12}}>
              <View style={styles.Cardcontainer}>
                {lessons.map(
                  (lesson, index) =>
                    tabs[activeTab] == lesson.level && (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          handleOnPress(
                            lesson?.id,
                            'data:image/png;base64,' + lesson?.image,
                          )
                        }>
                        <View style={styles.card}>
                          <Image
                            source={{
                              uri: 'data:image/png;base64,' + lesson?.image,
                            }}
                            style={styles.image}
                          />
                          <View
                            style={{
                              flex: 0,
                              flexDirection: 'col',
                              overflow: 'hidden',
                              alignItems: 'flex-end',
                              gap: 10,
                            }}>
                            <View style={styles.text_container}>
                              <Text style={styles.title}>{lesson?.title}</Text>
                              <Text style={styles.description}>
                                {lesson?.description}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: width * 0.5,
                              }}>
                              <Text style={styles.date}>{lesson?.date}</Text>
                              <FontAwesomeIcon
                                icon={faHeart}
                                size={22}
                                color="red"
                              />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ),
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse', // Image on the right
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabsContainer: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginHorizontal: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    color: 'white',
    backgroundColor: '#eaaa00',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 17,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  text_container: {
    flex: 1,
    flexDirection: 'col',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',

    width: '80%',
    height: '100%',
    // bottom: "0.001%",
    gap: 20,
  },
  tabsContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    direction: 'rtl',
    textAlign: 'left',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    direction: 'rtl',
    textAlign: 'left',
  },
  Cardcontainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 130,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 13,
    fontFamily: 'outfitLight',
    color: 'black',
  },
});
