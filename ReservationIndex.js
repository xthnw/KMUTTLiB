import React, { Component, } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { ScrollView, Image } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { LinearGradient } from "expo-linear-gradient";
import { Iconify } from 'react-native-iconify';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(), // Initialize with the current date or the default selected date
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
          <View style={styles.topProfileContainer}>
            <View style={styles.circleViewProfile}>
              <Image
                source={require("./picture/profile.png")}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
              />
            </View>
            <Text style={styles.hiUserNameLabel}>
              Hi, TANATON
            </Text>
            <Iconify style={[{ marginLeft: 20, marginTop: 20, }]}
              icon="streamline-emojis:ant" size={32} />
          </View>

          <View style={styles.RoundedWhiteCoverContainer}>
            <ScrollView
              contentContainerStyle={[{ flexGrow: 1 }]}
              showsVerticalScrollIndicator={false}>
              <View style={styles.subRoundedWhiteCoverContainer}>
                <View style={[styles.calendarView, { flex: 1, }]}>
                  <CalendarStrip
                    scrollable={true}
                    style={styles.calendarGapVerticalSapce}
                    calendarAnimation={{ type: "sequence", duration: 10 }}
                    dateNumberStyle={{ color: "gray", fontFamily: 'LeagueSpartan' }}
                    dateNameStyle={{ color: "gray", fontFamily: 'LeagueSpartan' }}
                    highlightDateNumberStyle={styles.calendarHighlightDateNumber}
                    //selectedDateNumberStyle My custom underline
                    highlightDateNameStyle={{ color: "black", fontFamily: 'LeagueSpartan' }}
                    disabledDateNameStyle={{ color: "grey" }}
                    disabledDateNumberStyle={{ color: "grey" }}
                    calendarHeaderStyle={{ color: "black", fontFamily: 'LeagueSpartanMedium' }}
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
                          style={styles.imageInBoxContainer}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
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
                          style={styles.imageInBoxContainer}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={[{ alignItems: "flex-start" }]}>
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
                {/* Create two boxes per row */}
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
                          style={styles.imageInBoxContainer}
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
                          style={styles.imageInBoxContainer}
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
                {/* Create two boxes per row */}
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
                          style={styles.imageInBoxContainer}
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
                          style={styles.imageInBoxContainer}
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
              </View>
            </ScrollView>
          </View>
          <View style={styles.emptyViewforNavbarShadow}>
            <View style={styles.subemptyViewforNavbarShadow}>
            </View>
          </View>
        </View>
      </LinearGradient >
    );
  }
}

const styles = StyleSheet.create({

  topProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 60,
    marginBottom: 60,
    marginLeft: 20,
  },
  circleViewProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  hiUserNameLabel: {
    marginLeft: 20,
    fontSize: 18,
    color: "white",
    fontFamily: "LeagueSpartan",
  },

  RoundedWhiteCoverContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25, // Adjust the top-left corner radius
    borderTopRightRadius: 25, // Adjust the top-right corner radius
    overflow: "hidden",
  },

  subRoundedWhiteCoverContainer: {
    flex: 1,
    margin: 12,
  },
  calendarView: {
  },
  calendarGapVerticalSapce: {
    height: screenHeight * 0.13,
    paddingTop: 10,
    paddingBottom: 10,
  },
  calendarHighlightDateNumber: {
    color: "black",
    textDecorationLine: "underline", // Add underline style
    textDecorationColor: "orange", // Color of the underline
    fontFamily: 'LeagueSpartanMedium',
  },
  imageInBoxContainer: {
    width: screenWidth * 0.4, // Set the desired width
    height: screenHeight * 0.15, // Set the desired height
    borderRadius: 15,
    alignItems: "center", // Center the image horizontally
  },
  emptyViewforNavbarShadow: {
    flex: 0,
    backgroundColor: 'black'
  },
  subemptyViewforNavbarShadow: {
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
  },

  

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
  container: {
    flex: 1,
    width: screenWidth,
  },
});
