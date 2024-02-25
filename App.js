import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import { Header, Icon } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CurrentLocationScreen from './Screens/CurrentLocationScreen';
import SearchScreen from './Screens/SearchScreen';
import SavedLocationScreen from './Screens/SavedLocationScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <Header
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: "WEATHER APP",
          style: { color: "#fff" }
        }}
        centerContainerStyle={{marginTop: "5%"}}
        containerStyle={{ width: "100%", paddingTop:"30"}}
        placement="center"
        statusBarProps={{}}
      />
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
