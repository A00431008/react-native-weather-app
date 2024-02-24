// Fetch the data from API and return it
export const getWeatherData = async (lat, long) => {
    try {
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York`;
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await res.json();
        return weatherData;
      } catch (err) {
        throw err;
      }
}

export const getCityCoordinates = async (city) => {
    try{
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const res = await fetch(geoURL);
        const locationData = await res.json();
        return locationData;
    } catch (err) {
        throw err;
    }
}