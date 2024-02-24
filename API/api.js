// Fetch the data from API and return it
export const getWeatherData = async (lat, lon) => {
    try {
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await res.json();
        return data;
      } catch (err) {
        throw err;
      }
}


export const getLocationData = async (city) => {
    try{
        const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const res = await fetch(URL);
        const locationData = await res.json();
        return locationData;
    } catch (err) {
        throw err;
    }
}