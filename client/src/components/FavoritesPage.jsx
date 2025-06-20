import { useEffect, useState } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/user/favorites", { withCredentials: true });
        setFavorites(res.data); // assuming the API returns an array of favorites
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load your favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading favorites...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white"> My Favorites</h1>
        <div className="bg-red-600 h-2 w-24 mb-4 rounded-xl"></div>
      </div>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.movieId}
              movie={{
                id: movie.movieId,
                title: movie.title,
                poster_path: movie.posterPath,
                release_date: "", // optional, depending on your API
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
