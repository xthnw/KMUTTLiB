import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Easing, StatusBar, Animated, TextInput, Modal, Pressable } from 'react-native';
import { ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../customStyles/ReservationRequestStyles';
import COLORS from '../customStyles/colors';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { createApiUrl } from '../constants/apiConfig';

StatusBar.setHidden(true);

const periodLabels = {
  '1': '08:30 - 10:20',
  '2': '10:30 - 12:20',
  '3': '12:30 - 14:20',
  '4': '14:30 - 16:20',
  '5': '08:30 - 10:20',
  '6': '10:30 - 12:20',
  '7': '12:30 - 14:20',
  '8': '14:30 - 16:20',
  '9': '08:30 - 10:20',
  '10': '10:30 - 12:20',
  '11': '12:30 - 14:20',
  '12': '14:30 - 16:20',
  '13': '08:30 - 10:20',
  '14': '10:30 - 12:20',
  '15': '12:30 - 14:20',
  '16': '14:30 - 16:20',
  '17': '08:30 - 10:20',
  '18': '10:30 - 12:20',
  '19': '12:30 - 14:20',
  '20': '14:30 - 16:20',
};

const roomLabels = {
  'KM1': 'ROOM 1',
  'KM2': 'ROOM 2',
  'KM3': 'ROOM 3',
  'KM4': 'ROOM 4',
  'KM5': 'ROOM 5',
};

const ReservationRequestScreen = ({ navigation }) => {
  const route = useRoute();
  const { buttonId, selectedDate, roomId, userData } = route.params;
  const [selectedOption, setSelectedOption] = useState('');
  const [CourseCode, setCourseCode] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingFor, setBookingFor] = useState('');
  const [roomID, setRoomID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [bookingUser0, setBookingUser0] = useState('');
  const [bookingUser1, setBookingUser1] = useState('');
  const [bookingUser2, setBookingUser2] = useState('');
  const [bookingUser3, setBookingUser3] = useState('');
  const [bookingUser4, setBookingUser4] = useState('');
  const [bookingUser5, setBookingUser5] = useState('');
  const [bookingUser6, setBookingUser6] = useState('');
  const [reservationMessage, setReservationMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCompleteVisible, setIsModalCompleteVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const dropdownOptions = ['Group consults', 'Tutoring', 'Learning', 'Presentation', 'Other'];
  const dropdownHeight = isDropdownOpen ? dropdownOptions.length * 36 : 0;

  const timeLabel = periodLabels[buttonId];
  const roomLabel = roomLabels[roomId];
  const [day, month, year] = selectedDate.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const options = {
    weekday: 'short', // Displays the abbreviated day of the week
    day: '2-digit',   // Displays the day of the month with leading zeros
    month: 'short',   // Displays the abbreviated month name
    year: 'numeric',  // Displays the full year
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  toggleModalAccept = () => {
    setIsModalVisible(!isModalVisible);
    handleRequest();
  };

  toggleModalComplete = () => {
    setIsModalCompleteVisible(!isModalCompleteVisible);
  };

  toggleModalCompleteOK = () => {
    setIsModalCompleteVisible(!isModalCompleteVisible);
    navigation.navigate('ReservationScreen');
  };

  toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  toggleModalErrorOK = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
    navigation.navigate('ReservationScreen');
  };

  toggleModalClose = () => {
    setIsModalVisible(!isModalVisible);
  };

  toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  handleBackPress = () => {
    navigation.goBack();
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
      const jsonDataCreate = {
        Booking_Description: CourseCode,
        Booking_Status: 'Reserved',
        Booking_date: bookingDate,
        Booking_period: bookingTime,
        Booking_for: bookingFor,
        Room_ID: roomID,
        User_Email: userData.User_Email,
        User_1: bookingUser1,
        User_2: bookingUser2,
        User_3: bookingUser3,
        User_4: bookingUser4,
        User_5: bookingUser5,
        User_6: bookingUser6,
      };
      const responseCreate = await axios.post(createApiUrl, jsonDataCreate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (responseCreate.data.status === 'success') {
        console.log('Reservation Success:', responseCreate.data.message);
        setReservationMessage(responseCreate.data.message);
        toggleModalComplete();

      } else if (responseCreate.data.status === 'error') {
        console.error('Reservation Error:', responseCreate.data.message);
        setReservationMessage(responseCreate.data.message);
        toggleModalError();
        // Handle the error case, show a message, etc.

      } else {
        console.error('Unexpected Response:', responseCreate.data);
        // Handle unexpected responses here
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const setBookingUser = (index, text) => {
    switch (index) {
      case 1:
        setBookingUser1(text);
        break;
      case 2:
        setBookingUser2(text);
        break;
      case 3:
        setBookingUser3(text);
        break;
      case 4:
        setBookingUser4(text);
        break;
      case 5:
        setBookingUser5(text);
        break;
      case 6:
        setBookingUser6(text);
        break;
      default:
        break;
    }
  };

  const getBookingUser = (index) => {
    switch (index) {
      case 1:
        return bookingUser1;
      case 2:
        return bookingUser2;
      case 3:
        return bookingUser3;
      case 4:
        return bookingUser4;
      case 5:
        return bookingUser5;
      case 6:
        return bookingUser6;
      default:
        return '';
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
            <TouchableOpacity onPress={this.handleBackPress} style={styles.backcirclebutton}>
              <View style={styles.subbackcirclebutton}>
                <IconM name='keyboard-arrow-left' size={30} color='orange' />
              </View>
            </TouchableOpacity>
            <Text style={styles.formTitle}>Library Request</Text>
            <Text style={styles.detailsText}>KMUTT-LIB {roomLabel} | Time: {timeLabel} | {formattedDate}</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Student ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Student ID'
                  onChangeText={(text) => setStudentID(text)}
                  value={studentID}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Enter Name'
                  onChangeText={(text) => setBookingUser0(text)}
                  value={bookingUser0}
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Service group</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Bachelor'
                // onChangeText={(text) => this.setState({ Service: text })}
                // value={this.state.Service}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Department</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Computer Engineering'
                // onChangeText={(text) => this.setState({ Department: text })}
                // value={this.state.Department}
                />
              </View>
            </View>
            <View style={styles.dropdownOptionView}>
              <Text style={styles.label}>Request for</Text>
              <TouchableOpacity style={styles.waitforDropdownOptionContainer} onPress={this.toggleDropdown}>
                <Text style={{ color: '#666666', fontFamily: 'LeagueSpartan' }}>
                  {selectedOption || 'Select an option'}
                </Text>
                <Icon name='angle-down' size={20} color='orange' />
              </TouchableOpacity>
              {isDropdownOpen && (
                <View style={[styles.dropdownOptionContainer, { height: dropdownHeight }]}>
                  {dropdownOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.subDropdownOptionContainer}
                      onPress={() => {
                        selectOption(option);
                        setBookingFor(option);
                      }}
                      value={bookingFor}
                    >
                      <Text style={[{ color: 'gray', fontFamily: 'LeagueSpartan' }]}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.courseCodeView}>
              <Text style={styles.labelInfrontcourseCodeInput}>Course code</Text>
              <TextInput
                style={styles.studentIdInputboxContainer}
                placeholder='Fill course code'
                onChangeText={(text) => setCourseCode(text)}
                value={CourseCode}
              />
            </View>
            <View style={styles.studentIdformPadding}>
              <Text style={styles.label}>Please Specify: Username/Student ID</Text>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <View key={index} style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>{index}.</Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=''
                    onChangeText={(text) => setBookingUser(index, text)}
                    value={getBookingUser(index)}
                  />
                </View>
              ))}
            </View>


            <Pressable
              style={[{ alignItems: 'center' }]}
              onPress={() => {
                setBookingDate(selectedDate);
                setBookingTime(timeLabel);
                setRoomID(roomId);
                setStudentID(userData.University_ID);
                setBookingUser0(`${userData.User_FName} ${userData.User_LName}`);
                setBookingUser1(userData.University_ID);
                setBookingUser2('64060501023');
                setBookingUser3('64060501024');
                setBookingUser4('64060501025');
                setBookingUser5('64060501026');
                setBookingUser6('64060501027');
                setCourseCode('CPE555');
                selectOption('Other');
                setBookingFor('Other');
              }}
            >
              <Text style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6
              }}>Auto set Forms</Text>
            </Pressable>

            <View style={styles.submitButtonView}>
              <TouchableWithoutFeedback
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                onPress={toggleModal}
              >
                <Animated.View style={[styles.submitButtonStyle, { transform: [{ scale: buttonScale }] }]}>
                  <Text style={styles.submitTextStyle}>Submit</Text>
                </Animated.View>
              </TouchableWithoutFeedback>

              <Modal animationType='slide' transparent={true} visible={isModalVisible}>
                <View style={styles.blankBgModalView}>
                  <View style={styles.alertModalcontainer}>
                    <TouchableOpacity onPress={toggleModalClose} style={styles.closebuttonView}>
                      <Ionicons name='close' size={32} color='orange' />
                    </TouchableOpacity>
                    <View style={[{ padding: 16, alignItems: 'center' }]}>
                      <Icon name='exclamation-triangle' size={24} color='red' />
                      <Text style={styles.alertheaderText}>คำเตือน</Text>
                      <Text style={styles.alertdetailsText}>
                        1. หากมีอุปกรณ์ชำรุดเสียหายจะถือเป็นความรับผิดชอบของผู้ใช้บริการห้อง KM โปรเจ็คเตอร์ มูลค่า 100,000 บาท
                      </Text>
                      <Text style={styles.alertdetailsText}>
                        2. การขีด/เขียนบนผนังห้อง มูลค่า 9,000 บาท ยกเว้นห้อง KM5 สามารถเขียนติวได้ (ต้องเป็นปากกาที่สามารถลบออกได้เท่านั้น)
                      </Text>
                      <TouchableOpacity style={styles.acceptbuttonStyle} onPress={toggleModalAccept}>
                        <Text style={styles.acceptTextStyle}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal animationType='slide' transparent={true} visible={isModalCompleteVisible}>
                <View style={styles.blankBgModalView}>
                  <View style={styles.sucessModalcontainer}>
                    <TouchableOpacity onPress={toggleModalCompleteOK} style={styles.closebuttonView}>
                      <Ionicons name='close' size={32} color='orange' />
                    </TouchableOpacity>
                    <View style={styles.paddingViewforinsideModal}>
                      <Image source={require('../picture/check2.png')} style={{ width: 50, height: 50 }} />
                      <Text style={styles.sucessTextStyle}>Reserve Room Successfully!</Text>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal animationType='slide' transparent={true} visible={isModalErrorVisible}>
                <View style={styles.blankBgModalView}>
                  <View style={styles.errorModalcontainer}>
                    <View style={styles.paddingViewforinsideModal}>
                      <Text style={styles.errorHeaderStyle}>Room Reserving Error!</Text>
                      <Text style={styles.errorTextStyle}>The operation couldn't be completed</Text>
                      <Text style={styles.errorTextStyle}>({reservationMessage})</Text>
                      <TouchableOpacity onPress={toggleModalErrorOK} style={styles.okButtonContainer}>
                        <Text style={styles.errorTextOKStyle}>OK</Text>
                      </TouchableOpacity>
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

}; export default ReservationRequestScreen;