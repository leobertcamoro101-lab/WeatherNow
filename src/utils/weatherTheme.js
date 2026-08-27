// Maps an OpenWeatherMap "weather[0].main" value (+ day/night from the icon
// code) to a background theme key. Keep this list in sync with the
// body[data-weather="..."] rules in src/index.css.
const CONDITION_GROUPS = {
  Thunderstorm: 'thunderstorm',
  Drizzle: 'rain',
  Rain: 'rain',
  Snow: 'snow',
  Mist: 'mist',
  Smoke: 'mist',
  Haze: 'mist',
  Dust: 'mist',
  Fog: 'mist',
  Sand: 'mist',
  Ash: 'mist',
  Squall: 'mist',
  Tornado: 'mist',
  Clear: 'clear',
  Clouds: 'clouds',
};

export const getWeatherThemeKey = (weather) => {
  const condition = weather?.weather?.[0];
  if (!condition) return 'default';

  const group = CONDITION_GROUPS[condition.main];
  if (!group) return 'default';

  // Clear/cloudy skies look very different at night, everything else
  // (rain, snow, storms, fog...) reads fine with a single gradient.
  if (group === 'clear' || group === 'clouds') {
    const isNight = condition.icon?.endsWith('n');
    return `${group}-${isNight ? 'night' : 'day'}`;
  }

  return group;
};
