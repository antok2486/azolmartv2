import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenComponent } from './src/utils/config';

export default function App({...props}) {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={'Login'}>
				<Stack.Screen name='AddProduct' component={ScreenComponent['addProduct']} options={{ headerShown: false }} />
				<Stack.Screen name='AddPurchase' component={ScreenComponent['addPurchase']} options={{ headerShown: false }} />
				<Stack.Screen name='AddPurchaseIklan' component={ScreenComponent['addPurchaseIklan']} options={{ headerShown: false }} />
				<Stack.Screen name='AddPurchasePulsa' component={ScreenComponent['addPurchasePulsa']} options={{ headerShown: false }} />
				<Stack.Screen name='AddSale' component={ScreenComponent['addSale']} options={{ headerShown: false }} />
				<Stack.Screen name='AddSalePulsa' component={ScreenComponent['addSalePulsa']} options={{ headerShown: false }} />
				<Stack.Screen name='Home' component={ScreenComponent['home']} options={{ headerShown: false }} />
				<Stack.Screen name='Login' component={ScreenComponent['login']} options={{ headerShown: false }} />
				<Stack.Screen name='PurchaseReport' component={ScreenComponent['purchasereport']} options={{ headerShown: true, headerTitle:'Laporan Pembelian', headerStyle: {backgroundColor:'#f7e034'} }} />
				<Stack.Screen name='Register' component={ScreenComponent['register']} options={{ headerShown: false }} />
				<Stack.Screen name='SaleReport' component={ScreenComponent['salereport']} options={{ headerShown: true, headerTitle:'Laporan Penjualan', headerStyle: {backgroundColor:'#f7e034'} }} />
				<Stack.Screen name='StockRekapReport' component={ScreenComponent['stockRekapReport']} options={{ headerShown: true, headerTitle:'Laporan Rekap Stok', headerStyle: {backgroundColor:'#f7e034'} }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}