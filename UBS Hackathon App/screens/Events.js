import { BackHandler, Pressable, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { addDoc, collection, query, where, getDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebase';
import StatusBar from '../components/StatusBar';

const Events = ({ route }) => {
    const email = route.params[0]
    const navigation = useNavigation()
    const [events, setEvents] = useState([]);
    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'eventData'));
            const eventData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            eventData.sort((a, b) => a.date - b.date);
            setEvents(eventData);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {


        fetchEvents();
    }, []);

    return (
        <View style={{ paddingTop: 60, alignItems: 'center', flex: 1, width: '100%',backgroundColor: '#Bad373' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                <Text style={{ fontSize: 30, marginTop: 20, fontWeight: 'bold' }}>Events</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={{}} onPress={() => (navigation.navigate('EventForm',[email]))}>
                        <Text style={{ fontSize: 15, marginTop: 20, fontWeight: 'bold', color: 'black', backgroundColor: '#F7F6BB', padding: 10, borderRadius: 5 }}>Create Event</Text>
                    </Pressable>
                    <Pressable style={{}} onPress={fetchEvents}>
                        <Text style={{ fontSize: 40, marginTop: 7, marginLeft: 7 }}>
                            ↻
                        </Text>
                    </Pressable>
                </View>



            </View>

            <View style={{height: '80%'}}>
                <View style={{ marginVertical: 20, flex: 1 }}>

                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

                        {events.length != 0 ?
                            <>
                                {events.map((event) => (

                                    <View key={event.id} style={{ padding: 20, borderRadius: 10, width: 350, backgroundColor: '#F7F6BB', marginVertical: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 17}}>{event.title}</Text>
                                            <Text style={{fontWeight: 'bold'}}>{event.date}</Text>
                                        </View>
                                        <Text> 📍 Location : {event.location}</Text>
                                        <Text style={{marginVertical: 5}}> 📜 {event.description}</Text>
                                    </View>
                                ))}
                            </> : null}
                    </ScrollView>

                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#3ab570', // Change this to your desired background color
                height: 70, // Change this to your desired height
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <StatusBar email={email} />
            </View>
        </View>
    )
}

export default Events

const styles = StyleSheet.create({})