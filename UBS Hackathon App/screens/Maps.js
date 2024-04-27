import { StyleSheet, Text, View, Image, Pressable, Linking, ScrollView } from 'react-native'
import { React, useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from "expo-location";
import StatusBar from '../components/StatusBar';

const Maps = ({ route }) => {
    const email = route.params[0]
    const mapStyle = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

    const ngo = [
        { id: 2, location: { latitude: 18.4730507723491, longitude: 73.82251469051484 } },
        { id: 3, location: { latitude: 18.516354394475396, longitude: 73.83727756864081 } }
    ]

    const recycle = [
        { id: 1, location: { latitude: 18.51777023577405, longitude: 73.84683562338341 } },
        { id: 2, location: { latitude: 18.434193701952093, longitude: 73.84993085299834 } },
        { id: 3, location: { latitude: 18.521622022757587, longitude: 73.8670817439868 } }
    ]


    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);


            setInitialRegion({
                // latitude: location.coords.latitude,
                // longitude: location.coords.longitude,
                latitude: 18.46275865249373,
                longitude: 73.88503252345025,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            });

        };

        getLocation();
    }, []);


    return (
        <View style={{ flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: '#Bad373' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>MapView</Text>
            <View style={{ height: 300, width: '85%', borderColor: 'black', borderWidth: 2, borderRadius: 3, marginTop: 10 }}>
                <MapView provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    style={{ height: '100%', width: '100%' }}
                    initialRegion={initialRegion}>

                    {ngo.length != 0 ?
                        <>
                            {ngo.map((ngo) => (
                                <Marker
                                    key={ngo.id}
                                    coordinate={{ latitude: ngo.location.latitude, longitude: ngo.location.longitude }}>

                                    <Image style={{ width: 30, height: 30 }}
                                        source={require('../assets/ngo.png')} />
                                </Marker>
                            ))}
                        </> : null}

                    {recycle.length != 0 ?
                        <>
                            {recycle.map((recycle) => (
                                <Marker
                                    key={recycle.id}
                                    coordinate={{ latitude: recycle.location.latitude, longitude: recycle.location.longitude }}>

                                    <Image style={{ width: 20, height: 20 }}
                                        source={require('../assets/recycle.png')} />
                                </Marker>
                            ))}
                        </> : null}

                    {currentLocation && (
                        <Marker
                            coordinate={{
                                // latitude: currentLocation.latitude,
                                // longitude: currentLocation.longitude,
                                latitude: 18.46275865249373,
                                longitude: 73.88503252345025
                            }}
                            title="Your Location"
                        />
                    )}
                </MapView>
            </View>

            <View style={{ width: '85%', marginTop: 20 }}>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Image style={{ width: 50, height: 50 }}
                            source={require('../assets/ngo.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>Nearby NGOs</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../assets/call.png')} />

                        <Pressable onPress={() => { Linking.openURL(`tel:${9864836258}`) }} style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10 }}>Poornam Ecovision Foundation : </Text>
                            <Text style={{ fontWeight: 'bold' }}>9864836258</Text>
                        </Pressable>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../assets/call.png')} />
                        <Pressable onPress={() => { Linking.openURL(`tel:${9864836258}`) }} style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10 }}>SWaCH E-Waste : </Text>
                            <Text style={{ fontWeight: 'bold' }}>9234762346</Text>
                        </Pressable>
                    </View>
                </View>


                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Image style={{ width: 40, height: 40 }}
                            source={require('../assets/recycle.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>Nearby Recycling Plants </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../assets/call.png')} />
                        <Pressable onPress={() => { Linking.openURL(`tel:${9864836258}`) }} style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10 }}>Kuldeep E-Waste Disposals : </Text>
                            <Text style={{ fontWeight: 'bold' }}>9864876887</Text>
                        </Pressable>
                    </View>
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

export default Maps

const styles = StyleSheet.create({})