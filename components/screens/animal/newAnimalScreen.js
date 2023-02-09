import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firebase from '../../../database/firebase';
import moment from "moment/moment";

const NewAnimalScreen = (props) => {

    //inicialización de los datos del objeto
    const initialAnimal = {
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalCastrate: '',
        animalLactationCycle: '',
        animalMainActivity: '',
        animalSideline: '',
        animalDescription: '',
        animalCattle: props.route.params.cattleId,
    };

    const [animal, setAnimal] = useState(initialAnimal);
    const [date, setDate] = useState(new Date);

    //definición del código del animal
    const handleCodeText = (value, animalCode) => {
        setAnimal({ ...animal, [animalCode]: value });
    };

    //definición del nombre del animal
    const handleNameText = (value, animalName) => {
        setAnimal({ ...animal, [animalName]: value });
    };

    //definición del género del animal
    const selectGenererText = (value, animalGenerer) => {
        setAnimal({ ...animal, [animalGenerer]: value });
    };

    //definición de la raza
    const selectRaceText = (value, animalRace) => {
        setAnimal({ ...animal, [animalRace]: value });
    };

    //definición del peso
    const selectWeightText = (value, animalWeight) => {
        setAnimal({ ...animal, [animalWeight]: value });
    };

    //definición del estado de castrado
    const selectCastrateText = (value, animalCastrate) => {
        setAnimal({ ...animal, [animalCastrate]: value });
    };

    //definición de la fecha de nacimiento
    const selectDate = (value, animalBirth) => {
        setDate({ ...animal, [animalBirth]: value });
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

    //definición de la actividad principal
    const selectMainActivityText = (value, animalMainActivity) => {
        setAnimal({ ...animal, [animalMainActivity]: value });
    };

    //definición de la actividad secundaria
    const selectSidelineText = (value, animalSideline) => {
        setAnimal({ ...animal, [animalSideline]: value });
    };

    //función para crear un nuevo animal
    const newAnimal = async () => {
        function monthFormat() {
            const str = animal.animalBirth;
            const date = new Date(str);
            const timestamp = date.getTime();
            const dateFormat1 = new Date(parseInt(timestamp));
            const now = moment();
            const months = now.diff(dateFormat1, 'months');
            return (months)
        }
        if ((animal.animalName === '') || (animal.animalCode === '') || (animal.animalGenerer === '--' || (animal.animalRace === '--' || (animal.animalMainActivity === '--' || (animal.animalWeight === ''))))) {
            alert('Complete los campos');
        } else if (animal.animalName.length > 25) {
            Alert.alert(
                'Error',
                'Escriba un nombre más corto',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalCode.length > 25) {
            Alert.alert(
                'Error',
                'Escriba un código más corto',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalGenerer === 'M' && animal.animalCastrate === '--') {
            Alert.alert(
                'Error',
                'Defina si el macho ha sido castrado o no',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalGenerer === 'H' && animal.animalCastrate === 'Sí') {
            Alert.alert(
                'Error',
                'Las hembras no pueden ser castradas',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalCastrate === 'Sí' && animal.animalMainActivity === 'Reproducción') {
            Alert.alert(
                'Error',
                'Los machos castrados no se pueden usar para la reproducción',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalGenerer === 'M' && animal.animalMainActivity === 'Producción de leche') {
            Alert.alert(
                'Error',
                'Los machos no producen leche',
                [{
                    text: 'Ok'
                }]
            )
        } else if (animal.animalMainActivity === animal.animalSideline) {
            Alert.alert(
                'Error',
                'La actividad principal se repite con la actividad secundaria',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((animal.animalWeight < 15) || (monthFormat() < 4 && animal.animalWeight > 120)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 3 && animal.animalWeight < 20) || (monthFormat() < 9 && animal.animalWeight > 250)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 8 && animal.animalWeight < 40) || (monthFormat() < 13 && animal.animalWeight > 350)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 12 && animal.animalWeight < 70) || (monthFormat() < 19 && animal.animalWeight > 500)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 18 && animal.animalWeight < 100) || (monthFormat() < 25 && animal.animalWeight > 600)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 24 && animal.animalWeight < 120) || (monthFormat() < 31 && animal.animalWeight > 680)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if ((monthFormat() > 30 && animal.animalWeight < 120) || (monthFormat() < 49 && animal.animalWeight > 850)) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else if (monthFormat() > 48 && animal.animalWeight < 150) {
            Alert.alert(
                'Error',
                'Peso irreal',
                [{
                    text: 'Ok'
                }]
            )
        } else {
            try {
                await firebase.db.collection('animals').add({
                    animalCode: animal.animalCode,
                    animalName: animal.animalName,
                    animalRace: animal.animalRace,
                    animalCattle: animal.animalCattle,
                    animalGenerer: animal.animalGenerer,
                    animalBirth: animal.animalBirth,
                    animalWeight: animal.animalWeight,
                    animalCastrate: animal.animalCastrate,
                    animalLactationCycle: animal.animalLactationCycle,
                    animalMainActivity: animal.animalMainActivity,
                    animalSideline: animal.animalSideline,
                    animalDescription: animal.animalDescription,
                });
                props.navigation.navigate('cattlesListScreen');
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#346a4a', justifyContent: 'center' }}>COMPLETE TODOS LOS CAMPOS</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Código del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Código'
                    onChangeText={(value) => handleCodeText(value, 'animalCode')}
                    value={animal.animalCode}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Nombre del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    onChangeText={(value) => handleNameText(value, 'animalName')}
                    value={animal.animalName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Sexo</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalGenerer}
                    onValueChange={(value) => selectGenererText(value, 'animalGenerer')}
                    value={animal.animalGenerer}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Hembra" value="H" />
                    <Picker.Item label="Macho" value="M" />
                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Raza</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalRace}
                    onValueChange={(value) => selectRaceText(value, 'animalRace')}
                    value={animal.animalRace}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Jersey" value="Jersey" />
                    <Picker.Item label="Holstein" value="Holstein" />
                    <Picker.Item label="Angus" value="Angus" />
                    <Picker.Item label="Hereford" value="Hereford" />
                    <Picker.Item label="Brahman" value="Brahman" />
                    <Picker.Item label="Brangus" value="Brangus" />
                    <Picker.Item label="Braford" value="Braford" />
                    <Picker.Item label="Limousin" value="Limousin" />
                    <Picker.Item label="Criollo" value="Criollo" />
                    <Picker.Item label="Otros" value="Otros" />
                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Fecha de nacimiento</Text>
                <TouchableOpacity onPress={showDatePicker} title='Fecha de nacimiento'>
                    <View style={{ justifyContent: 'center', backgroundColor: '#bfbfbf', height: 45 }}>
                        <Text style={{ fontSize: 16, marginLeft: 6 }}>{date.toLocaleDateString()}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }} onChangeText={(value) => selectDate(value, 'animalBirth')}
                    value={animal.animalBirth = date}>Fecha seleccionada: {date.toLocaleDateString()}
                </Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Peso en kilogramos</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Peso en kilogramos'
                    keyboardType='numeric'
                    onChangeText={(value) => selectWeightText(value, 'animalWeight')}
                    value={animal.animalWeight}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Castrado</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalCastrate}
                    onValueChange={(value) => selectCastrateText(value, 'animalCastrate')}
                    value={animal.animalCastrate}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Sí" value="Sí" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18 }}>Actividad principal</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalMainActivity}
                    onValueChange={(value) => selectMainActivityText(value, 'animalMainActivity')}
                    value={animal.animalMainActivity}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Producción de leche" value="Producción de leche" />
                    <Picker.Item label="Producción de carne" value="Producción de carne" />
                    <Picker.Item label="Reproducción" value="Reproducción" />
                    <Picker.Item label="Lidia" value="Lidia" />
                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Actividad secundaria {'(opcional)'}</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf' }}
                    selectedValue={animal.animalSideline}
                    onValueChange={(value) => selectSidelineText(value, 'animalSideline')}
                    value={animal.animalSideline}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Producción de leche" value="Producción de leche" />
                    <Picker.Item label="Producción de carne" value="Producción de carne" />
                    <Picker.Item label="Reproducción" value="Reproducción" />
                    <Picker.Item label="Lidia" value="Lidia" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.btnL} onPress={() => newAnimal()}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Agregar Animal</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff'
    },
    inputGroup: {
        marginBottom: 20
    },
    btnL: {
        marginTop: 20,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
        marginBottom: 40,
    },
    input: {
        marginTop: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
    }
});

export default NewAnimalScreen;