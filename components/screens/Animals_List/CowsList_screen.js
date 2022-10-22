import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';

const CowsList_screen = ( props ) => {

    const [ animals, setUsers ] = useState ([]);

    useEffect (() => {
        firebase.db.collection ( 'animals' ).onSnapshot((querySnapshot) => {
            const animals =[];
            querySnapshot.docs.forEach((doc) => {
                const { animal_name, animal_own, animal_generer } = doc.data();
                if (animal_generer=='H'){
                    animals.push({
                        animal_id: doc.id,
                        animal_name,
                        animal_generer,
                        animal_own, 
                    });
                }
                
            });
            setUsers(animals);
        });
    },[]);

    return (
        
        <ScrollView style={styles.container}>
            {animals.map((animal) => {
                return (
                    <ListItem style={styles.list} key={animal.animal_id} onPress={()=> props.navigation.navigate('AnimalDetails_screen')}>
                        <Avatar
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/1660/1660750.png',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{fontWeight: "bold"}}>{animal.animal_name}</ListItem.Title>
                            <ListItem.Subtitle>{firebase.authentication.currentUser.email}</ListItem.Subtitle>
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
        backgroundColor:'#346a4a',
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',
    },
    list: {
        borderRadius: 10,
    }
})

export default CowsList_screen;