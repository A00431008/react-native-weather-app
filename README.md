# React Native Weather App

This app allows user to fetch current weather data from third party api based on location (longitude and latitude) and then display the data for the phone's location, searched location and any saved location. 
The app uses expo and react native with expo location to integrate location services to get the weather data from the 3rd party API. For data storage it uses Expo SQLite and saves the data in a relational database.

## Features
 - Screen 1: Shows weather data of current location of the phone
 - screen 2: Allows user to search for a location and view weather data and save it if the user wants
     Note: User can only save up to 4 locations and it won't allow further saving of locations.
 - screen 3: Allows user to view saved locations, delete saved locations and view weather data for saved location
   

## Instructions for setting up and running App
 - Clone the repo to your local machine
 - Open terminal in the root folder
 - Run "npm install"
 - install expo cli "npm install -g expo-cli"
 - install expo-go on your phone
 - Run application with "npx expo start"
 - Scan the qr code with your phone's calendar
 - Once the application opens, allow it to use location services while using the app
