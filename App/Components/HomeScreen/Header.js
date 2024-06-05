import { View, Text, Image, TouchableOpacity , StyleSheet} from 'react-native'; // Correct import statement
import React from 'react';
import user from './../../../assets/Images/profile.jpg';
import Colors from '../../Utils/Colors';
import { useNavigation } from "@react-navigation/native";
import StackNavigation from "./../../Navigations/StackNavigation";

export default function Header() {
  const navigation = useNavigation(StackNavigation);
  
  const onPress = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onPress}>
          <Image source={user} style={styles.image} />
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>اكتشف العربية</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Use space-between to dynamically distribute space
    width: '100%', // Make sure the row takes full width of the container
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 0, // Half of width/height to make it a circle
  },
  text: {
    color: 'black',
    fontSize: 23,
    fontFamily: 'outfit',
  },
});
