import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  SafeAreaView,
  TextInput,
} from "react-native";
import { ScrollView, Image } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import IconM from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import ReservationDetailsScreen from "./ReservationDetailsScreen";

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

  componentDidMount() {
    // Set the status bar visibility when the component mounts
    StatusBar.setHidden(false); // Set to false to show the status bar
    StatusBar.setBarStyle("dark-content");
    // StatusBar.setBackgroundColor('red'); // Change the background color to red
  }
  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("Reservation");
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
      LeagueSpartanBold: require("./ios/LeagueSpartan-Bold.ttf"),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: 10,
                },
              ]}
            >
              <View
                style={[
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
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
                    fontWeight: "bold",
                    fontFamily: "LeagueSpartan",
                  },
                ]}
              >
                Hi, TANATON
              </Text>
            </View>

            <View
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                },
              ]}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "white",
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: "white",
                    width: screenWidth * 0.8, // Set the desired width
                    height: screenHeight * 0.05,
                    marginTop: screenHeight * 0.05,
                    marginBottom: 10,
                    elevation: 8,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  },
                ]}
              >
                <IconM
                  name="search"
                  size={24}
                  color="gray"
                  style={styles.icon}
                />
                <TextInput
                  style={[{ fontFamily: "LeagueSpartan" }]}
                  placeholder="Search room name"
                  placeholderTextColor="gray"
                />
              </View>
            </View>

            <View>
              <CalendarStrip
                scrollable
                style={{
                  height: screenHeight * 0.13,
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontFamily: 'LeagueSpartan',
                }}
                calendarAnimation={{ type: "sequence", duration: 10 }}
                dateNumberStyle={{ color: "gray" }}
                dateNameStyle={{ color: "gray" }}
                highlightDateNumberStyle={{ color: "orange" }}
                //selectedDateNumberStyle ขีดเส้นใต้
                highlightDateNameStyle={{ color: "orange" }}
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
                style={styles.box}
                onPress={this.navigateToNextScreen}
              >
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("./picture/floor1.jpg")}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.textbold}>5th floor libary</Text>
                    <Text style={styles.description}>
                      Description of Room 1st goes here
                    </Text>
                    <View style={[styles.statusContainer, {}]}>
                      <Text style={styles.statusText}>Status:</Text>
                      <View style={[styles.statusLabel]}>
                        <Text style={styles.statusLabelInner}>Available</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.space} />

              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("./picture/floor1.jpg")}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.textbold}>5th floor libary</Text>
                    <Text style={styles.description}>
                      Description of Room 1st goes here
                    </Text>
                    <View style={[styles.statusContainer, {}]}>
                      <Text style={styles.statusText}>Status:</Text>
                      <View style={[styles.statusLabelClose]}>
                        <Text style={styles.statusLabelInner}>Teacher</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.boxRow}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("./picture/floor1.jpg")}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.textbold}>5th floor library</Text>
                    <Text style={styles.description}>
                      Description of Room 1st goes here
                    </Text>
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
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("./picture/floor1.jpg")}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.textContent}>
                    <Text style={styles.textbold}>5th floor libary</Text>
                    <Text style={styles.description}>
                      Description of Room 1st goes here
                    </Text>
                    <View style={[styles.statusContainer, {}]}>
                      <Text style={styles.statusText}>Status:</Text>
                      <View style={[styles.statusLabel]}>
                        <Text style={styles.statusLabelInner}>Available</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "orange",
              borderRadius: 25,
              padding: 10,
              marginHorizontal: 10,
              marginBottom: 5,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              {
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Image source={require("./picture/left.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Image source={require("./picture/mid.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={require("./picture/right.png")}
              style={[
                {
                  width: 24, // Adjust the width and height as needed
                  height: 24,
                  resizeMode: "contain", // Ensure the icon scales properly
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    fontWeight: "bold",
    fontFamily: "LeagueSpartan",
  },
  statusLabel: {
    backgroundColor: "green", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelFull: {
    backgroundColor: "gray", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelClose: {
    backgroundColor: "red", // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 10, // Add horizontal padding for better appearance
    fontFamily: "LeagueSpartan",
  },
  statusLabelInner: {
    color: "white", // Text color
    fontWeight: "bold",
    fontFamily: "LeagueSpartan",
  },
  innerBox: {
    flex: 1,
  },
  space: {
    width: screenWidth * 0.05, // Adjust the width to add space between boxes
    height: screenHeight * 0.05,
  },
  boxRow: {
    flexDirection: "row", // Arrange boxes horizontally
    justifyContent: "space-between", // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
  },
  box: {
    width: screenWidth * 0.45, // Adjust the width as needed
    height: screenHeight * 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    padding: 8, // ขอบบนรูปกับขอบกล่อง
    marginVertical: 10, // ความห่างของแต่ละกล่องบนล่าง
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    alignItems: "flex-start", // Align text to the left
  },
  image: {
    width: screenWidth * 0.4, // Set the desired width
    height: screenHeight * 0.15, // Set the desired height
    borderRadius: 15,
    alignItems: "center", // Center the image horizontally
  },
  textbold: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "LeagueSpartan",
  },
  description: {
    fontSize: 12, // Adjust the font size as needed
    color: "gray", // You can adjust the color
    textAlign: "left",
    fontFamily: "LeagueSpartan",
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
