import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { 
    View, 
    Button, 
    TextInput, 
    StyleSheet 
} from 'react-native';
import firebase from '../../database/firebase';

const NewUser_screen = (props) => {

    const initialState = {
        user_name: "",
        user_email: "",
    };

    const [ state, setState ] = useState (initialState);

    const handleChangeText = (value, user_name) => {
        setState ({ ...state, [user_name]: value });
    };

    const newUser = async () => {
        if ( state.user_name === '' ){
            alert( 'Ingrese un nombre' );
        } else {
            try {
                await firebase.db.collection ( 'users' ).add ({
                    user_name: state.user_name,
                    user_email: state.user_email,
                });
                props.navigation.navigate ( 'UsersList_screen' );
            } catch ( error ) {
                console.log ( error )
            }
        }
    };
    return (
        <ScrollView style= { styles.container }>
        
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(value) => handleChangeText(value, 'user_name')}
                    value={state.user_name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Correo electrónico'
                    onChangeText={(value) => handleChangeText(value, 'user_email')}
                    value={state.user_email}
                />
            </View>
    
            
            <View style={styles.button}>
                <Button 
                    title='Crear usuario'
                    onPress={() => newUser()}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
});

export default NewUser_screen;