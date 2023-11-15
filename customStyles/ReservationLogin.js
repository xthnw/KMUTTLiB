import { StyleSheet, Dimensions, } from 'react-native';
import COLORS from './colors';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor:COLORS.primary,
    fontFamily: 'LeagueSpartan',
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
},
    contentContainer: {
      backgroundColor: '#fbfbfb',
      borderRadius: 10,
      padding: 20,
      elevation: 3,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 10,
      color: COLORS.black,
      fontFamily: 'LeagueSpartan'
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.black,
      fontFamily: 'LeagueSpartan',
    },

    titleInput: {
      fontSize: 16,
      fontWeight: 400,
      marginVertical: 8,
      fontFamily: 'LeagueSpartan',
    },
    box: {
      width: '100%',
      height: 48,
      borderColor: COLORS.black,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 22,
      fontFamily: 'LeagueSpartan',
    },
    toggledBox: {
      borderColor: COLORS.error,
   
    },
    
  // box: {
  //   width: 200,
  //   height: 100,
  //   backgroundColor: 'green',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // toggledBox: {
  //   backgroundColor: 'red',
  // },
  });

  export default styles;