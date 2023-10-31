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
      selectedDate: new Date(),
      // selectedDate: this.props.route.params.selectedDate || new Date(),
      selectedButton: null, // Initially, no button is selected



      isModalVisibleForm: false,
      isModalVisibleFull: false,
      isModalVisible: false,
      isDropdownOpen: false,
      selectedOption: "",
      isModalCompleteVisible: false,


      activeImageIndex: 0, //for header image background



    };
    this.inputBoxRef = React.createRef();
    this.buttonScaleValues = {};
    for (let i = 1; i <= 20; i++) {
      this.buttonScaleValues[i] = new Animated.Value(1);
    }
    this.scrollViewRef = React.createRef(); //for header image background
  }

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
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

  toggleModalFull = () => {
    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
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
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  renderButton = (buttonId, text, isDisabled = false) => {
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

    // Define a mapping of button IDs to corresponding functions
    const buttonFunctions = {
      1: this.toggleModalFull,
      2: this.handleRequestPress,
      3: this.handleRequestPress,
      4: this.handleRequestPress,
      5: this.handleRequestPress,
      6: this.handleRequestPress,
      7: this.handleRequestPress,
      8: this.handleRequestPress,
      9: this.toggleModalFull,
      10: this.toggleModalFull,
      11: this.handleRequestPress,
      12: this.handleRequestPress,
      13: this.handleRequestPress,
      14: this.handleRequestPress,
      15: this.toggleModalFull,
      16: this.handleRequestPress,
      17: this.handleRequestPress,
      18: this.toggleModalFull,
      19: this.handleRequestPress,
      20: this.toggleModalFull,
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
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
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
              Selected Date:{" "}
              {selectedDate ? selectedDate.toDateString() : "None"}
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
                        {this.renderButton(1, "08:30 - 10:20", true)}
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
                      <Text style={styles.textbold}>KM-Room 2</Text>
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
                      <Text style={styles.textbold}>KM-Room 3</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(9, "08:30 - 10:20", true)}
                        {this.renderButton(10, "10:30 - 12:20", true)}
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
                      <Text style={styles.textbold}>KM-Room 4</Text>
                      {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                    </View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(13, "08:30 - 10:20")}
                        {this.renderButton(14, "10:30 - 12:20")}
                        {this.renderButton(15, "12:30 - 14:20", true)}
                        {this.renderButton(16, "14:30 - 16:20")}
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
                        {this.renderButton(17, "08:30 - 10:20")}
                        {this.renderButton(18, "10:30 - 12:20", true)}
                        {this.renderButton(19, "12:30 - 14:20")}
                        {this.renderButton(20, "14:30 - 16:20", true)}
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
          onBackdropPress={this.toggleModalFull}
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
                <Text style={[styles.modalRoomNolable]}>KM Room 1</Text>
                <Text style={[styles.modalTimelable]}>
                  Time : 10:30 - 12:20 | 24 Oct 2023
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