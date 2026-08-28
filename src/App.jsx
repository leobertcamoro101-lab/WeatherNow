import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import CityWeatherList from './components/CityWeatherList';
import WeatherCardSkeleton from './components/WeatherCardSkeleton';
import ErrorMessage from './components/ErrorMessage';

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
    getWeatherByLocation,
  } = useWeather();

  return (
    <div className="max-w-[640px] mx-auto px-4 py-8 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-[2rem] font-bold tracking-[-0.5px]">🌤 WeatherNow</h1>
        <p className="text-white/60 mt-1 text-[0.95rem]">Real-time weather for any city</p>
      </header>

      <main className="flex flex-col">
        <SearchBar
          onSearch={getWeather}
          loading={loading}
          onLocate={getWeatherByLocation}
        />

        {loading && (
          <>
            <p className="text-center text-white/60 mb-2">
              {loadingSource === 'location'
                ? 'Fetching location data...'
                : 'Fetching weather data...'}
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
          <div className="text-center py-16 px-4 text-white/50">
            <p className="text-5xl mb-4">🌍</p>
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
