import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { style } from '../utils/style'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function RegisterScreen({ ...props }) {
    return (
        <View style={{ alignItems: 'center', height: '100%' }}>
            <View style={style.registerContainer}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', }}>Register</Text>

                <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='id-card' size={18} />
                    </View>
                    <TextInput placeholder='Full Name' style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='envelope' size={18} />
                    </View>
                    <TextInput placeholder='Email' style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='phone-alt' size={18} />
                    </View>
                    <TextInput placeholder='Phone Number' style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='lock' size={18} />
                    </View>
                    <TextInput placeholder='Password' secureTextEntry={true} style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ position: 'absolute', left: 10 }} >
                        <FontAwesome5 name='lock' size={18} />
                    </View>
                    <TextInput placeholder='Verify Password' secureTextEntry={true} style={style.loginInput} onChangeText={(text) => null} />
                </View>

                <TouchableOpacity style={style.loginButton} onPress={() => null} >
                    <FontAwesome5 name='hand-point-right' size={18} />
                    <Text style={{ marginStart: 5, }}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={style.registerShape}>
                <Image source={require('../asset/logo.png')} style={[style.loginImage,{marginTop:90}]} />
            </View>

            <View style={style.loginRegister}>
                <Text style={{fontWeight:'bold'}}>Already have account ? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login', {name:'login'})}><Text style={{color:'blue'}}>Login</Text></TouchableOpacity>
            </View>
        </View>
    )
}