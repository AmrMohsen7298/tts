
import { StyleSheet, Text, View } from "react-native";

import LoginScreen from "./App/Screens/LoginScreen";
import  {NavigationContainer}  from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import {library}  from "@fortawesome/fontawesome-svg-core";
import { faCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import TrainingKeywords from "./App/Components/Training/TrainingKeywords";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import StackNavigation from "./App/Navigations/StackNavigation";
import { Provider } from "react-redux";
import store from "./App/store";
export default function App() {

  // in App.js

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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
