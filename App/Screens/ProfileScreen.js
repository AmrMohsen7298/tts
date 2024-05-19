import { View, Text } from 'react-native'
import React from 'react'
import {  Image, TouchableOpacity,StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import user from './../../assets/Images/profile.jpg'
import setting from './../../assets/setting.png'
import login from './../../assets/eye.png'
import Colors from './../Utils/Colors'
import fire from './../../assets/fire.png'
export default function ProfileScreen() {
  const LearningProgressCard = ({ title, storiesCount, wordsCount }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تم التعلم    </Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تعلمت</Text>
          </View>
          
        </View>
        <View style={styles.row}>
        <View style={styles.counterContainer}>
            <Text style={styles.counter}>{storiesCount}  قصص</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{wordsCount}  كلمات</Text>
          </View>
        </View>
      </View>
    );
  };
  const ReadingStreakCard = ({ title  }) => {
    return (
      <View style={styles.container}>
      <Text style={styles.header}>{title}
      <Image source={fire}
        style={{width:30,height:30,borderRadius:88,right:25,top:3,left:0}}></Image>
      </Text>
      <View style={styles.col}>
      <Image source={login}
        style={{width:30,height:30,borderRadius:88,right:25,top:3,left:0}}></Image>
        <Text style={styles.label}>قم بتسجيل الدخول لتتبع تقدمك</Text>
      </View>
    </View>
    );
  };
  const ReaderTrakerCard = ({ title, storiesCount }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.counter}>{storiesCount}</Text>
          <Text style={styles.label}>    القصص المقروءة    </Text>
        </View>
        <View style={styles.col}>
          <MaterialCommunityIcons name="calendar" size={24} color="black" />
          <Text style={styles.calendarLabel}>قم بتسجيل الدخول لتتبع تقدمك</Text>
        </View>
      </View>
    );
  };
 
    const handleLoginPress = () => {
      // Add your login logic here
      console.log('Login pressed');
    };
  return (
    <View style={{marginTop:40,padding:20}}>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:240}}>
    
      <Image source={setting}
        style={{width:30,height:30,borderRadius:88,right:25,top:3}}></Image>
    
      <View>
            <Text style={{color:Colors.black,fontSize:23,fontFamily:'outfit'}}> الحساب</Text>
        </View>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:150,marginTop:50}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>نوع الحساب: مجاني</Text>
         <Image source={user}
        style={{width:60,height:60,borderRadius:88,right:25,top:3}}></Image>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:150,marginTop:20}}>
      <View style={styles.containerCard}>
      <LearningProgressCard
        title="تقدمك في التعلم"
        storiesCount={5} // Replace with actual values
        wordsCount={150} // Replace with actual values
      />
    </View>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
      <View style={styles.containerCard}>
     <ReadingStreakCard title="سلسلة القراءة    "/>
     </View>
      </View> 
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
      <View style={styles.containerCard}>
     <ReaderTrakerCard title="تتبع القراءة" storiesCount={0}/>
     </View>
      </View>
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>تسجيل دخول</Text>
      </TouchableOpacity>
      </View>
    </View>
    
  )
 
}
const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width:300,
    height:150,
    
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 17,
  },
  counterContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  counter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#42BB7E',
    paddingVertical: 15,

    paddingHorizontal: 140,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});