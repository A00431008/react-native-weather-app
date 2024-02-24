const weatherData = {
  "latitude":24.9,"longitude":25.100002,
  "generationtime_ms":0.03802776336669922,
  "utc_offset_seconds":0,
  "timezone":"GMT",
  "timezone_abbreviation":"GMT",
  "elevation":473.0,
  "current_units":
      {
          "time":"iso8601",
          "temperature_2m":"°C",
          "apparent_temperature":"°C",
          "precipitation": "mm",
          "relative_humidity_2m": "%",
          "wind_speed_10m": "m/s",
          "wind_direction_10m": "°"
      },
  "current": 
      {
          "time":"2024-02-24T00:00",
          "temperature_2m":7.5,
          "apparent_temperature": 6.1,
          "precipitation": 2.0,
          "relative_humidity_2m": 94,
          "wind_speed": 16,
          "wind_direction_10m": 163,
      }
}

// Fetch the data from API and return it
export const getWeatherData = async (lat, long) => {
    try {
        // const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York`;
        // const res = await fetch(URL);
        // if (!res.ok) {
        //   throw new Error("Failed to fetch weather data")
        // }
        // const data = await res.json();
        return weatherData;
      } catch (err) {
        throw err;
      }
}

const locationData = {
  "results" : [{
    "latitude" : 24.9,
    "longitude": 25.00002
  }]
}

export const getCityCoordinates = async (city) => {
    try{
        // const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        // const res = await fetch(geoURL);
        // const locationData = await res.json();
        return locationData;
    } catch (err) {
        throw err;
    }
}