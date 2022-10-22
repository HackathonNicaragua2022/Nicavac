import React, {useState, useEffect} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import firebase from "../../../database/firebase";
import { FlatList } from "react-native-gesture-handler";
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

    return (
        
        <View>
            <FlatList
                data = {data}
                renderItem = {renderItem}
                keyExtractor = {item => item.id}
            />
        </View>
        
    )
}

export default AnimalDetails_screen;