import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import CIRCLECHECK from '../../assets/circle-check.png';
import GIFT from '../../assets/gift.png';
import Header from '../Components/HomeScreen/Header';
import LevelsCard from '../Components/HomeScreen/levelsCard';
import StoriesCard from '../Components/HomeScreen/storiesCard';
import { getAllLessons, getLessonById, getFreeLessons } from '../Services/LessonServices';
import { levels } from '../Utils/constants';
import { useStateValue } from '../store/contextStore/StateContext';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([]);
  const activeTab = useRef(levels.A1);
  const {state, dispatch} = useStateValue();
  const [hideLearned, setHideLearned] = useState(false);
    const learnedLessons = useSelector(state => state.storyReducer.learned);
    const { user: currentUser } = useSelector(state => state.storyReducer);
    const [loading, setLoading] = useState(true);
    const page = useRef(0);
    const pageFree = useRef(0);
    const [freeLessons, setFreeLessons] = useState([])

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
        getAllLessons(activeTab.current?.text, page?.current).then(
            (resp) => {
                setLessons(resp)
            }
        )
        getFreeLessons(page?.current).then((resp) => {
            setFreeLessons(resp)

        }).finally(() => setLoading(false))
  }, []);
    const increaseFreePage = () => {
        //pageFree.current += 1;
        //setLoading(true)
        //getFreeLessons(pageFree.current).then(
        //    if (resp.length === 0) {

        //    // Handle the empty response case

        //    console.log("No more lessons available.");

        //    // Optionally, you can show a message to the user

        //    // setNoMoreLessons(true); // Example state to show a message

        //} else {

        //    // If there are lessons, append them to the existing list

        //        resp => setFreeLessons(([...freeLessons, ...resp]),
        //        ).finally(() => setLoading(false)).catch(() => setLoading(false)));

        //}
        pageFree.current += 1;

        setLoading(true);



        getFreeLessons(pageFree.current)

            .then(resp => {

                // Check if the response is empty

                if (resp.length === 0) {

                    // Handle the empty response case

                    console.log("No more lessons available.");

                    // Optionally, you can show a message to the user

                    // setNoMoreLessons(true); // Example state to show a message

                } else {

                    // If there are lessons, append them to the existing list

                    setFreeLessons([...freeLessons, ...resp]);

                }

            })

            .catch(error => {

                console.error("Error fetching lessons:", error);

                // Handle the error case (e.g., show an error message)

            })

            .finally(() => {

                setLoading(false);

            });

    
        
    }
    //useEffect(() => {
    //    console.log("RECHED HERE");
    //        setLoading(true);

    //}, [page.current, activeTab.current])

    const handleActiveTab = (tab) => {
        activeTab.current = tab
        setLoading(true)
        getAllLessons(activeTab.current?.text, page.current).then(
            resp => setLessons([...lessons, ...resp]),
        ).finally(() => setLoading(false)).catch(() => setLoading(false));
    }
    const increasePage = () => {
        page.current += 1;
        setLoading(true)
        //        resp => setLessons([...lessons, ...resp]),
        //).finally(() => setLoading(false)).catch(() => setLoading(false));

        getAllLessons(activeTab.current?.text, page.current).
            then(resp => {

            // Check if the response is empty

            if (resp.length === 0) {

                // Handle the empty response case

                console.log("No more lessons available.");

                // Optionally, you can show a message to the user

                // setNoMoreLessons(true); // Example state to show a message

            } else {

                // If there are lessons, append them to the existing list

                setLessons([...lessons, ...resp])

            }

        })
            .catch(error => {

                console.error("Error fetching lessons:", error);

                // Handle the error case (e.g., show an error message)

            })

            .finally(() => {

                setLoading(false);

            });


    }
   
  // useEffect(()=>{
  //   if(hideLearned){
  //     lessons.filter
  //   }
  // },[hideLearned])
    const reAuthUser = () => {
        const currentFirebaseUser = auth.currentUser;
        if (!currentUser?.email || !currentUser?.password || currentFirebaseUser) {
            console.log(
                'User is already signed in or no credentials found.',
                currentUser?.email,
                currentUser?.password,
                currentFirebaseUser,
            );
            return;
        }
        console.log('LOGGING USER IN AGAIN');
        signInWithEmailAndPassword(auth, currentUser?.email, currentUser?.password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log('USER LOGGED IN AGAIN');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                const uid = user.uid;
                setIsLoggedIn(true);
                await checkIsSubscribed();
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    useEffect(() => {
        reAuthUser();
    }, [currentUser]);

  const handleOnPress = (lessonId, lessonImage) => {
    const isSubscribed = state.isSubscribed;
    const isLessonPaid = lessons.find(lesson => lesson.id === lessonId).paid;
    if (!isSubscribed && isLessonPaid) {
      Alert.alert(
        'عملية غير مقبولة',
        'يجب تسجيل الدخول و الاشتراك للحصول على هذا الدرس',
      );
      return;
    }
    getLessonById(lessonId).then(resp => {
      navigation.navigate('LessonScreen', {lessonId, image: lessonImage});
    });
    };

    const handleOnPressFree = (lessonId, lessonImage) => {
        const isSubscribed = state.isSubscribed;
        const isLessonPaid = freeLessons.find(lesson => lesson.id === lessonId).paid;
        if (!isSubscribed && isLessonPaid) {
            Alert.alert(
                'عملية غير مقبولة',
                'يجب تسجيل الدخول و الاشتراك للحصول على هذا الدرس',
            );
            return;
        }
        getLessonById(lessonId).then(resp => {
            navigation.navigate('LessonScreen', { lessonId, image: lessonImage });
        });
    };

  const HorizontalFlatList = () => {
      return (
        <View>
      <FlatList
        horizontal
        data={freeLessons}
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
                        paddingRight: index !== freeLessons.length - 1 ? width * 0.03 : 0,
              }}
              onPress={() =>
                  handleOnPressFree(item.id, 'data:image/png;base64,' + item.image)
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
              <View   style={styles.loginButtonContainer}>
                  <Pressable
                      style={{
                          ...styles.button, width: '100%', marginTop: width * 0.02,
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                      onPress={() => increaseFreePage()}
                  >

                      <Text style={styles.buttonText}>المزيد</Text>
                  </Pressable>
              </View>
          </View>

    );
  };

  const tabsList = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContentContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab.current === tab && styles.activeTab]}
            onPress={() => handleActiveTab(tab)}>
            <Text
              style={
                activeTab.current === tab ? styles.tabTextActive : styles.tabText
              }>
              {tab.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const whenToStick = height * 0.65;
  const scrollY = new Animated.Value(0);
  const stickyTop = scrollY.interpolate({
    outputRange: [-height * 0.09, 0],
    inputRange: [whenToStick, whenToStick + 1],
    extrapolate: 'clamp',
  });

  return (
    <View>
      <ScrollView
        style={styles.mainStyles}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: height * 0.2,
              width: width,
              height: height,
            }}>
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
            <Header />
            <Text
              style={{
                padding: 10,
                color: 'black',
                fontFamily: 'outfit',
              }}></Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                right: width * 0.03,
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
                <Image source={GIFT} style={{width: 17, height: 17}} />
              </View>
            </View>
            <View style={{width: width, padding: 10, justifyContent: 'center'}}>
            <HorizontalFlatList lessons={freeLessons} />
                            
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
                <TouchableOpacity
                  style={hideLearned ? styles.activeLearned : styles.hideButton}
                  onPress={() => setHideLearned(!hideLearned)}>
                  <Text
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 17,
                      color: '#33333395',
                    }}>
                    {/* <FontAwesomeIcon
                      name={faCheckCircle}
                      size={18}
                      color="#33333395"
                    /> */}
                    اخفاء ما تعلمت
                    <Image
                      source={CIRCLECHECK}
                      style={{width: 20, height: 20, margin: 5}}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{fontFamily: 'outfit', fontSize: 17, color: 'black'}}>
                بحث بالمستوي : كل
              </Text>
            </View>

            <View style={styles.tabsContainer}>{tabsList()}</View>

            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: '1%', gap: 5}}>
              {lessons?.length > 0 &&
                                  lessons
                                      .filter(f => f.level == activeTab.current.text)
                  .filter(f => {
                    if (hideLearned)
                      if (!learnedLessons) {
                        learnedLessons = [];
                      } else {
                        return !learnedLessons.some(s => s == f?.id);
                      }
                    return true;
                  })
                  .map(
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
                              <View >
                                  <Pressable
                                      style={{ ...styles.buttonMore, width:'100' }}
                                      onPress={() => increasePage()}
                                  >

                                      <Text style={styles.buttonText}>المزيد</Text>
                                  </Pressable>
                              </View>
             </ScrollView>

          </View>
        )}
      </ScrollView>
      <Animated.View style={[styles.animatedTabsContainer, {top: stickyTop}]}>
        {tabsList()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainStyles: {
    backgroundColor: '#f5f5f5',
  },
  animatedTabsContainer: {
    alignItems: 'center',
    paddingLeft: width * 0.07,
    paddingRight: width * 0.02,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    width: width,
    position: 'absolute',
    top: -height * 0.09,
    height: height * 0.09,
    opacity: 1,
    left: 0,
    zIndex: 999,
    backgroundColor: '#f5f5f5',
  },
  tabsContainer: {
    height: height * 0.09,
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
    backgroundColor: '#eaaa00',
    borderColor: 'white',
    borderRadius: 10,
  },
  activeLearned: {
    borderRadius: 15,
    width: width * 0.3,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaaa00',
    borderColor: 'white',
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
    borderColor: '#eaaa00',
    borderWidth: 1,
    width: 200,
    height: 50,
    alignItems: 'center',
    },
    buttonMore: {
       
        backgroundColor: 'white',

        paddingHorizontal: '10%',

        paddingVertical: 10,

        borderRadius: 5,

        marginHorizontal: 5,

        borderColor: '#eaaa00',

        borderWidth: 1,

        width: 200,

        height: 50,

        alignItems: 'center',

        justifyContent: 'center',
    },
  buttonText: {
    fontFamily: 'outfitSemi',
    fontSize: 16,
    color: '#eaaa00',
    width: '100%',
    textAlign: 'center',
  },
});
