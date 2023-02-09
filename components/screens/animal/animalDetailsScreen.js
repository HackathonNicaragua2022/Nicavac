import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image, StyleSheet, ActivityIndicator, Alert, TextInput, Button } from "react-native";
import firebase from '../../../database/firebase'
import moment from "moment/moment";
import { ListItem, Avatar } from "react-native-elements";

const AnimalDetailsScreen = (props) => {

    //se inicializan los valores del objeto animal
    const initialAnimal = {
        animalId: '',
        animalCode: '',
        animalName: '',
        animalGenerer: '',
        animalRace: '',
        animalBirth: '',
        animalWeight: '',
        animalLactationCycle: '',
        animalMainActivity: '',
        animalSideline: '',
        animalDescription: '',
        animalCattle: '',
        animalCastrate: '',
    };

    const [loading, setLoading] = useState(true)

    const [animal, setAnimal] = useState(initialAnimal)

    const handleDescriptionText = (value, animalDescription) => {
        setAnimal({ ...animal, [animalDescription]: value });
    };

    //se actualiza la descripción
    const newDescription = async () => {
        const dbRef = firebase.db.collection('animals').doc(animal.animalId);
        await dbRef.set({
            animalCode: animal.animalCode,
            animalName: animal.animalName,
            animalGenerer: animal.animalGenerer,
            animalRace: animal.animalRace,
            animalBirth: animal.animalBirth,
            animalWeight: animal.animalWeight,
            animalLactationCycle: animal.animalLactationCycle,
            animalMainActivity: animal.animalMainActivity,
            animalSideline: animal.animalSideline,
            animalCattle: animal.animalCattle,
            animalDescription: animal.animalDescription,
            animalCastrate: animal.animalCastrate,
        })
    }

    //lectura de los datos del objeto animal
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

    //extracción del id del animal
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

    //función que elimina un objeto de la colección
    const deleteAnimal = async () => {
        const dbRefA = firebase.db.collection('animals').doc(props.route.params.animalId)
        await dbRefA.delete()
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

    function headDetails() {
        if (monthFormat() < 24) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/4478/4478312.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 23) && (monthFormat() < 49) && ((animal.animalCastrate === 'No') || (animal.animalCastrate === '--'))) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/1660/1660788.png',
                        }}
                    />
                </View>
            )
        } else if (((monthFormat() < 23) && (monthFormat() < 49)) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'Sí')) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2298/2298414.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'Sí')) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3570/3570832.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'M') && (animal.animalCastrate === 'No')) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3819/3819472.png',
                        }}
                    />
                </View>
            )
        } else if ((monthFormat() > 48) && (animal.animalGenerer === 'H')) {
            return (
                <View >
                    <Avatar size={70}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2395/2395765.png',
                        }}
                    />
                </View>
            )
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <View style={{ marginLeft: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View>{headDetails()}</View>
                <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>{animal.animalName}</Text>
                    <View style={styles.iconos}>
                        <Avatar size={20}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/748/748150.png',
                            }
                            }
                        />
                        <Text style={{ fontSize: 18 }}> Código: {animal.animalCode}</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 20, backgroundColor: "#d9d9d9", width: 375, borderWidth: 1, borderRadius: 10, alignSelf: "center" }}>
                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3143/3143636.png',
                        }
                        }
                    />
                    <View>
                        <Text style={{ fontSize: 18 }}> F. Nacimiento: {dateFormat()}</Text>
                        <Text style={{ fontSize: 18 }}>{'(' + monthFormat()} meses cumplidos{')'}</Text>
                    </View>
                </View>


                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/523/523448.png',
                        }
                        }
                    />
                    <Text style={{ fontSize: 18 }}> Raza: {animal.animalRace}</Text>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2312/2312968.png',
                        }
                        }
                    />
                    <Text style={{ fontSize: 18 }}> Peso: {animal.animalWeight}kg</Text>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3570/3570848.png',
                        }
                        }
                    />
                    <Text style={{ fontSize: 18 }}> Castrado: {animal.animalCastrate}</Text>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3330/3330769.png',
                        }
                        }
                    />
                    <Text style={{ fontSize: 18 }}> Act. principal: {animal.animalMainActivity}</Text>
                </View>

                <View style={styles.iconos}>
                    <Avatar size={20}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/3330/3330665.png',
                        }
                        }
                    />
                    <Text style={{ fontSize: 18 }}> Act. secundaria: {animal.animalSideline}</Text>
                </View>


                <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 10 }} onPress={() => props.navigation.navigate('vaccinesListScreen', {
                    animalId: animal.animalId
                })}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#1b92e2', fontWeight: 'bold' }}>Salud </Text>
                        <Avatar size={22}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/5372/5372689.png',
                            }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 10 }} onPress={() => props.navigation.navigate('dataScreen', {
                    animalId: animal.animalId
                })}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#1b92e2', fontWeight: 'bold' }}>Datos </Text>
                        <Avatar size={22}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/5372/5372689.png',
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
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
                    style={{ marginBottom: 10, borderWidth: 1, borderRadius: 10, fontSize: 20, padding: 10 }}
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
    iconos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default AnimalDetailsScreen;