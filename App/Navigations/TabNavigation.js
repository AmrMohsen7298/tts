import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import TrainingStack from "./TrainingStack/TrainingStack";
import LibraryScreen from "../Screens/LibraryScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import StackNavigation from "./StackNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faScroll, faDumbbell } from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import Ionicons from "react-native-vector-icons/Ionicons"; // Correct import path for Ionicons
import Colors from "../Utils/Colors";
import LibraryStack from "./LibraryStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#42BB7E',
          tabBarIconStyle: { backgroundColor: '#42BB7E' },
          // tabBarStyle: { borderTopLeftRadius: 5, borderTopRightRadius: 5 },
        }}
      >
        <Tab.Screen
          name="Stories"
          component={StackNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faScroll} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Training"
          component={TrainingStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faDumbbell} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="My Library"
          component={LibraryStack}
          options={{
            tabBarIcon: ({ color, size }) => (
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
  
  );
}
