import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

export default function OthScreen({navigation, route}) {
    const [userName, setUserName] = useState('')
    
    useEffect(() => {
        const getUserInfo = async () => {
            let userName_ = await AsyncStorage.getItem('username')
            setUserName(userName_)
        }

        getUserInfo()
    }, [])

    const handleClickLogout = async () => {
        Alert.alert('Sign Out', 'Are you sure you want to exit?', [
            { text: 'Cancel', onPress: () => null, style: 'cancel', },
            { text: 'Yes', onPress: () => logout() },
        ]);
    }

    const logout = async () => {
        try{
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('username')
    
            navigation.reset({index: 0,routes: [{ name: 'Login' }],})
    
        }catch(e){
            console.log(e)
        }

    }

    return (
        <ScrollView>
                <View style={{padding:10, height:80, flexDirection:'row', backgroundColor:'#fff', borderWidth:1, borderColor: "#dee2e6", elevation:5, justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row', flex:1}}>
                        <FontAwesome5 name='user' size={18}/><Text style={{flex:1}}> {userName}</Text>
                    </TouchableOpacity>                    

                    <TouchableOpacity style={{flex:1, alignItems:'flex-end', borderWidth:0}} onPress={() => handleClickLogout()}>
                        <FontAwesome5 name='sign-out-alt' size={18}/>
                    </TouchableOpacity>
                </View>

                <View style={{padding:10, marginTop:10, backgroundColor:'#fff', borderWidth:0, borderColor: "#dee2e6", elevation:5}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Laporan</Text>

                    <TouchableOpacity style={{flexDirection:'row', height:40, alignItems:'center'}} onPress={() => navigation.navigate('SaleReport')}>
                        <FontAwesome5 name='cash-register' size={18} /><Text style={{flex:1 }}> Penjualan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', height:40, alignItems:'center'}} onPress={() => navigation.navigate('PurchaseReport')}>
                        <FontAwesome5 name='shopping-basket' size={18} /><Text style={{flex:1}}> Pembelian</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', height:40, alignItems:'center'}} onPress={() => navigation.navigate('StockRekapReport')}>
                        <FontAwesome5 name='swatchbook' size={18} /><Text style={{flex:1}}> Laporan Stok</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', height:40, alignItems:'center'}} onPress={() => navigation.navigate('CashFlowReport')}>
                        <FontAwesome5 name='file-invoice-dollar' size={18} /><Text style={{flex:1}}> Laporan Kas</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    )
}