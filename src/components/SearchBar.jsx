import { useState } from 'react';

const btnClasses =
  "px-6 py-3 rounded-[10px] border-none bg-[#4fc3f7] text-[#0f2027] text-base font-semibold cursor-pointer transition-[background,opacity] duration-200 [&:hover:not(:disabled)]:bg-[#81d4fa] disabled:opacity-50 disabled:cursor-not-allowed";

const SearchBar = ({ onSearch, loading, onLocate }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <form className="flex flex-wrap gap-2 mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 min-w-0 px-4 py-3 rounded-[10px] border border-white/20 bg-white/10 text-white text-base backdrop-blur-[10px] outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-white/50 disabled:opacity-60"
        placeholder="Search city... e.g. Cebu, Tokyo, London"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className={btnClasses}
          disabled={loading || !city.trim()}
        >
          {loading ? '...' : 'Search'}
        </button>
        <button
          type="button"
          className={btnClasses}
          onClick={onLocate}
          disabled={loading}
          aria-label="Use my current location"
          title="Use my current location"
        >
          📍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
