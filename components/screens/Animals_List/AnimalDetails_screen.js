import React, {useState, useEffect} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, StyleSheet, Image } from "react-native";
import firebase from "../../../database/firebase";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BullsList_screen from "./BullsList_screen";

const AnimalDetails_screen  = (props) => {

    const [data, setData] = useState ([]);
    const selectedAnimal = BullsList_screen();

    async function loadData() {
        try {
            const animal = await firebase.db.collection('animals').get()
            if ( animal ){
                setData(animal.docs)
            }
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function renderItem ({item}) {
        return (
            <View>
                <Text>{item.data().animal_name}</Text>
                <Text>{item.data().animal_generer}</Text>
                <Text>{item.data().animal_race}</Text>
                <Text>{item.data().animal_own}</Text>
            </View>
        )
    }

    const Historial_screen=()=> {
        props.navigation.navigate('Historial_screen');
        console.log()
    }

    return (
        
        <ScrollView>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../src/3819549.png')}
                /> 
            </View>
            
            <Text style={{fontSize: 45, alignSelf: "center", fontWeight: "bold", marginBottom: 1}}>Pepe</Text>

            <Text style= {{fontSize:18, alignSelf: "center", marginBottom: 10}}>Código: FP-001</Text>

            <View style={{padding:20, backgroundColor: "#d9d9d9", width: 375, borderRadius: 30, alignSelf: "center"}}>
                <Text style={{fontSize: 18}}>Fecha de nacimiento: 21/11/18</Text>
                <Text style={{fontSize: 18}}>Raza: Jersey</Text>
                <Text style={{fontSize: 18}}>Peso: 180kg</Text>
                <Text style={{fontSize: 18}}>Tamaño: 150cm</Text>
                <Text style={{fontSize: 18}}>Colores: Café con Negro</Text>
                <Text style={{fontSize: 18}}>Objetivo principal: Semental</Text>
                <Text style={{fontSize: 18}}>Objetivos secundarios: Subasta</Text>
                <Text style={{fontSize: 18, color: "blue", alignSelf: "flex-end"}} onPress={() => Historial_screen()}>Historial de vacunas</Text>

                <Text style={{fontSize: 22, alignSelf: "center", fontWeight: "bold", marginTop: 10}}>Descripción</Text>
                <View style={{padding: 10, backgroundColor: "#ffffff", borderRadius: 30, borderWidth: 1, borderColor: "#bfbfbf"}}>
                    <Text style={{fontSize: 18, textAlign: "auto"}}>Toro bravo pero eficiente, de cuerpo robusto y salud muy buena, cuernos grandes, cicatriz pequeña debajo del ojo izquierdo y sensible ante sonidos fuertes.</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.btnL}>
                <View>
                    <Text style={{textAlign:'center', fontSize:20, color:'#ffffff'}}>Datos avanzados</Text>
                </View>
            </TouchableOpacity>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    containerLogo:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
    },
    textStyle:{
        padding: 10,
        alignSelf: "center"
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

export default AnimalDetails_screen;