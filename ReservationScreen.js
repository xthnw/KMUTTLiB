import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Animated, TextInput, SafeAreaView } from 'react-native';
import { ScrollView, Image } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Gradient from './Gradient'; // Import the Gradient component
import { LinearGradient } from "expo-linear-gradient";
import { customText } from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;
// Calculate the font size based on screen dimensions
const CustomfontSize = Math.min(screenWidth, screenHeight);

const iconContainerLeft = screenWidth * 0.08;
const iconContainerTop = screenWidth * 0.08;

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      // selectedDate: this.props.route.params.selectedDate || new Date(),
      selectedButton: null, // Initially, no button is selected
    };
  }
  componentDidMount() {
    // Set the status bar visibility when the component mounts
    StatusBar.setHidden(false); // Set to false to show the status bar
  }
  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate('ReservationDetails');
  };

  // Callback function to handle date selection
  handleDateSelected = (date) => {
    // Parse the date to ensure it's a Date object
    const parsedDate = new Date(date);
    this.setState({ selectedDate: parsedDate });
  };
  handleButtonClick = (buttonId) => {
    this.setState((prevState) => ({
      selectedButton: prevState.selectedButton === buttonId ? null : buttonId,

    }));
    // Navigate to ReservationRequest page when a button is clicked
    this.props.navigation.navigate('ReservationRequest');
    // Automatically reset the selectedButton state after a delay (e.g., 1 second)
    setTimeout(() => {
      this.setState({ selectedButton: null });
    }, 1000); // 1000 milliseconds (1 second)
  };

  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  renderButton = (buttonId, text) => {
    const { selectedButton } = this.state;
    const isSelected = selectedButton === buttonId;

    const buttonStyle = isSelected
      ? { ...styles.buttonSelected }
      : { ...styles.button };

    const textStyle = isSelected
      ? { ...styles.textSelected }
      : { ...styles.buttonText };

    return (
      <TouchableOpacity
        onPress={() => this.handleButtonClick(buttonId)}
        style={styles.touchableButton}
        activeOpacity={1} // Set the opacity when pressed
      >
        <View style={buttonStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  render() {
    const headerImageBackgroundWidth = screenWidth;
    const headerImageBackgroundHeight = screenHeight / 3;
    const { selectedDate } = this.state;
    

    const { label, style } = this.props;
    const { isSelected, isSelected2, isSelected3, isSelected4,
      isSelected5, isSelected6, isSelected7, isSelected8,
      isSelected9, isSelected10, isSelected11, isSelected12,
      isSelected13, isSelected14, isSelected15, isSelected16 } = this.state;


    // Define a custom dateNumberStyle for selected dates
    const selectedDateNumberStyle = {
      color: 'orange', // You can change the color to your preference
      textDecorationLine: 'underline', // Add underline for selected dates
    };
    const calendarStripMarginTop = screenHeight * 0.12 * -1;


    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('./picture/floor1.jpg')}
            style={[styles.headerImageBackground]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.gradient}
            >
            </LinearGradient>
          </ImageBackground>
        </View>
        <TouchableOpacity onPress={this.handleBackPress} style={{  left: 20, top: 20, zIndex: 1 }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <IconM name="keyboard-arrow-left" size={40} color="orange" />
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.SearchBar}>
              <IconM name="search" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search room name"
                placeholderTextColor="gray"

              />
            </View>
          </View>

          <View style={styles.canlendar}>
            <CalendarStrip
              scrollable
              style={{ height: screenHeight * 0.12, paddingTop: 10, paddingBottom: 10, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              calendarAnimation={{ type: 'sequence', duration: 50 }}
              // calendarColor={'#fff'}
              dateNumberStyle={{ color: 'gray' }}
              dateNameStyle={{ color: 'gray' }}
              highlightDateNumberStyle={{ color: 'orange' }}
              //selectedDateNumberStyle ขีดเส้นใต้
              highlightDateNameStyle={{ color: 'orange' }}
              disabledDateNameStyle={{ color: 'grey' }}
              disabledDateNumberStyle={{ color: 'grey' }}
              calendarHeaderStyle={{ color: 'black' }}
              iconContainer={{ flex: 0.1 }}
              selectedDate={this.state.selectedDate}
              onDateSelected={this.handleDateSelected} // Callback for date selection
            />
          </View>
          {/* <Text style={styles.description} >Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}</Text> */}


          <View style={styles.contentContainer}>
            {/* Create two boxes per row */}
            <View style={styles.boxRow}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                  </View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(1, '08:30 - 10:20')}
                    {this.renderButton(2, '10:30 - 12:20')}
                    {this.renderButton(3, '12:30 - 14:20')}
                    {this.renderButton(4, '14:30 - 16:20')}
                  </View>
                </View>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                  </View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(5, '08:30 - 10:20')}
                    {this.renderButton(6, '10:30 - 12:20')}
                    {this.renderButton(7, '12:30 - 14:20')}
                    {this.renderButton(8, '14:30 - 16:20')}
                  </View>
                </View>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                  </View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(9, '08:30 - 10:20')}
                    {this.renderButton(10, '10:30 - 12:20')}
                    {this.renderButton(11, '12:30 - 14:20')}
                    {this.renderButton(12, '14:30 - 16:20')}
                  </View>
                </View>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.box}
                onPress={() => this.handleBoxPress(1)}
              >
                <View style={styles.textContent}>
                  <Text style={styles.textbold}>5th floor libary</Text>
                  {/* <Text style={styles.description}>Description of Room 1st goes here</Text> */}
                </View>
                <View style={styles.innerBox}>
                  <View style={styles.imageContainer}>
                  </View>
                  <View style={styles.ButtonRowcontainer}>
                    {this.renderButton(13, '08:30 - 10:20')}
                    {this.renderButton(14, '10:30 - 12:20')}
                    {this.renderButton(15, '12:30 - 14:20')}
                    {this.renderButton(16, '14:30 - 16:20')}
                  </View>
                </View>
              </TouchableOpacity>


            </View>
          </View>
        </ScrollView>
      </SafeAreaView >

    );
  }
}

