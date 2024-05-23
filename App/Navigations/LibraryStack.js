import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from '../Components/Library/Favorites';
import LibraryScreen from '../Screens/LibraryScreen';

export default function LibraryStack(){
    const LessonStack = createStackNavigator();
    return(
        <LessonStack.Navigator>
            <LessonStack.Screen name='Library' component={LibraryScreen} options={{headerShown:false,headerBackTitleVisible: false}}/>
            <LessonStack.Screen name='Favorites' component={Favorites} options={{headerShown: false}} />
            {/* <LessonStack.Screen name='TrainingKeywords' component={TrainingKeywords} options={{headerBackTitleVisible: false}}/>
            <LessonStack.Screen name='TrainingList' component={TrainingList} options={{headerBackTitleVisible: false}}/> */}
        </LessonStack.Navigator>
    )
}