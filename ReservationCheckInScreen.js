import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { Component, useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  TextInput,
  Modal,
  UIManager,
  findNodeHandle,
} from "react-native";
import { ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import customPinImage from "./picture/pin.png";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Define a scaling factor based on your design or preferences
const scalingFactor = 0.04; // You can adjust this value

// Calculate the responsive font size
const fontSize = screenWidth * scalingFactor;

export default class ReservationCheckInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      isModalVisible: false,
    };
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  componentDidMount() {
    // Request location permissions
    this.requestLocationPermission();
  }
  async requestLocationPermission() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      // Get the user's current location
      const location = await getCurrentPositionAsync({});
      this.setState({ userLocation: location.coords });
    }
  }

  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationDetails");
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  render() {
    const { userLocation } = this.state;
    const { isModalVisible } = this.state;
    const { width, height } = Dimensions.get("window");
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        edges={[]}
        forceInset={{ bottom: "never" }}
      >
        <View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity
                onPress={this.handleBackPress}
                style={[
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20, // Half of the width/height to create a circle
                    backgroundColor: "white",
                    borderColor: "#dadada",
                    borderWidth: 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <IconM name="keyboard-arrow-left" size={30} color="orange" />
                </View>
              </TouchableOpacity>
              <View style={[{ alignContent: "center", alignItems: "center" }]}>
                <Image
                  source={require("./picture/floor1.jpg")}
                  style={[
                    {
                      width: screenWidth * 0.9,
                      height: screenWidth * 0.8,
                      borderRadius: 15,
                    },
                  ]}
                  resizeMode="cover"
                />
              </View>

              <View style={[{ padding: 8 }]}>
                <Text
                  style={[
                    {
                      fontSize: 18,
                      fontWeight: "bold",
                      alignItems: "center",
                      color: "orange",
                      marginTop: screenWidth * 0.02,
                      fontFamily: "LeagueSpartanSemiBold",
                    },
                  ]}
                >
                  Overview
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row", // Arrange items horizontally
                      marginTop: 8,
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        marginRight: 10,
                        backgroundColor: "#F2F2F2",
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        borderRadius: 4,
                      },
                    ]}
                  >
                    <Icon name="clock-o" size={32} color="orange" />
                  </View>

                  <View style={[{}]}>
                    <Text
                      style={[
                        {
                          fontSize: 14, // Adjust font size as needed
                          color: "#b7b7b7",
                          fontFamily: "LeagueSpartanMedium",
                        },
                      ]}
                    >
                      Time
                    </Text>
                    <Text
                      style={[
                        {
                          flex: 1,
                          flexWrap: "wrap",
                          fontSize: 14, // Adjust font size as needed
                          fontFamily: "LeagueSpartanMedium",
                          fontWeight: "bold", // Bold font for lab
                        },
                      ]}
                    >
                      2 hours
                    </Text>
                  </View>
                </View>

                {/* --------- */}

                <Text
                  style={[
                    {
                      fontSize: 18,
                      fontFamily: "LeagueSpartanSemiBold",
                      fontWeight: "bold",
                      alignItems: "center",
                      color: "orange",
                      marginTop: screenWidth * 0.02,
                    },
                  ]}
                >
                  Date/Time
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 14, // Adjust font size as needed
                      fontFamily: "LeagueSpartanMedium",
                      fontWeight: "bold", // Bold font for label
                      color: "black",
                      marginTop: screenWidth * 0.02,
                    },
                  ]}
                >
                  24 SUNDAY 12:30 - 14:20
                </Text>

                {/* --------- */}
              </View>
              <View style={{ flex: 1 }}>
                <MapView
                  style={{
                    flex: 1,
                    borderBlockColor: "white",
                    borderRadius: 25,
                    padding: 8,
                  }}
                  initialRegion={
                    userLocation
                      ? {
                          latitude: userLocation.latitude,
                          longitude: userLocation.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }
                      : null
                  }
                >
                  {userLocation && (
                    <Marker
                      coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                      }}
                      title="Your Location"
                    >
                      <Image
                        source={customPinImage}
                        style={{ width: 62, height: 92 }}
                      />
                    </Marker>
                  )}

                  {/* You can add markers or other map elements here */}

                  <Text
                    style={[
                      {
                        fontSize: 40, // Adjust font size as needed
                        fontFamily: "LeagueSpartan",
                        fontWeight: "bold", // Bold font for label
                        color: "black",
                        marginTop: screenWidth * 0.5,
                      },
                    ]}
                  ></Text>
                  <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title="Marker Title"
                    description="Marker Description"
                  />
                  <Text
                    style={[
                      {
                        fontSize: 40, // Adjust font size as needed
                        fontFamily: "LeagueSpartan",
                        fontWeight: "bold", // Bold font for label
                        color: "black",
                        marginTop: screenWidth * 0.5,
                      },
                    ]}
                  ></Text>
                </MapView>
              </View>
            </View>

            <TouchableOpacity
              onPress={this.toggleModal}
              style={{ alignItems: "center", marginBottom: 8 }}
            >
              <View
                style={[
                  {
                    backgroundColor: "#131313",
                    height: screenHeight * 0.06,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 8,
                    marginTop: 16,
                    width: screenWidth * 0.9,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      fontSize: 18,
                      fontFamily: "LeagueSpartanSemiBold",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Check in
                </Text>
              </View>
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
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                ]}
              >
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      width: width * 0.9,
                      height: height * 0.6,
                      backgroundColor: "white",
                      borderRadius: 50,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={this.toggleModal}
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
                  <MapView
                    style={[
                      {
                        width: width * 0.8,
                        height: height * 0.4,
                        borderBlockColor: "white",
                        borderRadius: 25,
                        padding: 8,

                        elevation: 2,
                        shadowColor: "black",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                      },
                    ]}
                    initialRegion={
                      userLocation
                        ? {
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }
                        : null
                    }
                  >
                    {userLocation && (
                      <Marker
                        coordinate={{
                          latitude: userLocation.latitude,
                          longitude: userLocation.longitude,
                        }}
                        title="Your Location"
                      >
                        <Image
                          source={customPinImage}
                          style={{ width: 62, height: 92 }}
                        />
                      </Marker>
                    )}
                  </MapView>

                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={{ alignItems: "center" }}
                  >
                    <View
                      style={[
                        {
                          backgroundColor: "#3e64da",
                          height: screenHeight * 0.06,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          elevation: 8,
                          marginTop: 16,
                          width: screenWidth * 0.7,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: "white",
                            fontSize: 18,
                            fontFamily: "LeagueSpartanSemiBold",
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        Confirm Location
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Text
              style={[
                {
                  color: "red",
                  fontSize: 14,
                  fontFamily: "LeagueSpartan",
                  fontWeight: "normal",
                  textAlign: "center",
                },
              ]}
            >
              Please check in with in 15 minutes
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "LeagueSpartan",
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  detailsText: {
    color: "orange",
    marginBottom: 20,
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
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    padding: "3%",
    fontSize: 16,
    fontFamily: "LeagueSpartan",
    height: 40,
    width: screenWidth * 0.35,
  },
});
