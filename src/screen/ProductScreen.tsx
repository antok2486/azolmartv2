import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, FlatList, RefreshControl, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { style } from '../utils/style';
import { URL_API, numberFormat } from '../utils/config';
import { useFocusEffect } from '@react-navigation/native';
// import { useNavigation, useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ProductComp = ({ ...props }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            let token = await AsyncStorage.getItem('token')

            try {
                let headers = {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + token
                }

                let res = await axios.get(URL_API + 'mpprod?page=' + page + '&filter=' + props.filter, { headers: headers })

                if (res.data.status !== 200) {
                    Alert.alert(res.data.errors)
                } else {
                    let temp = data.map(l => Object.assign({}, l))

                    if (page === 0) {
                        temp = []
                    }

                    for (let row of res.data.mpprod) {
                        temp.push(row)
                    }

                    setData(temp)
                    setRefreshing(false)
                }

            } catch (e) {
                console.log(e)
            }
        }

        //do filter 
        if (props.filter !== filter) {
            // console.log('filter changed')
            setFilter(props.filter)

            if (page === 0) { //call getdata only if page=0
                getData()
            } else {
                setPage(0)  //getdata called by this
            }
        } else {
            getData()
        }

    }, [page, props.filter, refreshing])

    const addToCart = (item) => {
        //topup pulsa
        if (item['id'] === 0) {
            return props.navigation.navigate('AddSalePulsa')
        }

        //protect stock
        if(item['stok'] <= 0){
            return Alert.alert('Tidak ada stok', 'Stok tidak mencukupi. Silahkan kulakan !')
        }

        //check wheter item already exists
        if (!props.dataCart.find(key => key.id === item.id)) {
            item['qty'] = 1
            item['disc'] = 0
            item['flag_harga'] = 0
            item['hrg'] = item['hrg_jual1'] //hrg sebelum diskon
            item['hrg_jual'] = item['hrg_jual1']    //hrg setelah diskon
            item['tot_hrg'] = item['hrg_jual1']     //qty * hrg setelah diskon
            props.setDataCart((dataCart: any) => [item, ...dataCart])
        }
    }

    const addToBasket = (item) => {
        //topup pulsa
        if (item['id'] === 0) {
            return props.navigation.navigate('AddPurchasePulsa')
        }

        //topup iklan
        if (item['id'] === -1) {
            return props.navigation.navigate('AddPurchaseIklan')
        }

        //topup iklan
        if (item['id'] === -2) {
            return props.navigation.navigate('AddPurchaseIklan', {atk: true})
        }

        //check wheter item already exists
        if (!props.dataBasket.find(key => key.id === item.id)) {
            item['qty'] = 0
            item['hrg'] = item['hrg_beli']
            item['disc'] = 0
            item['tot_hrg'] = 0
            props.setDataBasket((dataBasket: any) => [item, ...dataBasket])
        }
    }

    const Item = ({ item }) => (
        <View style={style.product} key={item['id']}>
            <TouchableOpacity onPress={() => props.navigation.navigate('AddProduct', { id: item['id'] })} style={{ alignItems: 'center' }}>
                {item['foto'] &&
                    <Image source={{ uri: item['foto'] }} style={style.productImage} />
                }
                {!item['foto'] &&
                    <View style={style.productImage}><FontAwesome5 name='camera' size={64} /></View>
                }
            </TouchableOpacity>

            <View>
                <View style={style.productButton}>
                    <TouchableOpacity onPress={() => addToBasket(item)}>
                        <FontAwesome5 name='shopping-basket' size={16} color={'#ffac45'}></FontAwesome5>
                    </TouchableOpacity>

                    {item && item['id'] !== -1 && item['id'] !== -2 &&
                        <TouchableOpacity onPress={() => addToCart(item)}>
                            <FontAwesome5 name='cart-plus' size={16} color={'#ffac45'}></FontAwesome5>
                        </TouchableOpacity>
                    }
                </View>

                <View style={style.productInfo}>
                    <Text style={{ fontWeight: 'bold', }} onPress={() => props.navigation.navigate('AddProduct', { id: item['id'] })}>{item['nama']}</Text>

                    <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', color: '#000', width: 100, }}>Rp{numberFormat.format(item['hrg_jual1'])}</Text>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', width: 100, marginTop: 3 }}>Rp{numberFormat.format(item['hrg_beli'])}</Text>
                    </View>

                    <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', width: 100, }}>Rp{numberFormat.format(item['hrg_jual2'])}</Text>
                        <Text style={{ fontSize: 10, fontWeight: 'bold', width: 100, marginTop: 3 }}>{item['id'] === 0 ? 'Rp.' : ''}{numberFormat.format(item['stok'])} {item['id'] !== 0 ? 'Pcs' : ''}</Text>
                    </View>

                </View>
            </View>
        </View>
    )

    return (
        <View style={style.productContainer}>
            <FlatList
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                onEndReached={() => setPage(page + 1)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
            />

            <TouchableOpacity style={style.floatingButton} onPress={() => props.navigation.navigate('AddProduct')}>
                {/* <MaterialIcons name='add-to-photos' size={24} /> */}
                <FontAwesome5 name='folder-plus' size={24} />
            </TouchableOpacity>

        </View>
    )
}

