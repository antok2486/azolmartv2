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
    }

})
