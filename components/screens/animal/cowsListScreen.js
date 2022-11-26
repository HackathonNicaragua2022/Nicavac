import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';
import moment from 'moment';

const CowsListScreen = (props) => {

    const [animals, setAnimals] = useState([]);

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
                    if ((mo > 48) && (animalGenerer === 'H') && (animalCattle === cattleId)) {
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
        <ScrollView style={styles.container}>
            {animals.map((animal) => {
                return (
                    <ListItem style={styles.list} key={animal.animalId}
                        onPress={() => props.navigation.navigate('animalDetailsScreen', {
                            animalId: animal.animalId
                        })}>
                        <Avatar
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/1660/1660750.png',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: "bold" }}>{animal.animalName}</ListItem.Title>
                            <ListItem.Subtitle>Código: {animal.animalCode}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })}
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
        width: '50%',
        alignSelf: 'center',
    },
    list: {
        borderRadius: 10,
    }
})

export default CowsListScreen;