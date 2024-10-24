'use client';

import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import styles from './homePage.css';
import { fetchInitialResults, fetchMovies } from './fetchMovies';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialResults, setInitialResults] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchInitialResults({ page: 0, limit: 10 });
        setInitialResults(data);
        setResults(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  const handleSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        setResults([]);
        setIsLoading(true);
        setError('');
        try {
          const data = await fetchMovies({ searchTerm, limit: 10 });
          setResults(data);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      } else {
        setResults(initialResults);
      }
    }, 300),
    [initialResults]
  );

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for a Movie</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter show name"
        />
        <button onClick={() => handleSearch(query)} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.results}>
        {results.map((result) => (
          <div key={result?.show?.id ?? result?.id} className={styles.showCard}>
            <div className={styles.imageWrapper}>
              <img
                src={
                  result?.show?.image?.medium ??
                  result?.image?.medium ??
                  '/default-image.jpg'
                }
                alt={result?.show?.name ?? result?.name ?? 'Default image'}
                layout="responsive"
                width={300}
                height={420}
              />
            </div>
            <div className={styles.showDetails}>
              <h2>{result?.show?.name ?? result?.name ?? 'No name'}</h2>
              <p>
                <strong>Release Date:</strong>{' '}
                {result?.show?.premiered ?? result?.premiered}
              </p>
              <p>
                <strong>Genre:</strong>{' '}
                {result?.show?.genres?.join(', ') ?? result?.genres?.join(', ')}
              </p>
              <p>
                <strong>Language:</strong>{' '}
                {result?.show?.language ?? result?.language}
              </p>
              <p>
                <strong>Runtime:</strong>{' '}
                {result?.show?.runtime ?? result?.runtime}
              </p>
              <p>
                <strong>Rating:</strong>{' '}
                {result?.show?.rating?.average ?? result?.rating?.average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};