import { fetchData } from './fetchData';

export const fetchInitialResults = async ({ page, limit }) => {
  try {
    const data = await fetchData({
      URL: `https://api.tvmaze.com/shows`,
      queryParams: { page, limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async ({ searchTerm, limit }) => {
  try {
    const URL = `https://api.tvmaze.com/search/shows`;
    const data = await fetchData({
      URL,
      queryParams: { q: searchTerm, limit },
    });
    return data;
  } catch (error) {
    throw error;
  }
};