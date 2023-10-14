import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationScreen from './ReservationScreen';
import ReservationIndexScreen from './ReservationIndex';
import ReservationDetailsScreen from './ReservationDetailsScreen';
import ReservationDetailsScreenOld from './ReservationDetailsScreenOld';
import ReservationRequestScreen from './ReservationRequestScreen';
import ReservationCheckInScreen from './ReservationCheckInScreen';
import LoginFIFA from './LoginFIFA';
import Welcome from './Welcome';
import LoginScreen from './LoginScreen'; // Import the LoginScreen component
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';




import PropTypes from 'deprecated-react-native-prop-types';


const Tab = createMaterialBottomTabNavigator();

function AppNavigator() {
  // Use a state variable to track the user's authentication status
  const [authenticated, setAuthenticated] = useState(true);

  const theme = useTheme();
theme.colors.secondaryContainer = "#ff8a00"

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ReservationIndexScreen"
        shifting={false}
        sceneAnimationEnabled={true}
        activeColor="white"
        inactiveColor="black"
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name="ReservationIndexScreen"
          component={ReservationIndexScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: 'black',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="ReservationScreen"
          component={ReservationScreen}
          options={{
            tabBarLabel: 'Reserve',
            tabBarColor: 'black',
            tabBarIcon: ({ color }) => (
              <Icon name="account" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="ReservationRequestScreen"
          component={ReservationRequestScreen}
          options={{
            tabBarLabel: 'Check in',
            tabBarColor: '#FF6F61', // Change the background color for the "Settings" tab
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
