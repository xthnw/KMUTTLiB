import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
  Platform,
} from "react-native";
import { ScrollView, Image } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import IconM from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import ReservationDetailsScreen from "./ReservationDetailsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Iconify } from 'react-native-iconify';
import LottieView from 'lottie-react-native';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(), // Initialize with the current date or the default selected date
      fontLoaded: false,
    };
  }
  // Function to navigate to the next screen with selected date
  navigateToNextScreen = () => {
    const { selectedDate } = this.state;
    const dateString = selectedDate.toISOString();
    this.props.navigation.navigate("Reservation", {
      selectedDate: dateString,
    });
  };
  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("Reservation");
  };

  handleCheckIn = () => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationCheckIn");
  };

  // Callback function to handle date selection
  handleDateSelected = (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    this.setState({ selectedDate: parsedDate });
  };

  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  async componentDidMount() {
    await Font.loadAsync({
      LeagueSpartan: require("./ios/LeagueSpartan-Regular.ttf"),
      LeagueSpartanMedium: require("./ios/LeagueSpartan-Medium.ttf"),
      LeagueSpartanSemiBold: require("./ios/LeagueSpartan-SemiBold.ttf"),
      IBMPlexSansThaiBold: require("./ios/IBMPlexSansThai-Bold.ttf"),
      IBMPlexSansThaiSemiBold: require("./ios/IBMPlexSansThai-SemiBold.ttf"),
    });
    this.setState({ fontLoaded: true });
    this.focusListener = this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content');
    });
    this.blurListener = this.props.navigation.addListener('blur', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
  }




  render() {
    const { navigation } = this.props;
    if (!this.state.fontLoaded) {
      return <ReservationDetailsScreen />;
    }
    const { selectedDate } = this.state;

    // Define a custom dateNumberStyle for selected dates
    const selectedDateNumberStyle = {
      color: "orange", // You can change the color to your preference
      textDecorationLine: "underline", // Add underline for selected dates
    };
    return (

      <LinearGradient
        colors={["#fe4914", "#ff9f26"]} // Adjust these colors as needed
        start={{ x: 0, y: 0 }} // Adjust the start point
        end={{ x: 1, y: 0 }} // Adjust the end point
        style={[{ flex: 1 }]}
      >
        {Platform.OS === 'ios' ? (
          <StatusBar barStyle="light-content" />
        ) : (
          <StatusBar barStyle="dark-content" />
        )}
        <View style={styles.container}>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 60,
                marginLeft: 20,
                marginBottom: 60,
              },
            ]}
          >
            <View
              style={[
                {
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 4, // Android shadow
                },
              ]}
            >
              {/* You can place your profile picture here */}
              <Image
                source={require("./picture/profile.png")}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            </View>
            <Text
              style={[
                {
                  marginLeft: 20, // Add spacing between image and text
                  fontSize: 18,
                  color: "white",
                  fontFamily: "LeagueSpartan",
                },
              ]}
            >
              Hi, TANATON
            </Text>
            <Iconify
              style={[{ marginLeft: 20, marginTop: 20, }]}
              icon="streamline-emojis:ant" size={32} />

          </View>

          <View
            style={[
              {
                flex: 1,
                flexGrow: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 25, // Adjust the top-left corner radius
                borderTopRightRadius: 25, // Adjust the top-right corner radius
                overflow: "hidden",
              },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={[{ flex: 1, margin: 12 }]}>
                <View style={[{}]}>
                  <CalendarStrip
                    scrollable={true}
                    style={{
                      height: screenHeight * 0.13,
                      paddingTop: 10,
                      paddingBottom: 10,
                      fontFamily: "LeagueSpartan",
                    }}
                    calendarAnimation={{ type: "sequence", duration: 10 }}
                    dateNumberStyle={{ color: "gray" }}
                    dateNameStyle={{ color: "gray" }}
                    highlightDateNumberStyle={{
                      color: "gray",
                      textDecorationLine: "underline", // Add underline style
                      textDecorationColor: "orange", // Color of the underline
                    }}
                    //selectedDateNumberStyle ขีดเส้นใต้
                    highlightDateNameStyle={{ color: "gray" }}
                    disabledDateNameStyle={{ color: "grey" }}
                    disabledDateNumberStyle={{ color: "grey" }}
                    calendarHeaderStyle={{ color: "black" }}
                    iconContainer={{ flex: 0.1 }}
                    onDateSelected={this.handleDateSelected} // Callback for date selection
                  />
                  <Text style={styles.description}>
                    Selected Date:{" "}
                    {selectedDate ? selectedDate.toDateString() : "None"}
                  </Text>
                </View>
                {/* Create two boxes per row */}
                <View style={styles.boxRow}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={this.navigateToNextScreen}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={[
                          {
                            alignItems: "flex-start", // Align text to the left
                          },
                        ]}
                      >
                        <Text style={styles.textbold}>KM-Room 1</Text>
                        <Text style={styles.description}>5th Floor</Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabel]}>
                            <Text style={styles.statusLabelInner}>
                              Available
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.space} />

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={[
                          {
                            alignItems: "flex-start",
                          },
                        ]}
                      >
                        <Text style={styles.textbold}>KM-Room 2</Text>
                        <Text style={styles.description}>5th Floor</Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabelClose]}>
                            <Text style={styles.statusLabelInner}>
                              Teacher
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.boxRow}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
                        <Text style={styles.textbold}>KM-Room 3</Text>
                        <Text style={styles.description}>5th Floor</Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabelFull]}>
                            <Text style={styles.statusLabelInner}>Full</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.space} />

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
                        <Text style={styles.textbold}>KM-Room 4</Text>
                        <Text style={styles.description}>5th Floor</Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabel]}>
                            <Text style={styles.statusLabelInner}>
                              Available
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.boxRow}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
                        <Text style={styles.textbold}>KM-Room 5</Text>
                        <Text style={styles.description}>5th Floor</Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabelFull]}>
                            <Text style={styles.statusLabelInner}>Full</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.space} />

                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.box}
                    onPress={() => this.handleBoxPress(1)}
                  >
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require("./picture/floor1.jpg")}
                          style={[
                            {
                              width: screenWidth * 0.4, // Set the desired width
                              height: screenHeight * 0.15, // Set the desired height
                              borderRadius: 15,
                              alignItems: "center", // Center the image horizontally
                            },
                          ]}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
                        <Text style={styles.textbold}>5th floor libary</Text>
                        <Text style={styles.description}>
                          Description of Room 1st goes here
                        </Text>
                        <View style={[styles.statusContainer, {}]}>
                          <Text style={styles.statusText}>Status:</Text>
                          <View style={[styles.statusLabel]}>
                            <Text style={styles.statusLabelInner}>
                              Available
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={[{ flex: 0, backgroundColor: 'black' }]}>
            {/* Your other content here */}
            <View style={[{
              backgroundColor: 'white', // Background color of the shadow view (match with main container)
              shadowColor: 'black',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 3, // Elevation for Android (simulates shadow)
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 1, // Adjust the height of the shadow as needed
            }]}></View>
          </View>

        </View>
      </LinearGradient >
    );
  }
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10, // Adjust the margin value as needed
    alignSelf: "flex-end", // Align the container to the bottom of the box
  },
  statusText: {
    color: "black", // Color of "Status:"
    fontFamily: "LeagueSpartan",
  },
  statusLabel: {
    backgroundColor: "#29b95f", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelFull: {
    backgroundColor: "#979797", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelClose: {
    backgroundColor: "#d10000", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelInner: {
    color: "white", // Text color
    fontFamily: "LeagueSpartan",
  },
  innerBox: {
    flex: 1,
  },
  space: {},
  boxRow: {
    flexDirection: "row", // Arrange boxes horizontally
    justifyContent: "space-between", // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
  },
  box: {
    width: screenWidth * 0.45, // Adjust the width as needed
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    padding: 8, // ขอบบนรูปกับขอบกล่อง
    marginVertical: 2, // ความห่างของแต่ละกล่องบนล่าง
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textbold: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "LeagueSpartan",
  },
  description: {
    marginTop: 5,
    fontSize: 12, // Adjust the font size as needed
    color: "#a1a1a1", // You can adjust the color
    textAlign: "left",
    fontFamily: "LeagueSpartan",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: screenWidth,
  },
});
