import React, { useState, useEffect } from 'react';
import { View, 
        Text, 
        FlatList, 
        TouchableOpacity, 
        Button, 
        Alert,
        Modal,
        StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('weatherApp.db');

const SavedLocationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch saved locatons from the SQLite database when the component mounts
    fetchSavedLocations();
  });

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


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item.latitude, item.longitude)}>
      <View>
        <Text>{item.city}</Text>
        <Text>{`Latitude: ${item.latitude}, Longitude: ${item.longitude}`}</Text>
        <Button title="Remove" onPress={() => confirmRemoveLocation(item.id)} />
      </View>
    </TouchableOpacity>
  );

  const handleItemClick = (lat, lon) => {
    setSelectedLocation()
  }



  return (
    <View>
      <Text> Saved Locations</Text>
      {savedLocations.length === 0 ? (
        <Text>No saved locations yet.</Text>
      ) : (
        <FlatList
          data={savedLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );

};

export default SavedLocationScreen;
