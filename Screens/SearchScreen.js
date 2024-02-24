import React, {useState, useEffect} from 'react';
import { ActivityIndicator, ScrollView, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {getWeatherData, getCityCoordinates} from '../API/ThirdPartyApi';
import { Card, Title, TextInput as PaperTextInput, Button } from 'react-native-paper';
import WeatherDisplay from '../Components/WeatherDisplay';


const db = SQLite.openDatabase('weatherApp.db');

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
            Alert.alert(
              'Memory Full',
              'Unable to save more than 4 locations. Please delete at least one saved location to save more locations.',
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                }
              ],
              { cancelable: false }
            );
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
            Alert.alert(
              'Success',
              'Location saved successfully !!!',
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            );
            console.log('Location saved successfully');
          } else {
            Alert.alert(
              'Success',
              'Location saved successfully !!!',
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            );
          }
        }
      );
    });
  };

  return(
    <ScrollView>
      <Card style={{ padding: 10, margin: 10 }}>
        <Card.Content>
          <Title>Search for a city</Title>

          <PaperTextInput
            label="Enter city name"
            value={city}
            onChangeText={setCity}
            style={{ marginVertical: 10 }}
          />

          {!weatherData && <Button mode="contained" onPress={() => {handleSearch()}} style={{ marginTop:10}}>Search</Button>}

          {isLoading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

          {weatherData && (
            <>
              <Button mode="contained" onPress={() => handleSaveLocation()} style={{ marginTop:10}}>Save this Location</Button>
              <Button mode="contained" onPress={() => {setWeatherData(null);setCity('')}} style={{ marginTop:10}}>Clear Location</Button>
            </>
          )}
        </Card.Content>
      </Card>
      {weatherData && <WeatherDisplay />}
    </ScrollView>
    
  );
};

export default SearchScreen;