export default function ProductScreen({ navigation, route }) {
    const [dataCart, setDataCart] = useState([])
    const [dataBasket, setDataBasket] = useState([])
    const [filter, setFilter] = useState('')
    const [textFilter, setTextFilter] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert('Exit Azol Mart', 'Are you sure you want to exit?', [
                    { text: 'Cancel', onPress: () => null, style: 'cancel', },
                    { text: 'Yes', onPress: () => {
                        navigation.reset({ index: 0, routes: [{ name: 'Login', params: {isExit: true} }], })
                        BackHandler.exitApp()
                    } },
                ]);
                return true;
            };
    
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction, );
    
            return () => backHandler.remove();    

        }, [])
    )

    useEffect(() => {
        if (route.params?.dataCart) (
            setDataCart(route.params?.dataCart)
        )

        if (route.params?.dataBasket) {
            setDataBasket(route.params?.dataBasket)
        }

    }, [route.params?.dataCart, route.params?.dataBasket])

    const handleClickFilter = () => {
        setFilter(textFilter)
    }

    const handleClearFilter = () => {
        setFilter('')
        setTextFilter('')
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ProductComp'
                options={{
                    headerTransparent: false,
                    headerStyle: { backgroundColor: '#f7e034' },
                    headerShown: true,
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {filter &&
                                <TouchableOpacity style={style.headerButtonClearFilter} onPress={() => handleClearFilter()}>
                                    <FontAwesome5 name='times' size={18} />
                                </TouchableOpacity>
                            }

                            <TextInput placeholder='Pencarian' style={[style.headerInputFilter, { paddingStart: filter ? 28 : 15 }]} defaultValue={textFilter} onChangeText={(text) => setTextFilter(text)} onEndEditing={() => handleClickFilter()} />

                            <TouchableOpacity style={style.headerButtonSearch} onPress={() => handleClickFilter()}>
                                <FontAwesome5 name='search' size={18} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ width: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('AddPurchase', { dataBasket: dataBasket })}>
                                <FontAwesome5 name='shopping-basket' size={18} />
                                {dataBasket.length !== 0 &&
                                    <Text style={style.headerBadge}>{dataBasket.length}</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('AddSale', { dataCart: dataCart })}>
                                <FontAwesome5 name='shopping-cart' size={18} />
                                {dataCart.length !== 0 &&
                                    <Text style={style.headerBadge}>{dataCart.length}</Text>
                                }
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => navigation.navigate('AddSalePulsa')}>
                                <FontAwesome5 name='mobile-alt' size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('AddPurchasePulsa')}>
                                <FontAwesome5 name='charging-station' size={18} />
                            </TouchableOpacity> */}
                        </View>
                    )
                }}
            >
                {(props) => <ProductComp {...props} dataCart={dataCart} setDataCart={setDataCart} dataBasket={dataBasket} setDataBasket={setDataBasket} filter={filter} />}
            </Stack.Screen>

        </Stack.Navigator>
    )
}