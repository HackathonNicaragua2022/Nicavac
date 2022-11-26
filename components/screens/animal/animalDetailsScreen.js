import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image, StyleSheet, ActivityIndicator, Alert, TextInput, Button } from "react-native";
import firebase from '../../../database/firebase'
import moment from "moment/moment";
import { ListItem } from "react-native-elements";

const AnimalDetailsScreen = (props) => {

    const initialAnimal = {
        animalId: '',
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalMainActivity: '',
        animalSideline: '',
        animalDescription: '',
        animalCattle: '',
    };

    const [loading, setLoading] = useState(true)

    const [animal, setAnimal] = useState(initialAnimal)

    const handleDescriptionText = (value, animalDescription) => {
        setAnimal({ ...animal, [animalDescription]: value });
    };

    const newDescription = async () => {
        const dbRef = firebase.db.collection('animals').doc(animal.animalId);
        await dbRef.set({
            animalCode: animal.animalCode,
            animalName: animal.animalName,
            animalGenerer: animal.animalGenerer,
            animalRace: animal.animalRace,
            animalBirth: animal.animalBirth,
            animalWeight: animal.animalWeight,
            animalMainActivity: animal.animalMainActivity,
            animalSideline: animal.animalSideline,
            animalCattle: animal.animalCattle,
            animalDescription: animal.animalDescription
        })
    }

    const getAnimalById = async (animalId) => {
        const dbRef = firebase.db.collection('animals').doc(animalId)
        const doc = await dbRef.get();
        const animal = doc.data();
        setAnimal({
            ...animal,
            animalId: doc.id
        })
        setLoading(false)
    }

    function dateFormat() {
        const date = animal.animalBirth
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const age = moment(dateFormatl).format('DD/MM/YYYY')
            return (age)
        }
    }

    function monthFormat() {
        const date = animal.animalBirth
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const now = moment();
            const months = now.diff(dateFormatl, 'months');
            return (months)
        }
    }

    useEffect(() => {
        getAnimalById(props.route.params.animalId)
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    const deleteAnimal = async () => {
        const dbRef = firebase.db.collection('animals').doc(props.route.params.animalId)
        await dbRef.delete()
        props.navigation.navigate('cattlesListScreen')
    }

    const confirmDeleteAlert = () => {
        Alert.alert(
            'Confirmar eliminación',
            'Se eliminará para siempre (es mucho tiempo) ¿Está seguro?',
            [
                { text: 'Sí', onPress: () => deleteAnimal() },
                { text: 'No' }
            ]
        )
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../src/ganado.png')}
                />
            </View>

            <Text style={{ fontSize: 30, alignSelf: "center", fontWeight: "bold", marginBottom: 1 }}
            >{animal.animalName}</Text>

            <Text style={{ fontSize: 18, alignSelf: "center", marginBottom: 10 }}
            >Código: {animal.animalCode}</Text>

            <View style={{ padding: 20, backgroundColor: "#d9d9d9", width: 375, borderRadius: 10, alignSelf: "center" }}>
                <Text style={{ fontSize: 18 }}
                >Fecha de nacimiento: {dateFormat()}</Text>
                <Text style={{ fontSize: 18 }}>Meses: {monthFormat()}</Text>
                <Text style={{ fontSize: 18 }}>Raza: {animal.animalRace}</Text>
                <Text style={{ fontSize: 18 }}>Peso: {animal.animalWeight} libras</Text>
                <Text style={{ fontSize: 18 }}>Actividad principal: {animal.animalMainActivity}</Text>
                <Text style={{ fontSize: 18 }}>Actividad secundaria: {animal.animalSideline}</Text>

                <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 10 }} onPress={() => props.navigation.navigate('vaccinesListScreen', {
                    animalId: animal.animalId
                })}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#1b92e2', fontWeight: 'bold' }}>Salud </Text>
                        <Image
                            style={{ width: 21, height: 21 }}
                            source={require('../../src/ir.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20 }}>
                <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
                    <Text style={{ fontSize: 20, marginBottom: 5 }}>Descripción </Text>

                    <TouchableOpacity onPress={() => newDescription()}>
                        <View style={styles.btnG} >
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../src/save.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput
                    multiline
                    style={{ borderWidth: 1, borderColor: '#bfbfbf', borderRadius: 10, fontSize: 20, padding: 10 }}
                    placeholder="Descripción"
                    onChangeText={(value) => handleDescriptionText(value, 'animalDescription')}
                    value={animal.animalDescription}></TextInput>
            </View>

            <ListItem style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.btnE} key={animal.id} onPress={() => props.navigation.navigate('editAnimalScreen', {
                    animalId: animal.animalId
                })}>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Editar Datos</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity style={styles.btnD} onPress={() => confirmDeleteAlert()}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Eliminar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textStyle: {
        padding: 10,
        alignSelf: "center"
    },
    btnE: {
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: 150
    },
    btnD: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: 150
    },
    btnG: {
        flex: 1,
        alignItems: 'flex-end',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AnimalDetailsScreen;