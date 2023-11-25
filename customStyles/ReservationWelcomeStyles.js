import { StyleSheet, Dimensions } from 'react-native';
import COLORS from './colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        fontFamily: 'LeagueSpartan',
        padding: 16,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        width: screenWidth * 0.8,
    },
    buttonGuest: {
        fontFamily: 'LeagueSpartan',
        width: screenWidth * 0.8,
        alignItems: 'center',
        marginTop: 10,
        borderColor: COLORS.grey,
        borderWidth: 2,
        borderRadius: 12,
        backgroundColor: COLORS.grey,
        padding: 16,
        color: COLORS.black
    },
    contentContainer: {
        backgroundColor: COLORS.gray_5,
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
    Input: {
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
    error: {
        width: '100%',
        height: 48,
        borderColor: COLORS.error,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
        fontFamily: 'LeagueSpartan',
    },
});

export default styles;