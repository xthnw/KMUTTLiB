import React, { Component,useState,useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing,
  StatusBar,
  Animated,
  TextInput,
  Modal,Pressable
} from "react-native";
import { ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../customStyles/ReservationRequestStyles';
import COLORS from "../customStyles/colors";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { useAuth } from './auth';
import axios from "axios";
StatusBar.setHidden(true);
const ReservationRequestScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const inputBoxRef = useRef(null);
  const [bookingDescription, setBookingDescription] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingFor, setBookingFor] = useState('');
  const [roomID, setRoomID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [bookingUser1, setBookingUser1] = useState('');
  const [bookingUser2, setBookingUser2] = useState('');
  const [bookingUser3, setBookingUser3] = useState('');
  const [bookingUser4, setBookingUser4] = useState('');
  const [bookingUser5, setBookingUser5] = useState('');
  const [bookingUser6, setBookingUser6] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCompleteVisible, setIsModalCompleteVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [buttonScale] = useState(new Animated.Value(1));
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const dropdownHeight = isDropdownOpen ? options.length * 40 : 0;

  toggleModal = () => {
    const newIsModalVisible = !isModalVisible;
    setIsModalVisible(newIsModalVisible);
    if (newIsModalVisible) {
        toggleModalComplete();
    }
};

  toggleModalComplete = () => {
    setIsModalCompleteVisible(!isModalCompleteVisible);
  };

  toggleModalClose = () => {
    setIsModalVisible(!isModalVisible);
  };

  toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown after selection
    
  };

  handleBackPress = () => {
    navigation.goBack(); // Assuming you receive the navigation prop from a navigator
  };

  handleButtonPressIn = () => {
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  handleButtonPressOut = () => {
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  handleRequest = async () => {
    try {
        const apiUrlCreate = 'http://192.168.13.43:8080/api/create';
        const jsonDataCreate = {
            Booking_Description: bookingDescription,
            Booking_Status: 'Reserved',
            Booking_date: bookingDate,
            Booking_period: bookingTime,
            Booking_for: bookingFor,
            // studentID: studentID,
            Room_ID: roomID,
            User_Email: 'Phongprawi.ratt@kmutt.ac.th',
            User_1: bookingUser1,
            User_2: bookingUser2,
            User_3: bookingUser3,
            User_4: bookingUser4,
            User_5: bookingUser5,
            User_6: bookingUser6,
  // "Booking_Description" : "",
  // "Booking_Status": "Reserved",
  // "Booking_date": "15/10/2023",
  // "Booking_period": "8:30 - 10:20",
  // "Booking_for" : "CPE334", 
  // "Room_ID" : "KM5",
  // "User_Email" : "Phongprawi.ratt@kmutt.ac.th",
  // "User_1" : "nut",
  // "User_2" : "fifa",
  // "User_3" : "mesa",
  // "User_4" : "kla",
  // "User_5" : "beer",
  // "User_6" : ""

        };

        const apiUrlList = 'http://192.168.63.43:8080/api/list';
        const jsonDataList = {
            email: 'Phongprawi.ratt@kmutt.ac.th', // Replace with actual User_Email
    
        };

        // Make the create API request
        const responseCreate = await axios.post(apiUrlCreate, jsonDataCreate);
        console.log('Reservation Information:', responseCreate.data);

        // Make the list API request
        const responseList = await axios.post(apiUrlList, jsonDataList, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (responseList.data) {
            console.log('List Information:', responseList.data.data.booking);
          } else {
            console.log('Empty List or Invalid Response');
            console.log('List Information:', responseList.status);
        }
    } catch (error) {
      console.error('Error:', error.message);
      console.error('Error Details:', error.response.data); // Log the detailed error response
  }
};




    return (
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
        <View>
          <View style={styles.contentContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={this.handleBackPress}
                style={styles.backcirclebutton}
              >
                <View style={styles.subbackcirclebutton}>
                  <IconM name="keyboard-arrow-left" size={30} color="orange" />
                </View>
              </TouchableOpacity>
              <Text style={styles.formTitle}>Library Request</Text>
              <Text style={styles.detailsText}>
                KMUTT-LIB ROOM 1 | Time : 10:30 - 12:20 | 24 Oct 2023
              </Text>

              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Student ID
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Student ID"
                    onChangeText={(text) => setStudentID(text)}
                    value={studentID}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    onChangeText={(text) => setBookingUser1(text)}
                    value={bookingUser1}
                  />
                </View>
              </View>
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Service group
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bachelor"
                    // onChangeText={(text) => this.setState({ Service: text })}
                    // value={this.state.Service}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Department</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Computer Engineering"
                    // onChangeText={(text) => this.setState({ Department: text })}
                    // value={this.state.Department}
                  />
                </View>
              </View>

              <View style={styles.dropdownOptionView}>
                <Text style={styles.label}>
                  Request for
                </Text>
                <TouchableOpacity
                  style={styles.waitforDropdownOptionContainer}
                  onPress={this.toggleDropdown}
                >
                  <Text
                    style={{ color: "#666666", fontFamily: "LeagueSpartan" }}
                  >
                    {selectedOption || "Select an option"}
                  </Text>
                  <Icon name="angle-down" size={20} color="orange" />
                  
                </TouchableOpacity>
                {isDropdownOpen && (
                  <View style={[styles.dropdownOptionContainer, { height: dropdownHeight }]}>
                    {options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.subDropdownOptionContainer}
                        onPress={() => {
                          selectOption(option);
                          setRoomID(option);
                        }}
                        value = {roomID}
                      >
                        <Text
                          style={[{ color: "gray", fontFamily: "LeagueSpartan", }]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

              </View>
              <View style={styles.courseCodeView}>
                <Text style={styles.labelInfrontcourseCodeInput}>
                  Course code
                </Text>
                <TextInput
                  style={styles.studentIdInputboxContainer}
                  placeholder="Fill course code"
                  onChangeText={(text) => setBookingFor(text)}
                
                  value={bookingFor}
                />
              </View>

              <View style={styles.studentIdformPadding}>
                <Text style={styles.label}>
                  Please Specify: Username/Student ID
                </Text>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    1.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                    onChangeText={(text) => setBookingUser2(text)}
                    value={bookingUser2}
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    2.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                    onChangeText={(text) => setBookingUser3(text)}
                    value={bookingUser3}
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    3.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                    onChangeText={(text) => setBookingUser4(text)}
                    value={bookingUser4}
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    4.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                    onChangeText={(text) => setBookingUser5(text)}
                    value={bookingUser5}
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    5.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                    onChangeText={(text) => setBookingUser6(text)}
                    value={bookingUser6}
                  />
                </View>

              </View>

              <Pressable
  onPress={() => {
    // setEmail('jedsada_chai@kmutt.ac.th');
    // setPassword('secret123');
    setBookingDate('11/11/2023');
    setBookingTime('bookingTime');
    setRoomID('10');
    setStudentID('64070501012');
    setBookingUser1('lee');
    setBookingUser2('beer');
    setBookingUser3('mesa');
    setBookingUser4('nut');
    setBookingUser5('ff');
    setBookingUser6('kla');
    setBookingFor('ส่องสาว'); // Assuming you want to set a different value than 'bookingTime'
  }}
>
  <Text style={{
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6
  }}>Auto set Email & Password</Text>
</Pressable>


              <View style={styles.submitButtonView}>
                <TouchableWithoutFeedback
                  onPressIn={handleButtonPressIn}
                  onPressOut={handleButtonPressOut}
                  onPress={toggleModal}
                >
                  <Animated.View
                    style={[
                      styles.submitButtonStyle,
                      { transform: [{ scale: buttonScale }] },
                    ]}
                  >
                    <Text style={styles.submitTextStyle}>Submit</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                >
                  <View style={styles.blankBgModalView}>
                    <View style={styles.alertModalcontainer}>
                      <TouchableOpacity
                        onPress={toggleModalClose}
                        style={styles.closebuttonView}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={[{ padding: 16, alignItems: "center" }]}>
                        <Icon
                          name="exclamation-triangle"
                          size={24}
                          color="red"
                        />
                        <Text style={styles.alertheaderText}>
                          คำเตือน
                        </Text>
                        <Text style={styles.alertdetailsText}>
                          1.
                          หากมีอุปกรณ์ชำรุดเสียหายจะถือเป็นความรับผิดชอบของผู้ใช้บริการห้อง
                          KM โปรเจ็คเตอร์ มูลค่า 100,000 บาท
                        </Text>
                        <Text style={styles.alertdetailsText}>
                          2. การขีด/เขียนบนผนังห้อง มูลค่า 9,000 บาท ยกเว้นห้อง
                          KM5 สามารถเขียนติวได้ (ต้องเป็นปากกาที่สามารถลบออกได้เท่านั้น)
                        </Text>
                        <TouchableOpacity
                          style={styles.acceptbuttonStyle}
                          onPressIn={handleRequest}
                          onPressOut={toggleModal}
                        >
                          <Text style={styles.acceptTextStyle}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalCompleteVisible}
                >
                  <View style={styles.blankBgModalView}>
                    <View style={styles.sucessModalcontainer}>
                      <TouchableOpacity
                        onPress={this.toggleModalComplete}
                        style={styles.closebuttonView}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={styles.paddingViewforinsideModal}>
                        <Image
                          // source={require("./picture/check.png")}
                          style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.sucessTextStyle}>
                          Reserve Room Successfully!
                        </Text>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  
};export default ReservationRequestScreen;