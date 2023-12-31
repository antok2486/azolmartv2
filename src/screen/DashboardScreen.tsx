import { View, Text, ScrollView, Alert, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

const DashboarComp = ({ ...props }) => {
    const [dataResume, setDataResume] = useState({})
    const [dataDailySales, setDataDailySales] = useState({ 'labels': ['0'], 'data': [0] })
    const [dataTopProduct, setDataTopProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 0.8) => `rgba(243, 168, 113, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        decimalPlaces: 0
    };

    useEffect(() => {
        const getDataDailySales = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'utdailysales', { headers: headers })

                if (res.data.status !== 200) {
                    // console.log(res.data)
                    Alert.alert('Error', res.data.message)
                } else {
                    if (res.data.dailysales) {
                        // cast float value
                        res.data.dailysales['data'].forEach((element, index) => {
                            res.data.dailysales['data'][index] = parseFloat(res.data.dailysales['data'][index])
                        });

                        setDataDailySales(res.data.dailysales)
                    }

                    console.log(res.data.dailysales)
                }

            } catch (e) {
                console.log(e)
            }
        }

        const getDataResume = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'utresm', { headers: headers })

                if (res.data.status !== 200) {
                    console.log(res.data)
                    Alert.alert('Error', res.data.message)
                } else {
                    setDataResume(res.data.resume)
                }

            } catch (e) {
                console.log(e)
            }
        }

        const getDataTopProduct = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'uttopproduct', { headers: headers })

                if (res.data.status !== 200) {
                    console.log(res.data)
                    Alert.alert('Error', res.data.message)
                } else {
                    setDataTopProduct(res.data.topProduct)
                    // console.log(res.data.topProduct)
                }

            } catch (e) {
                console.log(e)
            }

        }

        getDataResume()
        getDataDailySales()
        getDataTopProduct()

        setRefreshing(false)

    }, [refreshing])

    const Resume = () => (
        <ScrollView horizontal={true} style={style.dashboardResumeContainer}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={[style.dashboardResume, { marginEnd: 10 }]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[style.dashboardResumeTitle, { flex: 1, justifyContent:'space-between' }]}>Total Inventori</Text>
                        <FontAwesome5 name="box" color={'#ffac45'} size={16} />
                    </View>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_inv']))}</Text>
                    <Text style={[style.dashboardResumeFooter, { color: '#bc5307' }]}>{numberFormat.format(parseFloat(dataResume['tot_stok']))} Pcs</Text>
                </View>

                <View style={[style.dashboardResume, { marginEnd: 10 }]}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text style={style.dashboardResumeTitle}>Penjualan Bulan Ini</Text>
                        <FontAwesome5 name='cart-plus' size={16} color={'#ffac45'}/>
                    </View>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_jual']))}</Text>
                    <Text style={[style.dashboardResumeFooter, { color: parseFloat(dataResume['tot_profit']) > 0 ? 'green' : 'red' }]}>Rp.{numberFormat.format(parseFloat(dataResume['tot_profit']))}</Text>
                </View>

                <View style={style.dashboardResume}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text style={style.dashboardResumeTitle}>Pembelian Bulan Ini</Text>
                        <FontAwesome5 name='shopping-basket' size={16} color={'#ffac45'}/>
                    </View>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_beli']))}</Text>
                </View>
            </View>
        </ScrollView>
    )

    const DailySales = () => (
        <ScrollView horizontal={true} style={style.dashboarDailySalesContainer} >
            <View style={{ padding: 10 }}>
                <Text style={style.dashboardResumeTitle}>Daily Sales 30 hari terakhir</Text>
                <LineChart
                    data={{
                        labels: dataDailySales['labels'] ? dataDailySales['labels'] : ['0'],
                        datasets: [{ data: dataDailySales['data'] ? dataDailySales['data'] : [0] }]
                    }}
                    width={720} // from react-native
                    height={220}
                    yAxisLabel="Rp."
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        marginTop: 5,
                        borderRadius: 10,
                        backgroundColor: '#fff'
                    }}
                />

            </View>
        </ScrollView>
    )

    const TopProduct = () => (
        <View style={[style.dashboarTopProductContainer, {}]}>
            <Text style={style.dashboardResumeTitle}>Top Product</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[style.dashboardTopProductTh, { width: 72 }]} />
                <Text style={[style.dashboardTopProductTh, { flex: 1 }]}>Nama Produk</Text>
                <Text style={[style.dashboardTopProductTh, { width: 52, textAlign: 'right' }]}>Terjual</Text>
                <Text style={[style.dashboardTopProductTh, { width: 52, textAlign: 'right' }]}>Stok</Text>
            </View>

            {dataTopProduct && dataTopProduct.map((item, index) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={item['id']}>
                    {/* <View style={{ width: 72, alignContent: 'center' }}> */}
                    <TouchableOpacity style={{ width: 72, alignContent: 'center' }} onPress={() => props.navigation.navigate('AddProduct', { id: item['id'] })} >
                        {item['foto'] &&
                            <Image source={{ uri: item['foto'] }} style={style.dashboardTopProductImage} />
                        }
                        {!item['foto'] &&
                            <FontAwesome5 name='camera' size={64} />
                        }
                    </TouchableOpacity>
                    {/* </View> */}

                    <Text style={[parseFloat(item['stok']) === 0 ? style.textError : null, { flex: 1 }]}>{item['nama']}</Text>
                    <Text style={[parseFloat(item['stok']) === 0 ? style.textError : null, { width: 52, textAlign: 'right' }]}>{numberFormat.format(item['qty'])}</Text>
                    <Text style={[parseFloat(item['stok']) === 0 ? style.textError : null, { width: 52, textAlign: 'right' }]}>{numberFormat.format(item['stok'])}</Text>
                </View>
            ))}

        </View>
    )

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}>
            {Resume()}
            {DailySales()}
            {TopProduct()}
        </ScrollView>
    )
}

export default function DashboardScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='DashboarScreenComp'
                component={DashboarComp}
                options={{
                    headerTransparent: false,
                    headerStyle: { backgroundColor: '#f7e034' },
                    headerTitle: 'Dashboard',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}