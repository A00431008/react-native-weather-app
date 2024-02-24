import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";

import CurrentLocationScreen from './Screens/CurrentLocationScreen';
import SearchScreen from './Screens/SearchScreen';
import SavedLocationScreen from './Screens/SavedLocationScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen 
                name = "Home"
                component={CurrentLocationScreen}
                options = {{ title: 'Current Location'}}
            />
            <Tab.Screen 
                name = "Search by Location"
                component={SearchScreen}
                options = {{ title: 'Search Location'}}
            />
            <Tab.Screen 
                name = "Saved Locations"
                component={SavedLocationScreen}
                options = {{ title: 'Saved Locations'}}
            />
        </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
