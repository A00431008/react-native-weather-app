import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native'  ;
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
        <View>
            <Text>{weatherData.latitude}</Text>
        </View>
    );
};

export default WeatherDisplay;