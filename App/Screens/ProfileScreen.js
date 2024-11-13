import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../firebaseConfig';
import login from './../../assets/eye.png';
import fire from './../../assets/fire.png';
import Colors from './../Utils/Colors';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentUser,
  setIsSubscribed
} from '../Actions/StoryActions';
import useInAppPurchase from '../Hooks/useInAppPurchase';
import { useStateValue } from '../store/contextStore/StateContext';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const {state, dispatch: contextDispatch} = useStateValue();
  const dispatch = useDispatch();
  const {
    user,
    // email: userEmail,
    // password: userPassword,
  } = useSelector(state => state.storyReducer);
  const [viewLoginOrSignupForm, setViewLoginOrSignupForm] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const email = useRef('');
  const password = useRef('');
  const [pending, setPending] = useState(false);
  const {isSubscribed, connectionErrorMsg, subscribeToApp} = useInAppPurchase();

  const checkIsSubscribed = async () => {
    try {
      if (!user) throw new Error('user not signed in');
      const q = query(
        collection(db, 'subscriptions'),
        where('uid', '==', user.uid),
      );
      const querySnapshot = await getDocs(q);
      const subscriptions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const now = new Date().getTime();
      const monthTime = 60 * 60 * 24 * 30 * 1000;

      console.log({now, monthTime, subscriptions});

      if (subscriptions.some(doc => +doc.data().timestamp + monthTime < now)) {
        dispatch(setIsSubscribed(true));
      }
    } catch (e) {
      console.log(e.message ?? 'user not signed in');
    }
  };

  // const reAuthUser = () => {
  //   const currentUser = auth.currentUser;
  //   if (!userEmail || !userPassword || currentUser) {
  //     console.log('User is signed in or not credentials found.');
  //     return;
  //   }
  //   signInWithEmailAndPassword(auth, userEmail, userPassword)
  //     .then(userCredential => {
  //       // Signed in
  //       const user = userCredential.user;
  //     })
  //     .catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // };

  useEffect(() => {
    contextDispatch({type: 'SHOW_NAVBAR', payload: false});
    onAuthStateChanged(auth, async user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch(setCurrentUser(user));
        setIsLoggedIn(true);
        await checkIsSubscribed();
        // ...
      } else {
        dispatch(setCurrentUser(null));
        setIsLoggedIn(false);
        // User is signed out
        // ...
      }
    });

    // reAuthUser();
  }, []);

  const LearningProgressCard = ({title, storiesCount, wordsCount}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تم التعلم</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تعلمت</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{storiesCount} قصص</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{wordsCount} كلمات</Text>
          </View>
        </View>
      </View>
    );
  };

  const ReadingStreakCard = ({title}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>
          {title}
          <Image source={fire} style={styles.icon} />
        </Text>
        <View style={styles.col}>
          <Image source={login} style={styles.icon} />
          <Text style={styles.label}>قم بتسجيل الدخول لتتبع تقدمك</Text>
        </View>
      </View>
    );
  };

  const ReaderTrakerCard = ({title, storiesCount}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.counter}>{storiesCount}</Text>
          <Text style={styles.label}>القصص المقروءة</Text>
        </View>
        <View style={styles.col}>
          <MaterialCommunityIcons name="calendar" size={24} color="black" />
          <Text style={styles.calendarLabel}>قم بتسجيل الدخول لتتبع تقدمك</Text>
        </View>
      </View>
    );
  };

  const SignupForm = () => {
    const handleSignup = () => {
      setPending(true);
      if (!email.current.value || !password.current.value) {
        Alert.alert(
          'بيانات غير صحيحة',
          'يجب إدخال البريد الإلكتروني و كلمة السر',
        );
        return;
      }
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(userCredential => {
          // Signed up
          const user = userCredential.user;
          // dispatch(
          //   setUserCredentials({
          //     email: email.current.value,
          //     password: password.current.value,
          //   }),
          // );
          setPending(false);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(
            'بيانات خاطئة',
            'البريد الإلكتروني أو كلمة السر غير صحيحة',
          );
          setPending(false);
          // ..
        });
    };
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText}>إنشاء حساب</Text>
        </View>
        <View style={styles.loginHairlineLeft}></View>
        <View>
          <TextInput
            ref={email}
            style={styles.loginInput}
            onChangeText={text => (email.current.value = text)}
            placeholder="البريد الإلكتروني"
          />
          <TextInput
            ref={password}
            style={styles.loginInput}
            onChangeText={text => (password.current.value = text)}
            placeholder="كلمة السر"
            secureTextEntry
          />
          {pending ? (
            <TouchableOpacity
              disabled
              style={styles.disabledloginButton}
              onPress={handleSignup}>
              <Text style={styles.buttonText}>جاري الإنشاء</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
              <Text style={styles.buttonText}>إنشاء</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const LoginForm = () => {
    const handleLogin = () => {
      setPending(true);
      if (!email.current.value || !password.current.value) {
        Alert.alert(
          'بيانات غير صحيحة',
          'يجب إدخال البريد الإلكتروني و كلمة السر',
        );
        return;
      }
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          // dispatch(
          //   setUserCredentials({
          //     email: email.current.value,
          //     password: password.current.value,
          //   }),
          // );
          setPending(false);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(
            'بيانات خاطئة',
            'البريد الإلكتروني أو كلمة السر غير صحيحة',
          );
          setPending(false);
        });
    };
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText}>تسجيل الدخول</Text>
        </View>
        <View style={styles.loginHairlineLeft}></View>
        <View>
          <TextInput
            ref={email}
            style={styles.loginInput}
            onChangeText={text => (email.current.value = text)}
            placeholder="البريد الإلكتروني"
          />
          <TextInput
            ref={password}
            style={styles.loginInput}
            onChangeText={text => (password.current.value = text)}
            placeholder="كلمة السر"
            secureTextEntry
          />
          {pending ? (
            <TouchableOpacity
              disabled
              style={styles.disabledloginButton}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>جاري الدخول</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>دخول</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  if (!isLoggedIn && viewLoginOrSignupForm === 'login') return <LoginForm />;
  if (!isLoggedIn && viewLoginOrSignupForm === 'signup') return <SignupForm />;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.accountText}>الحساب</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.accountTypeContainer}>
            <Text style={styles.accountTypeText}>نوع الحساب: مجاني</Text>
          </View>
          <Image source={user} style={styles.profileImage} />
        </View>
        <View style={{...styles.accountTypeContainer, ...styles.subscribe}}>
          <Pressable
            onPress={() => {
              if (user?.uid) subscribeToApp();
              else
                Alert.alert(
                  'عملية غير مقبولة',
                  'يجب تسجيل الدخول أو إنشاء حساب لتتمكن من الاشتراك',
                );
            }}>
            <Text style={styles.subscribeText}>إشترك الآن</Text>
          </Pressable>
        </View>
        <View style={styles.cardContainer}>
          <LearningProgressCard
            title="تقدمك في التعلم"
            storiesCount={5}
            wordsCount={150}
          />
        </View>
        <View style={styles.cardContainer}>
          <ReadingStreakCard title="سلسلة القراءة" />
        </View>
        <View style={styles.cardContainer}>
          <ReaderTrakerCard title="تتبع القراءة" storiesCount={0} />
        </View>
      </ScrollView>
      {!user?.uid && (
        <View style={styles.loginButtonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setViewLoginOrSignupForm('login')}>
            <Text style={styles.buttonText}>تسجيل دخول</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setViewLoginOrSignupForm('signup')}>
            <Text style={styles.buttonText}>إنشاء حساب</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.hairlineLeft}></View>

      <View>
        <Pressable onPress={() => checkIsSubscribed()}>
          <Text>TEST</Text>
        </Pressable>
      </View>
      <View>
        <Text
          style={{color: 'blue', padding: '8%'}}
          onPress={() =>
            Linking.openURL(
              'https://belarabi.equant-tech.com/privacypolicy.html',
            )
          }>
          privacy policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: width * 0.06,
    fontFamily: 'outfit',
    paddingLeft: width * 0.04,
  },
  loginInput: {
    width: width * 0.8,
    marginBottom: 10,
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    textAlign: 'right',
  },
  loginHairlineLeft: {
    marginBottom: 20,
    borderBlockColor: '#ddd',
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    bottom: 'auto',
  },
  hairlineLeft: {
    borderBlockColor: '#ddd',
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    bottom: 'auto',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    padding: width * 0.05,
    direction: 'rtl',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingIcon: {
    width: width * 0.075 * 0.75,
    height: height * 0.0375 * 0.75,
    borderRadius: width * 0.0375,
  },
  accountText: {
    color: Colors.black,
    fontSize: width * 0.06,
    fontFamily: 'outfit',
    paddingLeft: width * 0.04,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  accountTypeContainer: {
    backgroundColor: '#eaaa00',
    padding: height * 0.015,
    borderRadius: width * 0.02,
  },
  subscribe: {
    marginTop: height * 0.015,
    marginBottom: height * 0.015,
  },
  accountTypeText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
  subscribeText: {
    textAlign: 'center',
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.005,
  },
  cardContainer: {
    marginTop: height * 0.015,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: height * 0.02,
    width: width * 0.8,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    margin: `${height * 0.015} ${width * 0.1}`,
  },
  header: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.025,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.005,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: width * 0.0425,
    color: 'black',
  },
  counterContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  counter: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'black',
  },
  calendarLabel: {
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
    color: 'black',
  },
  disabledloginButton: {
    backgroundColor: '#eaaa00',
    paddingVertical: height * 0.01,
    width: width * 0.8,
    borderRadius: 10,
    opacity: 0.7,
  },
  loginButton: {
    backgroundColor: '#eaaa00',
    paddingVertical: height * 0.01,
    width: width * 0.8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#eaaa00',
    paddingVertical: height * 0.01,
    width: width * 0.35,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  loginButtonContainer: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.015,
  },
});

export default ProfileScreen;