const desiredMarginTop = screenHeight * 0.265; // 2% of the screen height

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    width: screenWidth * 0.8, // Set the desired width
    height: screenHeight * 0.05,
    marginTop: screenHeight * 0.16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  touchableButton: {
    borderRadius: 10,
    overflow: 'hidden', // Clip the child view to fit the button's rounded corners
    // margin: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 11,
    fontFamily: 'LeagueSpartan',

  },
  icon: {
    marginLeft: 10,
    alignItems: 'center',
  },
  ButtonRowcontainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
  },
  buttonConfirm: {
    borderWidth: 0,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: 'center',
  },
  buttonConfirmText: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan'
  },
  buttonSelected: {
    borderWidth: 1,
    borderColor: 'orange', // Change the border color when selected
    backgroundColor: 'orange', // Change the background color when selected
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: 'center',
  },
  textSelected: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: 'center',
  },
  buttonDisabledText: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center',
  },
  innerBox: {
    flex: 1,
  },
  space: {
    width: screenWidth * 0.08, // Adjust the width to add space between boxes
    height: screenHeight * 0.05,
  },
  boxRow: {
    flexDirection: 'column', // Arrange boxes horizontally
    justifyContent: 'center', // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
    alignItems: 'center',
  },
  box: {
    width: screenWidth * 0.95, // Adjust the width as needed
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    padding: 8, // ขอบบนรูปกับขอบกล่อง
    marginVertical: screenHeight * 0.01, // ความห่างของแต่ละกล่องบนล่าง
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  canlendar: {
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 15,
    marginTop: screenHeight * 0.06, // ความห่างของแต่ละกล่องบนล่าง
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginVertical: screenHeight * 0.02,
  },
  textContent: {
    alignItems: 'flex-start', // Align text to the left
    paddingLeft: screenWidth * 0.02, // Add left padding (adjust the value as needed)
    paddingTop: screenHeight * 0.005, // Add left padding (adjust the value as needed)
  },
  image: {
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.05, // Set the desired height
    borderRadius: 15,
    alignItems: 'center', // Center the image horizontally
  },
  textbold: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'LeagueSpartan'
  },
  description: {
    fontSize: 8, // Adjust the font size as needed
    color: 'gray', // You can adjust the color
    textAlign: 'left',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerImageBackground: {
    width: '100%', // Adjust the width as needed
    height: screenHeight / 3,
    position: 'absolute', // Position the image behind other components
    resizeMode: 'cover', // Adjust as needed
  },
  headerContainer: {
    zIndex: 1, // Place the header container above the image
    alignSelf: 'stretch', // Stretch the container horizontally
    alignItems: 'center', // Center the content horizontally
    marginTop: screenHeight / 8, // Adjust the marginTop to push down the content
  },
  contentContainer: {
    marginTop: 10, // Adjust the marginTop to control the spacing between header and content
    // Add other styles as needed for your content
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300, // Adjust the height of the gradient overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire image
  },
});
