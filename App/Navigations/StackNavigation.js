import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import LessonScreen from '../Screens/LessonScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import {useStateValue} from '../store/contextStore/StateContext';
import ARROWBACKBLACK from '../../assets/arrow-back-black.png';
import ARROWBACKWHITE from '../../assets/arrow-back-white.png';
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
            <Image
              source={ARROWBACKWHITE}
              onPress={() => {
                navigation.goBack('HomeScreen');
                dispatch({type: 'SHOW_NAVBAR', payload: true});
              }}
              style={{
                width: 25,
                height: 25,
                paddingHorizontal: width * 0.05,
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
            <Image
              source={ARROWBACKBLACK}
              onPress={() => {
                navigation.goBack(HomeScreen);
                dispatch({type: 'SHOW_NAVBAR', payload: true});
              }}
              style={{
                width: 25,
                height: 25,
                paddingHorizontal: width * 0.05,
                marginTop: height * 0.026,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
