import KeywordCard from '../KeyWordCard/KeywordCard';
import {faDumbbell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState,useRef} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from the correct package
import {useDispatch, useSelector} from 'react-redux';
import {removeWordTraining,setAudioPlaying} from '../../Actions/StoryActions';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
const {height, width} = Dimensions.get('screen');

const List = ({route}) => {

  const {category} = route.params;
  const keywords = useSelector(state => state.storyReducer.keywords);
  const state = keywords.filter(item => item.category === category);


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const alertItemName = item => {
    alert(item.text);
  };

  useEffect(() => {
    if (state.length < 1) {
      navigation.navigate('TrainingScreen');
    }
  }, [state]);

  return (
    <ScrollView style={styles.mainContainer}>
      {state.map((item, index) => (
        // <View
        //   key={item.text ?? index}
        //   style={styles.container}
        //   onPress={() => alertItemName(item)}>
        //   <View
        //     style={{
        //       width: '80%',
        //       height: '100%',
        //       backgroundColor: 'white',
        //       display: 'flex',
        //       flexDirection: 'column',
        //       justifyContent: 'center',
        //       alignItems: 'flex-start',
        //       paddingVertical: '2%',
        //       paddingHorizontal: '3%',
        //       borderTopLeftRadius: 10,
        //       borderBottomLeftRadius: 10,
        //       maxHeight: height * 0.15,
        //     }}>
        //     <View
        //       style={{
        //         display: 'flex',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         gap: height * 0.01,
        //       }}>
        //       <Text
        //         style={{
        //           backgroundColor: '#c8e8c9',
        //           color: '#333',
        //           paddingVertical: width * 0.01,
        //           paddingHorizontal: width * 0.015,
        //           borderRadius: width * 0.015,
        //         }}>
        //         A1
        //       </Text>
        //       <Text style={{color: '#333', fontSize: 18}}>{item.text}</Text>
        //       <Text style={{color: '#aaa', fontSize: 18}}>{item.type}</Text>
        //     </View>
        //     <View
        //       style={{
        //         display: 'flex',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         gap: height * 0.01,
        //       }}>
        //       <Text style={{color: '#aaa', fontSize: 15}}>{item.translation}</Text>
        //     </View>
        //   </View>
        //   <View
        //     style={{
        //       width: '20%',
        //       display: 'flex',
        //       flexDirection: 'column',
        //       justifyContent: 'center',
        //     }}>
        //     <Pressable
        //       style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         backgroundColor:
        //           keywords.filter(({text}) => text === item.text).length > 0
        //             ? '#42BB7E'
        //             : '#ddd',
        //         paddingVertical: '15%',
        //         borderTopRightRadius: 10,
        //       }}
        //       onPress={() => dispatch(removeWordTraining({text: item.text}))}>
        //       <FontAwesomeIcon
        //         icon={faDumbbell}
        //         size={width * 0.053}
        //         color={
        //           state.filter(({text}) => text === item.text).length > 0
        //             ? 'white'
        //             : '#33333360'
        //         }
        //       />
        //     </Pressable>
        //     <Pressable
        //        onPress={() => setPlayPressed(true)}
        //       style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         backgroundColor: playPressed ? '#42BB7E' : '#ddd',
        //         paddingVertical: '15%',
        //         borderBottomRightRadius: 10,
        //       }}>
        //       <Ionicons
        //         name="play"
        //         size={20}
        //         color={playPressed ? 'white' : '#33333360'}
        //       />
        //     </Pressable>
        //   </View>
        // </View>
       <KeywordCard key={index} {...item}></KeywordCard>
      )

      )}
    </ScrollView>
  );
};

export default List;
// const List = () => {
//   // getKeywords(type) {
//   //   // return
//   // }

//   render() {
//     return (

//     );
//   }
// }
// export default List;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '5%',
  },
  container: {
    margin: '2%',
    backgroundColor: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    maxHeight: height * 0.15,
  },
  text: {
    color: '#4f603c',
  },
});
