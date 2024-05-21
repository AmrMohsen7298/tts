import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons' // Import Ionicons from the correct package
import user from './../../../assets/Images/userProfile.jpg';
import Colors from '../../Utils/Colors';

export default function TrainingKeywords(props) {

  const handleLoginPress = () => {
    // Add your login logic here
    console.log('Login pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabelLeft}>A1</Text>
        <Text style={styles.headerLabelRight}>جديد</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name={"file-tray-full-outline"} size={25} color="black" />
        <Text style={styles.iconText}>9</Text>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.keywordText}>عقاب</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            <Ionicons name={"arrow-back-outline"} size={25} color="black" /> قاعدة المرافقة
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.hairlineContainer}>
        <View style={styles.hairlineLeft}></View>
        <View style={styles.headerLabelCenterContainer}>
          <Ionicons style={styles.repeatIcon} name={"repeat-outline"} size={25} color="black" />
        </View>
        <View style={styles.hairlineRight}></View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button_} onPress={handleLoginPress}>
          <Text style={styles.buttonText_}> اظهر الاجابة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderRadius: 20,
    borderBottomColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
  },
  headerLabelLeft: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'grey',
    width: 50,
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    right: 19,
    bottom: 10,
    padding:5
  },
  headerLabelRight: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'grey',
    width: 80,
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    left: 19,
    bottom: 10,
    padding:5
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding:5
  },
  iconText: {
    fontSize: 25,
    fontWeight: 'bold',
    color:"black"
  },
  centerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100,
  },
  keywordText: {
    fontSize: 40,
    fontWeight: 'normal',
    color:"black"
  },
  button: {
    backgroundColor: '#42BB7E',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hairlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
  },
  hairlineLeft: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 160,
    marginRight: 30,
  },
  hairlineRight: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 160,
    marginLeft: 30,
  },
  headerLabelCenterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    alignItems: 'center',
  },
  repeatIcon: {
    bottom: 15,
  },
  bottomButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  button_: {
    backgroundColor: '#42BB7E',
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 10,
  },
  buttonText_: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
