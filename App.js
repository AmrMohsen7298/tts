import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle, faCalendar, faAngleLeft, faCheck, faHeart, faCircleCheck, faDumbbell, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './App/store'; // Import the configured store and persistor

// Add FontAwesome icons to the library
library.add(
  faInfoCircle,
  faCalendar,
  faAngleLeft,
  faCheck,
  faHeart,
  faCircleCheck,
  faDumbbell,
  faPlay
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
