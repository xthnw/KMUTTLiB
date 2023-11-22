import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Animated } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../customStyles/colors';
import { useAuth } from './auth';
import styles from '../customStyles/ReservationWelcomeStyles';
import { Iconify } from 'react-native-iconify';
import { createButtonAnimation } from '../customStyles/TouchAnimation';

const Welcome = ({ navigation }) => {
    const { dispatch } = useAuth();
    const [authenticated, setAuthenticated] = useState(false);
    const { buttonScaleValue: button1ScaleValue,
        handleButtonPressIn: handleButton1PressIn,
        handleButtonPressOut: handleButton1PressOut,
    } = createButtonAnimation();

    const {
        buttonScaleValue: button2ScaleValue,
        handleButtonPressIn: handleButton2PressIn,
        handleButtonPressOut: handleButton2PressOut,
    } = createButtonAnimation();

    return (
        <LinearGradient style={[{ flex: 1 }]} colors={[COLORS.white, COLORS.white]}>
            <ScrollView
                contentContainerStyle={[{ flexGrow: 1 }]}
                showsVerticalScrollIndicator={false}>
                <View style={[{ padding: 10, flex: 1 }]}>
                    <View style={[{ padding: 24, marginTop: 24 }]}>
                        <Image source={require('../picture/kujong.png')} style={{ height: 128, width: 128, marginBottom: 10 }} />
                        <Text style={[{
                            paddingTop: 10,
                            fontSize: 40,
                            fontFamily: 'LeagueSpartanSemiBold',
                            color: COLORS.black
                        }]}>Welcome to</Text>
                        <Text style={[{
                            fontSize: 37,
                            fontFamily: 'LeagueSpartanSemiBold',
                            color: COLORS.black
                        }]}>KMUTT LiB</Text>
                    </View>
                    <View style={[{ alignItems: 'center', flex: 0.5 }]}>
                        <Image source={require('../picture/iconWelcome.png')} style={{ height: 371, width: 354, }} />
                    </View>
                    <View style={[{ alignItems: 'center', flex: 1 }]}>
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('ReservationLogin')}
                            onPressIn={handleButton1PressIn}
                            onPressOut={handleButton1PressOut}
                            activeOpacity={1}
                        >
                            <Animated.View style={[styles.button, { transform: [{ scale: button1ScaleValue }] }]}>
                                <Text style={{
                                    fontFamily: 'LeagueSpartanMedium',
                                    fontSize: 18,
                                    color: COLORS.white,
                                }}>Sign in with Email</Text>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setAuthenticated(false);
                                dispatch({ type: 'LOGOUT', payload: null });
                                navigation.navigate('MainNavigator');
                            }}
                            onPressIn={handleButton2PressIn}
                            onPressOut={handleButton2PressOut}
                            activeOpacity={1}
                        >
                            <Animated.View style={[styles.buttonGuest, { transform: [{ scale: button2ScaleValue }] }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Iconify style={[{ marginRight: 5 }]} icon='mdi:user' size={14} color='white' />
                                    <Text style={{
                                        fontFamily: 'LeagueSpartanMedium',
                                        fontSize: 18,
                                        color: COLORS.white,
                                    }}>Sign in as Guest</Text>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient >
    )
}

export default Welcome