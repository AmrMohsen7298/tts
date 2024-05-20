import View, { Text,Image, Touchable } from 'react-native'
import React from 'react'
import user from './../../../assets/Images/profile.jpg'
import Colors from '../../Utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";
import StackNavigation from "./../../Navigations/StackNavigation";
export default function Header() {
  const navigation = useNavigation(StackNavigation);
  onPress=()=>{
    navigation.navigate("ProfileScreen")
  }
  return (
    <View style={{marginTop:50,padding:20}}>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:190}}>
     <TouchableOpacity onPress={onPress}>

      <Image source={user}
        style={{width:40,height:40,borderRadius:88,right:25,top:3}}></Image>
     </TouchableOpacity>
      <View>
            <Text style={{color:Colors.black,fontSize:23,fontFamily:'outfit'}}>اكتشف العربية</Text>
        </View>
      </View>
    </View>
  )
}