import { StyleSheet } from "react-native"

const colorPrimary = '#f7e034'
const colorLight = '#ffffff'

export const style =  StyleSheet.create({
    loginShape: {
        position:'absolute',
        top:0,
        alignItems: 'center',
        backgroundColor: colorPrimary,
        width: '100%',
        height: 250,
        borderBottomStartRadius: 120,
        borderBottomEndRadius: 120,
    },
    loginImage:{ width: 192, height: 192 },
    loginContainer: {
        alignSelf:'center',
        alignItems: 'center',
        padding: 10,
        width: '80%',
        height: 320,
        marginTop: 200,
        marginBottom:50,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        elevation: 5,
    },
    loginInput: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 5,
        paddingStart: 36,
        flex: 1,
    },
    loginButton: {
        width: '100%',
        marginTop: 20,
        height: 36,
        backgroundColor: colorPrimary,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    loginRegister: {flexDirection:'row', marginTop:20,},
    registerContainer: {
        alignItems: 'center',
        alignSelf:'center',
        padding: 10,
        width: '80%',
        height: 520,
        marginTop: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        elevation: 10
    },
    registerShape: {
        position:'absolute',
        bottom:0,
        bottom:0,
        alignItems: 'center',
        backgroundColor: colorPrimary,
        width: '100%',
        height: 320,
        borderTopStartRadius: 120,
        borderTopEndRadius: 120,
        zIndex:-1
    },
    btnShowPassword:{
        position:'absolute',
        right:10
    },
    dashboardResumeContainer:{
        marginTop:10,
        height:120,
        // padding:10,
        backgroundColor:colorPrimary,
        elevation:5
    },
    dashboardResume:{
        height:'100%',
        width:180,
        backgroundColor:'#fff',
        // marginEnd:10,
        borderRadius:10,
        elevation:5,
        padding:10,
    },
    dashboardResumeTitle:{
        fontWeight:'bold'
    },
    dashboardResumeValue:{
        marginTop:10,
        fontSize:18,
    },
    dashboardResumeFooter:{
        marginTop:10,
        fontSize:12,
    },
    dashboarDailySalesContainer:{
        marginTop:10,
        backgroundColor: colorLight,
        height:265,
        elevation:5,
        // padding:10
    },
    dashboarTopProductContainer:{
        marginTop:10,
        backgroundColor: colorLight,
        width:'100%',
        height:'auto',
        elevation:5,
        padding:10
    },
    dashboardTopProductTh:{
        borderBottomWidth:1,
        borderColor: "#dee2e6",
    },
    dashboardTopProductImage:{
        width:64,
        height:64,
        resizeMode:'contain'
    },
    productFloatingButton: { position: 'absolute', width: 48, height: 48, borderRadius: 24, backgroundColor: "#f7e034", right:10, bottom: 10, alignItems: 'center', justifyContent: 'center' },
    // resumeContainer: { height: 130, marginTop: 20, width: '100%', backgroundColor: '#f7e034', borderRadius: 10, padding: 10, elevation: 5, },
    // resume: { height: 70, marginEnd: 10, width: 150, marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#dee2e6', padding: 10, backgroundColor: '#fff' },
    productContainer: { minHeight: 150, width: '100%', backgroundColor: '#fff', borderWidth: 0, padding: 10, elevation: 5, },
    product: { width: 180, minHeight: 200, marginTop: 10, borderWidth: 1, borderRadius: 10, borderColor: '#dee2e6', justifyContent: 'space-between' },
    productImage: { borderWidth: 0, width: 180, height: 100, resizeMode: 'contain', alignItems: 'center' },
    productInfo: { borderTopWidth: 1, padding: 8, borderColor: '#dee2e6', },
    productButton: { borderWidth: 0, flexDirection: 'row', justifyContent: 'space-between', paddingStart: 10, paddingEnd: 10, paddingTop: 5, paddingBottom: 5 },
    headerBadge: { backgroundColor: 'red', position: 'absolute', top: -8, right: -2, borderRadius: 5, fontSize: 10, color: '#fff', paddingStart: 3, paddingEnd: 3, },
    headerInputFilter: { width:302, height:42, borderWidth: 0, borderRadius: 10, borderColor: '#dee2e6', backgroundColor: '#fff', paddingEnd:26 },
    headerButtonSearch: { position:'absolute', right:12, zIndex:100 },
    headerButtonClearFilter: { position: 'absolute', left: 12, zIndex: 100 },
    floatingButton: { position: 'absolute', width: 48, height: 48, borderRadius: 24, backgroundColor: colorPrimary, right:10, bottom: 10, alignItems: 'center', justifyContent: 'center' },
    buttonCamera: { marginEnd: 5 },
    productImageContainer: { flexDirection: 'row', borderWidth: 0, justifyContent: 'center', alignItems: 'center' },
    saleContainerProduk: { flexDirection: 'row', borderWidth: 0, padding:10, justifyContent: 'space-between', alignItems: 'center' },
    saleProductImageContainer: { alignItems: 'center', width: 74, borderWidth: 0 },
    saleProductImage: { width: 64, height: 64, resizeMode: 'contain' },
    saleButtonRemove: {position:'absolute', bottom:0, right:0},
    saleContainerTotal: { padding: 10, height: 50, flexDirection: 'row', borderTopWidth: 1, borderColor: '#dee2e6', justifyContent: 'space-between', alignItems: 'center' },
    textInput: { height:42, backgroundColor: '#fff', borderBottomWidth:1, borderColor:'#dee2e6' },
    textInputLabel: { marginTop: 20 },
    textInputQty: { width: 80, height: 42, textAlign: 'right', borderWidth: 1, borderRadius: 5, borderColor: '#dee2e6' },
    textNumber: {width:'100%', textAlign:'right'},
    textTotal: { fontSize: 16, fontWeight: 'bold' },

})
