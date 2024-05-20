import React, { useEffect, useRef, useState } from "react";

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import View, {
  
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import TextHighlighter from './../Components/TextHighlighter'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {Ionicons} from 'react-native-vector-icons'

import pic from "../../assets/Images/bird.jpg";
import Colors from "../Utils/Colors";
import { MaterialIcons } from "react-native-vector-icons";
import { AntDesign } from "react-native-vector-icons";
import KeywordCard from "../Components/KeyWordCard/KeywordCard";
import Card from "../Components/Card";
import { LessonTabs } from "../Utils/constants";
import { getStoryAudio, getStoryById, getWordByText } from "../Services/LessonServices";
import CustomAudioPlayer from "../Components/AudioPlayer/CustomAudioPlayer";

import CircularProgress from "../Utils/pie";
import { useFocusEffect } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
// import CustomAudioPlayer from "../Components/AudioPlayer/CustomAudioPlayer";
 export default function LessonScreen(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [playPressed, setPlayPressed] = useState(false);
  const [trainingPressed, setTrainingPressed] = useState(false);
  const tabs = [LessonTabs.STORY, LessonTabs.QUIZ, LessonTabs.KEYWORDS, LessonTabs.GRAMMAR];
  const [storyParagraph,setStoryParagraph] = useState();
  const [storySentences, setStorySentences] = useState();
  const [audioSrc, setAudioSrc] = useState();
  const [highlightIndex, setHighlightIndex] = useState();
  const [selectedWord, setSelectedWord] = useState();
  const [selectedWordAudio, setSelectedWordAudio] = useState();
  const [SelectedWordTranslation, setSelectedWordTranslation] = useState()
  const [translation, setTranslation] = useState();
  const [name, setName] = useState();
  const [favorites, setFavorites] = useState([]);
  const [translateButton, setTranslateButton] = useState(false);
  const [favoriteButton, setfavoriteButton] = useState(false);
  const re = new RegExp("[.,;:\\s?!]+");
  const sound = useRef(new Audio.Sound());
  const storyAudioPlaying = useSelector(state=>state.storyReducer.storyAudioPlaying)
  useEffect(()=>{
    console.log("props",props?.route?.params?.lessonId)
    getStoryById(props?.route?.params?.lessonId).then((resp)=>{
      setStoryParagraph(resp?.paragraph)
      setTranslation(resp?.translation)
      setName(resp?.name)
      getStoryAudio(resp?.id).then((res)=>{
          var reader = new FileReader();
          reader.readAsDataURL(res)
          reader.onload = () => {
              setAudioSrc(reader?.result?.split(",")[1])

          }})
    })

  },[])
  useEffect(()=>{
    if(storyParagraph){
      setStorySentences(storyParagraph.split(["."]))
      console.log("sentences", storyParagraph.split(["."]))
    }
  },[storyParagraph])
  _onPlayBackStatusUpdates = playbackStatus =>{
    if(playbackStatus.didJustFinish){
      setPlayPressed(false);
    }
  }
  useEffect(()=>{
    console.log("STORYPLAYING", storyAudioPlaying)
    let timeout
    let flag = true
    if(storyAudioPlaying){
      // storyParagraph.split(" ").map((word,index)=>{
        
      //    timeout = setTimeout(()=>{setHighlightIndex(index)},530*index)
         
      // })
    }
    return()=>{
      clearTimeout(timeout)
    }

  },[storyAudioPlaying])
  useEffect(()=>{
    async function playSound(){
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
    interruptionModeAndroid:InterruptionModeAndroid.DoNotMix,
  })
    const { sound: playbackObject }  = await Audio.Sound.createAsync({uri:`data:audio/mp3;base64, ${selectedWordAudio}`}); 
    playbackObject.setOnPlaybackStatusUpdate(this._onPlayBackStatusUpdates)
    sound.current = playbackObject
    const checkLoaded = await sound.current.getStatusAsync();
    console.log("checkLoaded", checkLoaded);
    if (checkLoaded.isLoaded === true) {
      await sound.current.playAsync();
    }
    }
    if(playPressed){
      playSound();

    }
  },[playPressed])
  // useEffect(()=>{
  //   switch (activeTab){
  //     case LessonTabs.STORY:  
  //     if(!storyParagraph){

  //       getStoryById(props?.lessonId).then(resp=>console.log(resp.paragraph))
  //     }
  //     break;

  //   }


  // },[activeTab])

  onPressWord=(word,index)=>{
    // storySentences.map((sentence, index)=>{
    //   if(sentence.includes(word))
    //     storySentences.split(" ").findIndex
      
    addFavorite = (item) => {
      setFavorites([...favorites, item]);
    };
     removeFavorite = (id) => {
      setFavorites(favorites.filter((item) => item.id !== id));
    };
    // })
    setHighlightIndex(index)
    //get word logic
    getWordByText(word.split(re)[0], props?.route?.params?.lessonId).then(res=>{
      setSelectedWord(res?.text)
      setSelectedWordTranslation(res?.translation)
      setSelectedWordAudio(res?.audio)
    })

  }

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          
          <ScrollView style={{bottom:10,backgroundColor:"white"}}
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 5 }}
        >
         
          <View style={{width:'auto',backgroundColor:"white"}}>
            <View style={{display:'flex',paddingBottom:16}}>
              <Text style={{fontSize:30}}>{name}</Text>
              {/* <Text
                style={{
                  color: Colors.black,
                  fontFamily: "outfitBold",
                  fontSize: 20,
                  textAlign: "right",
                }}
              >
                اكتشاف جديد في اللغة العربية
              </Text> */}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 15,
                padding: 1,
                paddingBottom:25
              }}
            >
              <View style={styles.level_container}>
                <Text style={styles.card_level}>A1</Text>
              </View>

              <MaterialIcons
                name="translate"
                size={22}
                color= {translateButton ?"green" :  "rgba(0, 0, 0, 0.2)"}
                onPress={()=>setTranslateButton(!translateButton)}
              />
               <MaterialIcons
                name="favorite"
                size={22}
                color={favoriteButton ? "red":"rgba(0, 0, 0, 0.2)"}
                onPress={()=>setFavorites()}
              />
            </View>
            
            <View style={{flexDirection:translateButton? 'row':'row-reverse',flexWrap: 'wrap', gap: translateButton? 3: 5}}>
            { translateButton? translation?.split(" ").map((word, index)=>{
              return (<Pressable  key={index} onPress={()=>onPressWord(word,index)}style={{flex: 0,textAlign: 'center',justifyContent: 'center',
              overflow: 'hidden',borderRadius:5,backgroundColor: index == highlightIndex ? '#42BB7E' : 'transparent'}}>
                <Text>
                <Text style={{ color: index == highlightIndex? 'white':'black', borderRadius:20,  fontFamily:'outfit',fontSize:20, textAlign: "center"}}>
                {word}
                </Text>
                </Text>
              </Pressable>)

            }) :  storyParagraph?.split(" ").map((word, index)=>{
              return (<Pressable  key={index} onPress={()=>onPressWord(word,index)} style={{flex: 0,textAlign: 'center',justifyContent: 'center',
               overflow: 'hidden',borderRadius:5,backgroundColor: index == highlightIndex ? '#42BB7E' : 'transparent'}}>
                <Text>
                <Text style={{    color: index == highlightIndex? 'white':'black' ,   fontFamily:'outfit',fontSize:20, textAlign: "center"}}>
                   {word}
                </Text>
                </Text>
              </Pressable>)

            })
            }
             
            </View>
          </View>
          </ScrollView>
        );
      case 1:
        return (
          <View style={{ flexDirection:'column',gap:40,alignItems: "center" }}>
            <AntDesign name="sound" size={25} color="#42BB7E" />
            <Text style={{ fontFamily: "outfit", textAlign: "center" , fontSize:24 }}>
              عدم اهتمام ___ مجالات البحث العلميّ في استخدام اللّغة العربيّة
              كلغةٍ خاصّة في الأبحاث الأكاديميّة والعلميّة
            </Text>
            <View style={{ flexDirection: "column",gap:10, marginTop: 10 }}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>مُعظم</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>بعض</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>شيئ</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 2:
        return <KeywordCard></KeywordCard>;
      case 3:
        return <Card></Card>;
      default:
        return null;
    }
  };
