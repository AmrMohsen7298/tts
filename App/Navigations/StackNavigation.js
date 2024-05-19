import { View, Text } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LessonScreen from "../Screens/LessonScreen";
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="LessonScreen" component={LessonScreen} options={{headerBackTitleVisible: false,headerShown:false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerBackTitle:false,headerShown:false}}/>
      </Stack.Navigator>
    
  );
}

export default StackNavigation;
