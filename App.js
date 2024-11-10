import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { withIAPContext, initConnection } from 'react-native-iap';
import {
  faInfoCircle,
  faCalendar,
  faAngleLeft,
  faCheck,
  faHeart,
  faCircleCheck,
  faDumbbell,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './App/store/index'; // Import the configured store and persistor
import {StateProvider} from './App/store/contextStore/StateContext';

// Add FontAwesome icons to the library
library.add(
  faInfoCircle,
  faCalendar,
  faAngleLeft,
  faCheck,
  faHeart,
  faCircleCheck,
  faDumbbell,
  faPlay,
);

const App = () => {
    useEffect(() => {
        const initIAPConnection = async () => {
            const connected = await initConnection();
            if (!connected) {
                console.log("Failed to connect to IAP");
            }
        };
        initIAPConnection();
    }, []);
    return (<StateProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <TabNavigation />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    </StateProvider>);
}

export default withIAPContext(App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
