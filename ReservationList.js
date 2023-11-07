import React, { Component, useState, useEffect } from 'react';
import {
  ImageBackground, View, Text, StyleSheet,
  TouchableOpacity, TouchableWithoutFeedback,
  Dimensions, SafeAreaView, StatusBar, Animated, TextInput,
  UIManager, findNodeHandle, RefreshControl,
} from 'react-native';
import { ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import CalendarStrip from 'react-native-calendar-strip';
import Gradient from './Gradient'; // Import the Gradient component
import { LinearGradient } from "expo-linear-gradient";
import { customText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import COLORS from './fifa/colors';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook if you're using React Navigation
import { useAuth } from './auth';
import axios from 'axios';
StatusBar.setHidden(false);

const apiUrl = 'http://192.168.220.43:8080/api/list';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("window");


const ReservationList = () => {
  const navigation = useNavigation(); // Use navigation hook if you're using React Navigation
  const { state } = useAuth();
  const { authenticated, userData } = state;
  const [responseData, setResponseData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://192.168.1.104:8080/api/list';
        const jsonData = {
          email: userData.User_Email,
        };
        const response = await axios.post(apiUrl, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.data.booking) {
          setResponseData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Response Data of now:', responseData);
  }, [responseData]);


  const handleDeleteBooking = async () => {
    const apiUrl = 'http://192.168.1.104:8080/api/delete';

    // Define the JSON data for the booking's ID
    const jsonData = {
      id: selectedBookingId,
    };

    // Send a DELETE request with JSON data in the request body
    axios({
      method: 'delete',
      url: apiUrl,
      data: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Booking deleted:', response.data);
        // After successful deletion, you can handle refreshing the data or UI here
        setModalVisible(false);
        // Now, re-fetch the updated data to refresh the UI
        handleRefresh();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
        // Handle the error or show a message to the user
      });
    // toggleModal();
  };
  const handleSelectBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setModalVisible(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    // Call your API fetching logic here, for example:
    try {
      const apiUrl = 'http://192.168.1.104:8080/api/list';
      const jsonData = {
        email: userData.User_Email,
      };
      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.data.booking) {
        setResponseData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setRefreshing(false);
  };

  const formatDate = (dateString) => {
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


  const navigateToNextScreen = (booking) => {
    navigation.navigate('ReservationCheckInScreen', { booking });
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const roomLabels = {
    'KM1': 'KM-Room 1',
    'KM2': 'KM-Room 2',
    'KM3': 'KM-Room 3',
    'KM4': 'KM-Room 4',
    'KM5': 'KM-Room 5',
  };



  // console.log('booking.Room_ID:', responseData.data.booking);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10, paddingVertical: 10,
        backgroundColor: COLORS.white,
      }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
          <Text style={styles.formTitle}>My Room</Text>
        </View>


        {responseData?.data?.booking.length === 0 ? (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Text style={styles.text}>Not found reservation, ไปจองซะนะไอน้อง</Text>
          </View>
        ) : (
          responseData?.data?.booking.map((booking, index) => (
            <View key={index} style={[{ flex: 1 }]}>
              <View style={{ marginBottom: screenHeight * 0.02, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <TouchableWithoutFeedback >
                  <View style={styles.innerBox}>
                    <View style={[{}]}>
                      <Image source={require('./picture/floor1.jpg')} style={styles.image} resizeMode="cover" />
                    </View>
                    <View style={[{ marginLeft: 4, }]}>
                      <Text style={styles.textbold}>{roomLabels[booking.data.Room_ID] || 'Unknown Room'}</Text>
                      <View style={styles.boxRow}>
                        <View style={styles.label}>
                          <Text style={styles.Tag}>Location</Text>
                          <View style={[{ marginVertical: 2, }]}>
                            <Text style={styles.Tag}>Status</Text>
                          </View>
                          <View style={[{ marginTop: 2, }]}>
                            <Text style={styles.Tag}>Date</Text>
                          </View>

                          <Text style={styles.Tag}>Time</Text>
                          {/* <View style={styles.space} /> */}
                          <TouchableOpacity style={styles.deleteBooking} onPress={() => handleSelectBooking(booking.id)}>
                            <Text style={styles.statusDelete}>Cancel Reserve</Text>
                          </TouchableOpacity>
                        </View>
                        {/* <View style={styles.space} /> */}
                        <View style={styles.label}>
                          <Text style={styles.text}>5th floor</Text>
                          <View style={styles.status}>
                            <Text style={styles.statusInner}>{booking.data.Booking_Status}</Text>
                          </View>
                          <Text style={styles.text}>
                            <Icon name="calendar" size={15} color={COLORS.primary} /> {formatDate(booking.data.Booking_date)}
                          </Text>
                          <Text style={[styles.text, {}]}>{booking.data.Booking_period}</Text>
                          {/* <View style={styles.space} /> */}
                          <TouchableOpacity style={styles.statusDetail} onPress={() => navigateToNextScreen(booking)}>
                            <Text style={styles.statusInner}>Detail</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          ))
        )}
        <View style={styles.space} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.blankBgModalView}>
            <View style={styles.alertModalcontainer}>
              <TouchableOpacity
                onPress={this.toggleModalClose}
                style={styles.closebuttonView}
              >
              </TouchableOpacity>
              <View style={[{ padding: 16, }]}>
                <Text style={styles.alertheaderText}>
                  Cancel Reservation ?
                </Text>
                <Text style={styles.alertdetailsText}>
                  Are you sure to cancel ?
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                      borderColor: 'gray',
                      borderWidth: 1,
                    }}
                    onPress={toggleModal}
                  >
                    <Text style={{ color: 'gray', fontFamily: 'LeagueSpartanSemiBold', fontSize: 18, }}>Stay</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: 'red',
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                      borderWidth: 1,
                      borderColor: 'red',
                    }}
                    onPress={handleDeleteBooking}
                  >
                    <Text style={{ color: 'white', fontFamily: 'LeagueSpartanSemiBold', fontSize: 18, }}>Yes, cancel</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView >
    </SafeAreaView >

  );
};

