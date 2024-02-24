import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, } from 'react-native';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('weatherApp.db');

const SavedLocationScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async() => {
    
  };

  return (
    <View>
      <Text>This is Saved Locations Screen</Text>
    </View>
  )
}

export default SavedLocationScreen