import { getWeatherIcon } from '../utils/weatherApi';

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
      <div className="mt-6">
        <h3 className="text-[0.85rem] uppercase tracking-[0.08em] text-white/50 mb-3">
          Saved cities
        </h3>
        <p className="text-white/50 text-[0.9rem]">
          Cities you search for will be saved here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-[0.85rem] uppercase tracking-[0.08em] text-white/50 mb-3">
        Saved cities
      </h3>
      <ul className="list-none flex flex-col gap-2 p-0 m-0">
        {cityWeathers.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/15 rounded-[14px] px-[0.9rem] py-[0.6rem]"
          >
            <img
              className="w-9 h-9 flex-shrink-0"
              src={getWeatherIcon(entry.icon)}
              alt={entry.description}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-[0.4rem] min-w-0">
                <span className="text-[0.95rem] font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                  {entry.city}
                </span>
                {entry.country && (
                  <span
                    className="text-[0.65rem] font-bold tracking-[0.05em] text-[#0f2027] bg-[#4fc3f7] px-[0.4rem] py-[0.1rem] rounded-full flex-shrink-0"
                    title={countryName(entry.country)}
                  >
                    {entry.country}
                  </span>
                )}
              </div>
              <span className="text-xs text-white/50 capitalize">{entry.description}</span>
            </div>
            <span className="text-base font-bold flex-shrink-0">
              {Math.round(entry.temp)}°C
            </span>
            {onRemove && (
              <button
                type="button"
                className="border-none bg-white/[0.08] text-white/60 w-6 h-6 rounded-full cursor-pointer text-xs leading-none flex-shrink-0 transition-colors duration-150 hover:bg-white/20 hover:text-white"
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
