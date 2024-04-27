import { View, Text, StyleSheet, Pressable, Alert, TextInput, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { createUserWithEmailAndPassword, } from 'firebase/auth'
import { addDoc, collection, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebase';
import { RadioButton } from 'react-native-paper'; 



const Register = () => {
    const navigation = useNavigation()
    const firestore = FIRESTORE_DB
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [number, setNumber] = useState('');
    const [selectedValue, setSelectedValue] = useState('option1'); 
    const auth = FIREBASE_AUTH

    const handleSignUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            sendUserData()
            navigation.navigate('Login')
        }
        catch (error) {

            Alert.alert('Error', "Some Error occured", [
                { text: 'OK', onPress: () => console.log(error) },
            ]);
        }
    }

    const sendUserData = async () => {
        const doc = await addDoc(collection(firestore, 'users'), {
            number: number,
            email: email,
            password: password,
            role : selectedValue
        })


    }

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>SwachhSanket</Text>

            <SafeAreaView style={{ width: '70%' }}>

                <Text style={styles.labelText}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    type="text"
                    value={number}
                    onChangeText={setNumber}
                // placeholder='Phone No.'
                />

                <Text style={styles.labelText}>Email</Text>
                <TextInput
                    style={styles.input}
                    type="text"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.labelText}>Password</Text>
                <Text style={{ marginBottom: 5 }}>Should at least be 6 characters</Text>
                <TextInput
                    style={styles.input}
                    type='password'
                    value={password}
                    onChangeText={setPass}
                // placeholder='Password'
                />
                
                {/* radioButton roles selection */}
                <View style={styles.radioContainer}>
                    <View style={styles.radioGroup}>
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                                value="Individual"
                                status={selectedValue === 'Individual' ?
                                    'checked' : 'unchecked'}
                                onPress={() => setSelectedValue('Individual')}
                                color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>
                                Individual
                            </Text>
                        </View>

                        <View style={styles.radioButton}>
                            <RadioButton.Android
                                value="CommBiz"
                                status={selectedValue === 'CommBiz' ?
                                    'checked' : 'unchecked'}
                                onPress={() => setSelectedValue('CommBiz')}
                                color="#007BFF"
                            />
                            <Text style={styles.radioLabel}>
                                Communities/Businesses
                            </Text>
                        </View>
                    </View>
                </View>

            </SafeAreaView>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => { handleSignUp() }} style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({

    radioContainer: {  
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    radioGroup: { 
        flexDirection: 'column',  
        justifyContent: 'space-around', 
        marginTop: 20, 
        borderRadius: 8, 
        backgroundColor: '#F7F6BB', 
        padding: 16, 
        elevation: 4, 
        shadowColor: '#000', 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 


    container: {
        paddingTop: 50,
        backgroundColor: '#Bad373',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    heading: {
        color: 'black',
        fontWeight: '900',
        fontSize: 30,
        margin: 20,
    },

    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 8,
        color: 'black',
    },

    input: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        backgroundColor: '#F7F6BB',
        padding: 5,
        borderRadius: 8,
    },


    buttonContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    btn: {
        borderRadius: 8,
        padding: 6,
        height: 50,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F6BB',
        margin: 5,
    },

    btnText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    }

});