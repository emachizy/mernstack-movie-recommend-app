import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";

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
    <div className="p-">
      <form
        onSubmit={handleSearch}
        className="bg-white px-4 py-0.5 max-w-4xl mb-6 flex justify-between m-auto rounded-full"
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
      <div>
        <MovieCarousel />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
