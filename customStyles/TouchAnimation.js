import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';

export const createButtonAnimation = () => {
  const [buttonScaleValue] = useState(new Animated.Value(1));

  const handleButtonPressIn = () => {
    Animated.timing(buttonScaleValue, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.timing(buttonScaleValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return {
    buttonScaleValue,
    handleButtonPressIn,
    handleButtonPressOut,
  };
};