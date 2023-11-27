import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';
import { PixelRatio } from 'react-native';

// Get the pixel ratio of the device
const pixelRatio = PixelRatio.get();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rowingTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 60,
        marginBottom: 30,
    },
    logOutbutton: {
        flex: 0,
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    logOutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    topProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
    },
    circleViewProfile: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    hiUserNameLabel: {
        marginLeft: 20,
        fontSize: 18,
        color: 'white',
        fontFamily: 'LeagueSpartan',
    },

    RoundedWhiteCoverContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },

    subRoundedWhiteCoverContainer: {
        flex: 1,
        paddingTop: 12,
    },
    calendarView: {
    },
    calendarGapVerticalSapce: {
        height: screenHeight * 0.13,
        paddingTop: 10,
        paddingBottom: 10,
    },
    calendarHighlightDateNumber: {
        color: 'black',
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.primary,
        fontFamily: 'LeagueSpartanMedium',
    },
    imageInBoxContainer: {
        width: screenWidth * 0.4,
        height: screenHeight * 0.15,
        borderRadius: 15,
        alignItems: 'center',
    },
    emptyViewforNavbarShadow: {
        flex: 0,
        backgroundColor: 'black'
    },
    subemptyViewforNavbarShadow: {
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    statusText: {
        color: 'black',
        fontFamily: 'LeagueSpartan',
    },
    statusLabel: {
        backgroundColor: COLORS.green,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'LeagueSpartan',
    },
    statusLabelFull: {
        backgroundColor: COLORS.gray_2,
        borderRadius: 15,
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'LeagueSpartan',
    },
    statusLabelClose: {
        backgroundColor: COLORS.red,
        borderRadius: 15,
        marginLeft: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: 'LeagueSpartan',
    },
    statusLabelInner: {
        color: 'white',
        fontFamily: 'LeagueSpartan',
    },
    innerBox: {
        flex: 1,
    },
    space: {},
    boxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 12,
        paddingHorizontal: 8,
    },
    box: {
        width: screenWidth * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        padding: 8,
        marginVertical: 2,
        backgroundColor: 'white',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbold: {
        marginTop: 10,
        fontSize: PixelRatio.getFontScale() * 14,
        textAlign: 'left',
        fontFamily: 'LeagueSpartan',
    },
    description: {
        marginTop: 5,
        fontSize: PixelRatio.getFontScale() * 12,
        color: COLORS.gray_9,
        textAlign: 'left',
        fontFamily: 'LeagueSpartan',
    },
    container: {
        flex: 1,
    },
    spaceOutsideRoomBox: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
});

export default styles;