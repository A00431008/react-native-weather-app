import React, { useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native'  ;
import * as Location from 'expo-location';
import {getWeatherData} from '../API/api';

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
      console.error(data)

      
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
      {/* <Text>Weather at your Location</Text>
      <Text>
        Current Location: {location.coords.latitude}, {location.coords.longitude}
      </Text>
      <Text>Temperature: {weatherData.current_weather.temperature_2m}°C</Text>
      <Text>Precipitation: {weatherData.current_weather_details.precipitation}mm</Text>
      <Text>Wind Speed: {weatherData.current_weather_details.wind_speed_10m}m/s</Text> */}
    </View>
  );
};

export default CurrentLocationScreen;