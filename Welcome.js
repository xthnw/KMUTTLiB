import { View, Text, Pressable, Image, Dimensions, StatusBar, ScrollView, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from './fifa/colors';
import Button from './fifa/button';
StatusBar.setHidden(true);



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = Math.min(screenWidth, screenHeight) * 0.9;

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
                
            }}
            colors={[
                COLORS.white,
                COLORS.white
            ]}>
            <ScrollView
                contentContainerStyle={[{ flexGrow: 1 }]}
                showsVerticalScrollIndicator={false}>
                <View style={{
                    padding: 10,
                    flex: 1
                }}>
                    {/* <StatusBar hidden /> */}

                    <View style={[{ padding: 24, marginTop: 24, }]}>
                        <Image
                            source={require("./picture/LogoApp.png")}
                            style={{
                                height: 138,
                                width: 244,
                            }}
                        />
                        <Text style={{
                            paddingTop: 10,
                            fontSize: 30,
                            fontWeight: 600,
                            color: COLORS.black
                        }}>Welcome to</Text>
                        <Text style={{
                            fontSize: 27,
                            fontWeight: 600,
                            color: COLORS.black
                        }}>KMUTT LiB</Text>

                    </View>
                    <View style={[{ alignItems: 'center', }]}>
                        <Image
                            source={require("./picture/iconWelcome.png")}
                            style={{
                                height: 371,
                                width: 354,
                            }}
                        />
                    </View>
                    <View style={[{ alignItems: 'center', }]}>
                        <Button
                            title="Sign in with Email"
                            onPress={() => navigation.navigate("LoginFIFA")}
                            style={{
                                borderColor: COLORS.primary,
                                width: "90%",
                                color: COLORS.black,
                            }}
                        />
                        <Button
                            title="Login with guest"
                            onPress={() => navigation.navigate("MainNavigator")}
                            style={{
                                marginTop: 10,
                                borderColor: COLORS.grey,
                                backgroundColor: COLORS.grey,
                                // textColor: 
                                width: "90%",
                                color: COLORS.black
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient >
    )
}

export default Welcome