import { View, Text ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import app from './../../assets/splash.png'
import Colors from '../Utils/Colors'
export default function LoginScreen() {
  return (
    <View style={{display:'flex',alignItems:'center',width:'100%'}}>
      <Image source={app}
      style={{width:250,height:500,objectFit:'contain',marginTop:70}}></Image>
      <View style={{
        height:400,
        backgroundColor:Colors.primary,
        width:'100%',
        marginTop:-100,
        padding:20
      }}>
        <Text style={{textAlign:'center',
        fontSize:35,color:Colors.white,fontFamily:'outfitBold',marginTop:30
    }}>E-Learning</Text>
    <Text style={{textAlign:'center',fontSize:20,marginTop:30,color:'#eaaa00',fontFamily:'outfit'}}>Lorem Ipsum Anything</Text>
    <TouchableOpacity style={{backgroundColor:Colors.white,display:'flex',alignItems:'center',flexDirection:'row',gap:10,justifyContent:'center',padding:10,borderRadius:90,marginTop:25}}>
        <Text style={{fontSize:20,color:Colors.primary,fontFamily:'outfit'}}>Sign In</Text>
    </TouchableOpacity>
      </View>
    </View>
  )
}