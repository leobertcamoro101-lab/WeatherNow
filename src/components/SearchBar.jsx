import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, loading, onLocate }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search city... e.g. Cebu, Tokyo, London"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={styles.btn}
        disabled={loading || !city.trim()}
      >
        {loading ? '...' : 'Search'}
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={onLocate}
        disabled={loading}
        aria-label="Use my current location"
        title="Use my current location"
      >
        📍
      </button>
    </form>
  );
};

export default SearchBar;
