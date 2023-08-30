import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

export default function SaleOnlineReportScreen({navigation, route}) {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [filterA, setFilterA] = useState('')
    const [textFilter, setTextFilter] = useState('')

    useEffect(() => {
        const getData = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'trsale?flag_harga=2&page=' + page + '&filter=' + filter, { headers: headers })

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

        if(filter !== filterA){
            setFilterA(filter)

            if (page === 0) { //call getdata only if page=0
                getData()
            } else {
                setPage(0)  //getdata called by this
            }

        }else{
            getData()
        }
        
    }, [page, filter])

    const handleClearFilter = () => {
        setFilter('')
        setTextFilter('')
    }

    const handleClickFilter = () => {
        setFilter(textFilter)
    }

    const handleClickValid = (idSale) => {
        navigation.navigate('ValidSale', { idSale: idSale })
    }

    const Item = ({ item }) => (
        <View style={{ borderWidth: 1, borderColor: '#dee2e6', backgroundColor: '#fff', marginBottom: 10, elevation: 5 }}>
            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#dee2e6', }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', borderWidth: 0, alignItems: 'center' }}>
                        {item['flag_harga'] === 2 &&
                            <View style={{ marginEnd: 5 }}><FontAwesome5 name='store' color={'blue'} /></View>
                        }
                        <Text style={{ flex: 1 }}>{item['keterangan']}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, width: 100 }}>{item['kode']}</Text>

                        {item['flag_valid'] === 0 &&
                            <TouchableOpacity style={{ backgroundColor: '#93f9ba', borderRadius: 5, paddingVertical: 2, paddingHorizontal: 5 }} onPress={() => handleClickValid(item['id'])}>
                                <Text style={{ fontSize: 10, color: '#036829', fontStyle: 'italic', fontWeight: 'bold' }}>Selesaikan</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ width: 80, borderWidth: 0, alignItems: 'flex-end' }}>
                    <Text style={style.textNumber}>Rp.{numberFormat.format(item['hrg_jual'])}</Text>
                    <Text style={[style.textNumber, { fontSize: 10 }]}>{numberFormat.format(parseFloat(item['hrg_jual']) - parseFloat(item['hrg_beli']))}</Text>
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
        <React.Fragment>
            <View style={{ flexDirection: 'row', height:52, paddingHorizontal:5, alignItems:'center' }}>
                {filter &&
                    <TouchableOpacity style={style.headerButtonClearFilter} onPress={() => handleClearFilter()}>
                        <FontAwesome5 name='times' size={18} />
                    </TouchableOpacity>
                }

                <TextInput placeholder='Pencarian' style={[style.headerInputFilter, { flex:1, paddingStart: filter ? 28 : 15 }]} defaultValue={textFilter} onChangeText={(text) => setTextFilter(text)} onEndEditing={() => handleClickFilter()} />

                <TouchableOpacity style={style.headerButtonSearch} onPress={() => handleClickFilter()}>
                    <FontAwesome5 name='search' size={18} />
                </TouchableOpacity>

            </View>

            <FlatList
                // style={{ borderWidth: 0, padding: 10 }}
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                onEndReached={() => setPage(page + 1)}
            />

        </React.Fragment>
    )
}