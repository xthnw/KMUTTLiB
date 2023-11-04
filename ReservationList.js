import React, { Component, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Button } from 'react-native';
import { ScrollView, Image } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from './fifa/colors';
import axios from 'axios';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
StatusBar.setHidden(false);
import { deleteBooking } from './source/deleteBooking'; // Adjust the import path



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 

  componentDidMount() {
    // Make an API request to fetch booking data
    axios
      .get('http://localhost:8080/api/list') // Replace with your API endpoint
      .then(response => {
        // Extract the date and time from the response and store them in the state
        this.setState({
          bookingData: response.data, // Assuming the response contains date and time fields
        });
      })
      .catch(error => {
        console.error('Error fetching booking data:', error);
      });
  }

  navigateToNextScreen = () => {
    this.props.navigation.navigate('ReservationCheckInScreen');
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };
  handleDeleteBooking = () => {
    deleteBooking()
      .then(response => {
        console.log('Booking deleted:', response.data);
        this.setState({ deleted: true });
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  }
  render() {

    return (
      <SafeAreaView style={[{
        // flex: 1 ,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: COLORS.white,
        paddingVertical: screenHeight * 0.03
      }]}>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >


          <View style={[{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }]}>
            <Text style={styles.formTitle}>My Room</Text></View>
          <View style={[{
            // flex: 1,
            marginTop: screenHeight * 0.07,
            justifyContent: 'center',
            alignItems: 'center',
          }]}>

            <View
              // style={styles.box}
              // onPress={this.navigateToNextScreen}
            >
              <View style={styles.Box}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./picture/floor1.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>KM-ROOM 1</Text>
                  <View style={styles.boxRow}>

                    <View style={styles.label}>
                      <Text style={styles.Tag}>Location</Text>
                      <Text style={styles.Tag}>Status</Text>
                      <Text style={styles.Tag}>Date</Text>
                      <Text style={styles.Tag}>Time</Text>
                      <View style={styles.space} />
                      <TouchableOpacity style={styles.deleteBooking} onPress={this.handleDeleteBooking}>
                        <Text style={styles.statusDelete}>Cancel</Text>
                        
                      </TouchableOpacity>
                    </View>
                    <View style={styles.space} />

                    <View style={styles.label}>
                      <Text style={styles.text}>5th floor</Text>
                      <View style={[styles.status]}>
                        <Text style={styles.statusInner}>Available</Text>
                      </View>
                      <Text style={styles.text}><Icon name="calendar" size={15} color={COLORS.primary} />16 Oct, 2023</Text>
                      <Text style={[styles.text, { flex: 1 }]}>15.00 - 17.00</Text>
                      <View style={styles.space} />
                      <TouchableOpacity style={[styles.statusDetail]} onPress={this.navigateToNextScreen}>
                        <Text style={styles.statusInner}>Detail</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </View>
            </View>

            <View style={styles.space} />


          </View>

        </ScrollView>

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
  textContent: {
    // flex: 1,
    // backgroundColor: 'red',
    borderRadius: 10,
    width: '60%',
    paddingLeft: 10,
    // elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,

  },
  detailsText: {
    color: 'orange',
    marginBottom: 20,
  },
  Box: {
    flexDirection: 'row',
    width: screenWidth * 0.85, // Adjust the width as needed
    // flex: 1,
    
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    padding: 12,
    backgroundColor: COLORS.white,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  space: {
    width:screenWidth*0.1,
    height:screenHeight*0.005
  },

  boxColumn: {
    flexDirection: 'column', // Arrange boxes vertical
    justifyContent: 'space-between', // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
  },
  boxRow: {
    flexDirection: 'row', // Arrange boxes vertical
    marginEnd: 10,
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
    backgroundColor: 'green', // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    alignItems: 'center',
    fontSize: 12,
  },
  statusDetail: {
    backgroundColor: COLORS.primary, // Green background color
    borderRadius: 15, // Adjust the border radius as needed
    alignItems: 'center',
    fontSize: 12,
  },
deleteBooking: {   
  // backgroundColor: 'green', // Green background color
  borderRadius: 15, // Adjust the border radius as needed
  alignItems: 'center',
  fontSize: 12,
  borderColor:'red',
  borderWidth: 1
},
statusDelete: {
  // color: 'white',
  fontSize: 12,
  padding: '1%',
},
  statusInner: {
    color: 'white',
    fontSize: 12,
    padding: '1%',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

});
