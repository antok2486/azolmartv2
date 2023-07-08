import { View, Text, TextInput, Switch, TouchableOpacity, Alert, ScrollView, Image, FlatList, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

const Stack = createNativeStackNavigator()

const AddSaleComp = ({ ...props }) => {
    const [totHarga, setTotHarga] = useState(0)

    useEffect(() => {
        const sumTotal = () => {
            let tot = 0
            for (let item of props.dataCart) {
                tot += parseFloat(item.qty) * (parseFloat(item.hrg_jual1) - parseFloat(item.disc))
            }

            setTotHarga(tot)
        }

        sumTotal()

    }, [])


    const handleChangeD = (index, name, value) => {
        let temp = props.dataCart.map(l => Object.assign({}, l))
        let tot = 0

        if (!value) { value = '0' }

        temp[index][name] = parseFloat(value)

        //hitung harga
        temp[index]['hrg_jual'] = temp[index]['hrg'] - temp[index]['disc']
        temp[index]['tot_hrg'] = temp[index]['qty'] * (temp[index]['hrg'] - temp[index]['disc'])

        for (let item of temp) {
            // tot += parseFloat(item.qty) * (parseFloat(item.hrg_jual) - parseFloat(item.disc))
            tot += parseFloat(item['tot_hrg'])
        }

        props.setDataCart(temp)
        setTotHarga(tot)
    }

    const handleChangeH = (name, value) => {
        let temp = Object.assign({}, props.dataH)
        temp[name] = value

        props.setDataH(temp)

        //ganti harga
        if (name === 'flag_harga') {
            let tot = 0
            let keyHarga = value ? 'hrg_jual2' : 'hrg_jual1'
            let tempD = props.dataCart.map(l => Object.assign({}, l))
            for (let item of tempD) {
                item['hrg'] = item[keyHarga]
                item['hrg_jual'] = item[keyHarga] - item['disc']
                item['tot_hrg'] = item['qty'] * (item[keyHarga] - item['disc'])

                tot += item['tot_hrg']
            }

            props.setDataCart(tempD)
            setTotHarga(tot)
        }
    }

    const handleClickDelete = (index) => {
        let temp = props.dataCart.map(l => Object.assign({}, l))
        let temp_= []
        let tot = 0

        temp.forEach((el, i) => {
            if(i !== index){temp_.push(el)}
        })

        for (let item of temp_) {
            tot += parseFloat(item.qty) * (parseFloat(item.hrg_jual1) - parseFloat(item.disc))
        }

        props.setDataCart(temp_)
        setTotHarga(tot)
    }

    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nama Pembeli</Text>
                <TextInput style={style.textInput} defaultValue={props.dataH.keterangan} onChangeText={(text) => handleChangeH('keterangan', text)} />

                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                    <Text style={{ marginEnd: 20, width:150 }}>Penjualan Online :</Text>
                    <Switch value={props.dataH['flag_harga']} onValueChange={(value) => handleChangeH('flag_harga', value)} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', width: 74, borderWidth: 0 }}>Detail Brg</Text>
                <Text style={{ flex: 3, textAlign: 'right', borderWidth: 0 }}>Harga</Text>
                <Text style={{ flex: 2, textAlign: 'right', borderWidth: 0 }}>Qty</Text>
                <Text style={{ flex: 2, textAlign: 'right', borderWidth: 0 }}>Disc</Text>
                <Text style={{ flex: 3, textAlign: 'right', borderWidth: 0 }}>Hrg Jual</Text>
            </View>

            <ScrollView>
                {props.dataCart && props.dataCart?.map((item, index) => (
                    <View style={style.saleContainerProduk} key={index}>
                        <View style={{ flexDirection: 'row', borderWidth: 0, flex: 1, alignItems: 'center' }}>
                            <View style={style.saleProductImageContainer}>
                                {item['foto'] &&
                                    <Image source={{ uri: item['foto'] }} style={style.saleProductImage} />
                                }

                                {!item['foto'] &&
                                    <FontAwesome5 name='camera' size={64} />
                                }
                                
                                <TouchableOpacity style={style.saleButtonRemove} onPress={() => handleClickDelete(index)}>
                                    <FontAwesome5 name='trash' size={18} color={'blue'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderWidth: 0, flexShrink: 1, flex: 1 }}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                    <Text style={{ flex: 3 }}>{item.nama}</Text>
                                    <Text style={{ flex: 2, textAlign: 'right' }}>Rp.{numberFormat.format(item['tot_hrg'])}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1, borderWidth: 0, alignItems: 'center' }}>
                                    <Text style={{ flex: 3, textAlign: 'right' }}>Rp.{numberFormat.format(item['hrg'])}</Text>
                                    <TextInput style={[style.textInputQty, { flex: 2 }]} blurOnSubmit={false} defaultValue={parseFloat(item['qty']).toString()} onChangeText={(text) => handleChangeD(index, 'qty', text)} />
                                    <TextInput style={[style.textInputQty, { flex: 2 }]} defaultValue={parseFloat(item['disc']).toString()} onChangeText={(text) => handleChangeD(index, 'disc', text)} />
                                    <Text style={{ flex: 3, textAlign: 'right' }}>Rp.{numberFormat.format(item['hrg_jual'])}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                ))}
            </ScrollView>

            <View style={style.saleContainerTotal}>
                <Text style={style.textTotal}>Total Harga</Text>
                <Text style={style.textTotal}>Rp.{numberFormat.format(totHarga)}</Text>
            </View>
        </View>
    )
}

