import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const Gradient = () => {
  return (
    <View style={styles.gradientContainer}>
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#7743CE" />
          <Stop offset="100%" stopColor="#3A1C71" />
        </LinearGradient>
      </Defs>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
  },
});

export default Gradient;
