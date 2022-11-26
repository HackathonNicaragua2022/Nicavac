import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const CategoryScreen = (props) => {

    const cattleId = props.route.params.cattleId

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.containerOptions}>

                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('cowsListScreen', { cattleId })}>
                        <Avatar size={100}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/1660/1660750.png',
                            }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 25, color: '#242424' }}>Vacas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('bullsListScreen', { cattleId })}>
                        <Avatar size={100}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/3819/3819549.png',
                            }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 25, color: '#242424' }}>Toros</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('calvesListScreen', { cattleId })}>
                        <Avatar size={100}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/128/2298/2298491.png',
                            }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 25, color: '#242424' }}>Terneros</Text>
                    </TouchableOpacity>
                </View>
                <ListItem style={{ padding: 0 }}>
                    <TouchableOpacity style={styles.btnA}
                        onPress={() => props.navigation.navigate('newAnimalScreen', { cattleId })}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>Agregar Animal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnA}
                        onPress={() => props.navigation.navigate('employeesScreen', { cattleId })}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#ffffff', fontWeight: 'bold' }}>Empleados</Text>
                    </TouchableOpacity>
                </ListItem>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ffffff'
    },
    containerOptions: {
        flex: 1,
        justifyContent: 'center',
    },
    btn: {
        borderWidth: 2,
        borderColor: '#242424',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center'
    },
    btnA: {
        backgroundColor: '#346a4a',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        width: 170
    }
})
export default CategoryScreen;