import { View, Text, ScrollView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

const DashboarComp = () => {
    const [dataResume, setDataResume] = useState({})
    const [dataDailySales, setDataDailySales] = useState({})
    const [dataTopProduct, setDataTopProduct] = useState([])

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 0.5) => `rgba(243, 168, 113, ${opacity})`,
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
                    console.log(res.data)
                    Alert.alert('Error', res.data.message)
                } else {
                    setDataDailySales(res.data.dailysales)
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

    }, [])

    const Resume = () => (
        <ScrollView horizontal={true} style={style.dashboardResumeContainer}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={[style.dashboardResume, { marginEnd: 10 }]}>
                    <Text style={style.dashboardResumeTitle}>Total Inventori</Text>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_inv']))}</Text>
                    <Text style={style.dashboardResumeFooter}>{numberFormat.format(parseFloat(dataResume['tot_stok']))} Pcs</Text>
                </View>

                <View style={[style.dashboardResume, { marginEnd: 10 }]}>
                    <Text style={style.dashboardResumeTitle}>Penjualan Bulan Ini</Text>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_jual']))}</Text>
                    <Text style={style.dashboardResumeFooter}>Rp.{numberFormat.format(parseFloat(dataResume['tot_profit']))}</Text>
                </View>

                <View style={style.dashboardResume}>
                    <Text style={style.dashboardResumeTitle}>Pembelian Bulan Ini</Text>
                    <Text style={style.dashboardResumeValue}>Rp.{numberFormat.format(parseFloat(dataResume['tot_beli']))}</Text>
                </View>
            </View>
        </ScrollView>
    )

    const DailySales = () => (
        <ScrollView horizontal={true} style={style.dashboarDailySalesContainer}>
            <View style={{ padding: 10 }}>
                <Text style={style.dashboardResumeTitle}>Daily Sales</Text>
                <LineChart
                    data={{
                        labels: dataDailySales['labels'] ? dataDailySales['labels'] : [0],
                        datasets: [{ data: dataDailySales['data'] ? dataDailySales['data'] : [0] }]
                    }}
                    width={620} // from react-native
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
                <Text style={[style.dashboardTopProductTh, { width: 72, textAlign: 'right' }]}>Terjual</Text>
            </View>

            {dataTopProduct && dataTopProduct.map((item, index) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={item['id']}>
                    <View style={{ width: 72, alignContent: 'center' }}>
                        {item['foto'] &&
                            <Image source={{ uri: item['foto'] }} style={style.dashboardTopProductImage} />
                        }
                        {!item['foto'] &&
                            <FontAwesome5 name='camera' size={64} />
                        }
                    </View>
                    <Text style={{ flex: 1 }}>{item['nama']}</Text>
                    <Text style={{ width: 72, textAlign: 'right' }}>{numberFormat.format(item['qty'])}</Text>
                </View>
            ))}

        </View>
    )

    return (
        <ScrollView>
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