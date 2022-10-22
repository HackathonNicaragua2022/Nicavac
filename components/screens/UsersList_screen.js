import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../../database/firebase';

const UsersList_screen = ( props ) => {

    const [ users, setUsers ] = useState ([]);

    useEffect (() => {
        firebase.db.collection ( 'users' ).onSnapshot((querySnapshot) =>{
            const users =[];
            querySnapshot.docs.forEach((doc) => {
                const { user_name, user_email } = doc.data();
                users.push({
                    id: doc.id,
                    user_name,
                    user_email,
                });
            });
            setUsers(users);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                onPress={() => props.navigation.navigate( 'NewUser_screen' )}
                title='Nuevo usuario'
            />
            {users.map((user) => {
                return (
                    <ListItem
                        key={user.id}>
                        {/*<ListItem.Chevron />*/}
                        <Avatar
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/1177/1177568.png',
                            }}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.user_name}</ListItem.Title>
                            <ListItem.Subtitle>{user.user_email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};

export default UsersList_screen;