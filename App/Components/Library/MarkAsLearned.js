import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image,ActivityIndicator ,Dimensions  } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { getAllLessons, getLessonById } from "../../Services/LessonServices";
import { useSelector } from "react-redux";

import Colors from "../../Utils/Colors";
import { levels } from "../../Utils/constants";
import { useIsFocused } from "@react-navigation/native";
const {width, height} = Dimensions.get('window');
export default function MarkAsLearned() {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const favorites = useSelector(state => state.storyReducer.learned);
  const [favoritesLocal, setFavoritesLocal] = useState([])
  const tabs = [
    levels.A1, levels.A2, levels.A3, levels.A4, levels.A5, levels.A6, 
    levels.B1, levels.B2, levels.B3, levels.C1, levels.C2, levels.C3
  ];

  useEffect(() => {
    console.log(favorites);

    favorites.map(id => {
      console.log("FAVORITESLOCAL", favoritesLocal)
      console.log("ID", id);
      getLessonById(id).then(lesson => {
        setLessons(prevLessons => [...prevLessons, lesson]);
        setLoading(false);
      });
      if(favoritesLocal.some((idx)=>idx == id) && favorites.some((idx)=>idx == id)){
        setLessons(lessons.filter((idx)=> idx !== id))
      }
    });
    if(favorites.length == 0){
      setLessons([])
    }
    setFavoritesLocal(favorites)
  }, [favorites]);

  useEffect(() => {
    console.log(lessons.length);
  }, [lessons]);

  const handleOnPress = (lessonId, lessonImage) => {
    getLessonById(lessonId).then(resp => {
      navigation.navigate("LessonScreen", { lessonId, image: lessonImage });
    });
  };

  return (
    
   <View style={{display:"flex",flex: 1,
   justifyContent: 'flex-start',marginTop:"10%"}}>
     {loading? (
      <View style={{paddingTop:height*0.37}}>

<ActivityIndicator size="large" color="#42BB7E"   style={{

flex: 1,

justifyContent: 'center',

alignItems: 'center',

transform: [{ scale: 2 }] // increase the size

}}  />
</View>
) :(
  <View>
    <View style={{
        display: "flex",
          
        flexDirection: "row",
        gap: 1,
        justifyContent: "flex-end",
        
        borderRadius:6,padding:5,
          left: "3%",
          }}> 
          <Text style={{fontFamily: "outfit", fontSize: 17,color:"black" ,paddingRight:"15%"}}>بحث بالمستوي : كل</Text>
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
   <View>

      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
      >
        {lessons.map((lesson, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOnPress(lesson?.id, 'data:image/png;base64,' + lesson?.image)}
          >
            <View style={styles.Cardcontainer}>
              <View style={styles.card}>
                
                <Image source={{ uri: 'data:image/png;base64,' + lesson?.image }} style={styles.image} />
                <View style={{flex:0, flexDirection: 'col',
               overflow: 'hidden',gap:10}}>

                
                <View style={styles.text_container}>
                  <Text style={styles.title}>{lesson?.title}</Text>
                  <Text style={styles.description}>{lesson?.description}</Text>
                </View>
               <View style={{flexDirection: 'row',
                  justifyContent: 'flex-end',
                 alignItems: 'center',
                 gap:120 ,
                 
                 }}>
                <Text style={styles.date}>1 ابريل 2024</Text>
               </View>
               </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </View>
    )}
   </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse', // Image on the right
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    
  },
  tabsContainer: {
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
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
  
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap:'nowrap'
  },
  text_container: {
    flex: 1,
    flexDirection:'col',
    justifyContent: 'flex-start',
    alignSelf: "flex-end",
   
    width: "80%",
    height: "100%",
    // bottom: "0.001%",
    gap:20

    
    
    
  },
  tabsContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "black"
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  Cardcontainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:130,
    paddingHorizontal: 20
  },
  date: {
    fontSize: 13,
    fontFamily: "outfitLight",
    color: "black"
  },
});
