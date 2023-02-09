import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from 'react-native';
import firebase from "../../../database/firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function Register(props) {

    const initialUser = {
        userId: '',
        userEmail: '',
    }
    const [user, setUser] = useState(initialUser);

    const { navigation } = props;
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [authenticaded, setAuthenticaded] = useState(false)

    //función para crear un nuevo usuario
    const registrarUsuario = async () => {
        if (pass.length < 6) {
            Alert.alert(
                'Error de contraseña',
                'La contraseña debe tener 6 caracteres como mínimo',
                [{
                    text: 'Ok'
                }]
            )
        } else {
            await firebase.authentication.createUserWithEmailAndPassword(email, pass)
                .then((res) => {
                    Alert.alert(
                        'Éxito',
                        'Usuario registrado',
                        [{
                            text: 'Ok'
                        }]
                    )
                    setAuthenticaded(true)
                    user.userId = firebase.authentication.currentUser.uid
                    user.userEmail = email
                    navigation.push('cattlesListScreen');
                }
                )
                .catch(error => console.log(error))

            await firebase.db.collection('users').add({
                userId: user.userId,
                userEmail: user.userEmail,
            });
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.containerOptions}>

                    <Text style={{fontSize: 20}}>Correo electrónico</Text>
                    <TextInput placeholder="Correo" style={styles.input} value={email} onChangeText={text => setEmail(text)}></TextInput>

                    <Text style={{fontSize:20}}>Contraseña</Text>
                    <TextInput secureTextEntry={true} placeholder='Contraseña' style={styles.input} value={pass} onChangeText={text => setPass(text)}></TextInput>

                    <TouchableOpacity style={styles.btn} onPress={registrarUsuario}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>Registrarse</Text>
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
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#346a4a',
        fontSize: 20
    },
    btn: {
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerOptions: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 0,
    }
});
