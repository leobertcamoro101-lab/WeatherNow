import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import CityWeatherList from './components/CityWeatherList';
import WeatherCardSkeleton from './components/WeatherCardSkeleton';
import ErrorMessage from './components/ErrorMessage';
import styles from './App.module.css';

function App() {
  const {
    weather,
    forecast,
    loading,
    loadingSource,
    error,
    getWeather,
    cityWeathers,
    removeCityWeather,
    getWeatherByLocation
  } = useWeather();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌤 WeatherNow</h1>
        <p className={styles.subtitle}>Real-time weather for any city</p>
      </header>

      <main className={styles.main}>
        <SearchBar
          onSearch={getWeather}
          loading={loading}
          onLocate={getWeatherByLocation}
        />

        {/* {loading && <WeatherCardSkeleton />} */}
        {loading && (
          <>
            <p className={styles.loadingLabel}>
              {loadingSource === "location"
                ? "Fetching location data..."
                : "Fetching weather data..."}
            </p>
            <WeatherCardSkeleton />
          </>
        )}

        {error && <ErrorMessage message={error} />}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast} />}
          </>
        )}

        {!weather && !loading && !error && (
          <div className={styles.emptyState}>
            <p className={styles.emptyEmoji}>🌍</p>
            <p>Search for a city to see the current weather.</p>
          </div>
        )}
        <CityWeatherList
          cityWeathers={cityWeathers}
          onRemove={removeCityWeather}
        />
      </main>
    </div>
  );
}

export default App;
