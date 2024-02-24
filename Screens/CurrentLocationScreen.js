import React, { useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native'  ;
import * as Location from 'expo-location';

const CurrentLocationScreen = () => {
  const [location, setLocation] = useState(null);
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
      let currentLocation = await Location.getCurrentPositionAsync({});
      setIsLoading(false);
      setLocation(currentLocation);

      // Fetch the data from API and set it on weatherData
      try {
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&hourly=temperature_2m`;
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        throw err;
      }
      
    })();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
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