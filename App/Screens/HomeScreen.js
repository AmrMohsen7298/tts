import { View, Text, ScrollView, Touchable,StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import StoriesCard from "../Components/HomeScreen/storiesCard";
import LevelsCard from "../Components/HomeScreen/levelsCard";
import Colors from "../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StackNavigation from "../Navigations/StackNavigation";
import { getAllLessons, getLessonById } from "../Services/LessonServices";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { levels } from "../Utils/constants";
export default function HomeScreen() {
  const navigation = useNavigation(StackNavigation);
  const [lessons, setLessons] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [levels.A1,levels.A2,levels.A3,levels.A4,levels.A5,levels.A6,levels.B1,levels.B2,levels.B3,levels.C1,levels.C2,levels.C3];
  
  useEffect(() => {
    getAllLessons().then((resp) => setLessons(resp));
  }, []);

  handleOnPress = (lessonId,lessonImage) => {
    getLessonById(lessonId).then((resp) => {
      navigation.navigate("LessonScreen", { lessonId, image: lessonImage });
    });
  };

  return (
    <ScrollView>
      <Header />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 7,
          justifyContent: "flex-end",
          right: "1%",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
          }}
        >
          قصص مجانية
        </Text>
        <Ionicons name="gift-outline" size={19} color="black" />
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          keyboardShouldPersistTaps="always"
        >
          {lessons?.length > 0 &&
            lessons?.map((lesson, index) => (
              !lesson?.paid && 
              // <TouchableOpacity key={index} onPress={() => navigation.navigate("LessonScreen")}>
              <TouchableOpacity
                key={index}
                onPress={() => handleOnPress(lesson?.id, 'data:image/png;base64, '+lesson?.image)}
              >
                <View
                  style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 30 }}
                >
                  <StoriesCard
                    title={lesson?.title}
                    description={lesson?.description}
                    image={'data:image/png;base64, '+lesson?.image}
                  />
                </View>
              </TouchableOpacity>
              ))}
        </ScrollView>
      </View>
      <View style={{    alignItems: "center",
    paddingLeft:20,
    paddingTop:0,
    paddingBottom:0,
    flexDirection:'row-reverse'}}>

      
      <View >
        <Text style={{fontFamily:"outfit",fontSize:17}}>
          بحث بالمستوي : كل
        </Text>
     
      </View>
      <View style={{paddingRight:140}}>
      <TouchableOpacity
     
      
     style={{
       backgroundColor:  "#ccc" ,
       borderRadius: 10, // Adjust this value to control the roundness of the button
       width: 110, // Adjust this value to control the width of the button
       height: 35, // Adjust this value to control the height of the button
       alignItems: "center",
       justifyContent: "center",
       margin: 10, // Adjust this value to control the margin between buttons
     }}
   >
     <Text style={{fontFamily:"outfit",fontSize:17}}>
     <Ionicons name={"checkmark-circle-outline"} size={18}  color="white" />
        اخفاء ما تعلمت</Text>
     
   </TouchableOpacity>
      </View>
      </View>
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContentContainer}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeTab === index && styles.activeTab]}
              onPress={() => setActiveTab(index)}
            >
              <Text style={styles.tabText}>{tab.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      

      <View style={{ marginTop: "5%" }}>
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
        >
          {lessons?.length > 0 && lessons?.map((lesson, index) => (
            lesson?.paid && 
            <TouchableOpacity
            key={index}
            onPress={() => handleOnPress(lesson?.id, 'data:image/png;base64, '+lesson?.image)}
          >
            <View>
            <LevelsCard title={lesson?.title} description={lesson?.description} image={'data:image/png;base64, '+lesson?.image} key={index} onPress={()=>handleOnPress(lesson?.id, 'data:image/png;base64, '+lesson?.image)} />
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  
  tabsContainer: {
    alignItems: "center",
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:20
  },
  tabsContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
    // backgroundColor:'black'
  },
  activeTab: {
    backgroundColor: '#42BB7E',
    borderColor: 'white',
    borderRadius:20
  },
  tabText: {
    fontSize: 17,
    color: "#333",
  },
  contentContainer: {
    flex: 1,
    marginTop: "10%",
    justifyContent: 'flex-start',
    alignItems: "center",
    padding: 0,
    margin: 0,
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  card_level: {
    color: Colors.black,
    fontFamily: "outfit",
    fontSize: 14,
    padding: 2,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderColor:'#42BB7E',
    borderWidth:1,
    width:200,
    height:50,
    alignItems:'center'
  },
  buttonText: {
    fontFamily: "outfitSemi",
    fontSize: 16,
    color:'#42BB7E',
    width:'100%',
    textAlign:'center'
  },
});
