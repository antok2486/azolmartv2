import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScreenComponent } from '../utils/config';

const Tab = createBottomTabNavigator();

const SaleScreenComp = () => (
    <View><Text>Sale Screen</Text></View>
)

export default function HomeScreen({...props}) {
    useEffect(() => {

    })

    return (
        <Tab.Navigator>
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
                name="SaleScreen"
                component={SaleScreenComp}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Sale',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="box" color={color} size={24} />
                    ),
                }}
            />
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