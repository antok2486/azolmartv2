export const URL_API = 'http://192.168.8.24/api/'
export const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
});

import LoginScreen from "../screen/LoginScreen"
import HomeScreen from "../screen/HomeScreen"
import RegisterScreen from "../screen/RegisterScreen"
import DashboardScreen from "../screen/DashboardScreen"
import OthScreen from "../screen/OthScreen"
import ProductScreen from "../screen/ProductScreen";

export const ScreenComponent = {
    'login': LoginScreen, 'home': HomeScreen, 'register': RegisterScreen, 'dashboard':DashboardScreen, 'oth':OthScreen,
    'product': ProductScreen,
}