import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('weatherApp.db');

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [coordinate, setCoordinate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async() => {
    try {
      setIsLoading(true);


    } catch (error) {

    }
  };

  // const handleSaveLocation = () => {
  //   if (!location) {
  //     Alert.alert('Warning', 'Please search for a location before saving.');
  //     return;
  //   }

  //   // Save the location in SQLite database
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql('SELECT COUNT(*) as count FROM saved_locations', [], (_, { rows }) => {
  //         const count = rows.item(0).count;
          
  //         // Check if saved locations are more than 4
  //         if (count >= 4) {
  //           Alert.alert('Warning', 'You can only save up to 4 locations.');
  //         } else {
  //           // If not then save the location in SQLite database
  //           tx.executeSql(
  //             'INSERT INTO saved_locations (city, latitude, longitude) VALUES (?, ?, ?)',
  //             [location.city, location.latitude, location.longitude],
  //             (_, { rows }) => {
  //               Alert.alert('Success', 'Location saved successfully.');
  //             },
  //             (_, error) => {
  //               console.error('Error saving location:', error);
  //               Alert.alert('Error', 'Failed to save location. Please try again.');
  //             }
  //           );
  //         }
  //       });
  //     },
  //     null,
  //     null
  //   );
  // };

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
      {coordinate && (
        <View>
          <WeatherDisplay location={coordinate} />
          <Button title="SaveLocation" onPress={handleSaveLocation} />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;