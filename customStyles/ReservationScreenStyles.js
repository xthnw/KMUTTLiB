import { StyleSheet, Dimensions, } from 'react-native';

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
    fontSize: 12, // Adjust the font size as needed
    color: '#a1a1a1', // You can adjust the color
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
    elevation: 3, // Adjust the elevation value for the shadow
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
    backgroundColor: 'white', // Background color of the shadow view (match with main container)
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android (simulates shadow)
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1, // Adjust the height of the shadow as needed
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
    color: 'orange',
    fontFamily: 'LeagueSpartanMedium',
  },
  dividerLine: {
    borderBottomColor: 'gray', // Color of the horizontal line
    borderBottomWidth: 1, // Thickness of the line
    borderRadius: 50,
    marginVertical: 10, // Adjust as needed to control the spacing
  },
  reservationBylable: {
    fontSize: 18,
    fontFamily: 'LeagueSpartanMedium',
    alignItems: 'center',
    color: 'orange',
    marginBottom: 10,
  },
  modalStudentLabel: {
    fontSize: 14, // Adjust font size as needed
    fontFamily: 'LeagueSpartanMedium',
    color: 'gray',
    marginBottom: 10,
  },
  modalStudentName: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14, // Adjust font size as needed
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
    backgroundColor: '#fbfbfb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    maxHeight: '40%', // Maximum height set to 50% of the screen height
    justifyContent: 'flex-start', // Align content at the top
  },





  touchableButton: {
    borderRadius: 10,
    overflow: 'hidden', // Clip the child view to fit the button's rounded corners
    // margin: 5,
  },
  ButtonRowcontainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
    justifyContent: 'center',
    // Shadow properties for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 }, // Decrease the height value
    shadowOpacity: 0.3,
    shadowRadius: 0,
    // Shadow properties for Android
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
    borderColor: 'orange', // Change the border color when selected
    backgroundColor: 'orange', // Change the background color when selected
    borderRadius: 10,
    width: screenWidth * 0.2, // Set the desired width
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
    backgroundColor: '#5f5f5f',
    width: screenWidth * 0.2, // Set the desired width
    height: screenHeight * 0.03,
    marginBottom: screenHeight * 0.01,
    justifyContent: 'center',
    // Shadow properties for iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 }, // Decrease the height value
    shadowOpacity: 0.3,
    shadowRadius: 0,
    // Shadow properties for Android
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
    flexDirection: 'column', // Arrange boxes horizontally
    justifyContent: 'center', // Add space between boxes
    marginBottom: 10, // Add vertical spacing between rows
    alignItems: 'center',
  },
  box: {
    width: screenWidth * 0.95, // Adjust the width as needed
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    padding: 8, // ขอบบนรูปกับขอบกล่อง
    marginVertical: screenHeight * 0.01, // ความห่างของแต่ละกล่องบนล่าง
    backgroundColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginVertical: screenHeight * 0.01,
  },
  textContent: {
    alignItems: 'flex-start', // Align text to the left
    paddingLeft: screenWidth * 0.02, // Add left padding (adjust the value as needed)
    paddingTop: screenHeight * 0.005, // Add left padding (adjust the value as needed)
  },
  textbold: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'LeagueSpartan',
  },
  description: {
    fontSize: 8, // Adjust the font size as needed
    color: 'gray', // You can adjust the color
    textAlign: 'left',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  headerImageBackground: {
    height: screenHeight / 3.5,
    resizeMode: 'cover', // Adjust as needed
    width: screenWidth
  },
  contentContainer: {
    marginTop: 0, // Adjust the marginTop to control the spacing between header and content
    // Default is marginTop: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100, // Adjust the height of the gradient overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position the overlay to cover the entire image
  },
});

export default styles;