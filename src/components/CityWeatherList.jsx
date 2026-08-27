import { getWeatherIcon } from '../utils/weatherApi';
import styles from './CityWeatherList.module.css';

const regionNames = typeof Intl.DisplayNames === 'function'
  ? new Intl.DisplayNames(['en'], { type: 'region' })
  : null;

const countryName = (code) => {
  if (!code) return '';
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
};

function CityWeatherList({ cityWeathers = [], onRemove }) {
  if (cityWeathers.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Saved cities</h3>
        <p className={styles.empty}>Cities you search for will be saved here.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Saved cities</h3>
      <ul className={styles.list}>
        {cityWeathers.map((entry) => (
          <li key={entry.id} className={styles.item}>
            <img
              className={styles.icon}
              src={getWeatherIcon(entry.icon)}
              alt={entry.description}
            />
            <div className={styles.info}>
              <div className={styles.cityRow}>
                <span className={styles.city}>{entry.city}</span>
                {entry.country && (
                  <span
                    className={styles.countryBadge}
                    title={countryName(entry.country)}
                  >
                    {entry.country}
                  </span>
                )}
              </div>
              <span className={styles.desc}>{entry.description}</span>
            </div>
            <span className={styles.temp}>{Math.round(entry.temp)}°C</span>
            {onRemove && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(entry.id)}
                aria-label={`Remove ${entry.city}`}
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityWeatherList;
