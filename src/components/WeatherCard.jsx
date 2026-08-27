import { useState } from 'react';
import { getWeatherIcon } from '../utils/weatherApi';
import styles from './WeatherCard.module.css';

const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

const WeatherCard = ({ weather }) => {
  const [unit, setUnit] = useState('C'); // 'C' | 'F'

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ description, icon }],
    wind: { speed },
    visibility,
  } = weather;

  const displayTemp = unit === 'C' ? temp : toFahrenheit(temp);
  const displayFeels = unit === 'C' ? feels_like : toFahrenheit(feels_like);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.city}>
            {name}, <span>{country}</span>
          </h2>
          <p className={styles.desc}>{description}</p>
        </div>
        <img
          className={styles.icon}
          src={getWeatherIcon(icon)}
          alt={description}
        />
      </div>

      <div className={styles.tempRow}>
        <div className={styles.temp}>
          {Math.round(displayTemp)}°{unit}
        </div>

        <div className={styles.unitToggle} role="group" aria-label="Temperature unit">
          <button
            type="button"
            className={`${styles.unitButton} ${unit === 'C' ? styles.unitButtonActive : ''}`}
            onClick={() => setUnit('C')}
            aria-pressed={unit === 'C'}
          >
            °C
          </button>
          <button
            type="button"
            className={`${styles.unitButton} ${unit === 'F' ? styles.unitButtonActive : ''}`}
            onClick={() => setUnit('F')}
            aria-pressed={unit === 'F'}
          >
            °F
          </button>
        </div>
      </div>

      <p className={styles.feels}>
        Feels like {Math.round(displayFeels)}°{unit}
      </p>

      <div className={styles.stats}>
        {[
          { label: 'Humidity', value: `${humidity}%` },
          { label: 'Wind', value: `${speed} m/s` },
          { label: 'Pressure', value: `${pressure} hPa` },
          { label: 'Visibility', value: `${(visibility / 1000).toFixed(1)} km` },
        ].map(({ label, value }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
