import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Markdown from 'react-native-markdown-display';
import StatusBar from '../components/StatusBar';

const TakePicture = ({route}) => {
    const email = route.params[0]
    const [summarisedText, setSummarisedText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false); // New state for loading indicator

    const getBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    };

    const handleUpload = async () => {
        try {
            
            if (selectedImage) {
                setLoading(true); // Set loading to true when starting upload
                const imageBase64 = selectedImage.base64;
                const response = await axios.post(`https://sharp-thankful-anchovy.ngrok-free.app/takepicture`, {
                    image: imageBase64,
                });
                setSummarisedText(response.data.reply);
            }
        } catch (error) {
            console.error('Error uploading or processing image:', error);
        } finally {
            setLoading(false); // Set loading to false after request completes (whether success or error)
        }
    };

    const handleCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            base64: true
        });
        if (!result.cancelled) {
            const base64Data = await getBase64(result.assets[0].uri);
            setSelectedImage({ uri: result.assets[0].uri, base64: base64Data });
            setSummarisedText("")
        }
    };

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true
        });
        if (!result.cancelled) {
            const base64Data = await getBase64(result.assets[0].uri);
            setSelectedImage({ uri: result.assets[0].uri, base64: base64Data });
            setSummarisedText("")
        }
    };

    useEffect(() => {
                handleCamera();
    }, []);

    return (
        <View style={{ paddingTop: 50, alignItems: 'center', flex: 1 ,backgroundColor:'#Bad373'}}>
            <Text style={{ fontSize: 30, marginTop: 20, fontWeight: 'bold' }}>Take a Picture</Text>

            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Pressable onPress={handleCamera} style={styles.button}>
                    <Text style={styles.buttonText}>Re-Capture</Text>
                </Pressable>

                <Pressable onPress={handleImagePicker} style={styles.button}>
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </Pressable>

                <Pressable onPress={handleUpload} style={styles.button}>
                    <Text style={styles.buttonText}>Upload</Text>
                </Pressable>
            </View>

            <View style={{height:'70%'}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center'}}>
                

                {selectedImage ? (
                    <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.image}
                    />
                    ) : null}

                {loading ? (
                    <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
                    ) : null}

                {summarisedText ?
                    <View style={{ width: 300, marginVertical: 20 }}>
                        <Markdown>{summarisedText}</Markdown>
                    </View>
                    : null}

            </ScrollView>

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

export default TakePicture;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F7F6BB',
        padding: 15,
        borderRadius: 5,
        margin: 10
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#F7F6BB'
    }
});
