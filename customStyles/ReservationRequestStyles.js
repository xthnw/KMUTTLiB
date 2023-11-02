import { StyleSheet, Dimensions, } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
    },
    contentContainer: {
      backgroundColor: "#fbfbfb",
      borderRadius: 10,
      padding: 20,
      elevation: 3,
    },
    backcirclebutton: {
      width: 40,
      height: 40,
      borderRadius: 20, // Half of the width/height to create a circle
      backgroundColor: "white",
      borderColor: "#e7e7e7",
      borderWidth: 0.5,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
    subbackcirclebutton: {
      alignItems: "center",
      justifyContent: "center",
    },
    dropdownOptionView: {
      flexDirection: "column",
      marginBottom: 20,
    },
    waitforDropdownOptionContainer: {
      flex: 1,
      borderWidth: 2,
      borderColor: "#e7e7e7",
      borderRadius: 15,
      backgroundColor: "white",
      padding: 10,
      flexDirection: "row", // Add flexDirection to align icon and text horizontally
      justifyContent: "space-between", // Add this to space out icon and text
      alignItems: "center", // Center items vertically
    },
    dropdownOptionContainer: {
      top: "5%",
      left: 0,
      right: 0,
      borderWidth: 2,
      borderColor: "#e7e7e7",
      borderRadius: 15,
      backgroundColor: "white",
      overflow: "hidden",
      fontFamily: "LeagueSpartan",
      // height: dropdownHeight,
    },
    subDropdownOptionContainer: {
      padding: 12,
      borderBottomWidth: 0,
      borderBottomColor: "gray",
    },
    studentIdformPadding: {
      padding: 16,
    },
    studentIdrowInput: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    courseCodeView: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    courseCodeInput: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    numberInfrontstudentIdrowInput: {
      fontSize: 18,
      fontFamily: "LeagueSpartan",
      marginRight: 10,
    },
    labelInfrontcourseCodeInput: {
      fontSize: 16,
      fontFamily: "LeagueSpartanMedium",
      marginRight: 10,
    },
    studentIdInputboxContainer: {
      flex: 1,
      borderColor: "#e7e7e7",
      borderWidth: 2,
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10,
    },
    submitButtonView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    submitButtonStyle: {
      backgroundColor: "orange",
      padding: 16,
      borderRadius: 15,
      width: "80%",
    },
    submitTextStyle: {
      color: "white",
      fontSize: 16,
      fontFamily: "LeagueSpartanSemiBold",
      textAlign: "center",
    },
    blankBgModalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    alertModalcontainer: {
      justifyContent: "center",
      alignItems: "center",
      width: height * 0.4,
      maxHeight: height * 0.7,
      backgroundColor: "white",
      borderRadius: 35,
      borderWidth: 2,
      borderColor: "#e7e7e7",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      overflow: "hidden",
    },
    closebuttonView: {
      position: "absolute",
      top: 16,
      right: 16,
      zIndex: 1, // Ensure the icon is displayed above
    },
    alertheaderText: {
      fontSize: 18,
      fontFamily: "IBMPlexSansThaiBold",
      textAlign: "center",
      color: "red",
    },
    alertdetailsText: {
      fontSize: 14,
      fontFamily: "IBMPlexSansThaiSemiBold",
      textAlign: "center",
      marginTop: 16,
    },
    acceptbuttonStyle: {
      backgroundColor: "orange",
      padding: 12,
      borderRadius: 20,
      marginTop: 16,
    },
    acceptTextStyle: {
      color: "white",
      fontSize: 16,
      fontFamily: "LeagueSpartanSemiBold",
      textAlign: "center",
    },
    sucessModalcontainer: {
      justifyContent: "center",
      alignItems: "center",
      width: height * 0.4,
      height: height * 0.3,
      backgroundColor: "white",
      borderRadius: 35,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    paddingViewforinsideModal: {
      padding: 16,
      alignItems: "center"
    },
    sucessTextStyle: {
      fontSize: 18,
      fontFamily: "LeagueSpartan",
      textAlign: "center",
      color: "#32ba7c",
      marginTop: 16,
    },
    formTitle: {
      fontSize: 24,
      fontFamily: "LeagueSpartanSemiBold",
      color: "black",
      marginBottom: 10,
    },
    detailsText: {
      color: "orange",
      marginBottom: 20,
      fontFamily: "LeagueSpartanMedium",
    },
    inputRow: {
      flexDirection: "row", // Arrange inputs horizontally
      justifyContent: "space-between", // Add space between inputs
    },
    inputContainer: {
      marginBottom: 20, //ยืด Container ขาว ๆ ลงล่าง
    },
    label: {
      fontSize: 16,
      fontFamily: "LeagueSpartanMedium",
      marginBottom: 10,
    },
    input: {
      borderWidth: 2,
      borderColor: "#e7e7e7",
      backgroundColor: "white",
      borderRadius: 15,
      padding: "3%",
      fontSize: 16,
      fontFamily: "LeagueSpartan",
      height: 40,
      width: screenWidth * 0.35,
      marginBottom: 10,
    },
  });

  export default styles;