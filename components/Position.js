import * as location from 'expo-location'
import Weather from './Weather'
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'

export default function Position () {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('Retrieving location')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async() => {
            let {status} = await location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                if (status !== 'granted') {
                    setMessage("Location not permitted")
                } else {
                    const position = await location.getCurrentPositionAsync({accuracy: location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage('location retrieved')
                }
            } catch (err) {
                setMessage("Error retrieving location")
                console.log(err)
            }
            setIsLoading(false)
        })()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
            <Text style={styles.message}>{message}</Text>
            {isLoading === false &&
                <Weather latitude={latitude} longitude={longitude} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coords: {
        fontweight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontweight: 'bold',
        marginBottom: 20,
    },
  });