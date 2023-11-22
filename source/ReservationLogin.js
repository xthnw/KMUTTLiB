import { View, Text, Image, TextInput, TouchableOpacity, Pressable, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../customStyles/ReservationLoginStyles';
import COLORS from '../customStyles/colors';
import axios from 'axios';
import { useAuth } from './auth';
import { listApiUrl, authenApiUrl } from '../constants/apiConfig';

StatusBar.setHidden(true);

const ReservationLogin = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useAuth();

    const handleLogin = async () => {
        try {
            const jsonData = {
                email: email,
                password: password,
            };
            console.log('email', email)

            const response = await axios.post(authenApiUrl, jsonData);

            if (response.data.status === 'success') {
                const userData = response.data.data;
                setAuthenticated(true);
                setLoginFailed(false); // Reset loginFailed state
                dispatch({ type: 'LOGIN', payload: userData });
                navigation.navigate('MainNavigator');

                try {
                    const jsonData = {
                        email: userData.User_Email,
                    };

                    const responseLIST = await axios.post(listApiUrl, jsonData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (responseLIST.data && responseLIST.data.length > 0) {
                        console.log(responseLIST.data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    console.log('Login status:', response.data.status);
                }

            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login failed');
            setLoginFailed(!loginFailed); // Set loginFailed state to true
        }
    };
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: COLORS.white }]}>
            <View style={[{ padding: 24, alignItems: 'center', marginTop: 24 }]}>
                <Image source={require('../picture/LogoApp.png')} style={[{ height: 138, width: 244 }]} />
            </View>
            <View style={[{ padding: 24 }]}>
                <Text style={[styles.title, { fontFamily: 'LeagueSpartanSemiBold' }]}>Hi Welcome Back ! 👋</Text>
                <Text style={[styles.subtitle, { fontFamily: 'LeagueSpartanSemiBold' }]}>Hello again you have been missed!</Text>
                <View style={[{ marginBottom: 8 }]}>
                    <Text style={[styles.title, { fontFamily: 'LeagueSpartan', marginTop: 28, }]}>Student ID</Text>
                    <View style={[styles.box, loginFailed ? styles.toggledBox : null]}>
                        <TextInput
                            placeholder='Enter your Student ID'
                            placeholderTextColor={COLORS.gray_3}
                            keyboardType='email-address'
                            style={[{ fontFamily: 'LeagueSpartan', width: '100%' }]}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>
                <View style={[{ marginBottom: 16 }]}>
                    <Text style={styles.title}>Password</Text>
                    <View style={[styles.box, loginFailed ? styles.toggledBox : null]}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.gray_3}
                            secureTextEntry={isPasswordShown}
                            style={[{ fontFamily: 'LeagueSpartan', width: '100%' }]}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={[{ position: 'absolute', right: 12 }]}>
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    {loginFailed ? (
                        <View>
                            <Text style={[{ fontFamily: 'LeagueSpartanSemiBold', marginTop: 8, color: COLORS.red }]}>Invalid Student ID or Password. Try Again!</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={[{ fontFamily: 'LeagueSpartanMedium', fontSize: 18, color: COLORS.white }]}>Sign in with Email</Text>
                </TouchableOpacity>
                <View style={[{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }]}>
                    <Pressable onPress={() => {
                        setEmail('jedsada_chai@kmutt.ac.th');
                        setPassword('secret123');
                    }}>
                        <Text style={[{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }]}>Auto set Email & Password</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default ReservationLogin;