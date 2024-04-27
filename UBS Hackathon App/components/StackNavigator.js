import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';
import Register from '../screens/Register';
import Dashboard from '../screens/Dashboard';
import TakePicture from '../screens/TakePicture';
import DailyGarbage from '../screens/DailyGarbage';
import Maps from '../screens/Maps';
import Events from '../screens/Events'
import EventForm from '../screens/EventForm';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Dashboard" component={Dashboard}></Stack.Screen>
            <Stack.Screen name="Events" component={Events}></Stack.Screen>
            <Stack.Screen name="EventForm" component={EventForm}></Stack.Screen>
            <Stack.Screen name="Maps" component={Maps}></Stack.Screen>
            <Stack.Screen name="DailyGarbage" component={DailyGarbage}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
            <Stack.Screen name="TakePic" component={TakePicture}></Stack.Screen>
        </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator