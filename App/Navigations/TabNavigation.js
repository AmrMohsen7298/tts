import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import TrainingStack from './TrainingStack/TrainingStack';
import LibraryScreen from '../Screens/LibraryScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import StackNavigation from './StackNavigation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faScroll, faDumbbell} from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import path for Ionicons
import Colors from '../Utils/Colors';
import LibraryStack from './LibraryStack';
import {useStateValue} from '../store/contextStore/StateContext';

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const {state, dispatch} = useStateValue();

  console.log('csdfa', state.showNavbar);

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
          name="Stories"
          component={StackNavigation}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faScroll} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Training"
          component={TrainingStack}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faDumbbell} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="My Library"
          component={LibraryStack}
          options={{
            tabBarLabelStyle: {marginBottom: '8%'},
            tabBarIcon: ({color, size}) => (
              <Ionicons name="document-text-sharp" size={size} color={color} />
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
