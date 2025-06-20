import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";
import RecommendationsPage from "../components/RecommendationsPage";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const fetchPopular = async () => {
    const data = await getPopularMovies();

    setMovies(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const results = await searchMovies(query);
    setMovies(results);
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="bg-white px-4 py-0.5 w-full max-w-4xl flex justify-between mx-auto rounded-full absolute top-10 z-10 md:left-48"
      >
        <input
          className="input w-4/5 focus:outline-none"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn bg-gradient-to-br from-[#1ed5a9] to-[#01b4e4] border-2 border-black/25 px-8 py-2 -mb-1 -mr-4 rounded-full text-white hover:text-black transition-colors duration-500">
          Search
        </button>
      </form>
      <div className="inset-0">
        <MovieCarousel />
      </div>

      <div>
        <div>
          <h2 className="text-2xl text-white">Popular Movies</h2>
          <div className="bg-red-600 h-2 w-24 mb-4 rounded-xl"></div>
        </div>
        <div className=" mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <RecommendationsPage />
      </div>
    </div>
  );
};

export default Home;