renderphoto=()=>{
  switch(activeTab){
    case 0 :
      
      return(
      <View style={styles.photoContainer}>
      <ImageBackground style={styles.photo} source={{uri: props?.route?.params?.image}} resizeMode="cover" >
      <View style={{  alignItems: "center",
  paddingLeft:20,
  paddingTop:40,
  paddingBottom:0,
  flexDirection:'row-reverse'}}>
    <View  style={{flex: 0,
    width:100,
    height:30,
    paddingTop:0,
  textAlign: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 20}}>

      <TouchableOpacity
   
    
   style={{
     backgroundColor:  "transparent" ,
  
     borderRadius: 10, // Adjust this value to control the roundness of the button
     width: 80, // Adjust this value to control the width of the button
     height: 35, // Adjust this value to control the height of the button
     alignItems: "center",
     justifyContent: "center",
     margin: 10, // Adjust this value to control the margin between buttons
   }}
 >
      <Text style={{fontFamily:"outfit",fontSize:17}} >
    <Ionicons name={"checkmark-outline"} size={15}  color="black" />
    تم التعلم</Text>
    </TouchableOpacity>
    </View>
  </View>
  <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
  
  <View style={{paddingTop:20}}  >
    {selectedWord && SelectedWordTranslation&&
      <View  style={{flex: 0,
        width:410,
        height:100,
        paddingBottom:50,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 20,display:'flex'}}>
     <View style={styles.cardContainer}>
      <View style={{flexDirection:'column', width: '80%', flexWrap: 'wrap', direction:'rtl'}}>
        <View style={styles.cardHead}>
          <Text style={{fontSize:22,color:'black'}}>{selectedWord}</Text>
        </View>
        <Text style={{fontSize:18,color:'black'}}>{SelectedWordTranslation}</Text>
      </View>
      <View style={styles.cardButtons}>
        <Pressable style={trainingPressed? styles.cardButtonUpPressed :styles.cardButtonUp} onPress={()=>{trainingPressed?setTrainingPressed(false): setTrainingPressed(true)}}>
          <FontAwesomeIcon icon='dumbbell'></FontAwesomeIcon>
        </Pressable>
        <Pressable style={ playPressed || storyAudioPlaying? styles.cardButtonDownPressed :styles.cardButtonDown} onPress={()=>setPlayPressed(true)}>
        <FontAwesomeIcon icon='play'></FontAwesomeIcon>
        </Pressable>

      </View>
    </View>
  </View>
    }
  </View>
  </View>
        </ImageBackground>
        </View>
      

      )
      case 1:
        return(
          <View style={{...styles.photoContainer, backgroundColor:'#42BB7E'}}>
          <AnimatedCircularProgress
          size={150}
          width={15}
          fill={1/4*100}
          tintColor="white"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875" 
          rotation = {0}

           >
             {
    (fill) => (
      <Text style={{fontSize:25, fontWeight:"bold", color: 'white'}}>
        { 1 +" / "+ 4 }
      </Text>
    )
  }
           </AnimatedCircularProgress>
       </View>
        )
        case 2:
          return(
            <View style={styles.photoContainer}>
          <ImageBackground style={styles.photo} source={{uri: props?.route?.params?.image}} resizeMode="cover" >
          <View style={{  alignItems: "center",
      paddingLeft:20,
      paddingTop:40,
      paddingBottom:0,
      flexDirection:'row-reverse'}}>
        <View  style={{flex: 0,
        width:100,
        height:30,
        paddingTop:0,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 20}}>
    
          <TouchableOpacity
       
        
       style={{
         backgroundColor:  "transparent" ,
      
         borderRadius: 10, // Adjust this value to control the roundness of the button
         width: 80, // Adjust this value to control the width of the button
         height: 35, // Adjust this value to control the height of the button
         alignItems: "center",
         justifyContent: "center",
         margin: 10, // Adjust this value to control the margin between buttons
       }}
     >
          <Text style={{fontFamily:"outfit",fontSize:17}} >
        <Ionicons name={"checkmark-outline"} size={15}  color="black" />
        تم التعلم</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View>
      
      <View >
        <View style={styles.cardContainer}>
          <View style={{flexDirection:'column', width: '80%'}}>
            <View style={{flexDirection:'row-reverse'}}>
              <TouchableOpacity  style={{
         backgroundColor:  "#42BB7E" ,
      
         borderRadius: 10, // Adjust this value to control the roundness of the button
         width: 200, // Adjust this value to control the width of the button
         height: 50, // Adjust this value to control the height of the button
         alignItems: "center",
         justifyContent: "center",
         margin: 20,
         
         // Adjust this value to control the margin between buttons
       }}>
        <Text style={{fontFamily:"outfit",fontSize:25,fontWeight:'bold'}} >
        <Ionicons name={"arrow-back-outline"} size={25}   color="black" />
          تذكر الكلمات 
       
       <Ionicons name={"file-tray-full-outline"} size={25}  color="black" /></Text>
             
              </TouchableOpacity>
              </View>
            <Text style={styles.cardDefinition}> {props?.definition}</Text>
          </View>
          
        </View>
      </View>
    
      </View>
            </ImageBackground>
            
            </View>
    
          )
          case 3:
            return(<View style={styles.photoContainer}>
            <ImageBackground style={styles.photo} source={{uri: props?.route?.params?.image}} resizeMode="cover" >
            <View style={{  alignItems: "center",
        paddingLeft:20,
        paddingTop:40,
        paddingBottom:0,
        flexDirection:'row-reverse'}}>
          <View  style={{flex: 0,
          width:100,
          height:30,
          paddingTop:0,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20}}>
      
            <TouchableOpacity
         
          
         style={{
           backgroundColor:  "transparent" ,
        
           borderRadius: 10, // Adjust this value to control the roundness of the button
           width: 80, // Adjust this value to control the width of the button
           height: 35, // Adjust this value to control the height of the button
           alignItems: "center",
           justifyContent: "center",
           margin: 10, // Adjust this value to control the margin between buttons
         }}
       >
            <Text style={{fontFamily:"outfit",fontSize:17}} >
          <Ionicons name={"checkmark-outline"} size={15}  color="black" />
          تم التعلم</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View>
        
       
      
        </View>
              </ImageBackground>
              
              </View>
      
            )


  }
}
  return (
    
    <View style={styles.container}>
        
        {/* <ImageBackground style={styles.photo} source={{uri: props?.route?.params?.image}} resizeMode="cover" >
        <View style={{  alignItems: "center",
    paddingLeft:20,
    paddingTop:40,
    paddingBottom:0,
    flexDirection:'row-reverse'}}>
      <BlurView intensity={70} tint={'regular'} style={{flex: 0,
      width:100,
      height:30,
      paddingTop:0,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20}}>

        <TouchableOpacity
     
      
     style={{
       backgroundColor:  "transparent" ,
    
       borderRadius: 10, // Adjust this value to control the roundness of the button
       width: 80, // Adjust this value to control the width of the button
       height: 35, // Adjust this value to control the height of the button
       alignItems: "center",
       justifyContent: "center",
       margin: 10, // Adjust this value to control the margin between buttons
     }}
   >
        <Text style={{fontFamily:"outfit",fontSize:17}} >
      <Ionicons name={"checkmark-outline"} size={15}  color="black" />
      تم التعلم</Text>
      </TouchableOpacity>
      </BlurView>
    </View>
    <View>
    
    <View >
      <View style={styles.cardContainer}>
        <View style={{flexDirection:'column', width: '80%'}}>
          <View style={styles.cardHead}>
            <Text style={{fontSize:22,bottom:15,left:220,color:'white'}}>كَتَّبَ: (فعل)</Text>
            <Text style={{fontSize:18,top:25,right:60,color:'white'}}>كتَّبَ يكتِّب ، تَكْتِيبًا ، فهو مُكتِّب ، والمفعول مُكتَّب</Text>
          </View>
          <Text style={styles.cardDefinition}> {props?.definition}</Text>
        </View>
        <View style={styles.cardButtons}>
          <Pressable style={trainingPressed? styles.cardButtonUpPressed :styles.cardButtonUp} onPress={()=>{trainingPressed?setTrainingPressed(false): setTrainingPressed(true)}}>
            <FontAwesomeIcon icon='dumbbell'></FontAwesomeIcon>
          </Pressable>
          <Pressable style={ playPressed? styles.cardButtonDownPressed :styles.cardButtonDown} onPress={()=>setPlayPressed(true)}>
          <FontAwesomeIcon icon='play'></FontAwesomeIcon>
          </Pressable>

        </View>
      </View>
    </View>
  
    </View>
          </ImageBackground>
       */}
       {this.renderphoto()}

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

      {/* Content */}
      <View style={styles.contentContainer}>
      <View style={styles.hairlineLeft}>

</View>
        {renderContent()}
      </View>
      <CustomAudioPlayer audioUrl={audioSrc} setHighlightIndex={setHighlightIndex}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  photoContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    alignItems: "center",
    color:"white"
  },
  tabsContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color:"white"
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
  cardContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 400,
    height: 100,
    backgroundColor: 'transparent',
    borderRadius: 20,
    
    paddingTop:40,
    paddingLeft:30
  },
  cardButtons:{
    flexDirection: 'column',
    alignSelf: 'flex-end',
    width: '20%',
    height: '100%'


  },
  cardButtonUp:{
    backgroundColor: '#42BB7E',
    borderRadius: 10,
    height: '50%',
    width: '50%',
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'transparent',
    margin:5

  },
  cardButtonUpPressed:{
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: '50%',
    width: '50%',
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'transparent',
    margin:5
    

  },
  cardButtonDown:{
    backgroundColor: '#42BB7E',
    borderRadius: 10,
    height: '50%',
    width: '50%',
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:5,

  },
  cardHead:{
    flexDirection: 'row'
  },
  cardButtonDownPressed:{
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: '50%',
    width: '50%',
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:5
  },
  hairlineLeft: {
    borderBlockColor: '#A2A2A2',
    borderWidth:1,
    width: '100%',
    bottom:25
    
  },
});