export default ReservationList;

const styles = StyleSheet.create({

  blankBgModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  alertModalcontainer: {
    justifyContent: "center",
    width: height * 0.35,
    maxHeight: height * 0.7,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#e7e7e7",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
    paddingVertical: 12,
  },
  closebuttonView: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1, // Ensure the icon is displayed above
  },
  alertheaderText: {
    fontSize: 24,
    fontFamily: "LeagueSpartanSemiBold",
    color: "black",
  },
  alertdetailsText: {
    fontSize: 18,
    fontFamily: "LeagueSpartanSemiBold",
    marginTop: 16,
    color: 'gray',
  },
  acceptbuttonStyle: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
  },
  acceptTextStyle: {
    color: "white",
    fontSize: 18,
    fontFamily: "LeagueSpartanSemiBold",
    textAlign: "center",
  },




  scrollViewContainer: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    // left: screenWidth * 0.275
    // marginBottom: 10,

  },
  detailsText: {
    color: 'orange',
    marginBottom: 20,
  },
  innerBox: {
    flexDirection: 'row',
    // width: screenWidth * 0.85, // Adjust the width as needed
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    padding: 12,
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },


  boxColumn: {
    flexDirection: 'column', // Arrange boxes vertical
    justifyContent: 'space-between', // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
  },
  boxRow: {
    flexDirection: 'row', // Arrange boxes vertical
    // borderWidth: 5,
    // borderColor: COLORS.primary,
    marginVertical: 5,
  },

  label: {
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: COLORS.grey,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0,
    shadowRadius: 8,
  },
  icon: {
    color: COLORS.black,
  },
  Tag: {
    // Opacity: -5,
    color: 'grey',
    padding: '1%',
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    // Opacity: -5,
    color: COLORS.black,
    padding: '1%',
    fontSize: 12,
    fontWeight: 'semibold',
  },
  image: {
    flex: 1,
    width: screenWidth * 0.3, // Set the desired width
    height: screenHeight * 0.11, // Set the desired height
    // maxHeight: screenHeight * 0.14, // Set the desired height
    borderRadius: 15,
    alignItems: 'center', // Center the image horizontally/
  },
  textbold: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  status: {
    backgroundColor: 'green', // Green background color
    borderRadius: 5, // Adjust the border radius as needed
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Add border width
    borderColor: 'green', // Set the border color to red
  },
  deleteBooking: {
    backgroundColor: 'white',
    borderWidth: 1, // Add border width
    borderColor: '#ff5c5c', // Set the border color to red
    // marginBottom: '25%',
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statusDetail: {
    backgroundColor: COLORS.primary, // Green background color
    borderRadius: 25, // Adjust the border radius as needed
    borderWidth: 1, // Add border width
    borderColor: COLORS.primary, // Set the border color to red
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  },
  space: {
    // width: screenWidth * 0.1,
    // height: screenHeight * 0.01
  },
  statusInner: {
    color: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  },
  statusDelete: {
    color: '#ff5c5c',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

});
