import { useState, useCallback } from 'react';
import { fetchWeatherByCity, fetchForecastByCity, fetchWeatherByCoords, fetchForecastByCoords } from '../utils/weatherApi';
import useLocalStorage from '../utils/useLocaleStorage';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityWeathers, setCityWeathers] = useLocalStorage('cityWeathers', []);
  const [loadingSource, setLoadingSource] = useState(null); // 'city' | 'location' | null

  const saveCityWeatherSnapshot = useCallback((weatherData) => {
  const id = weatherData.name.toLowerCase();
  const snapshot = {
    id,
    city: weatherData.name,
    country: weatherData.sys.country,
    temp: weatherData.main.temp,
    description: weatherData.weather[0].description,
    icon: weatherData.weather[0].icon,
    savedAt: Date.now(),
  };

  setCityWeathers((prev) => [
    snapshot,
    ...prev.filter((entry) => entry.id !== id),
  ]);
}, [setCityWeathers]);

  const getWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setLoadingSource('city');
    setWeather(null);
    setForecast(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      saveCityWeatherSnapshot(weatherData);
      //// Save/update this city's weather snapshot in local storage.
      // const id = weatherData.name.toLowerCase();
      // const snapshot = {
      //   id,
      //   city: weatherData.name,
      //   country: weatherData.sys.country,
      //   temp: weatherData.main.temp,
      //   description: weatherData.weather[0].description,
      //   icon: weatherData.weather[0].icon,
      //   savedAt: Date.now(),
      // };

      // setCityWeathers((prev) => [
      //   snapshot,
      //   ...prev.filter((entry) => entry.id !== id),
      // ]);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your .env file.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
      setLoadingSource(null);
    }
  }, [saveCityWeatherSnapshot]);

  const getWeatherByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setLoadingSource('location');
    setError(null);
    setWeather(null);
    setForecast(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const [weatherData, forecastData] = await Promise.all([
            fetchWeatherByCoords(coords.latitude, coords.longitude),
            fetchForecastByCoords(coords.latitude, coords.longitude),
          ]);
          setWeather(weatherData);
          setForecast(forecastData);
          saveCityWeatherSnapshot(weatherData);
          // // Save/update this city's weather snapshot in local storage.
          // const id = weatherData.name.toLowerCase();
          // const snapshot = {
          //   id,
          //   city: weatherData.name,
          //   country: weatherData.sys.country,
          //   temp: weatherData.main.temp,
          //   description: weatherData.weather[0].description,
          //   icon: weatherData.weather[0].icon,
          //   savedAt: Date.now(),
          // };

          // setCityWeathers((prev) => [
          //   snapshot,
          //   ...prev.filter((entry) => entry.id !== id),
          // ]);
        } catch (err) {
          setError('Something went wrong fetching your location weather.');
        } finally {
          setLoading(false);
          setLoadingSource(null)
        }
      },
      (geoErr) => {
        setLoading(false);
        if (geoErr.code === geoErr.PERMISSION_DENIED) {
          setError('Location permission denied. Search for a city instead.');
        } else if (geoErr.code === geoErr.POSITION_UNAVAILABLE) {
          setError('Your location is unavailable right now.');
        } else if (geoErr.code === geoErr.TIMEOUT) {
          setError('Location request timed out.');
        } else {
          setError('Could not get your location.');
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  }, [setCityWeathers]);

  const removeCityWeather = useCallback((id) => {
    setCityWeathers((prev) => prev.filter((entry) => entry.id !== id));
  }, [saveCityWeatherSnapshot]);

  return {
    weather,
    forecast,
    loading,
    loadingSource,
    error,
    getWeather,
    cityWeathers,
    removeCityWeather,
    getWeatherByLocation,
  };
};

export default useWeather;
