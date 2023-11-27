import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  OverlapToHeaderImagebg: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    position: 'absolute',
    top: screenHeight / 4,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0, // Ensure it's on top of the image (set 0 for shadow navbar)
  },
  selectedDateLable: {
    marginBottom: 12,
    marginLeft: 12,
    fontSize: 12,
    color: COLORS.gray_9,
    textAlign: 'left',
    fontFamily: 'LeagueSpartan',
  },
  viewShadowStyles: {
    width: screenWidth,
    height: 1,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    elevation: 3,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  spaceOutsideRoomBox: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  viewShadowStylesNavbar: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  modalInnerContainer: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  modalRoomNolable: {
    fontSize: 24,
    fontFamily: 'LeagueSpartanSemiBold',
    color: 'black',
    marginBottom: 10,
  },
  modalTimelable: {
    color: COLORS.primary,
    fontFamily: 'LeagueSpartanMedium',
  },
  dividerLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 50,
    marginVertical: 10,
  },
  reservationBylable: {
    fontSize: 18,
    fontFamily: 'LeagueSpartanMedium',
    alignItems: 'center',
    color: COLORS.primary,
    marginBottom: 10,
  },
  modalStudentLabel: {
    fontSize: 14,
    fontFamily: 'LeagueSpartanMedium',
    color: 'gray',
    marginBottom: 10,
  },
  modalStudentName: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    fontFamily: 'LeagueSpartanMedium',
    marginBottom: 10,
  },
  emptyViewforScrolling: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },

  modalContainerFull: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentFull: {
    flex: 0,
    backgroundColor: COLORS.gray_5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    maxHeight: '40%',
    justifyContent: 'flex-start',
  },





  touchableButton: {
    borderRadius: 10,
    overflow: 'hidden',
    // margin: 5,
  },
  ButtonRowcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: screenWidth * 0.2,
    height: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  },
  buttonText: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan',
  },
  buttonSelected: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: screenWidth * 0.2,
    height: screenHeight * 0.03,
    marginTop: screenHeight * 0.02,
    justifyContent: 'center',
  },
  textSelected: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center',
  },
  buttonDisabled: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.gray_10,
    width: screenWidth * 0.2,
    height: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  },
  textDisabled: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan',
  },
  innerBox: {
    flex: 1,
  },
  boxRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  box: {
    width: screenWidth * 0.95,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    padding: 8,
    marginVertical: screenHeight * 0.01,
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginVertical: screenHeight * 0.01,
  },
  textContent: {
    alignItems: 'flex-start',
    paddingLeft: screenWidth * 0.02,
    paddingTop: screenHeight * 0.005,
  },
  textbold: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'LeagueSpartan',
  },
  description: {
    fontSize: 8,
    color: 'gray',
    textAlign: 'left',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  headerImageBackground: {
    height: screenHeight / 3.5,
    resizeMode: 'cover',
    width: screenWidth
  },
  contentContainer: {
    marginTop: 0,
    // Default is marginTop: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire image
  },
});

export default styles;