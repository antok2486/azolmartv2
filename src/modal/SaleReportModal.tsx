import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

export default function SaleReportModal() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        const getData = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'trsale?page=' + page, { headers: headers })

                if (res.data.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    let temp = data.map(l => Object.assign({}, l))

                    if (page === 0) {
                        temp = []
                    }

                    for (let row of res.data.trsale) {
                        temp.push(row)
                    }

                    setData(temp)
                    // console.log(temp)
                    // setLoading(false)
                    // console.log('page ' + page + ' row ' + res.data.mpprod.length + ' of ' + temp.length)
                }

            } catch (e) {
                Alert.alert('Server Error', e.response.data.message)
            }
        }
        // console.log('masuk')
        getData()

    }, [page])

    const Item = ({ item }) => (
        <View style={{ borderWidth: 1, borderColor: '#dee2e6', backgroundColor: '#fff', marginBottom: 10, elevation: 5 }}>
            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#dee2e6', }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', borderWidth:0, alignItems: 'center' }}>
                        {item['flag_harga'] === 2 &&
                            <View style={{ marginEnd: 5 }}><FontAwesome5 name='store' color={'#ffac45'} /></View>
                        }
                        <Text>{item['keterangan']}</Text>
                    </View>
                    <Text style={{ fontSize: 10, flex:1 }}>{item['kode']}</Text>
                </View>

                <View style={{ width: 80, borderWidth: 0, alignItems: 'flex-end' }}>
                    <Text style={style.textNumber}>Rp.{numberFormat.format(item['hrg_jual'])}</Text>
                    <Text style={[style.textNumber,{ fontSize: 10 }]}>{numberFormat.format(parseFloat(item['hrg_jual']) - parseFloat(item['hrg_beli']))}</Text>
                </View>

                <TouchableOpacity style={{ width: 42, alignItems: 'flex-end', borderWidth: 0 }}>
                    <FontAwesome5 name='trash' size={16} color={'blue'} />
                </TouchableOpacity>
            </View>



            <View style={{ padding: 10 }}>
                {item['detail'] && item['detail'].map((detail) => (
                    <Text key={detail['id']}>{detail['nama_produk']} @Rp {numberFormat.format(detail['hrg_jual'] - detail['disc'])} {numberFormat.format(detail['qty'])} Pcs</Text>
                ))}
            </View>
        </View>
    )

    return (
        <FlatList
            // style={{ borderWidth: 0, padding: 10 }}
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => setPage(page + 1)}
        />
    )
}