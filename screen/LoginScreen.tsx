import { View, Text, Button } from 'react-native'
import React from 'react'

export default function LoginScreen({...props}) {
    return (
        <View>
            <Text>LoginScreen</Text>
            <Button title='Go Home' onPress={() => props.navigation.navigate('Home', {name:'home'})}></Button>
        </View>
    )
}