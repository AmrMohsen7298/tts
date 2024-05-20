import React from "react";
import  {View, Text,  StyleSheet, Image } from "react-native";
// import Constants from "expo-constants";
import  Entypo  from "react-native-vector-icons/Entypo";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
// You can import from local files
import pic from "../../../assets/Images/bird.jpg";
import Colors from "../../Utils/Colors";

// or any pure javascript modules available in npm
// import { Card } from "react-native-paper";

export default function App(props) {
  return (
    <View style={styles.container}>
      <View style={styles.card_template}>
        <Image style={styles.card_image} source={{uri: props?.image}} />
        <View style={styles.lock_container}>
          <Entypo name="lock" size={15} color="white" />
        </View>

        <View style={styles.text_container}>
          <Text style={styles.card_title}>
           {props?.title}
          </Text>
          <Text style={styles.card_desc} numberOfLines = {1}>
          {props?.description}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" ,gap:10,padding:2,paddingVertical:30}}>
            <View style={styles.level_container}>
              <Text style={styles.card_level}>A1</Text>
            </View>
            <Text style={styles.date}>1 ابريل 2024</Text>
            <MaterialIcons
              name="favorite"
              size={22}
              color="rgba(0, 0, 0, 0.2)"
              left={200}
            />
          </View>
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
    width: 350,
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
    width: "100%",
    height: "50%",
    bottom: "0.001%",
    padding: 5,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card_title: {
    color: Colors.black,
    fontFamily: "outfitSemi",
    fontSize: 18,
    padding: "2%",
    justifyContent:'flex-end'
  },
  card_desc: {
    color: Colors.black,
    fontFamily: "outfitLight",
    fontSize: 14,
    padding: "2%",
    
  },
  card_level: {
    color: Colors.black,
    fontFamily: "outfit",
    fontSize: 14,
    padding: 1,
    

  },
  lock_container: {
    position: "absolute",
    alignSelf: "center",
    width: "auto",
    height: "auto",
    // bottom: 1,
    top: "3%",
    left: "3.5%",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  date: {
    fontSize: 13,
    fontFamily: "outfitLight",
    paddingVertical:5
    
  },
  level_container: {
    // position: "absolute",
    // alignSelf: "center",
    width: "auto",
    height: "auto",
    padding:'1%',
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
   
    
  },
});
