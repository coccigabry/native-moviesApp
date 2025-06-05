export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  APY_KEY: process.env.EXPO_PUBLIC_TMDB_API_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!res.ok) {
    throw new Error(`Error fetching movies: ${res.statusText}`);
  }
  const data = await res.json();
  return data.results;
};
