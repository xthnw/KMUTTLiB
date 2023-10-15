import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { Component } from "react";
import {
  ImageBackground,
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
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import Gradient from "./Gradient"; // Import the Gradient component
import { LinearGradient } from "expo-linear-gradient";
import { customText } from "react-native-paper";
import IconM from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Iconify } from 'react-native-iconify';


import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from 'react-native-modal';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;
// Calculate the font size based on screen dimensions
const CustomfontSize = Math.min(screenWidth, screenHeight);

const iconContainerLeft = screenWidth * 0.08;
const iconContainerTop = screenWidth * 0.08;
const { width, height } = Dimensions.get("window");

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      // selectedDate: this.props.route.params.selectedDate || new Date(),
      selectedButton: null, // Initially, no button is selected




      isModalVisibleForm: false,
      isModalVisibleFull: false,
      isModalVisible: false,
      isDropdownOpen: false,
      selectedOption: "",
      isModalCompleteVisible: false,
    };
    this.inputBoxRef = React.createRef();
  }

  toggleModalFull = () => {
    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
      // After the modal state is updated, check if it's closed
      if (!this.state.isModalVisible) {
        // Call the function you want when the modal is closed
        this.toggleModalComplete();
      }
    });
  };
  toggleModalComplete = () => {
    this.setState({
      isModalCompleteVisible: !this.state.isModalCompleteVisible,
    });
  };
  toggleModalClose = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
  toggleModalForm = () => {
    this.setState({ isModalVisibleForm: !this.state.isModalVisibleForm });
  };
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };
  selectOption = (option) => {
    this.setState({
      selectedOption: option,
      isDropdownOpen: false, // Close the dropdown after selection
    });
  };


  handleCheckInPress = () => {
    this.props.navigation.navigate('ReservationCheckInScreen');
  };




  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationDetails");
  };

  // Callback function to handle date selection
  handleDateSelected = (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    this.setState({ selectedDate: parsedDate });
  };
  handleButtonClick = (buttonId) => {
    this.setState((prevState) => ({
      selectedButton: prevState.selectedButton === buttonId ? null : buttonId,
    }));
    // Navigate to ReservationRequest page when a button is clicked
    this.props.navigation.navigate("ReservationRequest");
    // Automatically reset the selectedButton state after a delay (e.g., 1 second)
    setTimeout(() => {
      this.setState({ selectedButton: null });
    }, 1000); // 1000 milliseconds (1 second)
  };

  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  renderButton = (buttonId, text) => {
    const { selectedButton } = this.state;
    const isSelected = selectedButton === buttonId;

    const buttonStyle = isSelected
      ? { ...styles.buttonSelected }
      : { ...styles.button };

    const textStyle = isSelected
      ? { ...styles.textSelected }
      : { ...styles.buttonText };

    // Define a mapping of button IDs to corresponding functions
    const buttonFunctions = {
      1: this.toggleModalForm,
      2: this.toggleModalFull,
      3: this.handleCheckInPress,
      // Add more button IDs and functions as needed
    };

    // Determine the onPress function based on the buttonId
    const onPressFunction = buttonFunctions[buttonId];

    return (
      <TouchableOpacity
        onPress={onPressFunction} // Call the appropriate function based on the buttonId
        style={styles.touchableButton}
        activeOpacity={1}
      >
        <View style={buttonStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };






  render() {

    const { isModalVisibleForm } = this.state;
    const { isModalVisible } = this.state;
    const { isModalCompleteVisible } = this.state;
    const { isModalVisibleFull } = this.state;
    const { selectedOption, isDropdownOpen } = this.state;
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    const dropdownHeight = isDropdownOpen ? options.length * 40 : 0;





    const headerImageBackgroundWidth = screenWidth;
    const headerImageBackgroundHeight = screenHeight / 3;
    const { selectedDate } = this.state;

    // Define a custom dateNumberStyle for selected dates
    const selectedDateNumberStyle = {
      color: "orange", // You can change the color to your preference
      textDecorationLine: "underline", // Add underline for selected dates
    };
    const calendarStripMarginTop = screenHeight * 0.12 * -1;

    return (





      <View style={[{ marginTop: 60, }]}>
        {Platform.OS === "ios" ? (
          <StatusBar barStyle="dark-content" />
        ) : (
          <StatusBar barStyle="light-content" />
        )}

        {/* <View style={{ flex: 1 }}></View> imangeblock */}
        <TouchableOpacity
          onPress={this.handleBackPress}
          style={{ paddingLeft: 20 }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderColor: "#dadada",
              borderWidth: 0.5,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
            }}
          >
            <IconM name="keyboard-arrow-left" size={40} color="orange" />
          </View>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.canlendar}>
            <CalendarStrip
              scrollable
              style={{
                height: screenHeight * 0.12,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
              calendarAnimation={{ type: "sequence", duration: 50 }}
              // calendarColor={'#fff'}
              dateNumberStyle={{ color: "gray" }}
              dateNameStyle={{ color: "gray" }}
              highlightDateNumberStyle={{ color: "orange" }}
              //selectedDateNumberStyle ขีดเส้นใต้
              highlightDateNameStyle={{ color: "orange" }}
              disabledDateNameStyle={{ color: "grey" }}
              disabledDateNumberStyle={{ color: "grey" }}
              calendarHeaderStyle={{ color: "black" }}
              iconContainer={{ flex: 0.1 }}
              selectedDate={this.state.selectedDate}
              onDateSelected={this.handleDateSelected} // Callback for date selection
            />
          </View>
          {/* <Text style={styles.description} >Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}</Text> */}

          <View style={styles.contentContainer}>
            {/* Create two boxes per row */}
            <View style={styles.boxRow}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}></View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(1, "08:30 - 10:20")}
                    {this.renderButton(2, "10:30 - 12:20")}
                    {this.renderButton(3, "12:30 - 14:20")}
                    {this.renderButton(4, "14:30 - 16:20")}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}></View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(5, "08:30 - 10:20")}
                    {this.renderButton(6, "10:30 - 12:20")}
                    {this.renderButton(7, "12:30 - 14:20")}
                    {this.renderButton(8, "14:30 - 16:20")}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}></View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(9, "08:30 - 10:20")}
                    {this.renderButton(10, "10:30 - 12:20")}
                    {this.renderButton(11, "12:30 - 14:20")}
                    {this.renderButton(12, "14:30 - 16:20")}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}></View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(13, "08:30 - 10:20")}
                    {this.renderButton(14, "10:30 - 12:20")}
                    {this.renderButton(15, "12:30 - 14:20")}
                    {this.renderButton(16, "14:30 - 16:20")}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Existing code ... */}
          <TouchableOpacity onPress={this.toggleModalForm}>
            <Text>Show Modal</Text>
          </TouchableOpacity>
          <Modal
            isVisible={isModalVisibleForm}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriverForBackdrop={true}
            onBackdropPress={this.toggleModalForm}
            style={styles.modalContainer}
          >

            <View style={styles.modalContent}>

              <View style={[{
                flex: 0,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                elevation: 3,
              }]}>
                <ScrollView
                  contentContainerStyle={[{
                    flexGrow: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }]}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={[{
                    fontSize: 24,
                    fontFamily: "LeagueSpartanSemiBold",
                    color: "black",
                    marginBottom: 10,
                  }]}>Library Request</Text>
                  <Text style={[{
                    color: "orange",
                    marginBottom: 20,
                    fontFamily: "LeagueSpartanMedium",
                  }]}>
                    KMUTT-LIB ROOM 1 | Time : 10:30 - 12:20 | 24 Oct 2023
                  </Text>
                  <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                      <Text style={[styles.label, { marginBottom: 10 }]}>
                        Student ID
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Student ID"
                        onChangeText={(text) => this.setState({ studentID: text })}
                        value={this.state.studentID}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={[styles.label, { marginBottom: 10 }]}>Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                      />
                    </View>
                  </View>
                  <View style={styles.inputRow}>
                    <View style={styles.inputContainer}>
                      <Text style={[styles.label, { marginBottom: 10 }]}>
                        Service group
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Bachelor"
                        onChangeText={(text) => this.setState({ studentID: text })}
                        value={this.state.studentID}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={[styles.label, { marginBottom: 10 }]}> </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Computer Engineering"
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      {
                        flexDirection: "column",
                        marginBottom: 20,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          marginRight: 10,
                          fontSize: 16,
                          fontFamily: "LeagueSpartan",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      Request for
                    </Text>
                    <TouchableOpacity
                      style={[
                        {
                          flex: 1,
                          borderWidth: 2,
                          borderColor: "#e7e7e7",
                          borderRadius: 15,
                          backgroundColor: "white",
                          padding: 10,
                          flexDirection: "row", // Add flexDirection to align icon and text horizontally
                          justifyContent: "space-between", // Add this to space out icon and text
                          alignItems: "center", // Center items vertically
                        },
                      ]}
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
                      <View
                        style={[
                          {
                            top: "5%",
                            left: 0,
                            right: 0,
                            borderWidth: 2,
                            borderColor: "#e7e7e7",
                            borderRadius: 15,
                            backgroundColor: "white",
                            overflow: "hidden",
                            height: dropdownHeight,
                            fontFamily: "LeagueSpartan",
                          },
                        ]}
                      >
                        {options.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              {
                                padding: 12,
                                borderBottomWidth: 0,
                                borderBottomColor: "gray",
                              },
                            ]}
                            onPress={() => this.selectOption(option)}
                          >
                            <Text
                              style={[
                                {
                                  color: "gray",
                                  fontSize: 14,
                                  fontFamily: "LeagueSpartan",
                                },
                              ]}
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={[{ padding: 16 }]}>
                    <Text
                      style={[
                        {
                          marginRight: 10,
                          fontSize: 16,
                          fontFamily: "LeagueSpartan",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      Please Specify: Username/Student ID
                    </Text>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontFamily: "LeagueSpartan",
                            marginRight: 10,
                          },
                        ]}
                      >
                        1.
                      </Text>
                      <TextInput
                        style={[
                          {
                            flex: 1,
                            borderColor: "#e7e7e7",
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                          },
                        ]}
                        placeholder=""
                      />
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontFamily: "LeagueSpartan",
                            marginRight: 10,
                          },
                        ]}
                      >
                        2.
                      </Text>
                      <TextInput
                        style={[
                          {
                            flex: 1,
                            borderColor: "#e7e7e7",
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                          },
                        ]}
                        placeholder=""
                      />
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontFamily: "LeagueSpartan",
                            marginRight: 10,
                          },
                        ]}
                      >
                        3.
                      </Text>
                      <TextInput
                        style={[
                          {
                            flex: 1,
                            borderColor: "#e7e7e7",
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                          },
                        ]}
                        placeholder=""
                      />
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontFamily: "LeagueSpartan",
                            marginRight: 10,
                          },
                        ]}
                      >
                        4.
                      </Text>
                      <TextInput
                        style={[
                          {
                            flex: 1,
                            borderColor: "#e7e7e7",
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                          },
                        ]}
                        placeholder=""
                      />
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontFamily: "LeagueSpartan",
                            marginRight: 10,
                          },
                        ]}
                      >
                        5.
                      </Text>
                      <TextInput
                        style={[
                          {
                            flex: 1,
                            borderColor: "#e7e7e7",
                            borderWidth: 2,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 10,
                          },
                        ]}
                        placeholder=""
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: '70%',
                      },
                    ]}
                  >
                    {/* Other content goes here */}
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: "orange",
                          padding: 16,
                          borderRadius: 15,
                          width: "80%",
                        },
                      ]}
                      onPress={this.toggleModal}
                    >
                      <Text
                        style={[
                          {
                            color: "white",
                            fontSize: 16,
                            fontFamily: "LeagueSpartanSemiBold",
                            textAlign: "center",
                          },
                        ]}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={isModalVisible}
                    >
                      <View
                        style={[
                          {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                          },
                        ]}
                      >
                        <View
                          style={[
                            {
                              justifyContent: "center",
                              alignItems: "center",
                              width: height * 0.4,
                              maxHeight: height * 0.7,
                              backgroundColor: "white",
                              borderRadius: 35,
                              borderWidth: 2,
                              borderColor: "#e7e7e7",
                              elevation: 8,
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 3 },
                              shadowOpacity: 0.2,
                              shadowRadius: 4,
                              overflow: "hidden",
                            },
                          ]}
                        >
                          <TouchableOpacity
                            onPress={this.toggleModalClose}
                            style={[
                              {
                                position: "absolute",
                                top: 16,
                                right: 16,
                                zIndex: 1, // Ensure the icon is displayed above the map
                              },
                            ]}
                          >
                            <Ionicons name="close" size={32} color="orange" />
                          </TouchableOpacity>
                          <View style={[{ padding: 16, alignItems: "center" }]}>
                            <Icon
                              name="exclamation-triangle"
                              size={24}
                              color="red"
                            />
                            <Text
                              style={[
                                {
                                  fontSize: 18,
                                  fontFamily: "IBMPlexSansThaiBold",
                                  textAlign: "center",
                                  color: "red",
                                },
                              ]}
                            >
                              คำเตือน
                            </Text>
                            <Text
                              style={[
                                {
                                  fontSize: 14,
                                  fontFamily: "IBMPlexSansThaiSemiBold",
                                  textAlign: "center",
                                  marginTop: 16,
                                },
                              ]}
                            >
                              1.
                              เธอน่ารักมาก ๆ &lt;3
                            </Text>
                            <Text
                              style={[
                                {
                                  fontSize: 14,
                                  fontFamily: "IBMPlexSansThaiSemiBold",
                                  textAlign: "center",
                                  marginTop: 16,
                                },
                              ]}
                            >
                              2. ระวังสิ้นสุดทางเพื่อน
                            </Text>
                            <TouchableOpacity
                              style={[
                                {
                                  backgroundColor: "orange",
                                  padding: 12,
                                  borderRadius: 20,
                                  marginTop: 16,
                                },
                              ]}
                              onPress={this.toggleModal}
                            >
                              <Text
                                style={[
                                  {
                                    color: "white",
                                    fontSize: 16,
                                    fontFamily: "LeagueSpartanSemiBold",
                                    textAlign: "center",
                                  },
                                ]}
                              >
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
                      <View
                        style={[
                          {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                          },
                        ]}
                      >
                        <View
                          style={[
                            {
                              justifyContent: "center",
                              alignItems: "center",
                              width: height * 0.4,
                              height: height * 0.4,
                              backgroundColor: "white",
                              borderRadius: 35,
                              elevation: 8,
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 3 },
                              shadowOpacity: 0.2,
                              shadowRadius: 4,
                            },
                          ]}
                        >
                          <TouchableOpacity
                            onPress={this.toggleModalComplete}
                            style={[
                              {
                                position: "absolute",
                                top: 16,
                                right: 16,
                                zIndex: 1, // Ensure the icon is displayed above the map
                              },
                            ]}
                          >
                            <Ionicons name="close" size={32} color="orange" />
                          </TouchableOpacity>
                          <View style={[{ padding: 32, alignItems: "center" }]}>
                            <Image
                              source={require("./picture/check.png")}
                              style={{ width: 200, height: 200 }}
                            />
                            <Text
                              style={[
                                {
                                  fontSize: 18,
                                  fontFamily: "IBMPlexSansThaiSemiBold",
                                  textAlign: "center",
                                  color: "pink",
                                  marginTop: 16,
                                },
                              ]}
                            >
                              ความสัมพันธ์นี้ยังคงไม่พัฒนา &lt;/3
                            </Text>
                            <Text
                              style={[
                                {
                                  fontSize: 18,
                                  fontFamily: "IBMPlexSansThaiSemiBold",
                                  textAlign: "center",
                                  color: "pink",
                                },
                              ]}
                            >
                              T_T
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>









                </ScrollView>
              </View>
            </View>
          </Modal>



          <Modal
            isVisible={isModalVisibleFull}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriverForBackdrop={true}
            onBackdropPress={this.toggleModalFull}
            style={styles.modalContainerFull}
          >

            <View style={styles.modalContentFull}>


              <View style={[{
                flex: 0,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
                elevation: 3,
              }]}>
                <ScrollView
                  contentContainerStyle={[{
                    flexGrow: 1,
                  }]}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={[{
                    fontSize: 24,
                    fontFamily: "LeagueSpartanSemiBold",
                    color: "black",
                    marginBottom: 10,
                  }]}>KM Room 1</Text>
                  <Text style={[{
                    color: "orange",
                    fontFamily: "LeagueSpartanMedium",
                  }]}>
                    Time : 10:30 - 12:20 | 24 Oct 2023
                  </Text>
                  <View style={[{
                    borderBottomColor: 'gray', // Color of the horizontal line
                    borderBottomWidth: 1, // Thickness of the line
                    borderRadius: 50,
                    marginVertical: 10, // Adjust as needed to control the spacing
                  }]} />
                  <View style={[{
                    flexDirection: 'row', // Arrange children horizontally
                    alignItems: 'center', // Align children vertically
                  }]}>
                    < View style={[{ flex: 1, }]} >
                      {/* styles.leftContent */}
                      < Text
                        style={
                          [
                            {
                              fontSize: 18,
                              fontFamily: "LeagueSpartanMedium",
                              alignItems: "center",
                              color: "orange",
                              marginBottom: 10,
                            },
                          ]}
                      >
                        Reservations by
                      </Text>
                      <View
                        style={[
                          {
                            flexDirection: "row", // Arrange items horizontally
                            marginBottom: 10,
                          },
                        ]}
                      >
                        <View
                          style={[
                            {
                              marginRight: 10,
                              paddingHorizontal: 4,
                            },
                          ]}
                        >
                          <Iconify icon="fluent-emoji:man-student-medium-light" size={32} />
                        </View>

                        <View
                          style={[
                            {
                              flexDirection: "column", // Arrange items horizontally
                            },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                                color: "gray",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            Students
                          </Text>
                          <Text
                            style={[
                              {
                                flex: 1,
                                flexWrap: "wrap",
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            Mr.Teerapong Longpenying
                          </Text>
                          <Text
                            style={[
                              {
                                flex: 1,
                                flexWrap: "wrap",
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            Mrs.Susano Uchiha
                          </Text>
                          <Text
                            style={[
                              {
                                flex: 1,
                                flexWrap: "wrap",
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            Ms.Singchai Areenaimpact
                          </Text>
                          <Text
                            style={[
                              {
                                flex: 1,
                                flexWrap: "wrap",
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                                marginBottom: 10,
                              },
                            ]}
                          >
                            Mr.Thanawan Sutthasena
                          </Text>
                          <Text
                            style={[
                              {
                                flex: 1,
                                flexWrap: "wrap",
                                fontSize: 14, // Adjust font size as needed
                                fontFamily: "LeagueSpartanMedium",
                              },
                            ]}
                          >
                            Mr.Tanatorn Yuwaawech
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={[{ marginLeft: 10, }]}>
                      <Iconify icon="openmoji:no-entry" color='black' size={48} />
                    </View>
                  </View>

                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                      },
                    ]}
                  >
                  </View>
                </ScrollView>
              </View>







            </View>
          </Modal >









        </View >
      </View >

    );
  }
}

const desiredMarginTop = screenHeight * 0.265; // 2% of the screen height

const styles = StyleSheet.create({
  modalContainerFull: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentFull: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    maxHeight: '30%', // Maximum height set to 50% of the screen height
    justifyContent: 'flex-start', // Align content at the top
  },

  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    maxHeight: '80%', // Maximum height set to 50% of the screen height
    justifyContent: 'flex-start', // Align content at the top
  },
  modalText: {
    fontSize: 16,
    padding: 16,
  },
  inputRow: {
    flexDirection: "row", // Arrange inputs horizontally
    justifyContent: "space-between", // Add space between inputs
  },
  inputContainer: {
    marginBottom: 20, //ยืด Container ขาว ๆ ลงล่าง
  },
  label: {
    fontSize: 16,
    fontFamily: "LeagueSpartan",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e7e7e7",
    backgroundColor: "white",
    borderRadius: 15,
    padding: "3%",
    fontSize: 16,
    fontFamily: "LeagueSpartan",
    height: 40,
    width: screenWidth * 0.35,
  },














  touchableButton: {
    borderRadius: 10,
    overflow: "hidden", // Clip the child view to fit the button's rounded corners
    // margin: 5,
  },
  ButtonRowcontainer: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Add space between buttons
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginBottom: screenHeight * 0.02,
    justifyContent: "center",
    // Shadow properties for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 }, // Decrease the height value
    shadowOpacity: 0.3,
    shadowRadius: 0,
    // Shadow properties for Android
    elevation: 2,
  },
  buttonText: {
    fontSize: 10,
    color: "black",
    textAlign: "center",
    fontFamily: "LeagueSpartan",
  },
  buttonSelected: {
    borderWidth: 1,
    borderColor: "orange", // Change the border color when selected
    backgroundColor: "orange", // Change the background color when selected
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: "center",
  },
  textSelected: {
    fontSize: 8,
    color: "white",
    textAlign: "center",
  },
  buttonDisabled: {
    backgroundColor: "gray",
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: "center",
  },
  buttonDisabledText: {
    fontSize: 8,
    color: "white",
    textAlign: "center",
  },
  innerBox: {
    flex: 1,
  },
  boxRow: {
    flexDirection: "column", // Arrange boxes horizontally
    justifyContent: "center", // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
    alignItems: "center",
  },
  box: {
    width: screenWidth * 0.95, // Adjust the width as needed
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    padding: 8, // ขอบบนรูปกับขอบกล่อง
    marginVertical: screenHeight * 0.01, // ความห่างของแต่ละกล่องบนล่าง
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  canlendar: {
    borderWidth: 0,
    borderColor: "#ddd",
    borderRadius: 15,
    marginTop: screenHeight * 0.06, // ความห่างของแต่ละกล่องบนล่าง
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: "flex-end",
    marginVertical: screenHeight * 0.02,
  },
  textContent: {
    alignItems: "flex-start", // Align text to the left
    paddingLeft: screenWidth * 0.02, // Add left padding (adjust the value as needed)
    paddingTop: screenHeight * 0.005, // Add left padding (adjust the value as needed)
  },
  image: {
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.05, // Set the desired height
    borderRadius: 15,
    alignItems: "center", // Center the image horizontally
  },
  textbold: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "LeagueSpartan",
  },
  description: {
    fontSize: 8, // Adjust the font size as needed
    color: "gray", // You can adjust the color
    textAlign: "left",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerImageBackground: {
    width: "100%", // Adjust the width as needed
    height: screenHeight / 3,
    position: "absolute", // Position the image behind other components
    resizeMode: "cover", // Adjust as needed
  },
  headerContainer: {
    zIndex: 1, // Place the header container above the image
    alignSelf: "stretch", // Stretch the container horizontally
    alignItems: "center", // Center the content horizontally
    marginTop: screenHeight / 8, // Adjust the marginTop to push down the content
  },
  contentContainer: {
    marginTop: 10, // Adjust the marginTop to control the spacing between header and content
    // Add other styles as needed for your content
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300, // Adjust the height of the gradient overlay
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire image
  },
});
