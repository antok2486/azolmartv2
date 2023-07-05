import {useState} from 'react'

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

import AddProductModal from "../modal/AddProductModal";
import AddPurchaseModal from "../modal/AddPurchaseModal";
import AddPurchaseIklanModal from '../modal/AddPurchaseIklanModal';
import AddPurchasePulsaModal from '../modal/AddPurchasePulsaModal';
import AddSaleModal from "../modal/AddSaleModal";
import AddSalePulsaModal from '../modal/AddSalePulsaModal';
import PurchaseReportModal from '../modal/PurchaseReportModal';
import SaleReportModal from '../modal/SaleReportModal';

export const ScreenComponent = {
    'login': LoginScreen, 'home': HomeScreen, 'register': RegisterScreen, 'dashboard':DashboardScreen, 'oth':OthScreen,
    'product': ProductScreen, 'addProduct': AddProductModal, 'addSale': AddSaleModal, 'addPurchase': AddPurchaseModal,
    'salereport': SaleReportModal, 'purchasereport': PurchaseReportModal, 'addSalePulsa': AddSalePulsaModal, 'addPurchasePulsa': AddPurchasePulsaModal,
    'addPurchaseIklan': AddPurchaseIklanModal,
}