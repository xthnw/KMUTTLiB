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
import { Iconify } from 'react-native-iconify';




import PropTypes from 'deprecated-react-native-prop-types';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ReservationIndexScreen"
      shifting={false}
      sceneAnimationEnabled={true}
      activeColor="black"
      inactiveColor="gray"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="ReservationIndexScreen"
        component={ReservationIndexScreen}
        options={{
          
          tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
          tabBarIcon: ({ color }) => (
            <Iconify icon="noto:house" color={color} size={32} />
          ),

        }}
      />
      <Tab.Screen
        name="ReservationScreen"
        component={ReservationScreen}
        options={{
          tabBarLabel: <Text style={styles.tabBarLabel}>Reserve</Text>,
          // tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <Iconify icon="noto:thumbs-up-light-skin-tone" color={color} size={32} />

          ),
        }}
      />
      <Tab.Screen
        name="ReservationCheckInScreen"
        component={ReservationCheckInScreen}
        options={{
          tabBarBadge: '1',
          tabBarLabel: <Text style={styles.tabBarLabel}>My Room</Text>,
          tabBarIcon: ({ color }) => (
            <Iconify icon="fluent-emoji-flat:man-light" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}






function AppNavigator() {
  // Use a state variable to track the user's authentication status
  const [authenticated, setAuthenticated] = useState(true);

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authenticated ? 'ReservationIndexScreen' : 'LoginFIFA'}
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' }, // Set the background color of the header
          headerTintColor: 'black', // Set the text color of the header
          headerShown: false,
        }}>
        {authenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} options={{title: null, headerLeft: null}} />
            <Stack.Screen name="ReservationCheckInScreen" component={ReservationCheckInScreen} options={{title: null, headerLeft: null}} />
            <Stack.Screen name="ReservationDetailsScreen" component={ReservationDetailsScreen} options={{title: null, headerLeft: null}} />
            <Stack.Screen name="ReservationRequestScreen" component={ReservationRequestScreen} options={{title: null, headerLeft: null}} />
            <Stack.Screen name="Welcome" component={Welcome} options={{title: null, headerLeft: null}} />
            <Stack.Screen name="LoginFIFA" component={LoginFIFA} options={{title: null, headerLeft: null}} />
          </>
        ) : (
          <Stack.Screen name="LoginFIFA">
            {(props) => <LoginFIFA {...props} setAuthenticated={setAuthenticated} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'LeagueSpartanMedium',
  },
});
export default AppNavigator;
