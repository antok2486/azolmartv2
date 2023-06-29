import { View, Text, Button, Image, TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { style } from '../utils/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function LoginScreen({ ...props }) {
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [])

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={style.loginShape}>
                <Image source={require('../asset/logo.png')} style={style.loginImage} />
            </View>

            <View style={style.loginContainer}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Login</Text>

                <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='user' size={18} />
                    </View>
                    <TextInput placeholder='Email / Phone Number' style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='lock' size={18} />
                    </View>
                    <TextInput placeholder='Password' secureTextEntry={true} style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <TouchableOpacity style={style.loginButton} onPress={() => null} >
                    <FontAwesome5 name='hand-point-right' size={18} />
                    <Text style={{ marginStart: 5, }}>Masuk</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}