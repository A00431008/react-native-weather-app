import React, { useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native'  ;
import * as Location from 'expo-location';
import WeatherDisplay from '../Components/WeatherDisplay';

const CurrentLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // get Current Location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <WeatherDisplay lat={location.coords.latitude} long={location.coords.longitude} />
    </View>
  );
};

export default CurrentLocationScreen;