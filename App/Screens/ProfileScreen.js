// import {View,   Text } from 'react-native'
// import React from 'react'
// import {  Image, TouchableOpacity,StyleSheet, Dimensions } from 'react-native'
// import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
// import user from './../../assets/Images/profile.jpg'
// import setting from './../../assets/setting.png'
// import login from './../../assets/eye.png'
// import Colors from './../Utils/Colors'
// import fire from './../../assets/fire.png'

// const { width, height } = Dimensions.get('window');

// export default function ProfileScreen() {
//   const LearningProgressCard = ({ title, storiesCount, wordsCount }) => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>{title}</Text>
//         <View style={styles.row}>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>تم التعلم    </Text>
//           </View>
//           <View style={styles.labelContainer}>
//             <Text style={styles.label}>تعلمت</Text>
//           </View>

//         </View>
//         <View style={styles.row}>
//         <View style={styles.counterContainer}>
//             <Text style={styles.counter}>{storiesCount}  قصص</Text>
//           </View>
//           <View style={styles.counterContainer}>
//             <Text style={styles.counter}>{wordsCount}  كلمات</Text>
//           </View>
//         </View>
//       </View>
//     );
//   };
//   const ReadingStreakCard = ({ title  }) => {
//     return (
//       <View style={styles.container}>
//       <Text style={styles.header}>{title}
//       <Image source={fire}
//         style={{width:30,height:30,borderRadius:88,right:25,top:3,left:0}}></Image>
//       </Text>
//       <View style={styles.col}>
//       <Image source={login}
//         style={{width:30,height:30,borderRadius:88,right:25,top:3,left:0}}></Image>
//         <Text style={styles.label}>قم بتسجيل الدخول لتتبع تقدمك</Text>
//       </View>
//     </View>
//     );
//   };
//   const ReaderTrakerCard = ({ title, storiesCount }) => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>{title}</Text>
//         <View style={styles.row}>
//           <Text style={styles.counter}>{storiesCount}</Text>
//           <Text style={styles.label}>    القصص المقروءة    </Text>
//         </View>
//         <View style={styles.col}>
//           <MaterialCommunityIcons name="calendar" size={24} color="black" />
//           <Text style={styles.calendarLabel}>قم بتسجيل الدخول لتتبع تقدمك</Text>
//         </View>
//       </View>
//     );
//   };

//     const handleLoginPress = () => {
//       // Add your login logic here
//       console.log('Login pressed');
//     };
//   return (
//     <View style={{padding:'1%',direction:'rtl'}}>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:240}}>

//       <Image source={setting}
//         style={{width:30,height:30,borderRadius:88,left:'8%',top:'1%'}}></Image>

//       <View style={{left:'25%',top:'1%'}}>
//             <Text style={{color:Colors.black,fontSize:23,fontFamily:'outfit'}}> الحساب</Text>
//         </View>
//       </View>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:150,marginTop:50}}>
//       <View style={{backgroundColor:"#42BB7E", display: "flex",

//           flexDirection: "row",
//           gap: 7,
//           justifyContent: "flex-end",
//           left: "10%",
//           borderRadius:6,padding:'2%'}}>

//         <Text style={{fontSize:20,fontWeight:'bold'}}>نوع الحساب: مجاني</Text>
//           </View>
//          <Image source={user}
//         style={{width:60,height:60,borderRadius:88,left:'20%',top:'1%'}}></Image>
//       </View>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',gap:150,marginTop:20}}>
//       <View style={styles.containerCard}>
//       <LearningProgressCard
//         title="تقدمك في التعلم"
//         storiesCount={5} // Replace with actual values
//         wordsCount={150} // Replace with actual values
//       />
//     </View>
//       </View>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
//       <View style={styles.containerCard}>
//      <ReadingStreakCard title="سلسلة القراءة    "/>
//      </View>
//       </View>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
//       <View style={styles.containerCard}>
//      <ReaderTrakerCard title="تتبع القراءة" storiesCount={0}/>
//      </View>
//       </View>
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

//       <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
//         <Text style={styles.buttonText}>تسجيل دخول</Text>
//       </TouchableOpacity>
//       </View>
//     </View>

//   )

// }
// const styles = StyleSheet.create({
//   containerCard: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',

//   },
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: '8%',
//     width:"100%",
//     height:'150',

