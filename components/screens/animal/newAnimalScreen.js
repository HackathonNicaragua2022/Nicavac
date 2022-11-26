import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firebase from '../../../database/firebase';
import { Alert } from 'react-native';

const NewAnimalScreen = (props) => {

    const initialAnimal = {
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalMainActivity: '',
        animalSideline: '',
        animalDescription: '',
        animalCattle: props.route.params.cattleId,
    };

    const [animal, setAnimal] = useState(initialAnimal);
    const [date, setDate] = useState(new Date);

    const handleCodeText = (value, animalCode) => {
        setAnimal({ ...animal, [animalCode]: value });
    };

    const handleNameText = (value, animalName) => {
        setAnimal({ ...animal, [animalName]: value });
    };

    const selectGenererText = (value, animalGenerer) => {
        setAnimal({ ...animal, [animalGenerer]: value });
    };

    const selectRaceText = (value, animalRace) => {
        setAnimal({ ...animal, [animalRace]: value });
    };

    const selectWeightText = (value, animalWeight) => {
        setAnimal({ ...animal, [animalWeight]: value });
    };

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

    const selectMainActivityText = (value, animalMainActivity) => {
        setAnimal({ ...animal, [animalMainActivity]: value });
    };

    const selectSidelineText = (value, animalSideline) => {
        setAnimal({ ...animal, [animalSideline]: value });
    };

    const newAnimal = async () => {
        if ((animal.animalName === '') || (animal.animalCode === '') || (animal.animalGenerer==='--'||(animal.animalRace==='--'||(animal.animalMainActivity==='--')))) {
            alert('Complete los campos');
        } else if (animal.animalName.length > 25) {
            Alert.alert(
                'Error',
                'Escriba un nombre más corto',
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
                    animalWeight: parseInt(animal.animalWeight),
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
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Código del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Código'
                    onChangeText={(value) => handleCodeText(value, 'animalCode')}
                    value={animal.animalCode}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Nombre del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    onChangeText={(value) => handleNameText(value, 'animalName')}
                    value={animal.animalName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Sexo</Text>
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
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Raza</Text>
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

            <View>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Fecha de nacimiento</Text>
                <TouchableOpacity onPress={showDatePicker} title='Fecha de nacimiento'>
                    <View style={{ justifyContent: 'center', backgroundColor: '#bfbfbf', height: 45 }}>
                        <Text style={{ fontSize: 16, marginLeft: 6 }}>Seleccione una fecha</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 18 }} onChangeText={(value) => selectDate(value, 'animalBirth')}
                    value={animal.animalBirth = date}>Fecha seleccionada: {date.toLocaleDateString()}</Text>
            </View>

            <View>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Peso en libras</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Peso el libras'
                    keyboardType='numeric'
                    onChangeText={(value) => selectWeightText(value, 'animalWeight')}
                    value={animal.animalWeight}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Actividad principal</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalMainActivity}
                    onValueChange={(value) => selectMainActivityText(value, 'animalMainActivity')}
                    value={animal.animalMainActivity}
                >
                    <Picker.Item label="--" value="--" />
                    <Picker.Item label="Producción de leche" value="PLeche" />
                    <Picker.Item label="Producción de carne" value="PCarne" />
                    <Picker.Item label="Reproducción" value="Reproduccion" />
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
        padding: 10,
    },
    inputGroup: {
        flex: 1,
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
        fontSize: 16, 
        borderBottomWidth: 1, 
        borderLeftWidth: 1, 
        borderBottomColor: '#bfbfbf', 
        borderLeftColor: '#bfbfbf',
    }
});

export default NewAnimalScreen;