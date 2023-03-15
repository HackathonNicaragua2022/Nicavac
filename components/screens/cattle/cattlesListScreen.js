import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';

const CattlesListScreen = (props) => {

    const initialCattle = {
        cattleId: '',
        cattleName: '',
        cattleOwn: '',
        cattleEmployee: '',
    }

    const [cattle, setCattle] = useState(initialCattle);

    const getCattleById = async (cattleId) => {
        const dbRef = firebase.db.collection('cattles').doc(cattleId)
        const doc = await dbRef.get();
        const cattle = doc.data();
        setCattle({
            ...cattle,
            cattleId: doc.id
        })
    }

    const [cattles, setCattles] = useState([]);

    //
    useEffect(() => {
        firebase.db.collection('cattles').onSnapshot((querySnapshot) => {
            const cattles = [];
            querySnapshot.docs.forEach((doc) => {
                const { cattleName, cattleOwn, cattleEmployee } = doc.data();
                if ((cattleOwn == firebase.authentication.currentUser.uid) || (cattleEmployee == firebase.authentication.currentUser.email)) {
                    cattles.push({
                        cattleId: doc.id,
                        cattleName,
                        cattleOwn,
                        cattleEmployee,
                    });
                }
            });
            setCattles(cattles);
        });
        getCattleById()
    }, []);

    const deleteCattle = async (cattle) => {
        const dbRef = firebase.db.collection('cattles').doc(cattle.cattleId)
        await dbRef.delete()
    }

    const confirmDeleteAlert = (cattle) => {
        Alert.alert(
            'Confirmar eliminación',
            'Se eliminará para siempre (es mucho tiempo) ¿Está seguro?',
            [
                { text: 'Sí', onPress: () => deleteCattle(cattle) },
                { text: 'No' }
            ]
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 20, alignSelf: 'center' }}>Bienvenido {firebase.authentication.currentUser.email}</Text>
            {cattles.map((cattle) => {
                if (cattle.cattleOwn == firebase.authentication.currentUser.uid) {
                    return (
                        <ListItem style={styles.list} key={cattle.cattleId}>
                            <Avatar
                                onPress={() => props.navigation.navigate('categoryScreen', {
                                    cattleId: cattle.cattleId
                                })}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/1813/1813617.png',
                                }}
                            />
                            <ListItem.Content>
                                <ListItem.Title
                                    onPress={() => props.navigation.navigate('categoryScreen', {
                                        cattleId: cattle.cattleId
                                    })}
                                    style={{ fontWeight: "bold" }}>{cattle.cattleName}</ListItem.Title>
                                <ListItem.Subtitle
                                    onPress={() => props.navigation.navigate('categoryScreen', {
                                        cattleId: cattle.cattleId
                                    })}>Administrador</ListItem.Subtitle>
                            </ListItem.Content>
                            <TouchableOpacity>
                                <View>
                                    <Avatar
                                        onPress={() => confirmDeleteAlert(cattle)}
                                        source={{
                                            uri: 'https://cdn-icons-png.flaticon.com/128/3687/3687412.png'
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </ListItem>
                    )
                } else if (cattle.cattleEmployee == firebase.authentication.currentUser.email) {
                    return (
                        <ListItem style={styles.list} key={cattle.cattleId}>
                            <Avatar
                                onPress={() => props.navigation.navigate('categoryEScreen', {
                                    cattleId: cattle.cattleId
                                })}
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/1813/1813617.png',
                                }}
                            />
                            <ListItem.Content>
                                <ListItem.Title
                                    onPress={() => props.navigation.navigate('categoryScreen', {
                                        cattleId: cattle.cattleId
                                    })}
                                    style={{ fontWeight: "bold" }}>{cattle.cattleName}</ListItem.Title>
                                <ListItem.Subtitle
                                    onPress={() => props.navigation.navigate('categoryScreen', {
                                        cattleId: cattle.cattleId
                                    })}>Empleado</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                }

            })}

            <TouchableOpacity style={styles.btnL} onPress={() => props.navigation.navigate('newCattleScreen')}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff' }}>Nueva Finca</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff'
    },
    btnL: {
        marginTop: 20,
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '40%',
        alignSelf: 'center',
    },
    list: {
        borderRadius: 10,
    }
})

export default CattlesListScreen;