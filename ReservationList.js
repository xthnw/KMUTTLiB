import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { Component, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Animated, TextInput, Modal, UIManager, findNodeHandle } from 'react-native';
import { ScrollView, Image } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Gradient from './Gradient'; // Import the Gradient component
import { LinearGradient } from "expo-linear-gradient";
import { customText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import COLORS from './fifa/colors';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Define a scaling factor based on your design or preferences
const scalingFactor = 0.04; // You can adjust this value

// Calculate the responsive font size
const fontSize = screenWidth * scalingFactor;

export const SIZES = {
  // global SIZES
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  padding3: 16,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 20,
  h3: 18,
  h4: 16,
  body1: 30,
  body2: 20,
  body3: 18,
  body4: 14,
  body5: 12,

  // // app dimensions
  // width,
  // height,
}
export const FONTS = {
  largeTitle: {
    fontFamily: 'black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontSize: SIZES.h4, lineHeight: 20 },
  body1: { fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontSize: SIZES.body2, lineHeight: 30 },
  body3: { fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontSize: SIZES.body4, lineHeight: 20 },
}



export default class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: '', // Student ID input value
      name: '', // Name input value

      isDropdownOpen: false,
      selectedOption: '',

    };
    this.inputBoxRef = React.createRef();
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };
  selectOption = (option) => {
    this.setState({
      selectedOption: option,
      isDropdownOpen: false, // Close the dropdown after selection
    });
  };
  componentDidMount() {

  }

  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate('ReservationDetails');
  };
  navigateToNextScreen = () => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate('ReservationCheckInScreen');
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  render() {
    const { selectedOption, isDropdownOpen } = this.state;
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const dropdownHeight = isDropdownOpen ? options.length * 40 : 0;
    const handleSubmission = () => {
      // Handle the submission logic here
    };
    return (
      <SafeAreaView style={{
        // flex: 1 ,
        height: screenHeight,
        width: screenWidth,
        backgroundColor: COLORS.white,
        paddingVertical: screenHeight * 0.03
      }}>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >


          <View style={[{
            // flex: 1,
            top: screenHeight * 0.03,
            justifyContent: 'center',
            alignItems: 'center',
          }]}>
            <Text style={styles.formTitle}>My Room</Text></View>
          <View style={[{
            // flex: 1,
            top: screenHeight * 0.07,
            justifyContent: 'center',
            alignItems: 'center',
          }]}>

            <TouchableOpacity
              // style={styles.box}
              onPress={this.navigateToNextScreen}
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
                  <Text style={styles.textbold}>KM-ROOM 1</Text>
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
                        <Text style={styles.statusInner}>Available</Text>
                      </View>
                      <Text style={styles.text}><Icon name="calendar" size={15} color={COLORS.primary} />16 Oct, 2023</Text>
                      <Text style={styles.text}>15.00 - 17.00</Text>
                    </View>

                  </View>
                </View>
              </View>
            </TouchableOpacity>


            <View style={styles.space} />


            <TouchableOpacity
              // style={styles.box}
              onPress={this.navigateToNextScreen}
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
                  <Text style={styles.textbold}>KM-ROOM 5</Text>
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
                        <Text style={styles.statusInner}>Available</Text>
                      </View>
                      <Text style={styles.text}><Icon name="calendar" size={15} color={COLORS.primary} />16 Oct, 2023</Text>
                      <Text style={styles.text}>15.00 - 17.00</Text>
                    </View>

                  </View>
                </View>
              </View>
            </TouchableOpacity>


            <View style={styles.space} />



          </View>


        </ScrollView>

        <View style={[{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          padding: 10,
          marginHorizontal: 10,
          marginBottom: 5,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          // position:'absolute'
        }]}>
          <TouchableOpacity style={[{ flex: 1, alignItems: 'center' }]}>
            <Image source={require('./picture/left.png')} />
          </TouchableOpacity>


          <TouchableOpacity onPress={this.handleList} style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('./picture/mid.png')} />
          </TouchableOpacity>


          <TouchableOpacity onPress={this.handleEditPro} style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('./picture/right.png')}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

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
    backgroundColor: COLORS.grey,
    // width: screenWidth * 0.8
    width: screenWidth * 0.8, // Adjust the width as needed
    // height: screenWidth * 0.3,
    // flex: 1,
    alignItems: 'start',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    padding: 10,
    marginVertical: 4,
    // marginHorizontal: 2,
    // flexDirection:'row',
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  space: {
    width: screenWidth * 0.1, // Adjust the width to add space between boxes
    height: screenHeight * 0.02,
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
    // height: screenWidth * 0.3,
    // flex: 1,
    alignItems: 'start',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 15,
    padding: 10, // ขอบบนรูปกับขอบกล่อง
    marginVertical: 4, // ความห่างของ0แต่ละกล่องบนล่าง
    // marginHorizontal: 2,
    // flexDirection:'row',
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputContainer: {
    // marginBottom: 20, //ยืด Container ขาว ๆ ลงล่าง
  },
  label: {
    alignItems: 'start',
    // borderWidth: 1,
    // borderColor: COLORS.grey,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0,
    shadowRadius: 8,

  },
  label2: {
    alignItems: 'start',
    // borderWidth: 1,
    // borderColor: COLORS.grey,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0,
    shadowRadius: 8,
    width: screenWidth * 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between'

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
    width: screenWidth * 0.3, // Set the desired width
    height: screenHeight * 0.12, // Set the desired height
    borderRadius: 15,
    alignItems: 'center', // Center the image horizontally
    marginEnd: 10
  },
  textbold: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  status: {
    backgroundColor: COLORS.primary, // Green background color
    opacity: '15%',
    borderRadius: 15, // Adjust the border radius as needed
    marginLeft: 5, // Add spacing between "Status:" and the green label
    paddingVertical: 5, // Add vertical padding for better appearance
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  statusInner: {
    color: COLORS.white,
    opacity: 10,
    fontSize: 9
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    // gap:10
  },

});
