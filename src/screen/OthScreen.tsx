import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function OthScreen({...props}) {
    const handleClickLogout = async () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
            { text: 'Cancel', onPress: () => null, style: 'cancel', },
            { text: 'Yes', onPress: () => logout() },
        ]);
    }

    const logout = async () => {
        try{
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('username')
    
            props.navigation.reset({index: 0,routes: [{ name: 'Login' }],})
    
        }catch(e){
            console.log(e)
        }

    }

    return (
        <View>
            <Text>OthScreen</Text>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={() => handleClickLogout()}>
                <FontAwesome5 name='sign-out-alt' size={24} /><Text> Logout</Text>
            </TouchableOpacity>
        </View>
    )
}