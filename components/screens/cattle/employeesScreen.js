import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import firebase from '../../../database/firebase'

const EmployeesScreen = (props) => {

    const [employeeEmail, setEmployeeEmail] = useState('')

    const agregarEmpleado = async () => {
        firebase.authentication
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={{ fontSize: 18 }}
                    placeholder='Agrega un empleado'
                    value={employeeEmail} onChangeText={text => setEmployeeEmail(text)}
                />
            </View>

            <TouchableOpacity style={styles.btnL}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}
                    onPress= {agregarEmpleado}>Agregar Empleado</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.txt}>Empleados Agregados</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    btnL: {
        marginTop: 10,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '70%',
        alignSelf: 'center',
    },
    txt: {
        marginTop: 20,
        fontSize: 30,
        alignSelf: 'center'
    }
})

export default EmployeesScreen;