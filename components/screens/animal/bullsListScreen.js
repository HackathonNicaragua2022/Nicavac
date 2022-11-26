import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar, SearchBar } from 'react-native-elements';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';
import moment from 'moment';

const BullsListScreen = (props) => {

    const [animals, setAnimals] = useState([]);
    const [search, setSearch] = useState('');

    const cattleId = props.route.params.cattleId

    useEffect(() => {
        firebase.db.collection('animals').onSnapshot((querySnapshot) => {
            const animals = [];
            querySnapshot.docs.forEach((doc) => {
                const { animalCode, animalName, animalGenerer, animalBirth, animalCattle } = doc.data();
                const date = animalBirth
                if (date != null) {
                    const timestamp = date.toString()
                    const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
                    const dateFormatl = new Date(parseInt(milliseconds))
                    const now = moment();
                    const mo = now.diff(dateFormatl, 'months');
                    if ((mo > 48) && (animalGenerer === 'M') && (animalCattle === cattleId)) {
                        animals.push({
                            animalId: doc.id,
                            animalCode,
                            animalName,
                            animalGenerer,
                            animalBirth,
                            animalCattle,
                        });
                    }
                }
            });
            setAnimals(animals);
        });
    }, []);

    return (
        <View style={{ padding: 10, backgroundColor: '#ffffff' }}>
            <TextInput
                style={styles.textInput}
                placeholder= '  Buscar toro'
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <FlatList
                data={animals}
                renderItem={({ item }) => (
                    <ListItem style={styles.list} key={item.animalId}
                        onPress={() => props.navigation.navigate('animalDetailsScreen', {
                            animalId: item.animalId
                        })}>
                        <Avatar
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/3819/3819549.png',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: "bold" }}>{item.animalName}</ListItem.Title>
                            <ListItem.Subtitle>Código: {item.animalCode}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff'
    },
    list: {
        borderRadius: 10,
    },
    txt: {
        backgroundColor: '#bfbfbf'
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 30
    },
})

export default BullsListScreen;