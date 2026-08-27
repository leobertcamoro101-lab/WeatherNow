import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
// Vite exposes env vars via import.meta.env (not process.env)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

export const fetchForecastByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: API_KEY, units: 'metric', cnt: 5 },
  });
  return response.data;
};

export const getWeatherIcon = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, appid: API_KEY, units: 'metric' },
  });
  return response.data;
};

export const fetchForecastByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, appid: API_KEY, units: 'metric', cnt: 5 },
  });
  return response.data;
};
