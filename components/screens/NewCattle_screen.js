import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { 
    View, 
    Button, 
    TextInput, 
    StyleSheet,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../database/firebase';

const NewCattle_screen = (props) => {

    const [email, setEmail] = useState('')
    const initialState = {
        cattle_name: '',
        cattle_own: firebase.authentication.currentUser.uid,
    };

    const [ state, setState ] = useState (initialState);

    const handleChangeText = (value, cattle_name) => {
        setState ({ ...state, [cattle_name]: value});
    };

    const newCattle = async () => {
        if ( state.cattle_name === '' ){
            alert ( 'Ingrese un nombre' );
        } else {
            try {
                await firebase.db.collection ( 'cattles' ).add ({
                    cattle_name: state.cattle_name,
                    cattle_own: state.cattle_own,
                });
                props.navigation.navigate ( 'CattlesList_screen' );
            } catch ( error ){
                console.log ( error )
            }
        }
    };
    return (
        <ScrollView style= { styles.container }>

            <View style= { styles.inputGroup }>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(value) => handleChangeText(value, 'cattle_name')}
                    value={state.cattle_name}
                />
            </View>
            
            <TouchableOpacity style={styles.btnL} onPress={() => newCattle()}>
                <View>
                    <Text style={{textAlign:'center', fontSize:20, color:'#ffffff'}}>Agregar Finca</Text>
                </View>
                
            </TouchableOpacity>
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
    btnL: {
        marginTop: 20,
        backgroundColor:'#346a4a',
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '50%',
        alignSelf: 'center',

    },
});

export default NewCattle_screen;