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

const AddPurchaseComp = ({ ...props }) => {
	// const [dataBasket, setDataBasket] = useState(props.dataBasket)
	const [totHarga, setTotHarga] = useState(0)

	useEffect(() => {
		const sumTotal = () => {
			let tot = 0
			for (let item of props.dataBasket) {
				tot += parseFloat(item.qty) * parseFloat(item.hrg_beli)
			}

			setTotHarga(tot)
		}

		sumTotal()

	}, [])

	const handleChangeD = (index, name, value) => {
		// let temp = dataBasket
		let temp = props.dataBasket.map(l => Object.assign({}, l))
		let tot = 0

		if (!value) { value = '0' }

		temp[index][name] = parseFloat(value)

		//hitung harga
		temp[index]['hrg_beli'] = temp[index]['hrg'] - temp[index]['disc']
		temp[index]['tot_hrg'] = temp[index]['qty'] * (temp[index]['hrg'] - temp[index]['disc'])

		//hitung total
		for (let item of temp) {
			tot += parseFloat(item.qty) * parseFloat(item.hrg_beli)
		}
		// console.log(tot)
		props.setDataBasket(temp)
		setTotHarga(tot)
	}

	const handleChangeH = (name, value) => {
		let temp = Object.assign({}, props.dataH)
		temp[name] = value

		props.setDataH(temp)
	}

	const handleClickDelete = (index) => {
		let temp = props.dataBasket.map(l => Object.assign({}, l))
		let temp_ = []
		let tot = 0

		temp.forEach((el, i) => {
			if (i !== index) { temp_.push(el) }
		})

		for (let item of temp_) {
			tot += parseFloat(item.qty) * (parseFloat(item.hrg_jual1) - parseFloat(item.disc))
		}

		props.setDataBasket(temp_)
		setTotHarga(tot)
	}

	return (
		<View style={{ height: '100%', width: '100%', backgroundColor: '#fff', }}>
			<View style={{ padding: 10 }}>
				<Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Nama Supplier</Text>
				<TextInput style={style.textInput} defaultValue={props.dataH['keterangan']} onChangeText={(text) => handleChangeH('keterangan', text)} />

				<Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>No. Nota</Text>
				<TextInput style={style.textInput} defaultValue={props.dataH['no_nota']} onChangeText={(text) => handleChangeH('no_nota', text)} />
			</View>

			<View style={{ flexDirection: 'row', padding: 10 }}>
				<Text style={{ fontWeight: 'bold', width: 74, borderWidth: 0 }}>Detail Brg</Text>
				<Text style={{ flex: 3, textAlign: 'right', borderWidth: 0 }}>Harga</Text>
				<Text style={{ flex: 2, textAlign: 'right', borderWidth: 0 }}>Qty</Text>
				<Text style={{ flex: 2, textAlign: 'right', borderWidth: 0 }}>Disc</Text>
				<Text style={{ flex: 3, textAlign: 'right', borderWidth: 0 }}>Hrg Beli</Text>
			</View>

			<ScrollView style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: '#dee2e6' }}>
				{props.dataBasket && props.dataBasket.map((item, index) => (
					// <View style={style.containerProduk} key={index}>
					<View style={{ flexDirection: 'row', borderWidth: 0, flex: 1, alignItems: 'center', marginBottom: 10 }} key={index}>
						<View style={{ alignItems: 'center', width: 74, borderWidth: 0 }}>
							{item['foto'] &&
								<Image source={{ uri: item['foto'] }} style={{ width: 64, height: 64, resizeMode: 'contain' }} />
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
								<TextInput style={[style.textInputQty, { flex: 3 }]} defaultValue={parseFloat(item['hrg']).toString()} onChangeText={(text) => handleChangeD(index, 'hrg', text)} />
								<TextInput style={[style.textInputQty, { flex: 2 }]} defaultValue={parseFloat(item['qty']).toString()} onChangeText={(text) => handleChangeD(index, 'qty', text)} />
								<TextInput style={[style.textInputQty, { flex: 2 }]} defaultValue={parseFloat(item['disc']).toString()} onChangeText={(text) => handleChangeD(index, 'disc', text)} />
								<Text style={{ flex: 3, textAlign: 'right' }}>Rp.{numberFormat.format(item['hrg_beli'])}</Text>
								{/* <TextInput style={[style.textInputQty, { flex: 3 }]} defaultValue={parseFloat(item['hrg_beli']).toString()} onChangeText={(text) => handleChangeD(index, text)} /> */}
							</View>
						</View>
					</View>

					// </View>
				))}

			</ScrollView>

			<View style={style.saleContainerTotal}>
				<Text style={style.textTotal}>Total Belanja</Text>
				<Text style={style.textTotal}>Rp.{numberFormat.format(totHarga)}</Text>
			</View>

		</View>

	)
}

export default function AddPurchaseModal({ navigation, route }) {
	const [dataBasket, setDataBasket] = useState(route.params.dataBasket)
	const [dataH, setDataH] = useState({ keterangan: '', no_nota: '' })

	const handleClickBack = () => {
		navigation.navigate({
			name: 'ProductScreen',
			params: { dataBasket: dataBasket },
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
		let trpurd = []

		for (let item of dataBasket) {
			let row = { id_produk: item['id'], qty: item['qty'], hrg: item['hrg'], disc: item['disc'], hrg_beli: item['hrg_beli'] }
			trpurd.push(row)
		}

		let token = await AsyncStorage.getItem('token')

		let config = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}
		let payload = { 'trpurh': dataH, 'trpurd': trpurd }
		console.log(payload)
		try {
			let res = await axios.put(URL_API + 'trpurc', payload, config)

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
				name='addPurchaseComp'
				// component={AddPurchase}
				options={{
					headerTransparent: false,
					headerStyle: { backgroundColor: '#f7e034' },
					headerShown: true,
					headerTitle: 'Add Purchase',
					// headerBackTitleVisible:false,
					headerBackVisible: false,
					headerLeft: () => (
						<TouchableOpacity style={{ width: 40 }} onPress={() => handleClickBack()}>
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
				{(props) => <AddPurchaseComp {...props} dataBasket={dataBasket} setDataBasket={setDataBasket} dataH={dataH} setDataH={setDataH} navigation={navigation} />}
			</Stack.Screen>
		</Stack.Navigator>
	)
}