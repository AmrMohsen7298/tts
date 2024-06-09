import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import Header from '../Components/HomeScreen/Header';
import StoriesCard from '../Components/HomeScreen/storiesCard';
import LevelsCard from '../Components/HomeScreen/levelsCard';

import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import

import {useNavigation} from '@react-navigation/native';
import StackNavigation from '../Navigations/StackNavigation';
import {getAllLessons, getLessonById} from '../Services/LessonServices';
import {levels} from '../Utils/constants';
import { useStateValue } from '../store/contextStore/StateContext';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation(StackNavigation);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const {state, dispatch: contextDispatch} = useStateValue();


  const tabs = [
    levels.A1,
    levels.A2,
    levels.A3,
    levels.A4,
    levels.A5,
    levels.A6,
    levels.B1,
    levels.B2,
    levels.B3,
    levels.C1,
    levels.C2,
    levels.C3,
  ];

  useEffect(() => {
    getAllLessons().then(resp => setLessons(resp));
  }, []);

  const handleOnPress = (lessonId, lessonImage) => {
    getLessonById(lessonId).then(resp => {
      navigation.navigate('LessonScreen', {lessonId, image: lessonImage});
    });
  };

  const HorizontalFlatList = ({lessons}) => {
    return (
      <FlatList
        horizontal
        data={lessons}
        contentContainerStyle={{
          marginLeft: width * 0.02,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          !item.paid && (
            <Pressable
              style={{
                paddingRight: index !== lessons.length - 1 ? width * 0.03 : 0,
              }}
              onPress={() =>
                handleOnPress(item.id, 'data:image/png;base64,' + item.image)
              }>
              <StoriesCard
                title={item.title}
                description={item.description}
                image={'data:image/png;base64,' + item.image}
              />
            </Pressable>
          )
        }
      />
    );
  };
  return (
    <ScrollView style={styles.mainStyles}>
      <Header />
      <Text style={{padding: 10, color: 'black', fontFamily: 'outfit'}}></Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 7,
          justifyContent: 'flex-end',
          right: '1%',
        }}>
        <View
          style={{
            display: 'flex',

            flexDirection: 'row',
            gap: 7,
            justifyContent: 'flex-end',
            right: '1%',
            borderRadius: 6,
            padding: '1%',
          }}>
          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 17,
              color: '#333',
            }}>
            قصص مجانية
          </Text>
          <Ionicons name="gift-outline" size={19} color="black" />
        </View>
      </View>
      <View style={{width: width, padding: 10, justifyContent: 'center'}}>
        <HorizontalFlatList lessons={lessons} />
      </View>

      <View
        style={{
          display: 'flex',

          flexDirection: 'row',
          gap: 10,
          justifyContent: 'flex-end',

          borderRadius: '',
          padding: '5%',
          // left: '3%',
        }}>
       
        <View style={{paddingRight: width * 0.28}}>
          <TouchableOpacity style={styles.hideButton}>
            <Text
              style={{fontFamily: 'outfit', fontSize: 17, color: '#33333395'}}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#33333395"
              />
              اخفاء ما تعلمت
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'outfit', fontSize: 17, color: 'black'}}>
          بحث بالمستوي : كل
        </Text>
      </View>
      
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
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: '1%', gap: 5}}>
        {lessons?.length > 0 &&
          lessons.map(
            (lesson, index) =>
              lesson?.paid && (
                <Pressable
                  key={index}
                  onPress={() =>
                    handleOnPress(
                      lesson?.id,
                      'data:image/png;base64,' + lesson?.image,
                    )
                  }>
                  <View>
                    <LevelsCard
                      title={lesson?.title}
                      description={lesson?.description}
                      image={'data:image/png;base64,' + lesson?.image}
                      key={index}
                      onPress={() =>
                        handleOnPress(
                          lesson?.id,
                          'data:image/png;base64,' + lesson?.image,
                        )
                      }
                    />
                  </View>
                </Pressable>
              ),
          )}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainStyles: {
    backgroundColor: '#f5f5f5',
  },
  tabsContainer: {
    alignItems: 'center',
    paddingLeft: width * 0.07,
    paddingRight: width * 0.02,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    width: width,
  },
  horizontalScroll: {
    width: 'fit-content',
  },
  tabsContentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  tab: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.01,
    marginRight: width * 0.02,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  activeTab: {
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.01,
    backgroundColor: '#42BB7E',
    borderColor: 'white',
    borderRadius: 10,
  },
  tabTextActive: {
    fontSize: 17,
    color: 'white',
  },
  tabText: {
    fontSize: 17,
    color: '#333',
  },
  searchContainer: {
    alignItems: 'center',
    paddingLeft: '20%',
    width: '100%',
    height: '4%',
    flexDirection: 'row-reverse',
  },
  hideButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  card_level: {
    color: 'black',
    fontFamily: 'outfit',
    fontSize: 14,
    padding: 2,
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
});
