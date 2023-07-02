import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, PermissionsAndroid, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';

const Stack = createNativeStackNavigator()

const AddProductModalComp = ({ ...props }) => {
    // const [data, setData] = useState({ id: '', kode: '', nama: '', hrg_beli: '0', hrg_jual1: '0', hrg_jual2: '0', stok: '0', foto: '' })

    useEffect(() => {
        const getData = async (id) => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'mpprod?id=' + id, { headers: headers })

                if (res.data.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    props.setData(res.data.mpprod[0])
                }

            } catch (e) {
                console.log(e)
            }
        }

        if (props.id) {
            getData(props.id)
        }
    }, [])

    const handleChange = (name: string, value: string) => {
        let temp = Object.assign({}, props.data)
        // let temp = props.data
        temp[name] = value

        // console.log(temp)
        props.setData(temp)
    }

    const openCamera = async () => {
        let permission = await PermissionsAndroid.check('android.permission.CAMERA')
        if (!permission) {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Azol Mart Camera Permission',
                    message: 'Azol Mart needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                })
        }

        try {
            let result = await launchCamera({ saveToPhotos: false, mediaType: 'photo', includeBase64: true })
            let data64 = 'data:' + result.assets[0].type + ';base64,' + result.assets[0].base64

            //set state
            let temp = Object.assign({}, props.data)
            temp['foto'] = data64
            props.setData(temp)
        } catch (e) {
            console.log(e)
        }
    }

    const openGallery = async () => {
        try {
            let result = await launchImageLibrary({ selectionLimit: 1, mediaType: 'photo', includeBase64: true })
            let data64 = 'data:' + result.assets[0].type + ';base64,' + result.assets[0].base64

            //set state
            let temp = Object.assign({}, props.data)
            temp['foto'] = data64
            props.setData(temp)
        } catch (e) {
            console.log(e)
        }
    }

    const save = async () => {
        let token = await AsyncStorage.getItem('token')

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let payload = { 'mpprod': props.data, 'mpprog': [] }

        try {
            let res = await axios.put(URL_API + 'mpprod', payload, config)

            if (res.data.status !== 200) {
                Alert.alert('Error', (res.data.status).toString() + res.data.message)
            } else {
                // props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'main' }],
                // })
            }
        } catch (errors) {
            console.log(errors)
        }

    }

    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1, }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Info Produk</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <Text style={{ width: 250 }}>Foto Produk</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={style.buttonCamera} onPress={() => openGallery()}>
                            <FontAwesome5 name='folder-open' size={18} color={'blue'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.buttonCamera} onPress={() => openCamera()}>
                            <FontAwesome5 name='camera' size={18} color={'blue'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.productImageContainer}>
                    {props.data['foto'] &&
                        <Image style={{ width: 100, height: 100, }} source={{ uri: props.data['foto'] }} />
                    }
                </View>

                <Text style={style.textInputLabel}>Kode</Text>
                <TextInput style={style.textInput} onChangeText={(text) => handleChange('kode', text)} defaultValue={props.data['kode']} returnKeyType='next' />

                <Text style={style.textInputLabel}>Nama</Text>
                <TextInput style={style.textInput} onChangeText={(text) => handleChange('nama', text)} defaultValue={props.data['nama']} returnKeyType='next' />

                <Text style={style.textInputLabel}>Hrg Beli</Text>
                <Text style={style.textInput}>{numberFormat.format(parseFloat(props.data['hrg_beli']))}</Text>

                <Text style={style.textInputLabel}>Hrg Jual Offline</Text>
                <TextInput style={style.textInput} onChangeText={(text) => handleChange('hrg_jual1', text)} defaultValue={props.data['hrg_jual1'] ? parseFloat(props.data['hrg_jual1']).toString() : ''}></TextInput>

                <Text style={style.textInputLabel}>Hrg Jual Online</Text>
                <TextInput style={style.textInput} onChangeText={(text) => handleChange('hrg_jual2', text)} defaultValue={props.data['hrg_jual2'] ? parseFloat(props.data['hrg_jual2']).toString() : ''}></TextInput>

                <Text style={style.textInputLabel}>Stok</Text>
                <Text style={style.textInput}>{numberFormat.format(parseFloat(props.data['stok']))}</Text>

            </View>
        </ScrollView>
    )

}

export default function AddProductModal({ navigation, route }) {
    const [data, setData] = useState({id: '', kode: '', nama: '', hrg_beli: '0', hrg_jual1: '0', hrg_jual2: '0', stok: '0', foto: ''})

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
        let token = await AsyncStorage.getItem('token')

        let config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let payload = { 'mpprod': data, 'mpprog': [] }

        try {
            let res = await axios.put(URL_API + 'mpprod', payload, config)

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
                name='AddProductModalComp'
                options={{
                    headerTransparent: false,
                    headerStyle: { backgroundColor: '#f7e034' },
                    headerShown: true,
                    headerTitle: route.params ? 'Edit Product' : 'Add Product',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickSave()}>
                                <FontAwesome5 name='save' size={18} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            >
                {(props) => <AddProductModalComp {...props} id={route.params?.id} data={data} setData={setData} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}