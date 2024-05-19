import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";

// You can import from local files
import pic from "../../../assets/Images/test.png";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

export default function App(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Image style={styles.card_image} source={{uri: props?.image}} />
        <View style={styles.level_container}>
          <Text style={styles.card_level}>A1</Text>
        </View>
        <View style={styles.text_container}>
          <Text style={styles.card_title}>
            {props?.title}
          </Text>
          <Text style={styles.card_desc}>{props?.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_template: {
    width: 280,
    height: 280,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
  },
  card_image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  text_container: {
    position: "absolute",
    alignSelf: "center",
    width: "90%",
    height: "auto",
    bottom: 20,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  card_title: {
    color: Colors.black,
    fontFamily: "outfit",
    fontSize: 18,
    // padding:2
  },
  card_desc: {
    color: Colors.black,
    fontFamily: "outfitLight",
    fontSize: 11,
    padding: 2,
  },
  card_level: {
    color: Colors.black,
    fontFamily: "outfit",
    fontSize: 14,
    padding: 2,
  },
  level_container: {
    position: "absolute",
    alignSelf: "center",
    width: "auto",
    height: "auto",
    // bottom: 1,
    top:'3%',
    left:'3.5%',
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
});
