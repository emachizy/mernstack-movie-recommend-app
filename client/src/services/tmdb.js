import axios from "axios";

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query) => {
  const res = await tmdb.get("/search/movie", {
    params: { query },
  });
  return res.data.results;
};

export const getPopularMovies = async () => {
  try {
    const res = await tmdb.get("/movie/popular");
    return res.data.results || [];
  } catch (error) {
    console.error("Failed to fetch popular movies", error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  const res = await tmdb.get("/movie/top_rated");
  return res.data.results || [];
};

export const getMovieDetails = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

export const getMovieTrailer = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  return res.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
};

export const getGenres = async () => {
  const res = await tmdb.get("/genre/movie/list");
  return res.data.genres; // [{ id: 28, name: "Action" }, ...]
};
