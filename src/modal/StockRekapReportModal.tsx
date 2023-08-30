import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import SelectDropdown from 'react-native-select-dropdown';
import { URL_API, numberFormat } from '../utils/config';

export default function StockRekapReportModal() {
    const [data, setData] = useState([])
    const [total, setTotal] = useState({ 'qty': 0, 'nilai': 0, 'saldoMitra': 0 })
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

                let res = await axios.get(URL_API + 'utrptstok_rkp?periode_y=' + year + '&periode_m=' + (month + 1), { headers: headers })

                if (res.data?.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    setData(res.data.report)

                    if (res.data.report.length < 6) {
                        setTotal({ 'qty': 0, 'nilai': 0, 'saldoMitra': 0 })
                        return
                    }

                    let qty = parseFloat(res.data.report[0]['qty']) +
                        parseFloat(res.data.report[2]['qty'])

                    let saldoMitra = parseFloat(res.data.report[1]['qty']) +
                        parseFloat(res.data.report[3]['qty']) -
                        parseFloat(res.data.report[5]['qty'])

                    let nilai = parseFloat(res.data.report[0]['nilai']) +
                        parseFloat(res.data.report[2]['nilai']) -
                        parseFloat(res.data.report[4]['nilai'])

                    setTotal({ 'qty': qty, 'nilai': nilai, 'saldoMitra': saldoMitra })
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
                <Text style={{ fontWeight: 'bold', }}>Rekap Stok</Text>

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

            <View style={{ height:24, borderWidth: 0, flexDirection: 'row', }}>
                <TouchableOpacity style={{marginEnd:10}} onPress={() => setMonth(month -1)}><FontAwesome5 name='caret-left' size={18} /></TouchableOpacity>
                <Text>{months[month]}</Text>
                <TouchableOpacity style={{marginStart:10}} onPress={() => setMonth(month +1)}><FontAwesome5 name='caret-right' size={18} /></TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginBottom: 5 }}>
                <Text style={{ flex: 2 }}>Keterangan</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Qty</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>Nilai</Text>
            </View>

            {data && data.map((item) => (
                <View key={item['keterangan']} style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ flex: 2 }}>{item['keterangan']}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['qty']))}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(item['nilai']))}</Text>
                </View>
            ))}

            <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
                <Text style={{ flex: 2, fontWeight: 'bold' }}>Stok Akhir Barang</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['qty']))}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['nilai']))}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 2, fontWeight: 'bold' }}>Saldo Akhir Mitra</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{numberFormat.format(Math.ceil(total['saldoMitra']))}</Text>
            </View>
        </View>
    )
}