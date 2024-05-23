import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Sound from "react-native-sound";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setAudioPlaying } from "../../Actions/StoryActions";
import RNFetchBlob from 'rn-fetch-blob'

const CustomAudioPlayer = ({ audioUrl, setHighlightIndex, selectedSentence }) => {
  const sound = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const [onRepeat, setOnRepeat] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsPlaying(false);
        dispatch(setAudioPlaying(false));
        setHighlightIndex(null);
        if (sound.current) {
          sound.current.release();
        }
      };
    }, [])
  );

  useEffect(() => {
    const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/audio.mp3`;

    async function saveAudioToFileSystem() {
      try {
        console.log("AUDIOURL", audioUrl);
        console.log("PATH", filePath);
        // Save the audio Blob to the file system
        await RNFetchBlob.fs.writeFile(filePath, audioUrl, 'base64');
        sound.current = new Sound(filePath, "", (error) => {
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          console.log("duration in seconds: " + sound.current.getDuration() + "number of channels: " + sound.current.getNumberOfChannels());
        });
      } catch (error) {
        console.error("Error while saving audio to file system:", error);
      }
    }
  
    saveAudioToFileSystem();
  
    // return () => {
    //   if (sound.current) {
    //     sound.current.release();
    //   }
    }, [audioUrl]);

  const _onPlayBackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      setIsPlaying(false);
      dispatch(setAudioPlaying(false));
      setHighlightIndex(null);
    }
    if (playbackStatus.isPlaying) {
      const wordDuration = 500;
      const index = Math.floor(playbackStatus.currentTime / wordDuration);
      setHighlightIndex(index);
    }
  };

  const playSound = async () => {
          sound.current.play(((success)=>{
            if(success){
                setIsPlaying(false);
                dispatch(setAudioPlaying(false));
                setHighlightIndex(null);
            }
          }));
          setIsPlaying(true);
          dispatch(setAudioPlaying(true));
  };

  const stopSound = () => {
    if (sound.current) {
      sound.current.stop();
      setIsPlaying(false);
      dispatch(setAudioPlaying(false));
      setHighlightIndex(null);
    }
  };
  
  const repeatSound = () =>{
    if(!onRepeat){
        sound.current.setNumberOfLoops(-1)
    }else{
        sound.current.setNumberOfLoops(0)
    }
    setOnRepeat(!onRepeat)
  }

  const RoundedButton = ({ onPress, disabled, iconName, width, height }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : "#42BB7E",
        borderRadius: 25,
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <Ionicons name={iconName} size={20} color="white" />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "center", padding: 10, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.08)",
            padding: 0,
            width: "40%",
            borderRadius: 50,
            height: 50,
          }}
        >
          <RoundedButton onPress={playSound} disabled={isPlaying} iconName="play" width={35} height={35} onRepeat={false} />
          <RoundedButton onPress={stopSound} disabled={!isPlaying} iconName="stop" width={35} height={35} onRepeat={true} />
          <TouchableOpacity
      onPress={repeatSound}
      disabled={false}
      style={{
        backgroundColor: !onRepeat ? "#ccc" : "#42BB7E",
        borderRadius: 25,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <Ionicons name="repeat" size={20} color="white" />
    </TouchableOpacity>
        </View>
        {selectedSentence && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.08)",
              padding: 1,
              width: "30%",
              borderRadius: 60,
              height: 40,
            }}
          >
            <RoundedButton onPress={playSound} disabled={isPlaying} iconName="play" width={28} height={28} />
            <Text>sentences</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default CustomAudioPlayer;
