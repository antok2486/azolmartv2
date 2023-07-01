import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProductComp = ({...props}) => {
    return(
        <></>
    )
}

export default function ProductScreen({...props}) {
    const [dataCart, setDataCart] = useState([])
    const [dataBasket, setDataBasket] = useState([])
    const [filter, setFilter] = useState('')
    const [textFilter, setTextFilter] = useState('')

    const handleClickFilter = () => {
        // setPage(0)
        setFilter(textFilter)
    }

    const handleClearFilter = () => {
        // setPage(0)
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
                }}
            >
                {(props) => <ProductComp {...props} dataCart={dataCart} setDataCart={setDataCart} dataBasket={dataBasket} setDataBasket={setDataBasket} filter={filter}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}