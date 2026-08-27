import weatherCardStyles from './WeatherCard.module.css';
import styles from './WeatherCardSkeleton.module.css';

const WeatherCardSkeleton = () => {
  return (
    <div className={weatherCardStyles.card}>
      <div className={weatherCardStyles.header}>
        <div>
          <div className={`${styles.bone} ${styles.city}`} />
          <div className={`${styles.bone} ${styles.desc}`} />
        </div>
        <div className={`${styles.bone} ${styles.icon}`} />
      </div>

      <div className={`${styles.bone} ${styles.temp}`} />
      <div className={`${styles.bone} ${styles.feels}`} />

      <div className={weatherCardStyles.stats}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={weatherCardStyles.stat}>
            <div className={`${styles.bone} ${styles.statLabel}`} />
            <div className={`${styles.bone} ${styles.statValue}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;