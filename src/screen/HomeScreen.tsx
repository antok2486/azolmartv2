import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScreenComponent } from '../utils/config';

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation, route}) {
    const [dataCart, setDataCart] = useState([])

    useEffect(() => {
        if(route.params?.dataCart){
            setDataCart(route.params.dataCart)
            // console.log('ada cart')
        }
        // console.log('masuk')
    },[route.params?.dataCart])

    return (
        <Tab.Navigator initialRouteName='DashboardScreen'>
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
                name="ProductScreen"
                // component={ScreenComponent['product']}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Product',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="box" color={color} size={24} />
                    ),
                }}
            >
                {() => ScreenComponent['product']({navigation:navigation, route:route})}
            </Tab.Screen>
            <Tab.Screen
                name="OthScreen"
                component={ScreenComponent['oth']}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Others',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}