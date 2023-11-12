import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationScreen from './ReservationScreen';
import ReservationIndexScreen from './ReservationIndex';
import ReservationRequestScreen from './ReservationRequestScreen';
import ReservationCheckInScreen from './ReservationCheckInScreen';
import ReservationList from './ReservationList';
import LoginFIFA from './LoginFIFA';
import Welcome from './Welcome';
import { AuthProvider, useAuth } from './auth';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Iconify } from 'react-native-iconify';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainNavigator() {
  const { state } = useAuth();
  // Extract the authenticated state and userData from the context
  const { authenticated, userData } = state;
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
        authenticated={authenticated}
        userData={userData}
        initialParams={{ userData: userData, authenticated: authenticated }}
        options={{
          tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: focused ? '#ff8a00' : 'transparent', // Change the background color when focused
                  borderRadius: 999, // Set a large value for borderRadius to create a circle
                  padding: 8, // Adjust the padding as needed
                }}
              >
                <Iconify icon="uil:home-alt" color={focused ? 'white' : color} size={32} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReservationScreen"
        component={ReservationScreen}
        authenticated={authenticated}
        userData={userData}
        initialParams={{ userData: userData, authenticated: authenticated }}
        options={{
          tabBarLabel: <Text style={styles.tabBarLabel}>Reserve</Text>,
          // tabBarBadge: true,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: focused ? '#ff8a00' : 'transparent', // Change the background color when focused
                  borderRadius: 999, // Set a large value for borderRadius to create a circle
                  padding: 8,
                }}
              >
                <Iconify icon="mdi:ticket" color={focused ? 'white' : color} size={32} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReservationList"
        component={ReservationList}
        options={{
          // tabBarBadge: '1',
          tabBarLabel: <Text style={styles.tabBarLabel}>My Room</Text>,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: focused ? '#ff8a00' : 'transparent', // Change the background color when focused
                  borderRadius: 999, // Set a large value for borderRadius to create a circle
                  padding: 8,
                }}
              >
                <Iconify icon="clarity:user-solid" color={focused ? 'white' : color} size={32} />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>

  );
}



function AppNavigator() {
  // Use a state variable to track the user's authentication status
  // const [authenticated, setAuthenticated] = useState(false);
  const { state } = useAuth();
  // Extract the authenticated state and userData from the context
  const { authenticated, userData } = state;
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={authenticated ? 'MainNavigator' : 'Welcome'}
        initialRouteName={'Welcome'}
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' }, // Set the background color of the header
          headerTintColor: 'black', // Set the text color of the header
          headerShown: false,
        }}>
        <Stack.Screen name="LoginFIFA" component={LoginFIFA} options={{ title: null, headerLeft: null }} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ title: null, headerLeft: null }} userData={userData} />
        <Stack.Screen name="ReservationIndex" component={ReservationIndexScreen} options={{ title: null, headerLeft: null }} userData={userData} />
        <Stack.Screen name="ReservationCheckInScreen" component={ReservationCheckInScreen} options={{ title: null, headerLeft: null }} />
        <Stack.Screen name="ReservationRequestScreen" component={ReservationRequestScreen} options={{ title: null, headerLeft: null }} />
        <Stack.Screen name="ReservationList" component={ReservationList} options={{ title: null, headerLeft: null }} />

        {authenticated ? (
          <>
            {/* <Stack.Screen name="MainNavigator" component={MainNavigator} options={{ title: null, headerLeft: null }} userData={userData} />
            <Stack.Screen name="ReservationIndex" component={ReservationIndexScreen} options={{ title: null, headerLeft: null }} userData={userData} />
            <Stack.Screen name="ReservationCheckInScreen" component={ReservationCheckInScreen} options={{ title: null, headerLeft: null }} />
            <Stack.Screen name="ReservationRequestScreen" component={ReservationRequestScreen} options={{ title: null, headerLeft: null }} />
            <Stack.Screen name="ReservationList" component={ReservationList} options={{ title: null, headerLeft: null }} /> */}
          <Stack.Screen name="Welcome" component={Welcome} options={{ title: null, headerLeft: null }} />
          </>
        ) : (
          // <Stack.Screen name="LoginFIFA">
          //   {(props) => <LoginFIFA {...props} setAuthenticated={setAuthenticated} />}
          // </Stack.Screen>
          <Stack.Screen name="Welcome" component={Welcome} options={{ title: null, headerLeft: null }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  tabBarLabel: {
    paddingTop: 12,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'LeagueSpartanMedium',
  },
});
export default AppNavigator;