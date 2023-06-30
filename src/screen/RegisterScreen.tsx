import { View, Text, TextInput, TouchableOpacity, Image, BackHandler, Alert, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { style } from '../utils/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function RegisterScreen({ ...props }) {
    const emailRef = useRef(null), phoneRef = useRef(null), password1Ref = useRef(null), password2Ref = useRef(null)
    const [hidePassword1, setHidePassword1] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
                { text: 'Cancel', onPress: () => null, style: 'cancel', },
                { text: 'YES', onPress: () => exitApp() },
            ]);
            return true;
        };

        const exitApp = () => {
            // props.navigation.reset({index:0, routes:[{name:'Login'}]})
            BackHandler.exitApp()
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
        // backHandler.remove()
    }, [])


    return (
        <View style={{ alignItems: 'center', flex: 1,}}>
            <ScrollView style={{width:'100%', height:'100%'}}>
                <View style={style.registerContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Register</Text>

                    <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='id-card' size={18} />
                        </View>
                        <TextInput
                            placeholder='Full Name'
                            style={style.loginInput}
                            onChangeText={(text) => null}
                            returnKeyType='next'
                            onSubmitEditing={() => emailRef.current.focus()} />
                    </View>

                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='envelope' size={18} />
                        </View>
                        <TextInput
                            placeholder='Email'
                            style={style.loginInput}
                            onChangeText={(text) => null}
                            ref={emailRef}
                            returnKeyType='next'
                            onSubmitEditing={() => phoneRef.current.focus()} />
                    </View>

                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='phone-alt' size={18} />
                        </View>
                        <TextInput
                            placeholder='Phone Number'
                            style={style.loginInput}
                            onChangeText={(text) => null}
                            ref={phoneRef}
                            returnKeyType='next'
                            onSubmitEditing={() => password1Ref.current.focus()} />
                    </View>

                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='lock' size={18} />
                        </View>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={hidePassword1}
                            style={style.loginInput}
                            onChangeText={(text) => null}
                            ref={password1Ref}
                            returnKeyType='next'
                            onSubmitEditing={() => password2Ref.current.focus()} />
                        <TouchableOpacity style={style.btnShowPassword} onPress={() => setHidePassword1(!hidePassword1)}>
                            <FontAwesome5 name='eye-slash' />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 10 }} >
                            <FontAwesome5 name='lock' size={18} />
                        </View>
                        <TextInput
                            placeholder='Verify Password'
                            secureTextEntry={hidePassword2}
                            style={style.loginInput}
                            onChangeText={(text) => null}
                            ref={password2Ref} />
                        <TouchableOpacity style={style.btnShowPassword} onPress={() => setHidePassword2(!hidePassword2)}>
                            <FontAwesome5 name='eye-slash' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={style.loginButton} onPress={() => null} >
                        <FontAwesome5 name='hand-point-right' size={18} />
                        <Text style={{ marginStart: 5, }}>Register</Text>
                    </TouchableOpacity>

                    <View style={style.loginRegister}>
                        <Text style={{ fontWeight: 'bold' }}>Already have account ? </Text>
                        <TouchableOpacity onPress={() => props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}><Text style={{ color: 'blue' }}>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View style={style.registerShape}>
                <Image source={require('../asset/logo.png')} style={[style.loginImage, { marginTop: 120 }]} />
            </View>
        </View>
    )
}