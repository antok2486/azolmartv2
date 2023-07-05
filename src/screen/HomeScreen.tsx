import { Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScreenComponent } from '../utils/config';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation, route}) {
    useEffect(() => {
        const getToken = async () => {
            let token = await AsyncStorage.getItem('token')

            if (!token) {
                navigation.reset({ index: 0, routes: [{ name: 'Login' }], })
            }
        }

        const backAction = () => {
            Alert.alert('Exit Azol v2', 'Are you sure you want to exit?', [
                { text: 'Cancel', onPress: () => null, style: 'cancel', },
                { text: 'Yes', onPress: () => {
                    navigation.reset({ index: 0, routes: [{ name: 'Login', params: {isExit: true} }], })
                    BackHandler.exitApp()
                } },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        getToken()

        console.log('welcome')

        return () => backHandler.remove();        
    },[])

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="ProductScreen"
                component={ScreenComponent['product']}
                // children={() => (ScreenComponent['product']({navigation:navigation, route:route}))}
                options={{                                        
                    headerShown: false,
                    tabBarLabel: 'Product',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="box" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="DashboardScreen"
                component={ScreenComponent['dashboard']}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="chart-area" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="OthScreen"
                component={ScreenComponent['oth']}
                options={{
                    headerTitle: 'Azol Mart',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#f7e034' },
                    tabBarLabel: 'Others',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}