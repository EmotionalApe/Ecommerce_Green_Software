import { StyleSheet, Text, View, Pressable, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const StatusBar = ({email}) => {
    const userEmail = email
    const navigation = useNavigation()
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
            <Pressable onPress={()=>(navigation.navigate("Dashboard", [userEmail]))}>
                <Image style={{ width: 30, height: 30 }}
                    source={require('../assets/house.png')} />
            </Pressable>

            <Pressable onPress={()=>(navigation.navigate("TakePic",[userEmail]))}>
                <Image style={{ width: 30, height: 30 }}
                    source={require('../assets/camera.png')} />
            </Pressable>
            <Pressable onPress={()=>(navigation.navigate("Maps",[userEmail]))} >
                <Image style={{ width: 30, height: 30 }}
                    source={require('../assets/map.png')} />
            </Pressable>

            <Pressable onPress={()=>(navigation.navigate("Login",[userEmail]))}>
                <Image style={{ width: 30, height: 30 }}
                    source={require('../assets/logout.png')} />
            </Pressable>
        </View>
    )
}

export default StatusBar

const styles = StyleSheet.create({})