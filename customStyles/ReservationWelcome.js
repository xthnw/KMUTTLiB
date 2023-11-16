import { StyleSheet, Dimensions, } from 'react-native';
import COLORS from './colors';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  paddingSpace:{
    padding: 10,
    flex: 1
  },
  paddingSpace2:{
    padding: 24, marginTop: 24,
  },
  imgSize:{
    height: 128,
    width: 128,
  },

    contentContainer: {
      alignItems: 'center',
       flex: 1 
    },
    title: {
      paddingTop: 10,
      fontSize: 40,
      fontFamily: 'LeagueSpartanSemiBold',
      color: COLORS.black
    },
    subtitle: {
      fontSize: 37,
      fontFamily: 'LeagueSpartanSemiBold',
      color: COLORS.black
    },

    imgSize2: {

        height: 371,
        width: 354,
    },
    input:{
      fontFamily: 'LeagueSpartan',
      width: '100%'
    },
    button: {
      fontFamily: 'LeagueSpartan',
      width:screenWidth*0.8,
      alignItems: 'center',
      marginTop: 10,
      borderColor: COLORS.primary,
      borderWidth: 2,
      borderRadius: 12,
      backgroundColor: COLORS.primary,
      paddingBottom: 16,
      paddingVertical: 10,

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
  },
  buttonGust:{     
    fontFamily: 'LeagueSpartan',
    width:screenWidth*0.8,
    alignItems: 'center',
    marginTop: 10,
    borderColor: COLORS.grey,
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: COLORS.grey,
    paddingBottom: 16,
    paddingVertical: 10,
    color: COLORS.black
    },

  });

  export default styles;