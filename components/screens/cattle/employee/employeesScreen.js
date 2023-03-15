import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from '../../../../database/firebase'

const EmployeesScreen = (props) => {

    const initialCState = {
        cattleName: '',
        cattleOwn: '',
        cattleEmployee: '',
    };
    const [cattle, setCattle] = useState(initialCState)

    const handleEmployeeText = (value, cattleEmployee) => {
        setCattle({ ...cattle, [cattleEmployee]: value });
    }

    const cattleId_ = props.route.params.cattleId

    const agregarEmpleado = async () => {
        const deRef = firebase.db.collection('cattles').doc(cattleId_);
        await deRef.set({
            cattleName: cattle.cattleName,
            cattleOwn: cattle.cattleOwn,
            cattleEmployee: cattle.cattleEmployee,
        })

    }

    const getCattleById = async () => {
        const dbRef = firebase.db.collection('cattles').doc(cattleId_)
        const doc = await dbRef.get();
        const cattle = doc.data();
        setCattle({
            ...cattle,
            cattleId: doc.id
        })
    }

    useEffect(() => {
        getCattleById(props.route.params.cattleId);
    }, []);

    function viewEmployee() {
        if (cattle.cattleEmployee == '') {
            return (
                <View>
                    <Text>No hay empleados todavía</Text>
                </View>
            )
        } else {
            return (
                <ListItem>
                    <ListItem.Content style={{ borderRadius: 10, backgroundColor: '#d9d9d9', padding: 10 }}>
                        <ListItem.Title style={{ fontWeight: 'bold' }}>{cattle.cattleEmployee}</ListItem.Title>
                    </ListItem.Content>

                    <TouchableOpacity>
                        <View>
                            <Avatar
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/128/3687/3687412.png'
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </ListItem>
            )
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    style={{ fontSize: 18 }}
                    placeholder='Agrega un empleado'
                    onChangeText={(value) => handleEmployeeText(value, 'cattleEmployee')}></TextInput>
            </View>

            <TouchableOpacity style={styles.btnL}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}
                        onPress={agregarEmpleado}>Agregar Empleado</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.txt}>Empleados Agregados</Text>

            <View>
                {viewEmployee()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#ffffff'
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
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default EmployeesScreen;