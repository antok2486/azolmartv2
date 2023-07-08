import { View, Text, Button, Image, TouchableOpacity, TextInput, BackHandler, Alert, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { style } from '../utils/style'
import { URL_API } from '../utils/config'

export default function LoginScreen({ ...props }) {
    const passwordRef = useRef(null)
    const [hidePassword, setHidePassword] = useState(true)
    const [data, setData] = useState({ email: '', password: '' })

    useEffect(() => {
        const getToken = async () => {
            let token = await AsyncStorage.getItem('token')

            if (token) {
                props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], })
                // if(props.route.params?.isExit){
                //     console.log('Good bye')
                // }
                // if(!props.route.params?.isExit){
                //     props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], })
                // }
            }
        }

        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                { text: 'Cancel', onPress: () => null, style: 'cancel', },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        getToken()

        return () => backHandler.remove();
    }, [])

    const handleClickLogin = async () => {
        try {
            let res = await axios.post(URL_API + 'login', data)

            if (res.data.status !== 200) {
                Alert.alert(res.data.errors)
            } else {
                console.log(res.data)
                await AsyncStorage.setItem('token', res.data.token)
                await AsyncStorage.setItem('username', res.data.user.nama)

                props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], })
            }
        } catch (errors) {
            ToastAndroid.show(errors.toString(), ToastAndroid.LONG)
            // console.log(errors)
        }
    }

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={style.loginShape}>
                <Image source={require('../asset/logo.png')} style={style.loginImage} />
            </View>

            <ScrollView style={{ width: '100%', height: '100%', }}>
                <View style={style.loginContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Login</Text>

                    <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='user' size={18} />
                        </View>
                        <TextInput
                            placeholder='Email / Phone Number'
                            returnKeyType='next'
                            style={style.loginInput}
                            onSubmitEditing={() => passwordRef.current.focus()}
                            onChangeText={(text) => setData({ ...data, email: text })} />
                    </View>

                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='lock' size={18} />
                        </View>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={hidePassword}
                            style={style.loginInput}
                            onChangeText={(text) => setData({ ...data, password: text })}
                            ref={passwordRef}
                        />
                        <TouchableOpacity style={style.btnShowPassword} onPress={() => setHidePassword(!hidePassword)}>
                            <FontAwesome5 name='eye-slash' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={style.loginButton} onPress={() => handleClickLogin()} >
                        <FontAwesome5 name='hand-point-right' size={18} />
                        <Text style={{ marginStart: 5, }}>Login</Text>
                    </TouchableOpacity>

                    <View style={style.loginRegister}>
                        <Text style={{ fontWeight: 'bold' }}>Not registered ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.reset({ index: 0, routes: [{ name: 'Register' }] })}>
                            <Text style={{ color: 'blue' }}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}