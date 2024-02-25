import React, { useState, useEffect } from 'react';
import { View, 
        Text, 
        FlatList, 
        TouchableOpacity, 
        Alert } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import WeatherDisplay from '../Components/WeatherDisplay';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('weatherApp.db');

const SavedLocationScreen = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch saved locatons from the SQLite database when the component mounts
    fetchSavedLocations();
  });

  // function to get saved locations from database
  const fetchSavedLocations = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, latitude REAL, longitude REAL);'
      );

      tx.executeSql('SELECT * FROM locations;', [], (_, results) => {
        const rows = results.rows._array;
        setSavedLocations(rows);
      });
    });
  };

  // function to remove location from database
  const removeLocation = (id) => {
    // Remove the location from the database
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM locations WHERE id = ?;', [id], (_, results) => {
        if (results.rowsAffected > 0) {
          console.log('Location removed successfully');
          fetchSavedLocations(); // Fetch updated locations after removing
        } else {
          console.log('Failed to remove location');
        }
      });
    });
  };

  // Alert to confirm removal before deleting from database
  const confirmRemoveLocation = (id) => {
    Alert.alert(
      'Remove Location',
      'Are you sure you want to remove this location?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeLocation(id),
        },
      ],
      { cancelable: false }
    );
  };


  // render function to render each item of the database
  const renderItem = ({ item }) => (
    
      <Card style={{ margin: 8, padding: 16 }}>
        <Card.Content>
          <TouchableOpacity onPress={() => handleItemClick(item.latitude, item.longitude)}>
            <Title>{item.city}</Title>
            <Paragraph>{`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}</Paragraph>
          </TouchableOpacity>
          <Button mode="contained" onPress={() => confirmRemoveLocation(item.id)} style={{ marginTop: 10 }}>
            Remove
          </Button>
        </Card.Content>
      </Card>
  );

  // Function to display weather for saved locations when they are clicked
  const handleItemClick = (lat, lon) => {
    setSelectedLocation({"latitude": lat, "longitude": lon})
  }


// UI that is returned
return (
  <>
  {/* Display weather Data for selected saved location */}
  {selectedLocation && (
    <View>
      <WeatherDisplay lat={selectedLocation.latitude} long={selectedLocation.longitude}/>
      <Button mode="contained" onPress={() => setSelectedLocation(null)} style={{ marginTop: 10 }}>
            Back
      </Button>
    </View>
    
  )}
  
  {/* LIst of saved locations */}
  {!selectedLocation && (
  <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
    {savedLocations.length === 0 ? (
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        No saved locations yet.
      </Text>
    ) : (
      <FlatList
        data={savedLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    )}
  </View>
  )}
  </>
);
};

export default SavedLocationScreen;
