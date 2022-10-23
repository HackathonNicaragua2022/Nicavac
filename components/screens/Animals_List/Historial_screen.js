import React, {useState, useEffect} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View, StyleSheet, Image } from "react-native";
import firebase from "../../../database/firebase";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import BullsList_screen from "./BullsList_screen";

const Historial_screen  = (props) => {
    return (
        <ScrollView>
            <View style={styles.list}>
                <Text style={styles.txt}>12/08/18</Text>
                <Text style={styles.txt}>Brucelosis</Text>
            </View>
            <View style={styles.list}>
                <Text style={styles.txt}>17/10/18</Text>
                <Text style={styles.txt}>Complejo Queratoconjuntivitis</Text>
            </View>
            <View style={styles.list}>
                <Text style={styles.txt}>05/11/18</Text>
                <Text style={styles.txt}>Aftosa</Text>
            </View>
            <View style={styles.list}>
                <Text style={styles.txt}>01/12/18</Text>
                <Text style={styles.txt}>Carbunclo Bacteridiano</Text>
            </View>
            <View style={styles.list}>
                <Text style={styles.txt}>15/01/19</Text>
                <Text style={styles.txt}>Complejo Respiratorio</Text>
            </View>
            <TouchableOpacity style={styles.btnL}>
                <Text style={{alignSelf: "center", color: "#ffffff", fontSize: 20}}>Nueva Vacuna</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list:{
        backgroundColor: "#d9d9d9",
        padding: 15,
        width: 375,
        marginBottom: 10,
        borderRadius: 30,
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
    txt:{
        fontSize: 18,
    }
})

export default Historial_screen;