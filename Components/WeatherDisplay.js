import React, {useState, useEffect} from 'react';
import { ActivityIndicator} from 'react-native'  ;
import { Card, Title, Paragraph } from 'react-native-paper';
import {getWeatherData} from '../API/ThirdPartyApi';


const WeatherDisplay = ({lat, long}) => {
    // State variables
    const [weatherData, setWeatherData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    // Sets weatherData
    const setData = async() => {
        const data = await getWeatherData(lat, long);
            setWeatherData(data);
            setIsLoading(false);
    }

    // Use Effect Hook to set data when component mounts
    useEffect(() => {
        setData();
    }, []);

    // If data is loading or awaiting from API this mounts
    if (isLoading) {
        return (
          <Card style={{ padding: 10, margin: 10 }}>
            <Card.Content>
              <ActivityIndicator size="large" color="#0000ff" />
              <Title>
                Loading...
              </Title>
            </Card.Content>
          </Card>
        );
      }

    // if data has already loaded to state then it displays
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
        <Paragraph>{weatherData.current.time} {weatherData.timezone_abbreviation}</Paragraph>
      </Card.Content>
    </Card>
    );
};

export default WeatherDisplay;