export default function AddSaleModal({ navigation, route }) {
    const [dataCart, setDataCart] = useState(route.params.dataCart)
    // const dataCart = route.params.dataCart
    // const setDataCart = route.params.setDataCart

    const [dataH, setDataH] = useState({ keterangan: '', flag_harga: false })

    const handleClickBack = () => {
        navigation.navigate({
            name: 'ProductScreen',
            params: { dataCart: dataCart },
            merge: true,
          });
    }

    const handleClickSave = () => {
        Alert.alert('Konfirmasi', 'Apakah data yang diinput sudah benar', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
            { text: 'OK', onPress: () => save() },
        ]);

    }

    const save = async () => {
        //create trsalh array
        let trsald = []

        for (let item of dataCart) {
            let row = { id_produk: item['id'], qty: item['qty'], hrg_beli: item['hrg_beli'], hrg_jual: item['hrg'], disc: item['disc'] }
            trsald.push(row)
        }

        let token = await AsyncStorage.getItem('token')

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let payload = { 'trsalh': dataH, 'trsald': trsald }
        // console.log(payload)
        try {
            let res = await axios.put(URL_API + 'trsale', payload, config)

            if (res.data.status !== 200) {
                Alert.alert('Error', (res.data.status).toString() + res.data.message)
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            }
        } catch (errors) {
            console.log(errors)
        }

    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ProductComp'
                options={{
                    headerTransparent: false,
                    headerStyle: { backgroundColor: '#f7e034' },
                    headerShown: true,
                    headerTitle: 'Add Sales',
                    // headerBackTitleVisible:false,
                    headerBackVisible:false,
                    headerLeft: () => (
                        <TouchableOpacity style={{width:40}} onPress={() => handleClickBack()}>
                            <FontAwesome5 name='arrow-circle-left' size={24} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickSave()}>
                                <FontAwesome5 name='save' size={18} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            >
                {(props) => <AddSaleComp {...props} dataCart={dataCart} setDataCart={setDataCart} dataH={dataH} setDataH={setDataH} navigation={navigation} />}
                {/* {({route, navigation}) => <AddSaleModalComp dataCart={dataCart} setDataCart={setDataCart} dataH={dataH} setDataH={setDataH} navigation={navigation} />} */}
            </Stack.Screen>
        </Stack.Navigator>
    )
}