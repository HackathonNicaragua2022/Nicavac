import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../database/firebase';

const CattlesList_screen = ( props ) => {

    const [ cattles, setUsers ] = useState ([]);

    useEffect (() => {
        firebase.db.collection ( 'cattles' ).onSnapshot((querySnapshot) => {
            const cattles =[];
            querySnapshot.docs.forEach((doc) => {
                const { cattle_name, cattle_own } = doc.data();
                if (cattle_own==firebase.authentication.currentUser.uid){
                    cattles.push({
                        cattle_id: doc.id,
                        cattle_name,
                        cattle_own, 
                    });
                }
                
            });
            setUsers(cattles);
        });
    },[]);

    return (
        
        <ScrollView style={styles.container}>
            {cattles.map((cattle) => {
                return (
                    <ListItem style={styles.list} key={cattle.cattle_id} onPress={()=> props.navigation.navigate('Category_screen')}>
                        <Avatar
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/1813/1813617.png',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{fontWeight: "bold"}}>{cattle.cattle_name}</ListItem.Title>
                            <ListItem.Subtitle>{firebase.authentication.currentUser.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
                })}
            
            <TouchableOpacity style={styles.btnL} onPress={() => props.navigation.navigate('NewCattle_screen')}>
                <View>
                    <Text style={{textAlign:'center', fontSize:18, color:'#ffffff'}}>Nueva Finca</Text>
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
        backgroundColor:'#346a4a',
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '40%',
        alignSelf: 'center',
    },
    list: {
        borderRadius: 10,
    }
})

export default CattlesList_screen;