import { View, Text, Image, TouchableOpacity } from 'react-native'; // Correct import statement
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
    <View style={{  padding: 20 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 190 }}>
        <TouchableOpacity onPress={onPress}>
          <Image source={user} style={{ width: 40, height: 40, borderRadius: 88, right: 25, top: 3 }} />
        </TouchableOpacity>
        <View>
          <Text style={{ color: Colors.black, fontSize: 23, fontFamily: 'outfit' }}>اكتشف العربية</Text>
        </View>
      </View>
    </View>
  );
}
