import {
  faDumbbell,
  faFileText,
  faScroll,
} from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { db } from '../../firebaseConfig';
import { useStateValue } from '../store/contextStore/StateContext';
import LibraryStack from './LibraryStack';
import StackNavigation from './StackNavigation';
import TrainingStack from './TrainingStack/TrainingStack';

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const {state, dispatch} = useStateValue();

  const checkUserSubscription = async () => {
    const timestamp = new Date().getMilliseconds();
    const query = query(collection(db, 'subscriptions'), where('timestamp', '<', timestamp));
    const docRef = doc(db, 'subscriptions', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userSubscription = docSnap.data();
      if (userSubscription.is_subscribed) {
        dispatch({
          type: 'IS_SUBSCRIBED',
          payload: userSubscription.is_subscribed,
        });
      }
    } else {
      dispatch({
        type: 'IS_SUBSCRIBED',
        payload: false,
      });
    }
  };

  useEffect(() => {
    if (state.user) checkUserSubscription(state.user.uid);
  }, [state.user]);

  return (
    <View style={{...styles.navBarBg}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#eaaa00',
          // tabBarIconStyle: {backgroundColor: '#eaaa00', marginBottom: '5%'},
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            height: height * 0.08,
            display: state.showNavbar ? 'block' : 'none',
          },
        }}>
        <Tab.Screen
          name="القصص"
          component={StackNavigation}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faScroll} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="تدريبات"
          component={TrainingStack}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faDumbbell} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="مكتبتي"
          component={LibraryStack}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faFileText} size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-sharp" size={size} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarBg: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
