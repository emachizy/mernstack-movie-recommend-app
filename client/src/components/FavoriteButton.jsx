import { toast } from "react-toastify";
import api from "../services/api";
import useAuth from "../context/AuthContext";

const FavoriteButton = ({ movie }) => {
  const { user, setUser } = useAuth();

  const isFavorite = user?.favorites?.some((fav) => fav.movieId === movie.id);

  const toggleFavorite = async () => {
    if (!user) return toast.error("Please log in to save favorites");

    try {
      if (isFavorite) {
        await api.delete(`/user/favorites/${movie.id}`, {
          withCredentials: true,
        });

        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((fav) => fav.movieId !== movie.id),
        }));

        toast.success("Removed from favorites");
      } else {
        await api.post(
          "/user/favorites",
          {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
          },
          { withCredentials: true }
        );

        setUser((prev) => ({
          ...prev,
          favorites: [
            ...(prev?.favorites || []),
            {
              movieId: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
            },
          ],
        }));

        toast.success("Added to favorites");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded font-semibold transition ${
        isFavorite
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-white text-black border hover:bg-gray-100"
      }`}
    >
      {isFavorite ? "♥ Remove" : "♡ Save"}
    </button>
  );
};

export default FavoriteButton;
