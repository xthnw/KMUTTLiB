import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import PropTypes from 'deprecated-react-native-prop-types';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';


function ReservationDetailsScreenOld() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const imageSize = Math.min(screenWidth, screenHeight) * 0.9;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Handle the back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  const InformationBlock = () => {
    return (

      <View style={styles.OverviewContainer}>
        <View style={styles.ClockContainer}>
          <Icon name="clock-o" size={24} color="orange" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>2 hours</Text>
        </View>
      </View>

    );
  };

  const RatingBlock = () => {
    return (
      <View style={styles.OverviewContainer}>
        <View style={styles.ClockContainer}>
          <Icon name="star" size={24} color="orange" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>4.9/5</Text>
        </View>
      </View>
    );
  };


  return (

    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require('./picture/floor1.jpg')}
          style={[styles.image, { width: screenWidth * 0.9, height: screenHeight * 0.5 }]}
        />
        <View style={styles.overlay}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <View style={styles.iconContainer}>
              <IconM name="keyboard-arrow-left" size={40} color="orange" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <View style={styles.hearticonContainer}>
              <Icon name="heart" size={20} color="orange" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.informationRow}>
        <View style={styles.informationColumn}>
          <Text style={styles.headerText}>Overview</Text>
          <InformationBlock label="Time" />
        </View>
        <View style={[styles.informationColumn, { paddingHorizontal: screenWidth * 0.05 }]}>
          <Text style={styles.headerText}>Review</Text>
          <RatingBlock label="Review" />
        </View>
      </View>
      <Text style={styles.DateTimeText}>Date/Time</Text>
      <Text style={styles.DateTimeTextDescription}>24 SUNDAY 12:30 - 14:20</Text>
      <Text style={styles.RoomService}>Services</Text>
      <Text style={styles.RoomServiceDescription}>KM Rooms for tutoring and the discussion.</Text>
      <Text style={styles.RoomServiceDescription}>KM Stands for tutoring in open space.</Text>


      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonReserve} onPress={toggleModal}>
          <Text style={styles.buttonReserveText}>Reserve</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={200}
        animationOutTiming={200}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.closeIconContainer}>
                <Icon name="check" size={32} color="blue" style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.successText}>Reserve Room Successfully !</Text>
        </View>
      </Modal>
    </ScrollView>

  );

}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const paddingHorizontal = screenWidth * 0.05;
const paddingTop = screenHeight * 0.05;

const iconContainerLeft = screenWidth * 0.08;
const iconContainerTop = screenWidth * 0.08;

const styles = StyleSheet.create({
  successText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeIconContainer: {
    backgroundColor: 'green',
    borderRadius: 40, // Make it circular
    padding: screenWidth * 0.05,

  },
  modalContent: {
    backgroundColor: 'white',
    padding: screenHeight * 0.06,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    fontSize: screenWidth * 0.06,
    color: 'white',
  },
  buttonReserve: {
    backgroundColor: 'black',    // Button background color
    height: screenHeight * 0.07,         // Vertical padding
    width: screenWidth * 0.9,
    borderRadius: 15,            // Border radius for rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonReserveText: {
    color: 'white',             // Text color
    fontSize: 18,               // Font size
    fontWeight: 'bold',         // Bold font weight
    justifyContent: 'center',
    alignItems: 'center',
  },
  RoomService: {
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold', // Bold font for label
    color: 'gray',
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.01,
  },
  RoomServiceDescription: {
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold', // Bold font for label
    color: 'gray',
    marginLeft: screenWidth * 0.05,
  },
  DateTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'orange',
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.02,
  },
  DateTimeTextDescription: {
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold', // Bold font for label
    color: 'black',
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.01,
  },
  OverviewContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '', // Background color of the block
    padding: 10, // Padding around the block
    borderRadius: 15, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: '#ccc', // Border color
    width: screenWidth * 0.25,
    height: screenHeight * 0.06,
    top: screenHeight * 0.01,
  },
  ClockContainer: {
    marginRight: 10, // Margin to separate the icon from text
  },
  textContainer: {
    flex: 1, // Take up remaining horizontal space
  },
  label: {
    fontSize: 14, // Adjust font size as needed
    fontWeight: 'bold', // Bold font for label
  },
  value: {
    fontSize: 14, // Adjust font size as needed
  },
  informationRow: {
    flexDirection: 'row', // Arrange blocks horizontall
    paddingHorizontal: screenWidth * 0.05, // Add horizontal spacing
  },
  informationColumn: {
    flexDirection: 'column', // Arrange boxes horizontally
    marginBottom: 0, // Add vertical spacing between rows
  },
  container: {
    flex: 0.1,
    alignItems: '',
    paddingHorizontal: '5%', // Apply calculated horizontal padding
    paddingTop: '5%', // Apply calculated top padding
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginTop: screenHeight * 0.05,
  },
  image: {
    width: '100%',
    borderRadius: 15,
    marginTop: 0,

  },
  backButtonText: {
    color: 'white', // Customize the button text color
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the icon container absolutely
    top: iconContainerTop, // Adjust the top position to center it vertically
    left: iconContainerLeft, // Adjust the left position to center it horizontally
    zIndex: 1, // Ensure the icon is displayed above the image
  },
  hearticonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the icon container absolutely
    top: iconContainerTop, // Adjust the top position to center it vertically
    right: iconContainerLeft, // Adjust the left position to center it horizontally
    zIndex: 1, // Ensure the icon is displayed above the image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire image
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'orange',
  },

});

export default ReservationDetailsScreenOld;
