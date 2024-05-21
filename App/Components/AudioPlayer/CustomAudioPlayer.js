// import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
// import React, { useEffect, useRef, useState } from "react";
// import { View, Button ,TouchableOpacity,Text} from "react-native";
// import {Ionicons} from 'react-native-vector-icons'
// import { useFocusEffect } from "@react-navigation/native";
// import { connect, useDispatch } from "react-redux";
// import { setAudioPlaying } from "../../Actions/StoryActions";

// const CustomAudioPlayer = ({ audioUrl, setHighlightIndex, selectedSentence }) => {
//         const sound = useRef(new Audio.Sound());
//         const [isPlaying, setIsPlaying] = useState(false);
//         const dispatch = useDispatch();
//         useFocusEffect(
//           React.useCallback(() => {

        
//             return () => {
//               setIsPlaying(false)
//               dispatch(setAudioPlaying(false))
//               setHighlightIndex(null)
//               sound.current.unloadAsync()}
//               ;
//           }, [])
//         );
      
//         useEffect(() => {
//           // Load audio file
//         //   console.log("useEffect", "here")
//         //   const loadAudio = async () => {
//         //     const { audio } = await  Audio.Sound.createAsync(mp3Src)
//         //     console.log("sound", audio)
//         //     setSound(audio);
//         //   };
      
//         //   loadAudio();
      
//         //   Clean up
//           return () => {
//             sound.current.unloadAsync()
//           };
//         }, []);
//         _onPlayBackStatusUpdate = playbackStatus =>{
//           if(playbackStatus.didJustFinish){
//             setIsPlaying(false);
//             dispatch(setAudioPlaying(false))
//             setHighlightIndex(null)
//           }
//           if (playbackStatus.isPlaying) {
//             const wordDuration = 500;
//             const index = Math.floor(playbackStatus.positionMillis / wordDuration);
//             setHighlightIndex(index);
//           }
//         }
      
//         const playSound = async () => {
//         //     console.log("playSound", sound)
//         //   if (sound) {
//         //     await sound.playAsync();
//         //     setIsPlaying(true);
//         //   }
//         await Audio.setAudioModeAsync({
//             playsInSilentModeIOS: true,
//             staysActiveInBackground: false,
//             shouldDuckAndroid: false,
//         interruptionModeIOS: InterruptionModeIOS.DuckOthers,
//         interruptionModeAndroid:InterruptionModeAndroid.DoNotMix,
//       })
//         console.log("AUDIO",audioUrl)
//         const { sound: playbackObject } = await Audio.Sound.createAsync({uri:`data:audio/mp3;base64, ${audioUrl}`});
//         playbackObject.setOnPlaybackStatusUpdate(this._onPlayBackStatusUpdate) 
//         sound.current = playbackObject

//     console.log("playing sound");

//     const checkLoaded = await sound.current.getStatusAsync();
//     console.log("checkLoaded", checkLoaded);
//     if (checkLoaded.isLoaded === true) {
//       await sound.current.playAsync();
//       setIsPlaying(true)
//       dispatch(setAudioPlaying(true))
//     } else {
//     }
//   };

//   // const pauseSound = async () => {
//   //   if (sound) {
//   //     await sound.current.pauseAsync();
//   //     setIsPlaying(false);
  
//   //   }
//   // };

//   const stopSound = async () => {
//     if (sound) {
//       await sound.current.stopAsync();
//       setIsPlaying(false);
//       dispatch(setAudioPlaying(false))
//       setHighlightIndex(null)
//     }
//   };
//   const RoundedButton = ({ onPress, disabled, iconName,width,height }) => (
//     <TouchableOpacity
//       onPress={onPress}
//       disabled={disabled}
//       style={{
//         backgroundColor: disabled ? "#ccc" : "#42BB7E",
//         borderRadius: 25, // Adjust this value to control the roundness of the button
//         width: width, // Adjust this value to control the width of the button
//         height: height, // Adjust this value to control the height of the button
//         alignItems: "center",
//         justifyContent: "center",
//         margin: 10, // Adjust this value to control the margin between buttons
//       }}
//     >
//       <Ionicons name={iconName} size={20} color="white" />
//     </TouchableOpacity>
//   );
//   return (
//     <>
//     <View style={{flexDirection: "row",justifyContent:'center',padding:10,gap:10}}>
//     <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center",
//           // margin:10,
//           backgroundColor:'rgba(0,0,0,0.08)',
//           padding:0,
//           width:'30%',
//           alignSelf:'center',
//           borderRadius:50,
//           bottom:'5%',
//           height:'100%'
//         }}
//       >
//         <RoundedButton
//           onPress={playSound}
//           disabled={isPlaying}
//           iconName="play"
//           width={35}
//           height={35}
//         />
//         {/* <RoundedButton
//           onPress={pauseSound}
//           disabled={!isPlaying}
//           iconName="pause"
//         /> */}
//         <RoundedButton
//           onPress={stopSound}
//           disabled={!isPlaying}
//           iconName="stop"
//           width={35}
//           height={35}
//         />

        
//       </View>
//       {selectedSentence && <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center",
//           // margin:10,
//           backgroundColor:'rgba(0,0,0,0.08)',
//           padding:1,
//           width:'30%',
//           alignSelf:'center',
//           borderRadius:60,
//           bottom:'5%',
//           height:'80%'
//         }}
//       >
//         <RoundedButton 
//           onPress={playSound}
//           disabled={isPlaying}
//           iconName="play"
//           width={28}
//           height={28}
//         />
//         <Text>sentences</Text>
        

        
//       </View>}
//     </View>
      
//     </>
//   );
// };


// export default CustomAudioPlayer;
