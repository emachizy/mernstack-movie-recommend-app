import { useEffect, useState } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";

const RecommendationsPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await api.get("/user/recommendations", {
          withCredentials: true,
        });
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching recommendations", err);
      }
    };
    fetchRecs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Recommended based on what you like
      </h1>
      {movies.length === 0 ? (
        <p className="text-gray-600">
          No recommendations yet. Add favorites to get started!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
