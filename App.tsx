import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenComponent } from './utils/config';

export default function App() {
	const Stack = createNativeStackNavigator();
	const [comp, setComp] = useState('Login')

	useEffect(() => {
		const getToken = async () => {
			let token = await AsyncStorage.getItem('token')

			if(token){
				setComp('Login')
				console.log('ada token')
			}
		}

		getToken()

		console.log(comp)
	})

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={comp}>
				<Stack.Screen name='Home' component={ScreenComponent['home']} options={{headerShown:false}} />
				<Stack.Screen name='Login' component={ScreenComponent['login']} options={{headerShown:false}} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}