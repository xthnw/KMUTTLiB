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
import styles from './customStyles/ReservationIndexStyles';
StatusBar.setHidden(false);

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
    this.props.navigation.navigate("ReservationScreen", {
      selectedDate: dateString,
    });
  };
  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationScreen");
  };
  // Callback function to handle date selection
  handleDateSelected = (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    this.setState({ selectedDate: parsedDate });
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
    return (
      <LinearGradient
        colors={["#fe4914", "#ff9f24"]} // Adjust these colors as needed
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
                    onPress={() => this.handleBoxPress(2)}
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
                    onPress={() => this.handleBoxPress(3)}
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
                    onPress={() => this.handleBoxPress(4)}
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
                    onPress={() => this.handleBoxPress(5)}
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
                    onPress={() => this.handleBoxPress(6)}
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