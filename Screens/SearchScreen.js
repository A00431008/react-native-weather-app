import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {getWeatherData, getCityCoordinates} from '../API/ThirdPartyApi';

const db = SQLite.openDatabase('weatherApp.db');

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (weatherData) {
      handleSaveLocation();
    }
  }, [weatherData]);

  const handleSearch = async() => {
    try {
      setIsLoading(true);

      const fetchedData = await getCityCoordinates(city);
      const {latitude, longitude} = fetchedData.results[0];
      
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
      
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLocation = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, latitude REAL, longitude REAL);'
      );

      tx.executeSql(
        'SELECT COUNT(*) as count FROM locations', [], (_,results) => {
          const count = results.rows.item(0).count;

          if (count < 4) {
            insertLocationToDB();
          } else {
            console.log('Cannot save more than 4 locations!');
          }
        })
    });
  }

  const insertLocationToDB = () => {
    // Insert the location data into the SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO locations (city, latitude, longitude) VALUES (?, ?, ?);',
        [city, weatherData.latitude, weatherData.longitude],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Location saved successfully');
          } else {
            console.log('Failed to save location');
          }
        }
      );
    });
  };


  return (
    <View>
      <Text> Search for a city</Text>
      <TextInput 
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      
    </View>
  );
};

export default SearchScreen;