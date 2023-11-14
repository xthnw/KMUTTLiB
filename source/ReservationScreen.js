import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, Animated, ScrollView, Easing, TouchableWithoutFeedback, ImageBackground, RefreshControl, } from 'react-native';
import { Iconify } from 'react-native-iconify';
import CalendarStrip from 'react-native-scrollable-calendar-strip';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../customStyles/ReservationScreenStyles';
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-native-modal';

const apiUrl = 'http://192.168.13.43:8080/api/room';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const images = [
  require('../picture/kmuttlib1.jpg'),
  require('../picture/kmuttlib2.jpg'),
  require('../picture/kmuttlib3.jpg'),
];

const datesBlacklist = date => {
  return date.isoWeekday() === 6 || date.isoWeekday() === 7;
}

export default class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedButton: null,
      roomStatus: [],
      refreshing: false,
      isModalVisibleForm: false,
      isModalVisibleFull: false,
      isModalVisible: false,
      isDropdownOpen: false,
      selectedOption: '',
      isModalCompleteVisible: false,
      activeImageIndex: 0,
    };
    this.inputBoxRef = React.createRef();
    this.buttonScaleValues = {};
    for (let i = 1; i <= 20; i++) {
      this.buttonScaleValues[i] = new Animated.Value(1);
    }
    this.scrollViewRef = React.createRef(); //for header image background
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });
    this.blurListener = this.props.navigation.addListener('blur', () => {
      StatusBar.setHidden(false);
    });

    this.startAutoSlide();

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    this.setState({ selectedDate: formattedDate });

    try {
      const jsonData = {
        Booking_date: formattedDate,
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({ roomStatus: response.data.bookings });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  componentWillUnmount() {
    this.focusListener();
    this.blurListener();
    this.stopAutoSlide();
  }

  startAutoSlide = () => {
    this.timer = setInterval(() => {
      this.scrollToNextImage();
    }, 3000);
  };

  stopAutoSlide = () => {
    clearInterval(this.timer);
  };

  scrollToNextImage = () => {
    const { activeImageIndex } = this.state;
    const nextIndex = (activeImageIndex + 1) % images.length;

    this.setState({ activeImageIndex: nextIndex }, () => {
      this.scrollViewRef.current.scrollTo({
        x: screenWidth * nextIndex,
        animated: true,
      });
    });
  };

  toggleModalFullDismiss = () => {
    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
    });
  };

  toggleModalFull = (buttonId, targetTimeSlot, Room_ID) => {
    const selectedDate = this.state.selectedDate; // Get the selected date in 'DD/MM/YYYY' format
    // Split the date string into day, month, and year
    const [day, month, year] = selectedDate.split('/').map(Number);
    // Create a new Date object using the year, month (subtract 1 as it's zero-based), and day
    const date = new Date(year, month - 1, day);
    // Define the options for formatting the date
    const options = {
      weekday: 'short', // Displays the abbreviated day of the week
      day: '2-digit',   // Displays the day of the month with leading zeros
      month: 'short',   // Displays the abbreviated month name
      year: 'numeric',  // Displays the full year
    };

    const formattedDateInModal = date.toLocaleDateString('en-US', options);

    const { roomStatus } = this.state;
    const filteredResponse = roomStatus.filter((booking) => {
      return (
        booking.data.Booking_date === selectedDate &&
        booking.data.Booking_period === targetTimeSlot &&
        booking.data.Room_ID === `KM${Room_ID}`
      );
    });

    const userNames = [];
    for (let i = 1; i <= 6; i++) {
      const userName = filteredResponse[0].data[`User_${i}`];
      if (userName) {
        userNames.push(userName);
      }
    }

    this.setState({
      isModalVisibleFull: !this.state.isModalVisibleFull,
      modalRoom_ID: Room_ID,
      modalPeriod: targetTimeSlot,
      modalFormattedDate: formattedDateInModal,
      modalUser_1: userNames[0],
      modalUser_2: userNames[1],
      modalUser_3: userNames[2],
      modalUser_4: userNames[3],
      modalUser_5: userNames[4],
      modalUser_6: userNames[5],
    });
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });

    const { selectedDate } = this.state;
    if (selectedDate) {

      try {
        const jsonData = {
          Booking_date: selectedDate,
        };
        const response = await axios.post(apiUrl, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.setState({ roomStatus: response.data.bookings });

      } catch (error) {
        console.error('Error:', error);
      }
    }

    this.setState({ refreshing: false });
  };

  handleDateSelected = async (date) => {
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    this.setState({ selectedDate: formattedDate });

    try {
      const jsonData = {
        Booking_date: formattedDate,
      };

      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({ roomStatus: response.data.bookings });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleRequestPress(buttonId, roomId) {
    const { selectedDate } = this.state;
    const { route } = this.props;
    const { userData } = route.params;
    this.setState({ buttonId, selectedDate });
    this.props.navigation.navigate('ReservationRequestScreen', { buttonId, selectedDate, roomId, userData });
  }

  handleButtonClick = (buttonId) => {
    this.setState((prevState) => ({
      selectedButton: prevState.selectedButton === buttonId ? null : buttonId,
    }));
    this.props.navigation.navigate('ReservationRequest');
  };

  handleButtonPressIn(buttonId) {
    Animated.timing(this.buttonScaleValues[buttonId], {
      toValue: 0.95,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  handleButtonPressOut(buttonId) {
    Animated.timing(this.buttonScaleValues[buttonId], {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  renderButton = (buttonId, text, isSlotReserved, isDisabled = false) => {
    const { selectedButton } = this.state;
    const isSelected = selectedButton === buttonId;

    const buttonStyle = isSelected
      ? { ...styles.buttonSelected }
      : isDisabled
        ? { ...styles.buttonDisabled }
        : { ...styles.button };

    const textStyle = isSelected
      ? { ...styles.textSelected }
      : isDisabled
        ? { ...styles.textDisabled }
        : { ...styles.buttonText };

    const targetTimeSlot_1 = '08:30 - 10:20';
    const targetTimeSlot_2 = '10:30 - 12:20';
    const targetTimeSlot_3 = '12:30 - 14:20';
    const targetTimeSlot_4 = '14:30 - 16:20';

    const { route } = this.props;
    const { userData } = route.params;

    // Define a mapping of button IDs to corresponding functions
    const buttonFunctions = {
      1: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_1, 1); } else { this.handleRequestPress(buttonId, 'KM1'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 1) : () => this.props.navigation.navigate('Welcome')),
      2: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_2, 1); } else { this.handleRequestPress(buttonId, 'KM1'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 1) : () => this.props.navigation.navigate('Welcome')),
      3: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_3, 1); } else { this.handleRequestPress(buttonId, 'KM1'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 1) : () => this.props.navigation.navigate('Welcome')),
      4: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_4, 1); } else { this.handleRequestPress(buttonId, 'KM1'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 1) : () => this.props.navigation.navigate('Welcome')),
      5: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_1, 2); } else { this.handleRequestPress(buttonId, 'KM2'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 2) : () => this.props.navigation.navigate('Welcome')),
      6: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_2, 2); } else { this.handleRequestPress(buttonId, 'KM2'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 2) : () => this.props.navigation.navigate('Welcome')),
      7: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_3, 2); } else { this.handleRequestPress(buttonId, 'KM2'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 2) : () => this.props.navigation.navigate('Welcome')),
      8: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_4, 2); } else { this.handleRequestPress(buttonId, 'KM2'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 2) : () => this.props.navigation.navigate('Welcome')),
      9: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_1, 3); } else { this.handleRequestPress(buttonId, 'KM3'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 3) : () => this.props.navigation.navigate('Welcome')),
      10: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_2, 3); } else { this.handleRequestPress(buttonId, 'KM3'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 3) : () => this.props.navigation.navigate('Welcome')),
      11: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_3, 3); } else { this.handleRequestPress(buttonId, 'KM3'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 3) : () => this.props.navigation.navigate('Welcome')),
      12: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_4, 3); } else { this.handleRequestPress(buttonId, 'KM3'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 3) : () => this.props.navigation.navigate('Welcome')),
      13: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_1, 4); } else { this.handleRequestPress(buttonId, 'KM4'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 4) : () => this.props.navigation.navigate('Welcome')),
      14: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_2, 4); } else { this.handleRequestPress(buttonId, 'KM4'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 4) : () => this.props.navigation.navigate('Welcome')),
      15: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_3, 4); } else { this.handleRequestPress(buttonId, 'KM4'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 4) : () => this.props.navigation.navigate('Welcome')),
      16: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_4, 4); } else { this.handleRequestPress(buttonId, 'KM4'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 4) : () => this.props.navigation.navigate('Welcome')),
      17: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_1, 5); } else { this.handleRequestPress(buttonId, 'KM5'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_1, 5) : () => this.props.navigation.navigate('Welcome')),
      18: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_2, 5); } else { this.handleRequestPress(buttonId, 'KM5'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_2, 5) : () => this.props.navigation.navigate('Welcome')),
      19: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_3, 5); } else { this.handleRequestPress(buttonId, 'KM5'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_3, 5) : () => this.props.navigation.navigate('Welcome')),
      20: userData ? (() => { if (isSlotReserved) { this.toggleModalFull(buttonId, targetTimeSlot_4, 5); } else { this.handleRequestPress(buttonId, 'KM5'); } }) :
        (isSlotReserved ? () => this.toggleModalFull(buttonId, targetTimeSlot_4, 5) : () => this.props.navigation.navigate('Welcome')),
    };

    const onPressFunction = buttonFunctions[buttonId];

    return (
      <TouchableWithoutFeedback
        onPress={onPressFunction} // Call the appropriate function based on the buttonId
        onPressIn={() => this.handleButtonPressIn(buttonId)}
        onPressOut={() => this.handleButtonPressOut(buttonId)}
        style={styles.touchableButton}
        activeOpacity={1}
      >
        <Animated.View style={[{ transform: [{ scale: this.buttonScaleValues[buttonId] }], },]}>
          <View style={buttonStyle}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { isModalVisibleFull } = this.state;
    const { roomStatus } = this.state;
    const targetTimeSlot_1 = '08:30 - 10:20';
    const targetTimeSlot_2 = '10:30 - 12:20';
    const targetTimeSlot_3 = '12:30 - 14:20';
    const targetTimeSlot_4 = '14:30 - 16:20';

    const filteredData_1 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM1');
    const filteredData_2 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM2');
    const filteredData_3 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM3');
    const filteredData_4 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM4');
    const filteredData_5 = roomStatus && roomStatus.filter(room => room.data.Room_ID === 'KM5');
    // Check if all time slots are reserved for the selected room
    const isSlotReserved_1 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_2 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_3 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_4 = filteredData_1 && filteredData_1.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_5 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_6 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_7 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_8 = filteredData_2 && filteredData_2.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_9 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_10 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_11 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_12 = filteredData_3 && filteredData_3.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_13 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_14 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_15 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_16 = filteredData_4 && filteredData_4.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const isSlotReserved_17 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_1));
    const isSlotReserved_18 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_2));
    const isSlotReserved_19 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_3));
    const isSlotReserved_20 = filteredData_5 && filteredData_5.some(room => room.data.Booking_period.includes(targetTimeSlot_4));

    const userNames = [
      this.state.modalUser_1,
      this.state.modalUser_2,
      this.state.modalUser_3,
      this.state.modalUser_4,
      this.state.modalUser_5,
      this.state.modalUser_6,
    ];

    const renderUserNames = () => {
      return userNames.map((userName) => {
        if (userName) {
          return (
            <Text key={userName} style={styles.modalStudentName}>{userName}</Text>
          );
        }
        return null;
      });
    };

    return (
      <View style={[{ marginTop: 0, flex: 1, flexGrow: 1, }]}>
        <View style={{ flex: 1 }}>
          <ScrollView ref={this.scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const offset = event.nativeEvent.contentOffset.x;
              const index = Math.floor(offset / screenWidth);
              this.setState({ activeImageIndex: index });
            }}
          >
            {images.map((image, index) => (
              <ImageBackground key={index} source={image} style={styles.headerImageBackground}>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)']} style={styles.gradient}></LinearGradient>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
        <View style={styles.OverlapToHeaderImagebg}>
          <View style={[{ flex: 0, paddingTop: 12, }]}>
            <CalendarStrip
              scrollable={true}
              style={{ height: screenHeight * 0.1, paddingTop: 10, }}
              calendarAnimation={{ type: 'parallel', duration: 300, useNativeDriver: true }}
              daySelectionAnimation={{ type: 'border', borderWidth: 1, duration: 300 }}
              dateNumberStyle={{ color: 'gray', fontFamily: 'LeagueSpartan', fontSize: 12 }}
              dateNameStyle={{ color: 'gray', fontFamily: 'LeagueSpartan', fontSize: 12 }}
              highlightDateNumberStyle={{ color: 'black', textDecorationLine: 'underline', textDecorationColor: 'orange', fontFamily: 'LeagueSpartanMedium', fontSize: 12 }}
              highlightDateNameStyle={{ color: 'black', fontFamily: 'LeagueSpartan', fontSize: 12 }}
              disabledDateNameStyle={{ color: 'grey', fontFamily: 'LeagueSpartan', fontSize: 12 }}
              disabledDateNumberStyle={{ color: 'grey', fontFamily: 'LeagueSpartan', fontSize: 12 }}
              calendarHeaderStyle={{ color: 'black', fontFamily: 'LeagueSpartanMedium', fontSize: 12 }}
              iconContainer={{ flex: 0.1 }}
              onDateSelected={this.handleDateSelected}
              datesBlacklist={datesBlacklist}
              minDate={moment().subtract(2, 'weeks').format('YYYY-MM-DD')}
              maxDate={moment().add(2, 'weeks').format('YYYY-MM-DD')}
            />
          </View>
          <View style={[{ flex: 0, zIndex: 1, }]}>
            <View style={styles.viewShadowStyles}></View>
          </View>
          <View style={styles.spaceOutsideRoomBox}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />}
            >
              <View style={styles.contentContainer}>
                <View style={styles.boxRow}>
                  <TouchableOpacity activeOpacity={1} style={styles.box}>
                    <View style={styles.textContent}><Text style={styles.textbold}>KM-Room 1</Text></View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(1, targetTimeSlot_1, isSlotReserved_1, isSlotReserved_1)}
                        {this.renderButton(2, targetTimeSlot_2, isSlotReserved_2, isSlotReserved_2)}
                        {this.renderButton(3, targetTimeSlot_3, isSlotReserved_3, isSlotReserved_3)}
                        {this.renderButton(4, targetTimeSlot_4, isSlotReserved_4, isSlotReserved_4)}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} style={styles.box}>
                    <View style={styles.textContent}><Text style={styles.textbold}>KM-Room 2</Text></View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(5, targetTimeSlot_1, isSlotReserved_5, isSlotReserved_5)}
                        {this.renderButton(6, targetTimeSlot_2, isSlotReserved_6, isSlotReserved_6)}
                        {this.renderButton(7, targetTimeSlot_3, isSlotReserved_7, isSlotReserved_7)}
                        {this.renderButton(8, targetTimeSlot_4, isSlotReserved_8, isSlotReserved_8)}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} style={styles.box}>
                    <View style={styles.textContent}><Text style={styles.textbold}>KM-Room 3</Text></View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(9, targetTimeSlot_1, isSlotReserved_9, isSlotReserved_9)}
                        {this.renderButton(10, targetTimeSlot_2, isSlotReserved_10, isSlotReserved_10)}
                        {this.renderButton(11, targetTimeSlot_3, isSlotReserved_11, isSlotReserved_11)}
                        {this.renderButton(12, targetTimeSlot_4, isSlotReserved_12, isSlotReserved_12)}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} style={styles.box}>
                    <View style={styles.textContent}><Text style={styles.textbold}>KM-Room 4</Text></View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(13, targetTimeSlot_1, isSlotReserved_13, isSlotReserved_13)}
                        {this.renderButton(14, targetTimeSlot_2, isSlotReserved_14, isSlotReserved_14)}
                        {this.renderButton(15, targetTimeSlot_3, isSlotReserved_15, isSlotReserved_15)}
                        {this.renderButton(16, targetTimeSlot_4, isSlotReserved_16, isSlotReserved_16)}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1} style={styles.box}>
                    <View style={styles.textContent}><Text style={styles.textbold}>KM-Room 5</Text></View>
                    <View style={styles.innerBox}>
                      <View style={styles.imageContainer}></View>
                      <View style={styles.ButtonRowcontainer}>
                        {this.renderButton(17, targetTimeSlot_1, isSlotReserved_17, isSlotReserved_17)}
                        {this.renderButton(18, targetTimeSlot_2, isSlotReserved_18, isSlotReserved_18)}
                        {this.renderButton(19, targetTimeSlot_3, isSlotReserved_19, isSlotReserved_19)}
                        {this.renderButton(20, targetTimeSlot_4, isSlotReserved_20, isSlotReserved_20)}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={[{ flex: 0, backgroundColor: 'black' }]}>
          <View style={styles.viewShadowStylesNavbar}></View>
        </View>
        <Modal
          isVisible={isModalVisibleFull}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          useNativeDriverForBackdrop={true}
          onBackdropPress={this.toggleModalFullDismiss}
          style={styles.modalContainerFull}
        >
          <View style={styles.modalContentFull}>
            <View style={styles.modalInnerContainer}>
              <ScrollView contentContainerStyle={[{ flexGrow: 1, }]} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalRoomNolable}>KM-Room {this.state.modalRoom_ID}</Text>
                <Text style={styles.modalTimelable}>Time : {this.state.modalPeriod} | {this.state.modalFormattedDate}</Text>
                <View style={styles.dividerLine} />
                <View style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                  <View style={[{ flex: 1, }]}>
                    <Text style={styles.reservationBylable}>Reservations by</Text>
                    <View style={[{ flexDirection: 'row', marginBottom: 10, }]}>
                      <View style={[{ marginRight: 10, paddingHorizontal: 4, }]}>
                        <Iconify icon='fluent-emoji:man-student-medium-light' size={32} />
                      </View>
                      <View style={[{ flexDirection: 'column', }]}>
                        <Text style={styles.modalStudentLabel}>Students</Text>
                        {renderUserNames()}
                      </View>
                    </View>
                  </View>
                  <View style={[{ marginLeft: 10, }]}><Iconify icon='openmoji:no-entry' color='black' size={48} /></View>
                </View>
                <View style={[styles.emptyViewforScrolling]}></View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}