import React, { useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native'  ;
import * as Location from 'expo-location';
import {getWeatherData} from '../API/ThirdPartyApi';

const CurrentLocationScreen = () => {
  const [weatherData, setWeatherData] = useState('null');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // get Current Location
      let location = await Location.getCurrentPositionAsync({});
      setIsLoading(false);
      // get weather data for current location
      const data = await getWeatherData(location.coords.latitude, location.coords.longitude);
      setWeatherData(data);

      
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
      <Text>{weatherData.latitude}</Text>
    </View>
  );
};

export default CurrentLocationScreen;