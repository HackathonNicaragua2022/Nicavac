import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firebase from '../../../../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import moment from "moment/moment";

const VaccinesListScreen = (props) => {

    //Se inicializan los valores del objeto
    const initialNewVaccine = {
        vaccineAnimalId: props.route.params.animalId,
        vaccineType: '',
        vaccineName: '',
        vaccineDate: '',
    };

    const [newVaccine, setNewVaccine] = useState(initialNewVaccine);
    const [date, setDate] = useState(new Date);

    //Tipo de tratamiento
    const selectVaccineTypeText = (value, vaccineType) => {
        setNewVaccine({ ...newVaccine, [vaccineType]: value });
    };

    //Nombre del tratamiento
    const handleChangeText = (value, vaccineName) => {
        setNewVaccine({ ...newVaccine, [vaccineName]: value });
    };

    //Fecha del tratamiento
    const selectDate = (value, vaccineDate) => {
        setDate({ ...newVaccine, [vaccineDate]: value });
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
        });
    };

    const showDatePicker = () => {
        showMode('date');
    };

    //Función que agrega un nuevo objeto a la colección tratamientos
    const newAnimalVaccine = async () => {
        if (newVaccine.vaccineName === '') {
            Alert.alert(
                'Nombre vacío',
                'Ingrese el nombre de la vacuna',
            );
        } else if (newVaccine.vaccineName.length > 25) {
            alert('Escriba un nombre más pequeño');
        } else {
            await firebase.db.collection('vaccines').add({
                vaccineAnimalId: newVaccine.vaccineAnimalId,
                vaccineType: newVaccine.vaccineType,
                vaccineName: newVaccine.vaccineName,
                vaccineDate: newVaccine.vaccineDate,
            });
        };
    };

    const [vaccines, setVaccines] = useState([]);

    //Lectura de los datos del objeto
    useEffect(() => {
        firebase.db.collection('vaccines').onSnapshot((querySnapshot) => {
            const vaccines = [];
            querySnapshot.docs.forEach((doc) => {
                const { vaccineAnimalId, vaccineType, vaccineName, vaccineDate } = doc.data();
                if (vaccineAnimalId === newVaccine.vaccineAnimalId) {
                    vaccines.push({
                        vaccineId: doc.id,
                        vaccineType,
                        vaccineAnimalId,
                        vaccineName,
                        vaccineDate,
                    });
                }
            });
            setVaccines(vaccines);
        });
    }, []);

    //función que elimina al objeto seleccionado de la colección
    const deleteVaccine = async (vaccine) => {
        const dbRef = firebase.db.collection('vaccines').doc(vaccine.vaccineId)
        await dbRef.delete()
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Tipo de tratamiento</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={newVaccine.vaccineType}
                    onValueChange={(value) => selectVaccineTypeText(value, 'vaccineType')}
                    value={newVaccine.vaccineType}
                >
                    <Picker.Item label='--' value='--'/>
                    <Picker.Item label='Vacuna' value='Vacuna'/>
                    <Picker.Item label='Desparasitante' value='Desparasitante'/>
                    <Picker.Item label='Antibiótico' value='Antobiótico'/>
                </Picker>
                <Text style={{ fontSize: 18 }}>Nombre del tratamiento</Text>
                <TextInput
                    style={{ fontSize: 18 }}
                    placeholder='Nombre de la Vacuna'
                    onChangeText={(value) => handleChangeText(value, 'vaccineName')}
                    value={newVaccine.vaccineName}
                />
            </View>

            <View>
                <TouchableOpacity onPress={showDatePicker} title='Date'>
                    <View style={{ justifyContent: 'center', backgroundColor: '#bfbfbf', height: 45 }}>
                        <Text style={{ fontSize: 16, marginLeft: 6 }}>Seleccione una fecha</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }} onChangeText={(value) => selectDate(value, 'vaccineDate')}
                    value={newVaccine.vaccineDate = date}>Fecha seleccionada: {date.toLocaleDateString()}</Text>
            </View>

            <TouchableOpacity style={styles.btnA} onPress={() => newAnimalVaccine()}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Agregar Vacuna</Text>
                </View>
            </TouchableOpacity>

            {vaccines.map((vaccine) => {
                return (
                    <ListItem key={vaccine.vaccineId}>
                        <ListItem.Content onPress={() => props.navigation.navigate('vaccineDetailsScreen', {
                            vaccineId: vaccine.vaccineId
                        })} style={{ borderWidth: 1, borderRadius: 10, backgroundColor: '#d9d9d9', padding: 10 }}>
                            <ListItem.Title onPress={() => props.navigation.navigate('vaccineDetailsScreen', {
                                vaccineId: vaccine.vaccineId
                            })} style={{ fontWeight: 'bold' }}>{vaccine.vaccineName}</ListItem.Title>
                        </ListItem.Content>
                        <TouchableOpacity>
                            <View>
                                <Avatar
                                    onPress={() => deleteVaccine(vaccine)}
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/128/3687/3687412.png'
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )
            })}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff'
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    btnA: {
        marginTop: 20,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
    },
});

export default VaccinesListScreen;