import { View, Text, Image, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions,Button, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../customStyles/ReservationLoginStyles';
import COLORS from '../customStyles/colors';
import axios from 'axios';
import { useAuth } from './auth';

StatusBar.setHidden(true);


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
                setLoginFailed(false); // Reset loginFailed state
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
                    console.error('Login failed case1');
                    console.error('Error:', error);
                    console.log('Login status:', response.data.status);
                }

            } else {
                // Login failed
                // console.error('Login failed case2');
                // setLoginFailed(!loginFailed); // Set loginFailed state to true
                // console.log('Login status:', response.data.status);
            }
        } catch (error) {
            
            console.error('Login failed case3');
            setLoginFailed(true); // Set loginFailed state to true
            
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
                <Image
                    source={require('../picture/LogoApp.png')}
                    style={styles.imgSize}
                />
            </View>

            <View style={styles.paddingSpace}>
                <View >
                    <Text style={styles.title}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Hello again you have been missed!
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.titleInput}>
                        Email address
                    </Text>
                    <View style={[styles.box, loginFailed ? styles.toggledBox : null]}>
                        <TextInput
                            placeholder='Enter your mail@kmutt.ac.th'
                            placeholderTextColor={COLORS.SubTitle}
                            keyboardType='email-address'
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.titleInput}>Password</Text>

                <View style={[styles.box, loginFailed ? styles.toggledBox : null]}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.SubTitle}
                            secureTextEntry={isPasswordShown}
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.eyePosition}>
                            {isPasswordShown == true ? (
                                    <Ionicons name='eye-off' size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name='eye' size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.TextError}>
                        {loginFailed && (
                        <Text style={styles.TextError}>Invalid Email or Password. Try in</Text>
                        )}
                </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}>

                <Text style={styles.textButton}>
                    Login with Email</Text>
            </TouchableOpacity>


                <View style={styles.positionTest}>
                    <Pressable onPress={() => {
                        setEmail('jedsada_chai@kmutt.ac.th');
                        setPassword('secret123');
                    }}>
                        <Text 
                        style={styles.titleTest}>
                        Auto set Email & Password</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginFIFA;
