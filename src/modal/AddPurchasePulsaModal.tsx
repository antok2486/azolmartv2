import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Switch, } from 'react-native'
import React, { useEffect, useState, } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { style } from '../utils/style';
import { URL_API } from '../utils/config';

const Stack = createNativeStackNavigator();

const AddPurchasePulsaComp = ({ ...props }) => {
    const handleChange = (name, value) => {
        let temp = Object.assign({}, props.data)
        temp[name] = value

        props.setData(temp)
    }

    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nominal</Text>
                <TextInput style={style.textInput} defaultValue={props.namaCustomer} onChangeText={(text) => handleChange('nominal', text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Harga Beli</Text>
                <TextInput style={style.textInput} defaultValue={props.namaCustomer} onChangeText={(text) => handleChange('hrg_beli', text)} />
            </View>
        </View>
    )
}

export default function AddPurchasePulsaModal({navigation, route}) {
    const [data, setData] = useState({})

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

        let payload = { 'trpurd': data }
        
        try {
            let res = await axios.put(URL_API + 'trpurd', payload, config)

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
                name='addpurchaseComp'
                options={{
                    headerTitle: 'Input Isi Saldo Pulsa/Token',
                    headerStyle: {
                        backgroundColor: '#f7e034'
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleClickSave()}>
                                <FontAwesome5 name='save' size={16} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            >
                {(props) => <AddPurchasePulsaComp {...props} data={data} setData={setData} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}