import { Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { React, useState } from 'react'
import { addDoc, collection, query, where, getDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const EventForm = ({ route }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const navigation = useNavigation();
    const { email } = route.params;

    const handleSubmit = async () => {
        const formData = { title, date, time, description, location };
    
        try {
            const docRef = await addDoc(collection(FIRESTORE_DB, 'eventData'), formData);
            navigation.navigate("Events",[email])
          } catch (error) {
            console.error('Error adding document: ', error);
          }
    };


    return (
        <View style={{ paddingTop: 50, alignItems: 'center', flex: 1, backgroundColor: '#Bad373' }}>
            <Text style={{ fontSize: 30, marginTop: 20, fontWeight: 'bold' }}>Create an Event</Text>
            {/* date time Title description */}

            <View style={{ padding: 20, width: 300 }}>
                <Text style={styles.labelText}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.labelText}>Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChangeText={setDate}
                />
                <Text style={styles.labelText}>Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="hh:mm am/pm"
                    value={time}
                    onChangeText={setTime}
                />
                <Text style={styles.labelText}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />
                <Text style={styles.labelText}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter location"
                    value={location}
                    onChangeText={setLocation}
                />
                <Pressable style={{}} onPress={handleSubmit}>
                    <Text style={{ fontSize: 15, marginTop: 20, color: 'black', backgroundColor: '#F7F6BB', padding: 10, borderRadius: 5, textAlign: "center",fontWeight:'bold' }}>Create Event</Text>
                </Pressable>

                <Pressable
                    style={[styles.button]}
                    onPress={() => navigation.navigate('Events', [email])}
                >
                    <Text style={{ fontSize: 15, marginTop: 20, color: 'black', backgroundColor: '#F7F6BB', padding: 10, borderRadius: 5, textAlign: "center",fontWeight:'bold' }}>Close</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default EventForm

const styles = StyleSheet.create({
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
})