//     elevation: 3, // for Android shadow
//     shadowColor: '#000', // for iOS shadow
//     shadowOffset: { width: 0, height: 2 }, // for iOS shadow
//     shadowOpacity: 0.25, // for iOS shadow
//     shadowRadius: 3.84, // for iOS shadow
//   },
//   header: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: '5%',
//     color:"black"
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '3%',
//   },
//   col: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginBottom: '5%',
//   },
//   labelContainer: {
//     flex: 1,
//   },
//   label: {
//     fontSize: 17,
//     color:"black"
//   },
//   counterContainer: {
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   counter: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color:"black"
//   },
//   calendarLabel: {
//     fontSize: 16,
//     marginLeft: 10,
//     color:"black"
//   },
//   button: {
//     backgroundColor: '#42BB7E',
//     paddingVertical: '5%',

//     paddingHorizontal: '35%',
//     borderRadius: 10,
//     marginTop: '1%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import user from './../../assets/Images/profile.jpg';
import setting from './../../assets/setting.png';
import login from './../../assets/eye.png';
import Colors from './../Utils/Colors';
import fire from './../../assets/fire.png';
import {ScrollView} from 'react-native-gesture-handler';
import {useStateValue} from '../store/contextStore/StateContext';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const {state, dispatch} = useStateValue();

  useEffect(() => {
    dispatch({type: 'SHOW_NAVBAR', payload: false});
  }, []);

  const LearningProgressCard = ({title, storiesCount, wordsCount}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تم التعلم</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>تعلمت</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{storiesCount} قصص</Text>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{wordsCount} كلمات</Text>
          </View>
        </View>
      </View>
    );
  };

  const ReadingStreakCard = ({title}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>
          {title}
          <Image source={fire} style={styles.icon} />
        </Text>
        <View style={styles.col}>
          <Image source={login} style={styles.icon} />
          <Text style={styles.label}>قم بتسجيل الدخول لتتبع تقدمك</Text>
        </View>
      </View>
    );
  };

  const ReaderTrakerCard = ({title, storiesCount}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.counter}>{storiesCount}</Text>
          <Text style={styles.label}>القصص المقروءة</Text>
        </View>
        <View style={styles.col}>
          <MaterialCommunityIcons name="calendar" size={24} color="black" />
          <Text style={styles.calendarLabel}>قم بتسجيل الدخول لتتبع تقدمك</Text>
        </View>
      </View>
    );
  };

  const handleLoginPress = () => {
    console.log('Login pressed');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.accountText}>الحساب</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.accountTypeContainer}>
            <Text style={styles.accountTypeText}>نوع الحساب: مجاني</Text>
          </View>
          <Image source={user} style={styles.profileImage} />
        </View>
        <View style={styles.cardContainer}>
          <LearningProgressCard
            title="تقدمك في التعلم"
            storiesCount={5}
            wordsCount={150}
          />
        </View>
        <View style={styles.cardContainer}>
          <ReadingStreakCard title="سلسلة القراءة" />
        </View>
        <View style={styles.cardContainer}>
          <ReaderTrakerCard title="تتبع القراءة" storiesCount={0} />
        </View>
      </ScrollView>
      <View style={styles.hairlineLeft}></View>
      <View style={styles.loginButtonContainer}>
        <Pressable style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>تسجيل دخول</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hairlineLeft: {
    borderBlockColor: '#ddd',
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    bottom: 'auto',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    padding: width * 0.05,
    direction: 'rtl',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingIcon: {
    width: width * 0.075 * 0.75,
    height: height * 0.0375 * 0.75,
    borderRadius: width * 0.0375,
  },
  accountText: {
    color: Colors.black,
    fontSize: width * 0.06,
    fontFamily: 'outfit',
    paddingLeft: width * 0.04,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  accountTypeContainer: {
    backgroundColor: '#42BB7E',
    padding: height * 0.015,
    borderRadius: width * 0.02,
  },
  accountTypeText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.005,
  },
  cardContainer: {
    marginTop: height * 0.015,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: height * 0.02,
    width: width * 0.8,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    margin: `${height * 0.015} ${width * 0.1}`,
  },
  header: {
    fontSize: width * 0.075,
    fontWeight: 'bold',
    marginBottom: height * 0.025,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.005,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: width * 0.0425,
    color: 'black',
  },
  counterContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  counter: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'black',
  },
  calendarLabel: {
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
    color: 'black',
  },
  button: {
    backgroundColor: '#42BB7E',
    paddingVertical: height * 0.01,
    width: width * 0.8,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  loginButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
  },
});

export default ProfileScreen;
