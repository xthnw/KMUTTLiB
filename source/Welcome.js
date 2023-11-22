import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../customStyles/colors';
import { useAuth } from './auth';
import styles from '../customStyles/ReservationWelcomeStyles';
import { Iconify } from 'react-native-iconify';

const Welcome = ({ navigation }) => {
    const { dispatch } = useAuth();
    const [authenticated, setAuthenticated] = useState(false);

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
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReservationLogin')}>
                            <Text style={{
                                fontFamily: 'LeagueSpartanMedium',
                                fontSize: 18,
                                color: COLORS.white
                            }}>Sign in with Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonGuest} onPress={() => {
                            setAuthenticated(false);
                            dispatch({ type: 'LOGOUT', payload: null });
                            navigation.navigate('MainNavigator');
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconify style={[{ marginRight: 5 }]} icon='mdi:user' size={14} color='white' />
                                <Text style={{
                                    fontFamily: 'LeagueSpartanMedium',
                                    fontSize: 18,
                                    color: COLORS.white,
                                }}>Sign in as Guest</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </LinearGradient >
    )
}

export default Welcome