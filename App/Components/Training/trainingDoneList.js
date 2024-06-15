import {faDumbbell} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from the correct package
import {useDispatch, useSelector} from 'react-redux';
import {removeWordTraining} from '../../Actions/StoryActions';

const {height, width} = Dimensions.get('screen');

const ListDone = () => {
  const keywords = useSelector(state => state.storyReducer.keywords);
  const state = keywords.filter(item => item.type === 'done');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const alertItemName = item => {
    alert(item.word);
  };

  useEffect(() => {
    if (state.length < 1) {
      navigation.navigate('TrainingScreen');
    }
  }, [state]);

  return (
    <ScrollView style={styles.mainContainer}>
      {state.map((item, index) => (
        <View
          key={item.id}
          style={styles.container}
          onPress={() => alertItemName(item)}>
          <View
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingVertical: '2%',
              paddingHorizontal: '3%',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              maxHeight: height * 0.15,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: height * 0.01,
              }}>
              <Text
                style={{
                  backgroundColor: '#c8e8c9',
                  color: '#333',
                  paddingVertical: width * 0.01,
                  paddingHorizontal: width * 0.015,
                  borderRadius: width * 0.015,
                }}>
                A1
              </Text>
              <Text style={{color: '#333', fontSize: 18}}>{item.word}</Text>
              <Text style={{color: '#aaa', fontSize: 18}}>- noun</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: height * 0.01,
              }}>
              <Text style={{color: '#aaa', fontSize: 15}}>person, to have</Text>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  keywords.filter(({word}) => word === item.word).length > 0
                    ? '#42BB7E'
                    : '#ddd',
                paddingVertical: '15%',
                borderTopRightRadius: 10,
              }}
              onPress={() => dispatch(removeWordTraining({text: item.word}))}>
              <FontAwesomeIcon
                icon={faDumbbell}
                size={width * 0.053}
                color="white"
              />
            </Pressable>
            <Pressable
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ddd',
                paddingVertical: '15%',
                borderBottomRightRadius: 10,
              }}>
              <Ionicons name="play" size={20} color="#33380" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ListDone;
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
