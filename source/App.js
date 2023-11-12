import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { useFonts } from 'expo-font';
import { AuthProvider } from './auth';

export default function App() {
  const [fontLoaded] = useFonts({
    LeagueSpartan: require('../ios/LeagueSpartan-Regular.ttf'),
    LeagueSpartanMedium: require('../ios/LeagueSpartan-Medium.ttf'),
    LeagueSpartanSemiBold: require('../ios/LeagueSpartan-SemiBold.ttf'),
    IBMPlexSansThaiBold: require('../ios/IBMPlexSansThai-Bold.ttf'),
    IBMPlexSansThaiSemiBold: require('../ios/IBMPlexSansThai-SemiBold.ttf'),
  });
  return (
    <View style={styles.container}>
      {fontLoaded ? (
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      ) : (
        <Text>Loading fonts...</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});