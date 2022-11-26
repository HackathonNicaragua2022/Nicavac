import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../../database/firebase';

const CattlesListScreen = (props) => {

    const [cattles, setCattles] = useState([]);

    useEffect(() => {
        firebase.db.collection('cattles').onSnapshot((querySnapshot) => {
            const cattles = [];
            querySnapshot.docs.forEach((doc) => {
                const { cattleName, cattleOwn } = doc.data();
                if (cattleOwn == firebase.authentication.currentUser.uid) {
                    cattles.push({
                        cattleId: doc.id,
                        cattleName,
                        cattleOwn,
                    });
                }
            });
            setCattles(cattles);
        });
    }, []);

    const deleteAnimal = async (cattle) => {
        const dbRef = firebase.db.collection('cattles').doc(cattle.cattleId)
        await dbRef.delete()
    }

    return (
        <ScrollView style={styles.container}>
            {cattles.map((cattle) => {
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
                                })}>{firebase.authentication.currentUser.email}</ListItem.Subtitle>
                        </ListItem.Content>
                        <TouchableOpacity>
                            <View>
                                <Avatar
                                    onPress={() => deleteAnimal(cattle)}
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/128/3687/3687412.png'
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )
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