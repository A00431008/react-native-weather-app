import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native'  ;
import { Card, Title, Paragraph } from 'react-native-paper';
import {getWeatherData} from '../API/ThirdPartyApi';


const WeatherDisplay = ({lat, long}) => {
    const [weatherData, setWeatherData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const setData = async() => {
        const data = await getWeatherData(lat, long);
            setWeatherData(data);
            setIsLoading(false);
    }

    useEffect(() => {
        setData();
    }, []);

    const handleRefresh = () => {
        setData();
    }


    if (isLoading) {
        return (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        );
      }

    return (
        <Card style={{ padding: 10, margin: 10 }}>
      <Card.Content>
        <Title>Location:</Title>
        <Paragraph>Latitude: {weatherData.latitude}</Paragraph>
        <Paragraph>Longitude: {weatherData.longitude}</Paragraph>

        <Title>Weather Details:</Title>
        <Paragraph>Temperature: {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</Paragraph>
        <Paragraph>Apparent Temperature: {weatherData.current.apparent_temperature} {weatherData.current_units.apparent_temperature}</Paragraph>
        <Paragraph>Precipitation: {weatherData.current.precipitation} {weatherData.current_units.precipitation}</Paragraph>
        <Paragraph>Relative Humidity: {weatherData.current.relative_humidity_2m} {weatherData.current_units.relative_humidity_2m}</Paragraph>
        <Paragraph>WindSpeed: {weatherData.current.wind_speed} {weatherData.current_units.wind_speed_10m}</Paragraph>
        <Paragraph>Wind Direction: {weatherData.current.wind_direction_10m} {weatherData.current_units.wind_direction_10m}</Paragraph>

        <Title>Time:</Title>
        <Paragraph>{weatherData.current.time}</Paragraph>
      </Card.Content>
    </Card>
    );
};

export default WeatherDisplay;