import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
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
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./customStyles/ReservationCheckInStyles";


export default class ReservationCheckInScreen extends Component {
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
      this.checkDistance(location.coords);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      isWithin30Meters: false,
      isModalVisible: false,
      isModalCompleteVisible: false,
    };
  }
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


  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationDetails");
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  









  checkDistance(userLocation) {
    if (!userLocation) return;

    const libraryLocation = {
      latitude: 13.661650769703941, // Replace with the actual library latitude
      longitude: 100.50526513962733, // Replace with the actual library longitude
    };

    // Haversine formula to calculate distance
    const rad = (x) => (x * Math.PI) / 180;
    const earthRadius = 6371; // Earth's radius in kilometers

    const dLat = rad(libraryLocation.latitude - userLocation.latitude);
    const dLong = rad(libraryLocation.longitude - userLocation.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(userLocation.latitude)) *
      Math.cos(rad(libraryLocation.latitude)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c * 1000; // Distance in meters

    const within30Meters = distance <= 30;
    this.setState({ isWithin30Meters: within30Meters });
  }



  formatDate = (dateString) => {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('/').map(Number);

    // Create a new Date object using the year, month (subtract 1 as it's zero-based), and day
    const date = new Date(year, month - 1, day);

    // Define the options for formatting the date
    const options = {
      weekday: 'short', // Displays the abbreviated day of the week
      day: '2-digit',   // Displays the day of the month with leading zeros
      month: 'short',   // Displays the abbreviated month name
      year: 'numeric',  // Displays the full year
    };

    // Format the date as "Sun 05 Nov 2023"
    return date.toLocaleDateString('en-US', options);
  };



  





  render() {
    const { route } = this.props;
    const { booking } = route.params;
    const { userLocation, isWithin30Meters } = this.state;
    const { isModalVisible } = this.state;
    const { isModalCompleteVisible } = this.state;
    console.log('bookingIDD', booking);
    return (
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}
      >
        <View style={styles.contentContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              onPress={this.handleBackPress}
              style={[styles.backButton]}
            >
              <View style={[{ alignItems: "center", justifyContent: "center", },]}>
                <IconM name="keyboard-arrow-left" size={30} color="orange" />
              </View>
            </TouchableOpacity>
            <View style={[{ alignContent: "center", alignItems: "center" }]}>
              <Image
                source={require("./picture/floor1.jpg")}
                style={[styles.imageStyles]}
                resizeMode="cover"
              />
            </View>

            <View style={[{ padding: 8 }]}>
              <Text style={[styles.OverviewLable]}>
                Overview
              </Text>
              <View style={[{ flexDirection: "row", marginBottom: 10, },]}>
                <View style={[styles.backgroundclockIcon]}>
                  <Icon name="clock-o" size={32} color="orange" />
                </View>

                <View style={[{ flexDirection: "column" }]}>
                  <Text style={[styles.timeLabel]}>
                    Time
                  </Text>
                  <Text style={[styles.hoursLable]}>
                    2 hours
                  </Text>
                </View>
              </View>

              {/* --------- */}

              <Text style={[styles.datetimeLable]}>
                Date/Time
              </Text>
              <Text style={[styles.datetimeDetailLable]}>
                {this.formatDate(booking.data.Booking_date)} | {booking.data.Booking_period}
              </Text>

              <View
                style={[
                  {
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <MapView
                  style={[styles.MapViewStyles]}
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
                {isWithin30Meters ? (
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={{ alignItems: 'center', marginBottom: 8 }}
                  >
                    <View style={[styles.checkInContainer]}>
                      <Text style={styles.checkInLable}>Check in</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={{ alignItems: 'center', marginBottom: 8 }}>
                    <View style={[styles.checkInContainerDisabled]}>
                      <Text style={[styles.checkInLable]}>Confirming Location...</Text>
                    </View>
                  </View>
                )}
              </View>
              {/* --------- */}
            </View>

            {/* <TouchableOpacity
              onPress={this.toggleModal}
              style={{ alignItems: "center", marginBottom: 8 }}
            >
              <View style={[styles.checkInContainer]}>
                <Text style={[styles.checkInLable]}>
                  Check in
                </Text>
              </View>
            </TouchableOpacity> */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
            >
              <View style={[styles.dimbackground]}>
                <View style={[styles.modalbackground]}>
                  <TouchableOpacity
                    onPress={this.toggleModalClose}
                    style={[styles.crossClose]}>
                    <Ionicons name="close" size={32} color="orange" />
                  </TouchableOpacity>
                  <MapView
                    style={[styles.MapViewStyles]}
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
                    <View style={[styles.confirmLocationContainer]}>
                      <Text style={[styles.confirmLocationLable]}>
                        Confirm Location
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalCompleteVisible}
            >
              <View style={[styles.emptybackground]}>
                <View style={[styles.successfulModal]}>
                  <TouchableOpacity
                    onPress={this.toggleModalComplete}
                    style={[styles.crossClose]}
                  >
                    <Ionicons name="close" size={32} color="orange" />
                  </TouchableOpacity>

                  <View style={[styles.successfulImageContainer]}>
                    <Image
                      source={require("./picture/check2.png")}
                      style={{ width: 64, height: 64 }}
                    />

                    <Text style={[styles.successfulText]}>
                      Location Verified
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>

            <Text style={[styles.cooperationRequestlabel]}>
              Please check in with in 15 minutes
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}