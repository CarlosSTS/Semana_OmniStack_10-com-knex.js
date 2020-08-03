import React, { useState, useEffect } from 'react'

import { Image, View, Text ,TextInput,TouchableOpacity} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';

export default function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs,setDevs]= useState([]);
    const [techs,setTechs]= useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    async function loaddevs(){

        const response = await api.get('/search',{
            params: {techs}
        })
        console.log(response.data)

    setDevs([...devs, ...response.data]);
    }
   

function handleRegionChanged(region){
console.log(region)
setCurrentRegion(region);
}

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView
             onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion}
             style={styles.map}
             >
                     
               {devs.map(dev =>( 
                <Marker
                key={dev.id} 
                coordinate={{ 
                    latitude:dev.latitude, 
                    longitude: dev.longitude, 
                }}>
                    <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                    <Callout onPress={() => {
                        navigation.navigate('Profile', {url : dev.github_username});
                    }}>
                        <View style={styles.callout}>
                <Text style={styles.devsName}>{dev.name}</Text>
                <Text style={styles.devsBio}>{dev.bio}</Text>
                <Text style={styles.devsTechs}>{dev.techs}</Text>

                        </View>
                    </Callout>    
                </Marker>
                 ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loaddevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}
