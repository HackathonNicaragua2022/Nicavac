import React, { useState } from "react"; 
import {FlatList, Text, View, TouchableHighlight, TextInput, StyleSheet, Image, ActivityIndicator, Alert} from 'react-native';
import firebase from "../../database/firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function Register(props){
    const {navigation} = props;
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [authenticaded, setAuthenticaded] = useState(false)
    const RegistrarUsuario = async () => {
        await firebase.authentication.createUserWithEmailAndPassword(email,pass)
        .then((res) => {
            Alert.alert(
                'Éxito',
                'Usuario registrado',
                [{
                    text: 'Ok'
                }]
            )
            setAuthenticaded(true)
            navigation.push('CattlesList_screen');
        })
        .catch(error => console.log(error))
    }
    return (
    <ScrollView style={styles.container}>
        <View>
            <View style={styles.containerOptions}>

                <TextInput placeholder="Correo" style={styles.input} value={email} onChangeText={text=>setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} placeholder='Contraseña' style={styles.input} value={pass} onChangeText={text=>setPass(text)}></TextInput>

                <TouchableOpacity style={styles.btn} onPress={RegistrarUsuario}>
                    <Text style={{textAlign:'center', fontSize:25, color:'#ffffff'}}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>)
        
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    containerLoading: {
        flex:1,
        justifyContent:'center'
    },
    input: {
        flex: 1,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#346a4a',
        fontSize: 20
    },
    btn: {
        backgroundColor:'#346a4a',
        padding:10,
        borderRadius: 30
    },
    containerLogo:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    containerOptions: {
        flex: 1,
        justifyContent:'center',
        marginBottom: 0,
    }
});
