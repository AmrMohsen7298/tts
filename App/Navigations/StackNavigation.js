import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import LessonScreen from '../Screens/LessonScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import {useStateValue} from '../store/contextStore/StateContext';
const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();

function StackNavigation() {
  const {state, dispatch} = useStateValue();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LessonScreen"
        component={LessonScreen}
        options={({navigation}) => ({
          headerBackTitleVisible: false,
          headerShown: true,
          title: 'القصة',
          headerTransparent: true,
          headerBackgroundContainerStyle: {backgroundColor: 'transparent'},
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={25}
              style={{paddingHorizontal: width * 0.05}}
              color="white"
              onPress={() => {
                navigation.goBack("HomeScreen");
                dispatch({type: 'SHOW_NAVBAR', payload: true});
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerBackTitleVisible: false,
          headerShown: true,
          title: ' ',
          headerTransparent: true,
          headerBackgroundContainerStyle: {backgroundColor: 'transparent'},
          headerTitleStyle: {color: 'black'},
          headerLeft: () => (
            <Ionicons
              name="arrow-back-outline"
              size={25}
              style={{
                paddingHorizontal: width * 0.05,
                marginTop: height * 0.026,
              }}
              color="black"
              onPress={() => {
                navigation.goBack(HomeScreen);
                dispatch({type: 'SHOW_NAVBAR', payload: true});
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
