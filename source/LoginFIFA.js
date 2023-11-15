import { View, Text, Image, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../customStyles/ReservationLogin';
import COLORS from '../customStyles/colors';
import Button from '../customStyles/button';
import axios from 'axios';
import { useAuth } from './auth';
StatusBar.setHidden(true);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;

const LoginFIFA = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useAuth();
    const [authenticated, setAuthenticated] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false); // New state variable for login status

    const handleLogin = async () => {
        try {
            const apiUrl = 'http://192.168.13.43:8080/api/authen';
            const jsonData = {
                email: email,
                password: password,
            };
            console.log('email', email)

            const response = await axios.post(apiUrl, jsonData);

            if (response.data.status === 'success') {
                // Login successful, you can navigate to the next screen or perform further actions
                console.log('Login successful');
                console.log('User Information:', response.data.data);
                const userData = response.data.data;
                setAuthenticated(true);
                setLoginFailed("input"); // Reset loginFailed state
                dispatch({ type: 'LOGIN', payload: userData });
                navigation.navigate('MainNavigator');
                // You may want to store the user information in your app's state or context
                try {
                    const apiUrl = 'http://192.168.13.43:8080/api/list'; // Replace with the correct API endpoint
                    const jsonData = {
                        email: userData.User_Email,
                    };

                    const responseLIST = await axios.post(apiUrl, jsonData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                        if (responseLIST.data && responseLIST.data.length > 0)
                        {
                            console.log(responseLIST.data);
                        }
                } catch (error) {
                    console.error('Error:', error);
                    console.log('Login status:', response.data.status);
                }

            } else {
                // Login failed
                console.error('Login failed');
                setLoginFailed("error"); // Set loginFailed state to true
                console.log('Login status:', response.data.status);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={[{ padding: 24, alignItems: 'center', marginTop: 24, }]}>
                <Image
                    source={require('../picture/LogoApp.png')}
                    style={{
                        height: 138,
                        width: 244,
                    }}
                />

            </View>

            <View style={{ padding: 24, }}>
                <View >
                    <Text style={styles.title}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Hello again you have been missed!
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.title}>
                        Email address
                    </Text>
                    <View style={styles.Input}>
                        <TextInput
                            placeholder='Enter your mail@kmutt.ac.th'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                fontFamily: 'LeagueSpartan',
                                width: '100%',
                            }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontFamily: 'LeagueSpartan',
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                    }}>Password</Text>

                    <View style={{
                        width: '100%',
                        height: 48,
                        borderColor: loginFailed ? COLORS.error : COLORS.black, // Set border color based on login status
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 22,
                        fontFamily: 'LeagueSpartan',
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                fontFamily: 'LeagueSpartan',
                                width: '100%'
                            }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: 'absolute',
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>


                <Button
                    title='Login with Email'
                    onPress={handleLogin}// Corrected the navigation here
                    style={{
                        fontFamily: 'LeagueSpartan',
                        borderColor: COLORS.primary,
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>

                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 22
                }}>
                    <Pressable onPress={() => {
                        setEmail('jedsada_chai@kmutt.ac.th');
                        setPassword('secret123');
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }}>Auto set Email & Password</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginFIFA;
