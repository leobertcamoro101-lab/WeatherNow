import { useEffect } from 'react';
import { getWeatherThemeKey } from '../utils/weatherTheme';

// Sets data-weather on <body> so index.css can swap the page background
// gradient to match the current weather condition.
export default function useWeatherBackground(weather) {
  useEffect(() => {
    document.body.dataset.weather = getWeatherThemeKey(weather);

    return () => {
      delete document.body.dataset.weather;
    };
  }, [weather]);
}
