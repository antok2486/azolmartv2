import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SaleOfflineReportScreen from '../screen/SaleOfflineReportScreen';
import SaleOnlineReportScreen from '../screen/SaleOnlineReportScreen';

const Tab = createMaterialTopTabNavigator();

export default function SaleReportModal() {
    return (
        <Tab.Navigator screenOptions={{tabBarIconStyle:{position:'absolute', left:-50, top:5}}}>
            <Tab.Screen 
                name="Offline" 
                component={SaleOfflineReportScreen}             
                options={{
                    tabBarLabel:"Offline",
                    tabBarIcon: () => (<FontAwesome5 name="box" size={16} />), 
                }} />
            <Tab.Screen 
                name="Online" 
                component={SaleOnlineReportScreen} 
                options={{
                    title:'Online',
                    tabBarIcon: () => (<FontAwesome5 name="store" size={16} />), 
                }}/>
        </Tab.Navigator>
   )
}