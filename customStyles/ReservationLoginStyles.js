import { StyleSheet, Dimensions, } from 'react-native';
import COLORS from './colors';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    padding: 24,
    alignItems: 'center',
    marginTop: 24, 
  },
  paddingSpace:{
    padding: 24,
  },
  imgSize:{
    height: 138,
    width: 244,
  },
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
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      elevation: 3,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      // marginVertical: 10,
      color: COLORS.black,
      fontFamily: 'LeagueSpartan'
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.SubTitle,
      fontWeight: 'bold',
      fontFamily: 'LeagueSpartan',
      marginBottom: 15,
    },

    titleInput: {
      fontSize: 16,
      marginVertical: 8,
      fontFamily: 'LeagueSpartan',
    },
    input:{
      fontFamily: 'LeagueSpartan',
      width: '100%'
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
  TextError: {
    height: screenHeight*0.05,
    color: COLORS.error,
  },
  eyePosition:{
    position: 'absolute',
    right: 12

  },
  textButton:{
    fontFamily: 'LeagueSpartan',
    fontSize: 18,
    color:COLORS.white 
  },

  positionTest:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22
  },
  titleTest:{
    color:COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    
    fontFamily: 'LeagueSpartan'
  }
  
  });

  export default styles;