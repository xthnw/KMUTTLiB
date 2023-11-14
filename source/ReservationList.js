import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, RefreshControl, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './auth';
import axios from 'axios';
import styles from '../customStyles/ReservationListStyles';

const ReservationList = () => {
  const navigation = useNavigation();
  const { state } = useAuth();
  const { authenticated, userData } = state;
  const [responseData, setResponseData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    if (userData) {
      const fetchData = async () => {
        try {
          const apiUrl = 'http://192.168.13.43:8080/api/list';
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
    }
  }, []);

  useEffect(() => {
    console.log('Response Data of now:', responseData);
  }, [responseData]);


  const handleDeleteBooking = async () => {
    const apiUrl = 'http://192.168.13.43:8080/api/delete';

    const jsonData = {
      id: selectedBookingId,
    };

    axios({
      method: 'delete',
      url: apiUrl,
      data: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setModalVisible(false);
        handleRefresh();
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  const handleSelectBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setModalVisible(true);
  };

  const handleRefresh = async () => {

    if (userData) {
      setRefreshing(true);
      try {
        const apiUrl = 'http://192.168.13.43:8080/api/list';
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
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
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

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white', }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
          <Text style={styles.formTitle}>My Room</Text>
        </View>
        {responseData === null || responseData?.data?.booking.length === 0 ? (
          authenticated ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={styles.text}>You don't have any reservations, please reserve room!.</Text>
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Image source={require('../picture/profile.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
              <Text style={styles.text}>Please login first</Text>
            </View>
          )
        ) : (
          responseData?.data?.booking.map((booking, index) => (
            <View key={index} style={[{ flex: 0.1 }]}>
              <View style={[{ marginBottom: '2%', justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                <TouchableWithoutFeedback >
                  <View style={styles.innerBox}>
                    <View style={[{}]}>
                      <Image source={require('../picture/room1.png')} style={styles.image} resizeMode='cover' />
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
                          <TouchableOpacity style={styles.deleteBooking} onPress={() => handleSelectBooking(booking.id)}>
                            <Text style={styles.statusDelete}>Cancel Reserve</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.label}>
                          <Text style={styles.text}>5th floor</Text>
                          <View style={styles.status}>
                            <Text style={styles.statusInner}>{booking.data.Booking_Status}</Text>
                          </View>
                          <Text style={styles.text}>
                            <Icon name='calendar' size={15} color={'#FF8A00'} /> {formatDate(booking.data.Booking_date)}
                          </Text>
                          <Text style={[styles.text, {}]}>{booking.data.Booking_period}</Text>
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
        <Modal animationType='slide' transparent={true} visible={isModalVisible}>
          <View style={styles.blankBgModalView}>
            <View style={styles.alertModalcontainer}>
              <TouchableOpacity onPress={this.toggleModalClose} style={styles.closebuttonView}></TouchableOpacity>
              <View style={[{ padding: 16, }]}>
                <Text style={styles.alertheaderText}>Cancel Reservation ?</Text>
                <Text style={styles.alertdetailsText}>Are you sure to cancel ?</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <TouchableOpacity style={styles.staybutton} onPress={toggleModal}>
                    <Text style={{ color: 'gray', fontFamily: 'LeagueSpartanSemiBold', fontSize: 18, }}>Stay</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.yesCancelbutton} onPress={handleDeleteBooking}>
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