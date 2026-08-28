import { getWeatherIcon } from '../utils/weatherApi';

const ForecastCard = ({ forecast }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-[20px] p-6">
      <h3 className="text-[0.85rem] uppercase tracking-[0.08em] text-white/50 mb-4">
        Next 5 Readings
      </h3>
      <div className="grid grid-cols-5 max-[480px]:grid-cols-3 gap-2 text-center">
        {forecast.list.map((item) => {
          const date = new Date(item.dt * 1000);
          return (
            <div
              key={item.dt}
              className="bg-white/[0.07] rounded-xl px-1 py-3 max-[480px]:[&:nth-child(n+4)]:hidden"
            >
              <p className="text-[0.7rem] text-white/50">
                {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-xs text-white/70 font-semibold">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <img
                src={getWeatherIcon(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="w-10 h-10 my-1 mx-auto block"
              />
              <p className="text-base font-bold">{Math.round(item.main.temp)}°C</p>
              <p className="text-[0.65rem] text-white/50 capitalize mt-[0.2rem]">
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
