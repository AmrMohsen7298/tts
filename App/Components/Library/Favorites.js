import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import LevelsCard from "../../Components/HomeScreen/levelsCard";

import { useNavigation } from "@react-navigation/native";
import { getAllLessons, getLessonById } from "../../Services/LessonServices";
import { useSelector } from "react-redux";
import LibraryStack from "../../Navigations/LibraryStack";

export default function Favorites() {
  const navigation = useNavigation(LibraryStack);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

 const favorites = useSelector(state=>state.storyReducer.favorites)
  
  useEffect(() => {
   console.log(favorites)
   favorites.map((id)=>{
    console.log("ID",id)
    getLessonById(id).then((lesson)=>{
        setLessons([...lessons, lesson])
    })
   })
  }, [favorites]);
useEffect(()=>{ console.log(lessons.length)
},[lessons])
  const handleOnPress = (lessonId, lessonImage) => {
    getLessonById(lessonId).then((resp) => {
      navigation.navigate("LessonScreen", { lessonId, image: lessonImage });
    });
  };

  return (
      <View >
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
        >
          {lessons?.length > 0 && lessons.map((lesson, index) => (
             (
              <TouchableOpacity
                key={index}
                onPress={() => handleOnPress(lesson?.id, 'data:image/png;base64,' + lesson?.image)}
              >
                <View>
                  <LevelsCard
                    title={lesson?.title}
                    description={lesson?.description}
                    image={'data:image/png;base64,' + lesson?.image}
                    key={index}
                    onPress={() => handleOnPress(lesson?.id, 'data:image/png;base64,' + lesson?.image)}
                  />
                </View>
              </TouchableOpacity>
            )
          ))}
        </ScrollView>
  
        </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
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
  },
  activeTab: {
    backgroundColor: '#42BB7E',
    borderColor: 'white',
    borderRadius: 20
  },
  tabText: {
    fontSize: 17,
    color: "#333",
  },
  searchContainer: {
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row-reverse'
  },
  hideButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    width: 110,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
    color: "black",
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
    borderColor: '#42BB7E',
    borderWidth: 1,
    width: 200,
    height: 50,
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: "outfitSemi",
    fontSize: 16,
    color: '#42BB7E',
    width: '100%',
    textAlign: 'center'
  },
});
