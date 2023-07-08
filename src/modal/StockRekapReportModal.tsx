import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

export default function StockRekapReportModal() {
    const [data, setData] = useState([])
    const [total, setTotal] = useState({ 'qty': 0, 'nilai': 0 })

    useEffect(() => {
        const getData = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'utrptstok_rkp', { headers: headers })

                if (res.data.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    setData(res.data.report)

                    let qty_ = parseFloat(res.data.report[0]['qty']) + parseFloat(res.data.report[1]['qty']) - parseFloat(res.data.report[2]['qty'])
                    let nilai_ = parseFloat(res.data.report[0]['nilai']) + parseFloat(res.data.report[1]['nilai']) - parseFloat(res.data.report[2]['nilai'])

                    setTotal({'qty': qty_, 'nilai': nilai_})
                }

            } catch (e) {
                Alert.alert('Server Error', e.response.data.message)
            }
        }
        getData()

    }, [])

    return (
        <View style={{padding:10}}>
            <Text style={{fontWeight:'bold', marginBottom:10}}>Rekap Stok</Text>

            <View style={{ flexDirection: 'row', borderBottomWidth:1, marginBottom:5 }}>
                <Text style={{ flex: 2 }}>Keterangan</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Qty</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Nilai</Text>
            </View>

            {data && data.map((item) => (
                <View key={item['keterangan']} style={{ flexDirection: 'row', marginBottom:5 }}>
                    <Text style={{ flex: 2 }}>{item['keterangan']}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['qty']))}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['nilai']))}</Text>
                </View>
            ))}

            <View style={{ flexDirection: 'row', borderTopWidth:1 }}>
                <Text style={{ flex: 2, fontWeight:'bold' }}>Stok Akhir</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['qty']))}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['nilai']))}</Text>
            </View>
        </View>
    )
}