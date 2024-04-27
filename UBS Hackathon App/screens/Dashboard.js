import React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../components/StatusBar';
import WordAnim from '../components/WordAnim'


const Dashboard = ({ route }) => {
    const navigation = useNavigation();
    const email = route.params[0]
    console.log(email)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 40, left: 20, alignItems: 'center'}}>
                <Image style={{ width: 60, height: 60 }}
                    source={require('../assets/rLogo.png')} />
                <Text style={{
                    color: 'black',
                    fontWeight: '900',
                    fontSize: 25,
                    margin: 10,
                }}>SwachhSanket</Text>
            </View>
            <WordAnim />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button]}
                    onPress={() => navigation.navigate('DailyGarbage', [email])}
                >
                    <Image style={{ width: 60, height: 60 }}
                    source={require('../assets/dailyMain.png')} />
                    <Text style={styles.buttonText}>Daily Garbage</Text>
                </Pressable>

                <Pressable
                    style={[styles.button]}
                    onPress={() => navigation.navigate('Events', [email])}
                >
                    <Image style={{ width: 60, height: 60 }}
                    source={require('../assets/eventMain.png')} />
                    <Text style={styles.buttonText}>Events</Text>
                </Pressable>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button]}
                    onPress={() => navigation.navigate('TakePic', [email])}
                >
                    <Image style={{ width: 60, height: 60 }}
                    source={require('../assets/cameraMain.png')} />
                    <Text style={styles.buttonText}>Picture</Text>
                </Pressable>

                <Pressable
                    style={[styles.button]}
                    onPress={() => navigation.navigate('Maps', [email])}
                >
                    <Image style={{ width: 60, height: 60 }}
                    source={require('../assets/mapMain.png')} />
                    <Text style={styles.buttonText}>Map</Text>
                </Pressable>
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
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#Bad373',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        height: 120,
        width: Dimensions.get('window').width / 2.5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F6BB',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 7
    },
});
