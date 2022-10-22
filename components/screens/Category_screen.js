import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../../database/firebase';

const Category_screen = ( props ) => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.containerOptions}>

                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('CowsList_screen')}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#242424'}}>Vacas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('BullsList_screen')}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#242424'}}>Toros</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#242424'}}>Terneros</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.btnAdd} onPress={()=>props.navigation.navigate('NewAnimal_screen')}>
                        <Text style={{textAlign:'center', fontSize:25, color:'#ffffff'}}>Agregar Animal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    containerOptions: {
        flex: 1,
        justifyContent:'center',
        marginBottom: 0,
    },
    btn:{
        backgroundColor:'#bfbfbf',
        padding:10,
        borderRadius: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#242424',
        borderRightWidth: 1,
        borderRightColor: '#242424'
    },
    btnAdd:{
        backgroundColor:'#346a4a',
        padding:10,
        borderRadius: 10,
        justifyContent: 'center',
        width: '65%',
        alignSelf: 'center',
    }
})
export default Category_screen;