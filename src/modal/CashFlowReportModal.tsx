import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import SelectDropdown from 'react-native-select-dropdown';
import { URL_API, numberFormat } from '../utils/config';

export default function CashFlowReportModal() {
    const [data, setData] = useState([])
    const [total, setTotal] = useState({ 'debet': 0, 'kredit': 0, })
    const d = new Date()
    const [month, setMonth] = useState(d.getMonth());
    const [year, setYear] = useState(d.getFullYear());
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const years = [d.getFullYear() - 1, d.getFullYear()]

    useEffect(() => {
        const getData = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'utrptcash_flow?periode_y=' +year +'&periode_m=' +(month +1), { headers: headers })

                if (res.data?.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    setData(res.data.report)

                    let debet=0, kredit=0

                    for(let item of res.data.report){
                        debet += parseFloat(item['debet'])
                        kredit += parseFloat(item['kredit'])
                    }

                    setTotal({'debet': debet, 'kredit': kredit})

                }

            } catch (e) {                
                Alert.alert('Server Error', e.response.data.message)
            }
        }
        getData()

    }, [year, month])

    return (
        <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text>Periode :</Text>

                <View style={{ flex: 1, borderWidth: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <SelectDropdown
                        data={months}
                        defaultValueByIndex={month}
                        defaultButtonText='Month'
                        onSelect={(text, index) => setMonth(index)}
                        buttonStyle={[style.dropDown, { width: 150 }]}
                        buttonTextStyle={{ fontSize: 12, }}
                    />

                    <SelectDropdown
                        data={years}
                        defaultValue={year}
                        defaultButtonText='Year'
                        onSelect={(text, index) => setYear(text)}
                        buttonStyle={[style.dropDown, { width: 80, }]}
                        buttonTextStyle={{ fontSize: 12, }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginBottom: 5 }}>
                <Text style={{ flex: 2 }}>Keterangan</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Debet</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Kredit</Text>
            </View>

            {data && data.map((item) => (
                <View key={item['keterangan']} style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ flex: 2 }}>{item['keterangan']}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['debet']))}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['kredit']))}</Text>
                </View>
            ))}

            <View style={{ flexDirection: 'row', marginBottom:5, borderTopWidth: 1 }}>
                <Text style={{ flex: 2, fontWeight: 'bold' }}>Total</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['debet']))}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['kredit']))}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={{ flex: 2, fontWeight: 'bold' }}>Cash on hand</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['kredit'] - total['debet']))}</Text>
            </View>
        </View>
    )
}