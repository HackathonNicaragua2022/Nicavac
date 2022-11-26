import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../../../database/firebase";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const EditAnimalScreen = (props) => {

    //inicialización de datos del objeto
    const initialState = {
        animalId: '',
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalMainActivity: '',
        animalSideline: '',
        animalCattle: '',
        animalDescription: '',
    };

    const [loading, setLoading] = useState(true)

    const [animal, setAnimal] = useState(initialState)
    const [date, setDate] = useState(new Date)

    //definición del código
    const handleCodeText = (value, animalCode) => {
        setAnimal({ ...animal, [animalCode]: value });
    }

    //definición del nombre
    const handleAnimalText = (value, animalName) => {
        setAnimal({ ...animal, [animalName]: value });
    };

    //definición del género
    const selectedGenererText = (value, animalGenerer) => {
        setAnimal({ ...animal, [animalGenerer]: value });
    }

    //definición de la raza
    const selectRaceText = (value, animalRace) => {
        setAnimal({ ...animal, [animalRace]: value });
    }

    //definición del peso
    const selectWeightText = (value, animalWeight) => {
        setAnimal({ ...animal, [animalWeight]: value })
    }

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
    }

    //definición de la actividad secundaria
    const selectSidelineText = (value, animalSideline) => {
        setAnimal({ ...animal, [animalSideline]: value });
    }

    //lectura de los datos del animal
    const getAnimalById = async () => {
        const dbRef = firebase.db.collection('animals').doc(animalId_)
        const doc = await dbRef.get();
        const animal = doc.data();
        setAnimal({
            ...animal,
            animalId: doc.id
        })
        setLoading(false)
    }

    //Extracción del id del animal
    useEffect(() => {
        getAnimalById(props.route.params.animalId);
    }, []);

    const animalId_ = props.route.params.animalId

    //función para editar los datos del animal
    const updateAnimal = async () => {
        if ((animal.animalName === '') || (animal.animalCode === '') || (animal.animalGenerer === '--' || (animal.animalRace === '--' || (animal.animalMainActivity === '--')))) {
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
            const dbRef = firebase.db.collection("animals").doc(animalId_);
            await dbRef.set({
                animalCode: animal.animalCode,
                animalName: animal.animalName,
                animalRace: animal.animalRace,
                animalCattle: animal.animalCattle,
                animalGenerer: animal.animalGenerer,
                animalBirth: animal.animalBirth,
                animalDescription: animal.animalDescription,
                animalWeight: parseInt(animal.animalWeight),
                animalMainActivity: animal.animalMainActivity,
                animalSideline: animal.animalSideline,
            });
            setAnimal(initialState);
            props.navigation.navigate("cattlesListScreen");
        }

    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Código del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Código'
                    value={animal.animalCode}
                    onChangeText={value => handleCodeText(value, "animalCode")}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Nombre del animal</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    value={animal.animalName}
                    onChangeText={value => handleAnimalText(value, "animalName")}
                />
            </View>

            <View>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Sexo</Text>
                <Picker
                    style={{ backgroundColor: '#bfbfbf', borderRadius: 10 }}
                    selectedValue={animal.animalGenerer}
                    onValueChange={(value) => selectedGenererText(value, 'animalGenerer')}
                    value={animal.animalGenerer}
                >
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

            <View style={styles.inputGroup}>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>Peso en libras</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Peso el libras'
                    keyboardType='numeric'
                    onChangeText={value => selectWeightText(value, 'animalWeight')}
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

            <TouchableOpacity style={styles.btnS} onPress={() => updateAnimal()}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Guardar cambios</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    inputGroup: {
        flex: 1,
        marginBottom: 20
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderBottomColor: '#bfbfbf',
        borderLeftColor: '#bfbfbf',
    },
    btn: {
        marginBottom: 7,
    },
    btnS: {
        marginTop: 20,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
        marginBottom: 40,
    },
});

export default EditAnimalScreen;