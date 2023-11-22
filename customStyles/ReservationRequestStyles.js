import { StyleSheet, Dimensions, } from 'react-native';
import COLORS from './colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    backgroundColor: COLORS.gray_5,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  backcirclebutton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of the width/height to create a circle
    backgroundColor: 'white',
    borderColor: COLORS.gray_6,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  subbackcirclebutton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownOptionView: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  waitforDropdownOptionContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.gray_6,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row', // Add flexDirection to align icon and text horizontally
    justifyContent: 'space-between', // Add this to space out icon and text
    alignItems: 'center', // Center items vertically
  },
  dropdownOptionContainer: {
    top: '5%',
    left: 0,
    right: 0,
    borderWidth: 2,
    borderColor: COLORS.gray_6,
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    fontFamily: 'LeagueSpartan',
    // height: dropdownHeight,
  },
  subDropdownOptionContainer: {
    padding: 12,
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
  },
  studentIdformPadding: {
    padding: 16,
  },
  studentIdrowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseCodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  courseCodeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  numberInfrontstudentIdrowInput: {
    fontSize: 18,
    fontFamily: 'LeagueSpartan',
    marginRight: 10,
  },
  labelInfrontcourseCodeInput: {
    fontSize: 16,
    fontFamily: 'LeagueSpartanMedium',
    marginRight: 10,
  },
  studentIdInputboxContainer: {
    flex: 1,
    borderColor: COLORS.gray_6,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    fontFamily: 'LeagueSpartan',
    color: COLORS.gray_3,
  },
  submitButtonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonStyle: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 15,
    width: '80%',
  },
  submitTextStyle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'LeagueSpartanSemiBold',
    textAlign: 'center',
  },
  blankBgModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  alertModalcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: height * 0.4,
    maxHeight: height * 0.7,
    backgroundColor: 'white',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.gray_6,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  closebuttonView: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1, // Ensure the icon is displayed above
  },
  alertheaderText: {
    fontSize: 18,
    fontFamily: 'IBMPlexSansThaiBold',
    textAlign: 'center',
    color: COLORS.red,
  },
  alertdetailsText: {
    fontSize: 14,
    fontFamily: 'IBMPlexSansThaiSemiBold',
    textAlign: 'center',
    marginTop: 16,
  },
  acceptbuttonStyle: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
  },
  acceptTextStyle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'LeagueSpartanSemiBold',
    textAlign: 'center',
  },
  sucessModalcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 25,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: COLORS.gray_6,
    borderWidth: 2,
  },
  errorModalcontainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 24,
    borderRadius: 25,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: COLORS.gray_6,
    borderWidth: 2,
  },
  paddingViewforinsideModal: {
    padding: 32,
    alignItems: 'center'
  },
  paddingViewforinsideModalError: {
    alignItems: 'center'
  },
  errorHeaderStyle: {
    fontSize: 22,
    fontFamily: 'LeagueSpartanMedium',
    textAlign: 'center',
    color: 'black',
  },
  errorTextOKStyle: {
    fontSize: 18,
    fontFamily: 'LeagueSpartanMedium',
    textAlign: 'center',
    color: COLORS.primary,
  },
  errorTextStyle: {
    fontSize: 18,
    fontFamily: 'LeagueSpartan',
    textAlign: 'center',
    color: 'black',
    marginTop: 16,
  },
  sucessTextStyle: {
    fontSize: 20,
    fontFamily: 'LeagueSpartanSemiBold',
    textAlign: 'center',
    color: COLORS.green_2,
    marginTop: 16,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'LeagueSpartanSemiBold',
    color: 'black',
    marginBottom: 10,
  },
  detailsText: {
    color: COLORS.primary,
    marginBottom: 20,
    fontFamily: 'LeagueSpartanMedium',
  },
  inputRow: {
    flexDirection: 'row', // Arrange inputs horizontally
    justifyContent: 'space-between', // Add space between inputs
  },
  inputContainer: {
    marginBottom: 20, //ยืด Container ขาว ๆ ลงล่าง
  },
  label: {
    fontSize: 16,
    fontFamily: 'LeagueSpartanMedium',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.gray_6,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '3%',
    fontSize: 16,
    fontFamily: 'LeagueSpartan',
    color: COLORS.gray_3,
    height: 40,
    width: screenWidth * 0.35,
    marginBottom: 10,
  },
  dividerLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },

  okButtonContainer: {
    width: screenWidth * 0.8, // Take up 100% width
    marginTop: 20, // Adjust the margin as needed
    padding: 15,
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
  },

  errorTextOKStyle: {
    fontSize: 18,
    fontFamily: 'LeagueSpartanMedium',
    color: 'white',
    textAlign: 'center', // Center the text within the button
  },
});

export default styles;