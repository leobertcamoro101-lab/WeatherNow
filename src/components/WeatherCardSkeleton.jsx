const WeatherCardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-[20px] p-7 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="skeleton-bone rounded-md w-[140px] h-6 mb-2" />
          <div className="skeleton-bone rounded-md w-[100px] h-4" />
        </div>
        <div className="skeleton-bone rounded-full w-[72px] h-[72px]" />
      </div>

      <div className="skeleton-bone rounded-[10px] w-40 h-14 mt-2 mb-1" />
      <div className="skeleton-bone rounded-md w-[120px] h-[0.9rem] mb-5" />

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/[0.07] rounded-xl px-4 py-3 flex flex-col gap-[0.2rem]"
          >
            <div className="skeleton-bone rounded w-3/5 h-[0.7rem] mb-1" />
            <div className="skeleton-bone rounded w-4/5 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
