import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
        <Text style={styles.buttonText}>Toggle Style</Text>
      </TouchableOpacity>

      <View style={[styles.box, isToggled ? styles.toggledBox : null]}>
        <Text style={styles.boxText}>This is a box with dynamic style</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },


  box: {
    width: 200,
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggledBox: {
    backgroundColor: 'red',
  },


  
  boxText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;