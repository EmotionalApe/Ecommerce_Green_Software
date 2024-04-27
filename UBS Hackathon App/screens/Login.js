import { View, Text, StyleSheet, Pressable, Alert, TextInput, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebase'

const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [role, setRole] = useState('');
    const auth = FIREBASE_AUTH

    const handleSignUp = async () => {
        navigation.navigate('Register')
    }

    const fetchRole = async () => {
        try {
            const roleQuery = query(collection(FIRESTORE_DB, 'users'), where('email', '==', email));
            const roleSnapshot = await getDocs(roleQuery);

            if (!roleSnapshot.empty) {
                const userRole = roleSnapshot.docs[0].data().role;
                setRole(userRole)
            }

        } catch (error) {
            Alert.alert('Error', "Some Error occured", [
                { text: 'OK', onPress: () => console.log(error) },
            ]);
        }
    }

    const handleLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            fetchRole();
            // Alert.alert('Confirmation', 'Logged in', [
            //     { text: 'OK', onPress: () => navigation.navigate("Dashboard", [email, role]) },
            // ]);
            navigation.navigate("Dashboard", [email, role])
        }
        catch (error) {
            Alert.alert('Error', "Some Error occured", [
                { text: 'OK', onPress: () => console.log(error) },
            ]);
        }
    }



    return (
        <View style={styles.container}>


            <Image style={{ width: 100, height: 100 }}
                source={require('../assets/rLogo.png')} />

            <Text style={styles.heading}>SwachhSanket</Text>

            <SafeAreaView style={{ width: '70%' }}>
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                    style={styles.input}
                    type="text"
                    value={email}
                    onChangeText={setEmail}
                // placeholder='Phone No.'
                />
                <Text style={styles.labelText}>Password</Text>
                <TextInput
                    style={styles.input}
                    type='password'
                    value={password}
                    onChangeText={setPass}

                />
            </SafeAreaView>

            <View style={styles.buttonContainer}>
                <Pressable onPress={handleLogin} style={styles.btn}>
                    <Text style={styles.btnText}>Login </Text>
                </Pressable>

                <Pressable onPress={handleSignUp} style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
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
        width: 100,
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