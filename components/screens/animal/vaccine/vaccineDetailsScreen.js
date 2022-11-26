import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image, StyleSheet, ActivityIndicator, Alert, TextInput, Button } from "react-native";
import firebase from '../../../../database/firebase'
import moment from "moment/moment";
import { ListItem } from "react-native-elements";

const VaccineDetailsScreen = (props) => {

    //Se inicializan los valores del objeto
    const initialVaccine = {
        vaccineAnimalId: '',
        vaccineName: '',
        vaccineDate: '',
    };

    const [loading, setLoading] = useState(true);

    const [vaccine, setVaccine] = useState(initialVaccine);

    //Lectura de los datos de la vacuna
    const getVaccineById = async (vaccineId) => {
        const dbref = firebase.db.collection('vaccines').doc(vaccineId)
        const doc = await dbref.get();
        const vaccine = doc.data();
        setVaccine({
            ...vaccine,
            vaccineId: doc.id
        })
        setLoading(false)
    }

    function dateFormat() {
        const date = vaccine.vaccineDate
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const dates = moment(dateFormatl).format('DD/MM/YYYY')
            return (dates)
        }
    }

    function monthFormat() {
        const date = vaccine.vaccineDate
        if (date != null) {
            const timestamp = date.toString()
            const milliseconds = timestamp.substring(18, 28) + timestamp.substring(42, 45)
            const dateFormatl = new Date(parseInt(milliseconds))
            const now = moment();
            const months = now.diff(dateFormatl, 'months');
            return (months)
        }
    }

    //Extracción del id de la vacuna
    useEffect(() => {
        getVaccineById(props.route.params.vaccineId)
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <Text style={{ fontSize: 30, alignSelf: "center", fontWeight: "bold", marginBottom: 1 }}
            >{vaccine.vaccineName}</Text>

            <View style={{ padding: 20, backgroundColor: '#d9d9d9', width: 375, borderRadius: 10, alignSelf: 'center' }}>
                <Text style={{ fontSize: 18 }}
                >Fecha de aplicación: {dateFormat()}</Text>

                <Text style={{ fontSize: 18 }}>Hace {monthFormat()} meses</Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default VaccineDetailsScreen;