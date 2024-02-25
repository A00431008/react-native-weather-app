import React, { useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native'  ;
import * as Location from 'expo-location';
import WeatherDisplay from '../Components/WeatherDisplay';
import { Button } from 'react-native-paper';

const CurrentLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // get Current Location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setIsLoading(false);
    })();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 16, justifyContent: 'center'}}>
      <WeatherDisplay lat={location.coords.latitude} long={location.coords.longitude} />
      <Button mode="contained" onPress={() => setRefreshTrigger(refreshTrigger+1)} style={{ marginTop: 10 }}>
            Refresh
          </Button>
    </View>
  );
};

export default CurrentLocationScreen;