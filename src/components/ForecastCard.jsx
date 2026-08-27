import { getWeatherIcon } from '../utils/weatherApi';
import styles from './ForecastCard.module.css';

const ForecastCard = ({ forecast }) => {
  return (
    <div className={styles.forecast}>
      <h3 className={styles.title}>Next 5 Readings</h3>
      <div className={styles.grid}>
        {forecast.list.map((item) => {
          const date = new Date(item.dt * 1000);
          return (
            <div key={item.dt} className={styles.item}>
              <p className={styles.date}>
                {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </p>
              <p className={styles.time}>
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <img
                src={getWeatherIcon(item.weather[0].icon)}
                alt={item.weather[0].description}
                className={styles.icon}
              />
              <p className={styles.temp}>{Math.round(item.main.temp)}°C</p>
              <p className={styles.desc}>{item.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
