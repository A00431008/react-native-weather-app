import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import { Header } from "@rneui/base";
import { MaterialIcons } from '@expo/vector-icons';

// component imports
import CurrentLocationScreen from './Screens/CurrentLocationScreen';
import SearchScreen from './Screens/SearchScreen';
import SavedLocationScreen from './Screens/SavedLocationScreen';

// Navigator Tab
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
                options = {{ title: 'Current Location', tabBarIcon: ({ color }) => (
                  <MaterialIcons name="location-on" color={color} size={26} />
                ),}}
            />
            <Tab.Screen 
                name = "Search by Location"
                component={SearchScreen}
                options = {{ title: 'Search Location', tabBarIcon: ({ color }) => (
                  <MaterialIcons name="search" color={color} size={26} />
                ),}}
            />
            <Tab.Screen 
                name = "Saved Locations"
                component={SavedLocationScreen}
                options = {{ title: 'Saved Locations', tabBarIcon: ({ color }) => (
                  <MaterialIcons name="folder" color={color} size={26} />
                ),}}
            />
        </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}


