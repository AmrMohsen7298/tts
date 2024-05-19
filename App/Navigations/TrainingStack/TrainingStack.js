import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TrainingScreen from '../../Screens/TrainingScreen';
import TrainingKeywords from '../../Components/Training/TrainingKeywords';
import TrainingList from '../../Components/Training/TrainingList'

export default function TrainingStack(){
    const TrainingStack = createStackNavigator();
    return(
        <TrainingStack.Navigator>
            <TrainingStack.Screen name='TrainingScreen' component={TrainingScreen} options={{headerShown: false}} />
            <TrainingStack.Screen name='TrainingKeywords' component={TrainingKeywords} options={{headerBackTitleVisible: false}}/>
            <TrainingStack.Screen name='TrainingList' component={TrainingList} options={{headerBackTitleVisible: false}}/>
        </TrainingStack.Navigator>
    )
}