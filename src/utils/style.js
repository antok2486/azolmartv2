import { StyleSheet } from "react-native"

export const style =  StyleSheet.create({
    loginShape: {
        position:'absolute',
        top:0,
        alignItems: 'center',
        backgroundColor: '#f7e034',
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
        backgroundColor: '#f7e034',
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
        backgroundColor: '#f7e034',
        width: '100%',
        height: 320,
        borderTopStartRadius: 120,
        borderTopEndRadius: 120,
        zIndex:-1
    },
    btnShowPassword:{
        position:'absolute',
        right:10
    }
})
