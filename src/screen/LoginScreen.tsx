import { View, Text, Button, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { style } from '../utils/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function LoginScreen({ ...props }) {

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
                    <TextInput placeholder='Email / Phone Number' style={style.loginInput} onChangeText={(text) => null } />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='lock' size={18} />
                    </View>
                    <TextInput placeholder='Password' secureTextEntry={true} style={style.loginInput} onChangeText={(text) => null } />
                </View>

                <TouchableOpacity style={style.loginButton} onPress={() => null} >
                    <FontAwesome5 name='hand-point-right' size={18} />
                    <Text style={{ marginStart: 5, }}>Masuk</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}