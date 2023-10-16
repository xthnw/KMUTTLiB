import { StyleSheet, Dimensions, } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({

    topProfileContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 60,
        marginBottom: 60,
        marginLeft: 20,
    },
    circleViewProfile: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    hiUserNameLabel: {
        marginLeft: 20,
        fontSize: 18,
        color: "white",
        fontFamily: "LeagueSpartan",
    },

    RoundedWhiteCoverContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 25, // Adjust the top-left corner radius
        borderTopRightRadius: 25, // Adjust the top-right corner radius
        overflow: "hidden",
    },

    subRoundedWhiteCoverContainer: {
        flex: 1,
        margin: 12,
    },
    calendarView: {
    },
    calendarGapVerticalSapce: {
        height: screenHeight * 0.13,
        paddingTop: 10,
        paddingBottom: 10,
    },
    calendarHighlightDateNumber: {
        color: "black",
        textDecorationLine: "underline", // Add underline style
        textDecorationColor: "orange", // Color of the underline
        fontFamily: 'LeagueSpartanMedium',
    },
    imageInBoxContainer: {
        width: screenWidth * 0.4, // Set the desired width
        height: screenHeight * 0.15, // Set the desired height
        borderRadius: 15,
        alignItems: "center", // Center the image horizontally
    },
    emptyViewforNavbarShadow: {
        flex: 0,
        backgroundColor: 'black'
    },
    subemptyViewforNavbarShadow: {
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



    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10, // Adjust the margin value as needed
        alignSelf: "flex-end", // Align the container to the bottom of the box
    },
    statusText: {
        color: "black", // Color of "Status:"
        fontFamily: "LeagueSpartan",
    },
    statusLabel: {
        backgroundColor: "#29b95f", // Green background color
        borderRadius: 15, // Adjust the border radius as needed
        marginLeft: 5, // Add spacing between "Status:" and the green label
        paddingVertical: 5, // Add vertical padding for better appearance
        paddingHorizontal: 10, // Add horizontal padding for better appearance
        fontFamily: "LeagueSpartan",
    },
    statusLabelFull: {
        backgroundColor: "#979797", // Green background color
        borderRadius: 15, // Adjust the border radius as needed
        marginLeft: 5, // Add spacing between "Status:" and the green label
        paddingVertical: 5, // Add vertical padding for better appearance
        paddingHorizontal: 10, // Add horizontal padding for better appearance
        fontFamily: "LeagueSpartan",
    },
    statusLabelClose: {
        backgroundColor: "#d10000", // Green background color
        borderRadius: 15, // Adjust the border radius as needed
        marginLeft: 5, // Add spacing between "Status:" and the green label
        paddingVertical: 5, // Add vertical padding for better appearance
        paddingHorizontal: 10, // Add horizontal padding for better appearance
        fontFamily: "LeagueSpartan",
    },
    statusLabelInner: {
        color: "white", // Text color
        fontFamily: "LeagueSpartan",
    },
    innerBox: {
        flex: 1,
    },
    space: {},
    boxRow: {
        flexDirection: "row", // Arrange boxes horizontally
        justifyContent: "space-between", // Add space between boxes
        marginBottom: 10, // Add vertical spacing between rows
    },
    box: {
        width: screenWidth * 0.45, // Adjust the width as needed
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        padding: 8, // ขอบบนรูปกับขอบกล่อง
        marginVertical: 2, // ความห่างของแต่ละกล่องบนล่าง
        backgroundColor: "white",
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    textbold: {
        marginTop: 10,
        fontSize: 14,
        textAlign: "left",
        fontFamily: "LeagueSpartan",
    },
    description: {
        marginTop: 5,
        fontSize: 12, // Adjust the font size as needed
        color: "#a1a1a1", // You can adjust the color
        textAlign: "left",
        fontFamily: "LeagueSpartan",
    },
    container: {
        flex: 1,
        width: screenWidth,
    },
});

export default styles;