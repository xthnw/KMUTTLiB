import { View, Text, Image, TextInput, TouchableOpacity, Pressable, StyleSheet, Dimensions, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import COLORS from './fifa/colors';
import Button from './fifa/button';
import axios from 'axios';
StatusBar.setHidden(true);

// import font from './react-native.config';

// import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;
// async componentDidMount() {
//     await Font.loadAsync({
//       'LeagueSpartan': require('./path-to-your-font/LeagueSpartan-Regular.ttf'),
//     });
//     this.setState({ fontLoaded: true });
//   }

const LoginFIFA = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const apiUrl = 'http://192.168.1.104:8080/api/authen';
            const jsonData = {
                email: email,
                password: password,
            };

            const response = await axios.post(apiUrl, jsonData);

            if (response.data.status === 'success') {
                // Login successful, you can navigate to the next screen or perform further actions
                console.log('Login successful');
                console.log('User Information:', response.data.data);

                

                // You may want to store the user information in your app's state or context
            } else {
                // Login failed, handle the error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={[{ padding: 24, alignItems: 'center', marginTop: 24, }]}>
                <Image
                    source={require("./picture/LogoApp.png")}
                    style={{
                        height: 138,
                        width: 244,
                    }}
                />
            </View>

            <View style={{ padding: 24, }}>
                <View style={[{}]}>
                    <Text style={{
                        fontSize: 22,
                        // fontFamily: "LeagueSpartan",
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                            }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>


                <Button
                    title="Login with Email"
                    // onPress={() => navigation.navigate("MainNavigator")} // Corrected the navigation here
                    onPress={handleLogin}
                    // filled
                    style={{
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
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Forgot Password</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginFIFA;
