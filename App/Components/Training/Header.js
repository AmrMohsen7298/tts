import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
export default function Header() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ marginTop: 50, padding: 20, direction: "rtl" }}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Flashcard Training</Text>
              <Text style={styles.modalText}>How to add new flashcards:</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Got It!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ color: Colors.black, fontSize: 23, fontFamily: "outfit" }}
        >
          تدريب الكلمات الدالة
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon
            icon="circle-info"
            style={{ fontSize: 20, fontWeight: 600, fontFamily: "outfit" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity style={styles.easyButton}
        onPress={() => navigation.navigate("TrainingList")}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "500", fontFamily: "outfit" }}
          >
            سهل
          </Text>
          <Text style={styles.easyText}>0 كلمات</Text>
          <FontAwesomeIcon
            icon="angle-left"
            style={styles.easyText}
          ></FontAwesomeIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediumButton}>
          <Text
            style={{ fontSize: 18, fontWeight: "500", fontFamily: "outfit" }}
          >
            متوسط
          </Text>
          <Text style={styles.mediumText}>0 كلمات</Text>
          <FontAwesomeIcon
            icon="angle-left"
            style={styles.mediumText}
          ></FontAwesomeIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hardButton}>
          <Text
            style={{ fontSize: 18, fontWeight: "500", fontFamily: "outfit" }}
          >
            صعب
          </Text>
          <Text style={styles.hardText}>0 كلمات</Text>
          <FontAwesomeIcon
            icon="angle-left"
            style={styles.hardText}
          ></FontAwesomeIcon>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate("TrainingKeywords")}
        >
          <FontAwesomeIcon icon="calendar"></FontAwesomeIcon>
          <Text style={{ width: "33%", fontSize: 18, fontWeight: "500" }}>
            جديد
          </Text>
          <Text style={styles.easyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newButton}>
          <FontAwesomeIcon icon="check"></FontAwesomeIcon>
          <Text style={{ width: "33%", fontSize: 18, fontWeight: "500" }}>
            تم
          </Text>
          <Text style={styles.easyText}>10</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate("TrainingKeywords")}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              color: Colors.white,
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            مراجعة{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  easyButton: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#bdf0bd",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  easyText: {
    fontSize: 20,
    color: "#8FBC8F",
  },
  mediumButton: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#bee6ed",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  mediumText: {
    fontSize: 20,
    color: "#60879c",
  },
  hardButton: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#dcc1e0",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  hardText: {
    fontSize: 20,
    color: "#9b6ca3",
  },
  newButton: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    width: "48.8%",
    height: 80,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  reviewButton: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: '#42BB7E',
    borderRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    height: "30%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
  },
  modalHeader: {
    marginBottom: 20,
    fontSize: 23,
  },
});
