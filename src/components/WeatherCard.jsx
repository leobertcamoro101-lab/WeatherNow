import { useState } from 'react';
import { getWeatherIcon } from '../utils/weatherApi';

const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

const unitButtonBase =
  'border-none bg-transparent px-2.5 py-1 text-[0.85rem] font-semibold rounded-full cursor-pointer text-inherit transition-opacity duration-150';
const unitButtonActive = 'opacity-100 bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.15)]';
const unitButtonInactive = 'opacity-60 hover:opacity-[0.85]';

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
    <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-[20px] p-7 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {name}, <span className="text-white/60 font-normal">{country}</span>
          </h2>
          <p className="text-white/70 mt-1 capitalize">{description}</p>
        </div>
        <img
          className="w-[72px] h-[72px]"
          src={getWeatherIcon(icon)}
          alt={description}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-[3.5rem] font-extrabold mt-2 mb-1">
          {Math.round(displayTemp)}°{unit}
        </div>

        <div
          className="inline-flex rounded-full bg-black/[0.06] p-0.5"
          role="group"
          aria-label="Temperature unit"
        >
          <button
            type="button"
            className={`${unitButtonBase} ${unit === 'C' ? unitButtonActive : unitButtonInactive}`}
            onClick={() => setUnit('C')}
            aria-pressed={unit === 'C'}
          >
            °C
          </button>
          <button
            type="button"
            className={`${unitButtonBase} ${unit === 'F' ? unitButtonActive : unitButtonInactive}`}
            onClick={() => setUnit('F')}
            aria-pressed={unit === 'F'}
          >
            °F
          </button>
        </div>
      </div>

      <p className="text-white/60 text-[0.9rem] mb-5">
        Feels like {Math.round(displayFeels)}°{unit}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Humidity', value: `${humidity}%` },
          { label: 'Wind', value: `${speed} m/s` },
          { label: 'Pressure', value: `${pressure} hPa` },
          { label: 'Visibility', value: `${(visibility / 1000).toFixed(1)} km` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/[0.07] rounded-xl px-4 py-3 flex flex-col gap-[0.2rem]"
          >
            <span className="text-xs text-white/50 uppercase tracking-[0.05em]">
              {label}
            </span>
            <span className="text-[1.1rem] font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
