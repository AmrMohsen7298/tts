import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TrainingScreen from '../../Screens/TrainingScreen';
import TrainingKeywords from '../../Components/Training/TrainingKeywords';
import TrainingList from '../../Components/Training/TrainingList'
import ListDone from '../../Components/Training/trainingDoneList';
import ListHard from '../../Components/Training/trainingHardList';
import ListMedium from '../../Components/Training/trainingMediumList';

export default function TrainingStack(){
    const TrainingStack = createStackNavigator();
    return(
        <TrainingStack.Navigator>
            <TrainingStack.Screen name='TrainingScreen' component={TrainingScreen} options={{headerShown: false}} />
            <TrainingStack.Screen name='TrainingKeywords' component={TrainingKeywords} options={{headerBackTitleVisible: false}}/>
            <TrainingStack.Screen name='TrainingList' component={TrainingList} options={{headerBackTitleVisible: false}}/>
            <TrainingStack.Screen name='done' component={ListDone} options={{headerBackTitleVisible: false}}/>
            <TrainingStack.Screen name='hard' component={ListHard} options={{headerBackTitleVisible: false}}/>
            <TrainingStack.Screen name='medium' component={ListMedium} options={{headerBackTitleVisible: false}}/>
        </TrainingStack.Navigator>
    )
}