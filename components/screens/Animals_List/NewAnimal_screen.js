import React, { useRef, useState } from 'react';
import { View, Button, ScrollView, TextInput, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firebase from '../../../database/firebase';

const NewAnimal_screen = (props) => {

    const initialState = {
        animal_name: '',
        animal_generer: '',
        animal_race: '',
        animal_age: '',
        animal_own: firebase.authentication.currentUser.uid,
    };

    const [ state, setState ] = useState (initialState);

    const handleChangeText = (value, animal_name) => {
        setState ({ ...state, [animal_name]: value});
    };

    const selectGenererText = (value, animal_generer) => {
        setState ({...state, [animal_generer]: value});
    }

    const selectRaceText = (value, animal_race) => {
        setState ({...state, [animal_race]: value});
    }

    const [date, setDate] = useState(new Date);

    const selectDate = (value, animal_age) => {
        setDate ({...date, [animal_age]: value});
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        (value) => selectDate(value, 'animal_age')
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
        });
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const newAnimal = async () => {
        if ( (state.animal_name === '') ){
            alert ( 'Complete los campos' );
        } else {
            try {
                await firebase.db.collection ( 'animals' ).add ({
                    animal_name: state.animal_name,
                    animal_race: state.animal_race,
                    animal_own: state.animal_own,
                    animal_generer: state.animal_generer,
                });
                props.navigation.navigate ( 'Category_screen' );
            } catch ( error ){
                console.log ( error )
            }
        }
    };


    return (
        <ScrollView style= { styles.container }>
            <View>
                <Text style={{fontSize:18}}>Código del animal</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Código'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>
            <View>
                <Text style={{fontSize:18}}>Nombre del animal</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Nombre'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>

            <View>
                <Text style={{fontSize:18}}>Sexo</Text>
                <Picker style={{backgroundColor:"#d9d9d9", marginBottom: 10}}
                    selectedValue= {state.animal_generer}
                    onValueChange={(value) => selectGenererText(value, 'animal_generer')}
                    value={state.animal_generer}
                    >
                    <Picker.Item label="Hembra" value="H" />
                    <Picker.Item label="Macho" value="M" />
                </Picker>
            </View>

            <View>
                <Text style={{fontSize:18}}>Raza</Text>
                <Picker style={{backgroundColor:"#d9d9d9", marginBottom: 10}}
                    selectedValue={state.animal_race}
                    onValueChange={(value) => selectRaceText(value, 'animal_race')}
                    value={state.animal_race}
                    >
                    <Picker.Item label="Jersey" value="Jersey" />
                    <Picker.Item label="Holstein" value="Holstein" />
                    <Picker.Item label="Angus" value="Angus" />
                    <Picker.Item label="Hereford" value="Hereford" />
                    <Picker.Item label="Brahman" value="Brahman" />
                    <Picker.Item label="Brangus" value="Brangus" />
                    <Picker.Item label="Braford" value="Braford" />
                    <Picker.Item label="Limousin" value="Limousin" />
                    <Picker.Item label="Criollo" value="Criollo" />
                    <Picker.Item label="Otros" value="Otros" />
                </Picker>
            </View>

            <View style={{marginBottom:18}}>
                <Text style={{fontSize:18}}>Fecha de nacimiento</Text>
                <Button onPress={showDatePicker} title='Fecha de nacimiento'/>
                <Text>Fecha seleccionada : {date.toLocaleDateString()}</Text>
            </View>

            <View>
                <Text style={{fontSize:20}}>Peso</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Peso en kg'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>

            <View>
                <Text style={{fontSize:20}}>Tamaño</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Tamaño en cm'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>

            <View>
                <Text style={{fontSize:20}}>Colores</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Colores'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>

            <View>
                <Text style={{fontSize:18}}>Objetivo</Text>
                <Picker style={{backgroundColor:"#d9d9d9", marginBottom: 10}}
                    selectedValue={state.animal_race}
                    onValueChange={(value) => selectRaceText(value, 'animal_race')}
                    value={state.animal_race}
                    >
                    <Picker.Item label="Reproducción" value="Jersey" />
                    <Picker.Item label="Producción de leche" value="Holstein" />
                    <Picker.Item label="Venta" value="Angus" />
                    <Picker.Item label="Subasta" value="Hereford" />
                    <Picker.Item label="Carne" value="Brahman" />
                </Picker>
            </View>

            <View>
                <Text style={{fontSize:20}}>Descripción</Text>
                <TextInput style= { styles.inputGroup}
                    placeholder='Descripción breve'
                    onChangeText={(value) => handleChangeText(value, 'animal_name')}
                    value={state.animal_name}
                />
            </View>
            
            <TouchableOpacity style={styles.btnL} onPress={() => newAnimal()}>
                <View>
                    <Text style={{textAlign:'center', fontSize:20, color:'#ffffff'}}>Agregar Animal</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 20,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 20,
        marginTop: 5,
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
        marginBottom: 50
    },
});

export default NewAnimal_screen;