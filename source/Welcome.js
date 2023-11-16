import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from './auth';
import styles from '../customStyles/ReservationWelcome';

const Welcome = ({ navigation }) => {
    const { dispatch } = useAuth();
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView
                contentContainerStyle={[{ flexGrow: 1 }]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.paddingSpace}>

                    <View style={styles.paddingSpace2}>
                        <Image
                            source={require("../picture/kujong.png")}
                            style={styles.imgSize}
                        />
                        <Text 
                        style={styles.title}>
                        Welcome to</Text>
                        <Text
                        style={styles.subtitle}
                        >KMUTT LiB</Text>

                    </View>
                    <View style={styles.contentContainer}>
                        <Image
                            source={require("../picture/iconWelcome.png")}
                            style={styles.imgSize2}
                        />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate("LoginFIFA")}>

                                <Text style={styles.textButton}>
                                    Login with Email</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={styles.buttonGust}
                            onPress={() => {
                                setAuthenticated(false);
                                dispatch({ type: 'LOGOUT', payload: null });
                                navigation.navigate('MainNavigator');
                            }}>

                                <Text style={styles.textButton}>
                                    Login with guest</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Welcome