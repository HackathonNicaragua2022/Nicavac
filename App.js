import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Components

import LoginScreen from './components/screens/auth/loginScreen'
import RegisterScreen from './components/screens/auth/registerScreen';
import NewCattleScreen from './components/screens/cattle/newCattleScreen';
import CattlesListScreen from './components/screens/cattle/cattlesListScreen';
import CategoryScreen from './components/screens/cattle/categoryScreen';
import NewAnimalScreen from './components/screens/animal/newAnimalScreen';
import BullsListScreen from './components/screens/animal/bullsListScreen';
import CowsListScreen from './components/screens/animal/cowsListScreen';
import CalvesListScreen from './components/screens/animal/calvesListScreen';
import AnimalDetailsScreen from './components/screens/animal/animalDetailsScreen';
import VaccinesListScreen from './components/screens/animal/vaccine/vaccinesListScreen';
import VaccineDetailsScreen from './components/screens/animal/vaccine/vaccineDetailsScreen';
import EditAnimalScreen from './components/screens/animal/editAnimalScreen';
import EmployeesScreen from './components/screens/cattle/employeesScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name= 'loginScreen' 
        component={LoginScreen} 
        options= {{title: 'Inicio de Sesión'}}
      />
      <Stack.Screen
        name= 'registerScreen'
        component={RegisterScreen}
        options= {{title: 'Nueva Cuenta', headerShown: true}}
      />
      <Stack.Screen 
        name= 'cattlesListScreen' 
        component={CattlesListScreen} 
        options= {{title: 'Tus Fincas', headerShown: true , headerLeft: null, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen 
        name= 'newCattleScreen' 
        component={NewCattleScreen} 
        options= {{title: 'Nueva Finca', headerShown: true}}
      />
      <Stack.Screen
        name= 'categoryScreen'
        component={CategoryScreen}
        options={{title:'Categorías', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='newAnimalScreen'
        component={NewAnimalScreen}
        options={{title:'Nuevo animal', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='bullsListScreen'
        component={BullsListScreen}
        options={{title:'Toros', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='cowsListScreen'
        component={CowsListScreen}
        options={{title:'Vacas', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='calvesListScreen'
        component={CalvesListScreen}
        options={{title:'Terneros', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='animalDetailsScreen'
        component={AnimalDetailsScreen}
        options={{title: 'Detalles', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='vaccinesListScreen'
        component={VaccinesListScreen}
        options={{title: 'Vacunas', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='vaccineDetailsScreen'
        component={VaccineDetailsScreen}
        options={{title: 'Detalles de la vacuna', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='editAnimalScreen'
        component={EditAnimalScreen}
        options={{title: 'Editar Animal', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
      <Stack.Screen
        name='employeesScreen'
        component={EmployeesScreen}
        options={{title: 'Empleados', headerShown: true, headerTintColor: 'white', headerStyle: {
          backgroundColor: '#346a4a',
        },}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
