import React, { useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';

const NewCattleScreen = (props) => {

    const initialState = { 
        cattleName: '',
        cattleEmployee: '',
        cattleOwn: firebase.authentication.currentUser.uid,
    };

    const [cattle, setCattle] = useState(initialState);

    const handleChangeText = (value, cattleName) => {
        setCattle({ ...cattle, [cattleName]: value });
    };

    const newCattle = async () => {
        if (cattle.cattleName === '') {
            Alert.alert(
                'Nombre vacío',
                'Ingrese un nombre',
            );
        } else if (cattle.cattleName.length > 25) {
            alert('Escriba un nombre más pequeño');
        } else {
            try {
                await firebase.db.collection('cattles').add({
                    cattleName: cattle.cattleName,
                    cattleEmployee: cattle.cattleEmployee,
                    cattleOwn: cattle.cattleOwn,
                });
                props.navigation.navigate('cattlesListScreen');
            } catch (error) {
                console.log(error)
            }
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' }}>Ingrese el nombre de la finca</Text>
                <TextInput
                    multiline
                    style={{ fontSize: 18 }}
                    placeholder='Nombre'
                    onChangeText={(value) => handleChangeText(value, 'cattleName')}
                    value={cattle.cattleName}
                />
            </View>

            <TouchableOpacity style={styles.btnL} onPress={() => newCattle()}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Agregar Finca</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#ffffff',
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    btnL: {
        marginTop: 20,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
    },
});

export default NewCattleScreen;