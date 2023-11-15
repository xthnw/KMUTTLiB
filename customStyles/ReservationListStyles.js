import { StyleSheet, Dimensions, } from 'react-native';
import COLORS from './colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    staybutton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    yesCancelbutton: {
        flex: 1,
        backgroundColor: COLORS.red,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: COLORS.red,
    },
    blankBgModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    alertModalcontainer: {
        justifyContent: 'center',
        width: height * 0.35,
        maxHeight: height * 0.7,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.gray_6,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: 'hidden',
        paddingVertical: 12,
    },
    closebuttonView: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1, // Ensure the icon is displayed above
    },
    alertheaderText: {
        fontSize: 24,
        fontFamily: 'LeagueSpartanSemiBold',
        color: 'black',
    },
    alertdetailsText: {
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
        marginTop: 16,
        color: 'gray',
    },
    acceptbuttonStyle: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 20,
        marginTop: 16,
    },
    acceptTextStyle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'LeagueSpartanSemiBold',
        textAlign: 'center',
    },
    scrollViewContainer: {
        flex: 1,
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
    },
    formTitle: {
        fontSize: 28,
        fontFamily: 'LeagueSpartanSemiBold',
        color: COLORS.primary,
    },
    detailsText: {
        color: COLORS.primary,
        marginBottom: 20,
    },
    innerBox: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 15,
        padding: 8,
        backgroundColor: COLORS.white,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    boxColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    boxRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    label: {
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        elevation: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0,
        shadowRadius: 8,
    },
    icon: {
        color: COLORS.black,
    },
    Tag: {
        color: 'grey',
        padding: '1%',
        fontSize: 12,
        fontFamily: 'LeagueSpartanMedium',

    },
    text: {
        color: COLORS.black,
        padding: '1%',
        fontSize: 12,
        fontFamily: 'LeagueSpartan',
    },
    image: {
        flex: 1,
        width: screenWidth * 0.3,
        height: screenHeight * 0.11,
        borderRadius: 8,
        alignItems: 'center',
    },
    textbold: {
        fontSize: 16,
        fontFamily: 'LeagueSpartanSemiBold',
        textAlign: 'left',
    },
    status: {
        backgroundColor: COLORS.green,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'green',
    },
    deleteBooking: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.red_2,
        padding: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    statusDetail: {
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
    },
    space: {
    },
    statusInner: {
        color: 'white',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        fontFamily: 'LeagueSpartanMedium',
    },
    statusDelete: {
        color: COLORS.red_2,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        fontFamily: 'LeagueSpartanSemiBold',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
});

export default styles;