import React, { Component, useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Animated, TextInput, Modal, UIManager, findNodeHandle } from 'react-native';
import { ScrollView, Image } from 'react-native';
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


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const ReservationList = () => {

  const navigation = useNavigation(); // Use navigation hook if you're using React Navigation
  const { state } = useAuth();
  const { authenticated, userData } = state;
  const [bookings, setBookings] = useState([]);
  const [responseData, setResponseData] = useState(null);

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



  const handleBackPress = () => {
    navigation.navigate("ReservationCheckInScreen"); // Assuming you're using React Navigation and have access to navigation
  };

  console.log('booking.Room_ID:', responseData);

  const roomLabels = {
    'KM1': 'KM-Room 1',
    'KM2': 'KM-Room 2',
    'KM3': 'KM-Room 3',
    'KM4': 'KM-Room 4',
    'KM5': 'KM-Room 5',
  };

  return (
    <SafeAreaView
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: COLORS.white,
        paddingVertical: screenHeight * 0.03
      }}
    >

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.formTitle}>My Room</Text>
        </View>

        <View>
          {authenticated ? (
            <View>
              <Text>Welcome, {userData.User_FName} {userData.User_LName}</Text>
              <Text>Email: {userData.User_Email}</Text>
              {/* Display more user information as needed */}
            </View>
          ) : (
            <Text>Please log in to access this page.</Text>
          )}
        </View>

        {responseData?.data?.booking.map((booking, index) => (
          <View key={index}>
            <View style={{
              marginTop: screenHeight * 0.07,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                onPress={handleBackPress}
              >
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('./picture/floor1.jpg')}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.textContent}>
                    <Text style={styles.textbold}>{roomLabels[booking.data.Room_ID] || 'Unknown Room'}</Text>
                    <View style={styles.boxRow}>
                      <View style={styles.label}>
                        <Text style={styles.Tag}>Location</Text>
                        <Text style={styles.Tag}>Status</Text>
                        <Text style={styles.Tag}>Date</Text>
                        <Text style={styles.Tag}>Time</Text>
                      </View>
                      <View style={styles.space} />
                      <View style={styles.label}>
                        <Text style={styles.text}>5th floor</Text>
                        <View style={[styles.status]}>
                          <Text style={styles.statusInner}>{booking.data.Booking_Status}</Text>
                        </View>
                        <Text style={styles.text}><Icon name="calendar" size={15} color={COLORS.primary} /> {booking.data.Booking_date}</Text>
                        <Text style={styles.text}>{booking.data.Booking_period}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.space} />


      </ScrollView>
    </SafeAreaView>
  );
};

export default ReservationList;

const styles = StyleSheet.create({
  scrollViewContainer: {
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
    width: screenWidth * 0.85, // Adjust the width as needed
    // flex: 1,
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
  space: {
  },

  boxRow: {
    flexDirection: 'row', // Arrange boxes vertical
    justifyContent: 'space-between',
    marginEnd: 20,
    // borderWidth: 5,
    borderColor: COLORS.primary,
    // width: screenWidth * 0.5,
  },

  box: {
    width: screenWidth * 0.8, // Adjust the width as needed
    height: screenWidth * 0.3,
    flex: 1,
    alignItems: 'start',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    padding: 10, // ขอบบนรูปกับขอบกล่อง
    marginVertical: 4, // ความห่างของ0แต่ละกล่องบนล่าง
    marginHorizontal: 2,
    flexDirection: 'row',
    backgroundColor: 'black',
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    padding: '1%',
  },
  icon: {
    color: COLORS.black,
  },
  Tag: {
    // Opacity: -5,
    color: 'grey',
    fontSize: 12,
    fontFamily: 'LeagueSpartanMedium',
    padding: '1%',
  },
  text: {
    // Opacity: -5,
    color: COLORS.black,
    fontSize: 12,
    fontFamily: 'LeagueSpartan',
    padding: '1%',
  },
  image: {
    flex: 1,
    width: screenWidth * 0.3, // Set the desired width
    height: screenHeight * 0.11, // Set the desired height
    maxHeight: screenHeight * 0.14, // Set the desired height
    borderRadius: 15,
    alignItems: 'center', // Center the image horizontally/
    marginEnd: 0,
  },
  textbold: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  status: {
    backgroundColor: '#ffecd8', // Green background color
    borderRadius: 10, // Adjust the border radius as needed
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'LeagueSpartan',
    padding: '1%',
  },
  statusInner: {
    color: '#ff8800',
    fontSize: 12,
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan'
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

});
