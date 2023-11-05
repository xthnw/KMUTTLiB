import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
  ScrollView,
  Image,
  Easing,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Iconify } from 'react-native-iconify';
import Modal from 'react-native-modal';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./customStyles/ReservationScreenStyles";
import axios from "axios";

const apiUrl = 'http://192.168.1.104:8080/api/room';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const images = [
  require('./picture/kmuttlib1.jpg'),
  require('./picture/kmuttlib2.jpg'),
  require('./picture/kmuttlib3.jpg'),
];


export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      // selectedDate: this.props.route.params.selectedDate || new Date(),
      selectedButton: null, // Initially, no button is selected



      isModalVisibleForm: false,
      isModalVisibleFull: false,
      isModalVisible: false,
      isDropdownOpen: false,
      selectedOption: "",
      isModalCompleteVisible: false,


      activeImageIndex: 0, //for header image background


      roomStatus: null, // Initialize as null



    };
    this.inputBoxRef = React.createRef();
    this.buttonScaleValues = {};
    for (let i = 1; i <= 20; i++) {
      this.buttonScaleValues[i] = new Animated.Value(1);
    }
    this.scrollViewRef = React.createRef(); //for header image background
  }


  // Callback function to handle date selection
  handleDateSelected = async (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    this.setState({ selectedDate: formattedDate });

    try {
      const jsonData = {
        Booking_date: formattedDate, // Update key without quotes
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Set the roomStatus in the component's state
      this.setState({ roomStatus: response.data.bookings });

      // Handle the response data
      console.log('Room Status for 05/11/2023:', response.data.bookings);
    } catch (error) {
      console.error('Error:', error);
    }
  };





  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });
    this.blurListener = this.props.navigation.addListener('blur', () => {
      StatusBar.setHidden(false);
    });

    this.startAutoSlide();



    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    this.setState({ selectedDate: formattedDate });

    try {
      const jsonData = {
        Booking_date: formattedDate,
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({ roomStatus: response.data.bookings });

      console.log('Room Status for current date:', response.data.bookings);
    } catch (error) {
      console.error('Error:', error);
    }










  }

  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
    this.stopAutoSlide();
  }

  startAutoSlide = () => {
    this.timer = setInterval(() => {
      this.scrollToNextImage();
    }, 3000); // Change image every 3 seconds
  };

  stopAutoSlide = () => {
    clearInterval(this.timer);
  };

  scrollToNextImage = () => {
    const { activeImageIndex } = this.state;
    const nextIndex = (activeImageIndex + 1) % images.length;

    this.setState({ activeImageIndex: nextIndex }, () => {
      this.scrollViewRef.current.scrollTo({
        x: screenWidth * nextIndex,
        animated: true,
      });
    });
  };

  toggleModalFullDismiss = () => {
    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
    });
  };

  toggleModalFull = (buttonId, targetTimeSlot, Room_ID) => {
    const selectedDate = this.state.selectedDate; // Get the selected date in "DD/MM/YYYY" format

    // Split the date string into day, month, and year
    const [day, month, year] = selectedDate.split('/').map(Number);

    // Create a new Date object using the year, month (subtract 1 as it's zero-based), and day
    const date = new Date(year, month - 1, day);

    // Define the options for formatting the date
    const options = {
      weekday: 'short', // Displays the abbreviated day of the week
      day: '2-digit',   // Displays the day of the month with leading zeros
      month: 'short',   // Displays the abbreviated month name
      year: 'numeric',  // Displays the full year
    };

    // Format the date as "Sun 04 Oct 2023"
    const formattedDateInModal = date.toLocaleDateString('en-US', options);

    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
      modalRoom_ID: Room_ID,
      modalPeriod: targetTimeSlot,
      modalFormattedDate: formattedDateInModal,
    });
  };
  handleRequestPress = () => {
    this.props.navigation.navigate('ReservationRequestScreen');
  };
  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationDetails");
  };

  handleButtonClick = (buttonId) => {
    this.setState((prevState) => ({
      selectedButton: prevState.selectedButton === buttonId ? null : buttonId,
    }));
    // Navigate to ReservationRequest page when a button is clicked
    this.props.navigation.navigate("ReservationRequest");
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  renderButton = (buttonId, text, isSlotReserved, isDisabled = false) => {
    const { selectedButton } = this.state;
    const isSelected = selectedButton === buttonId;

    const buttonStyle = isSelected
      ? { ...styles.buttonSelected }
      : isDisabled
        ? { ...styles.buttonDisabled }
        : { ...styles.button };

    const textStyle = isSelected
      ? { ...styles.textSelected }
      : isDisabled
        ? { ...styles.textDisabled }
        : { ...styles.buttonText };


    const targetTimeSlot_1 = "08:30 - 10:20";
    const targetTimeSlot_2 = "10:30 - 12:20";
    const targetTimeSlot_3 = "12:30 - 14:20";
    const targetTimeSlot_4 = "14:30 - 16:20";


    // Define a mapping of button IDs to corresponding functions
    const buttonFunctions = {
      1: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 1) : () => this.handleRequestPress(buttonId),
      2: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 1) : () => this.handleRequestPress(buttonId),
      3: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 1) : () => this.handleRequestPress(buttonId),
      4: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 1) : () => this.handleRequestPress(buttonId),
      5: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 2) : () => this.handleRequestPress(buttonId),
      6: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 2) : () => this.handleRequestPress(buttonId),
      7: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 2) : () => this.handleRequestPress(buttonId),
      8: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 2) : () => this.handleRequestPress(buttonId),
      9: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 3) : () => this.handleRequestPress(buttonId),
      10: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 3) : () => this.handleRequestPress(buttonId),
      11: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 3) : () => this.handleRequestPress(buttonId),
      12: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 3) : () => this.handleRequestPress(buttonId),
      13: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 4) : () => this.handleRequestPress(buttonId),
      14: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 4) : () => this.handleRequestPress(buttonId),
      15: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 4) : () => this.handleRequestPress(buttonId),
      16: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 4) : () => this.handleRequestPress(buttonId),
      17: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 5) : () => this.handleRequestPress(buttonId),
      18: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 5) : () => this.handleRequestPress(buttonId),
      19: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 5) : () => this.handleRequestPress(buttonId),
      20: isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 5) : () => this.handleRequestPress(buttonId),
      // Add more button IDs and functions as needed
    };

    // Determine the onPress function based on the buttonId
    const onPressFunction = buttonFunctions[buttonId];

    return (
      <TouchableWithoutFeedback
        onPress={onPressFunction} // Call the appropriate function based on the buttonId
        onPressIn={() => this.handleButtonPressIn(buttonId)}
        onPressOut={() => this.handleButtonPressOut(buttonId)}
        style={styles.touchableButton}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale: this.buttonScaleValues[buttonId] }],
            },
          ]}
        >
          <View style={buttonStyle}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  handleButtonPressIn(buttonId) {
    Animated.timing(this.buttonScaleValues[buttonId], {
      toValue: 0.95,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  handleButtonPressOut(buttonId) {
    Animated.timing(this.buttonScaleValues[buttonId], {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }




  render() {

    const { isModalVisibleFull } = this.state;
    const { selectedDate } = this.state;
    const { roomStatus } = this.state;
    const targetTimeSlot_1 = "08:30 - 10:20";
    const targetTimeSlot_2 = "10:30 - 12:20";
    const targetTimeSlot_3 = "12:30 - 14:20";
    const targetTimeSlot_4 = "14:30 - 16:20";


    const filteredData_1 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM1');
    const filteredData_2 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM2');
    const filteredData_3 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM3');
    const filteredData_4 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM4');
    const filteredData_5 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM5');

    // Check if all time slots are reserved for the selected room
    const isSlotReserved_1 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_2 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_3 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_4 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_5 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_6 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_7 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_8 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_9 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_10 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_11 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_12 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_13 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_14 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_15 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_16 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_17 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_18 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_19 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_20 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    // Define a custom dateNumberStyle for selected dates
    const selectedDateNumberStyle = {
      color: "orange", // You can change the color to your preference
      textDecorationLine: "underline", // Add underline for selected dates
    };


    return (


      <View style={[{ marginTop: 0, flex: 1, flexGrow: 1, }]}>
        {Platform.OS === "ios" ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar barStyle="light-content" />
        )}

        <View style={{ flex: 1 }}>
          <ScrollView
            ref={this.scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const offset = event.nativeEvent.contentOffset.x;
              const index = Math.floor(offset / screenWidth);
              this.setState({ activeImageIndex: index });
            }}
          >
            {images.map((image, index) => (
              <ImageBackground
                key={index}
                source={image}
                style={styles.headerImageBackground}>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.4)']}
                  style={styles.gradient}
                >
                </LinearGradient>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
        {/* <arrow-left block */}


        <View
          style={[
            {
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 25, // Adjust the top-left corner radius
              borderTopRightRadius: 25, // Adjust the top-right corner radius
              overflow: "hidden",
              position: 'absolute',
              top: screenHeight / 4, // Adjust the top position to control the overlap
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0, // Ensure it's on top of the image (set 0 for shadow navbar)
            },
          ]}
        >

          <View style={[{ flex: 0, marginTop: 12 }]}>
            <CalendarStrip
              scrollable={true}
              style={{
                height: screenHeight * 0.13,
                paddingTop: 10,
                paddingBottom: 10,
                fontFamily: "LeagueSpartan",
              }}
              calendarAnimation={{ type: "sequence", duration: 10 }}
              dateNumberStyle={{ color: "gray", fontFamily: 'LeagueSpartan' }}
              dateNameStyle={{ color: "gray", fontFamily: 'LeagueSpartan' }}
              highlightDateNumberStyle={{
                color: "black",
                textDecorationLine: "underline", // Add underline style
                textDecorationColor: "orange", // Color of the underline
                fontFamily: 'LeagueSpartanMedium',
              }}
              // selectedDateNumberStyle ขีดเส้นใต้
              highlightDateNameStyle={{ color: "black", fontFamily: 'LeagueSpartan' }}
              disabledDateNameStyle={{ color: "grey" }}
              disabledDateNumberStyle={{ color: "grey" }}
              calendarHeaderStyle={{ color: "black", fontFamily: 'LeagueSpartanMedium' }}
              iconContainer={{ flex: 0.1 }}
              onDateSelected={this.handleDateSelected} // Callback for date selection
            />
            <Text style={styles.selectedDateLable}>
              Selected Date: {selectedDate || "None"}
            </Text>
          </View>

          <View style={[{
            flex: 0,
            zIndex: 1,
          }]}>
            <View style={styles.viewShadowStyles}>
            </View>
          </View>

          <View style={styles.spaceOutsideRoomBox}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentContainer}>
                {/* Create two boxes per row */}
                <View style={styles.boxRow}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.textContent}>
                      <Text style={styles.textbold}>KM-Room 1</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(1, "08:30 - 10:20", isSlotReserved_1, isSlotReserved_1)}
                        {this.renderButton(2, "10:30 - 12:20", isSlotReserved_2, isSlotReserved_2)}
                        {this.renderButton(3, "12:30 - 14:20", isSlotReserved_3, isSlotReserved_3)}
                        {this.renderButton(4, "14:30 - 16:20", isSlotReserved_4, isSlotReserved_4)}
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.textContent}>
                      <Text style={styles.textbold}>KM-Room 2</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(5, "08:30 - 10:20", isSlotReserved_5, isSlotReserved_5)}
                        {this.renderButton(6, "10:30 - 12:20", isSlotReserved_6, isSlotReserved_6)}
                        {this.renderButton(7, "12:30 - 14:20", isSlotReserved_7, isSlotReserved_7)}
                        {this.renderButton(8, "14:30 - 16:20", isSlotReserved_8, isSlotReserved_8)}
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.textContent}>
                      <Text style={styles.textbold}>KM-Room 3</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(9, "08:30 - 10:20", isSlotReserved_9, isSlotReserved_9)}
                        {this.renderButton(10, "10:30 - 12:20", isSlotReserved_10, isSlotReserved_10)}
                        {this.renderButton(11, "12:30 - 14:20", isSlotReserved_11, isSlotReserved_11)}
                        {this.renderButton(12, "14:30 - 16:20", isSlotReserved_12, isSlotReserved_12)}
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.textContent}>
                      <Text style={styles.textbold}>KM-Room 4</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(13, "08:30 - 10:20", isSlotReserved_13, isSlotReserved_13)}
                        {this.renderButton(14, "10:30 - 12:20", isSlotReserved_14, isSlotReserved_14)}
                        {this.renderButton(15, "12:30 - 14:20", isSlotReserved_15, isSlotReserved_15)}
                        {this.renderButton(16, "14:30 - 16:20", isSlotReserved_16, isSlotReserved_16)}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.textContent}>
                      <Text style={styles.textbold}>KM-Room 5</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(17, "08:30 - 10:20", isSlotReserved_17, isSlotReserved_17)}
                        {this.renderButton(18, "10:30 - 12:20", isSlotReserved_18, isSlotReserved_18)}
                        {this.renderButton(19, "12:30 - 14:20", isSlotReserved_19, isSlotReserved_19)}
                        {this.renderButton(20, "14:30 - 16:20", isSlotReserved_20, isSlotReserved_20)}
                      </View>
                    </View>
                  </TouchableOpacity>


                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={[{ flex: 0, backgroundColor: 'black' }]}>
          <View style={[styles.viewShadowStylesNavbar]}></View>
        </View>



        <Modal
          isVisible={isModalVisibleFull}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriverForBackdrop={true}
          onBackdropPress={this.toggleModalFullDismiss}
          style={styles.modalContainerFull}
        >

          <View style={styles.modalContentFull}>
            <View style={[styles.modalInnerContainer]}>
              <ScrollView
                contentContainerStyle={[{
                  flexGrow: 1,
                }]}
                showsVerticalScrollIndicator={false}
              >
                <Text style={[styles.modalRoomNolable]}>KM-Room {this.state.modalRoom_ID}</Text>

                <Text style={[styles.modalTimelable]}>
                  Time : {this.state.modalPeriod} | {this.state.modalFormattedDate}
                </Text>
                <View style={[styles.dividerLine]} />
                <View style={[{
                  flexDirection: 'row', // Arrange children horizontally
                  alignItems: 'center', // Align children vertically
                }]}>
                  < View style={[{ flex: 1, }]} >
                    {/* styles.leftContent */}
                    < Text style={[styles.reservationBylable]}>
                      Reservations by
                    </Text>
                    <View style={[{ flexDirection: "row", marginBottom: 10, }]}>
                      <View style={[{ marginRight: 10, paddingHorizontal: 4, }]}>
                        <Iconify icon="fluent-emoji:man-student-medium-light" size={32} />
                      </View>
                      <View style={[{ flexDirection: "column", }]}>
                        <Text style={[styles.modalStudentLabel]}>
                          Students
                        </Text>
                        <Text style={[styles.modalStudentName]}>
                          Mr.Teerapong Longpenying
                        </Text>
                        <Text style={[styles.modalStudentName]}>
                          Mrs.Susano Uchiha
                        </Text>
                        <Text style={[styles.modalStudentName]}>
                          Ms.Singchai Areenaimpact
                        </Text>
                        <Text style={[styles.modalStudentName]}>
                          Mr.Thanawan Sutthasena
                        </Text>
                        <Text style={[styles.modalStudentName]}>
                          Mr.Tanatorn Yuwaawech
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[{ marginLeft: 10, }]}>
                    <Iconify icon="openmoji:no-entry" color='black' size={48} />
                  </View>
                </View>
                <View style={[styles.emptyViewforScrolling]}></View>
              </ScrollView>
            </View>
          </View>
        </Modal >
      </View >

    );
  }
}