import { toast } from "react-toastify";
import api from "../services/api";
import useAuth from "../context/AuthContext";

const FavoriteButton = ({ movie }) => {
  const { user, setUser } = useAuth();
  const isFavorite = user?.favorites?.some((fav) => fav.movieId === movie.id);

  const toggleFavorite = async () => {
    if (!user) return toast.error("Login required");

    try {
      if (isFavorite) {
        await api.delete(`/user/favorites/${movie.id}`, {
          withCredentials: true,
        });
        setUser((prev) => ({
          ...prev,
          favorites: prev.favorites.filter((fav) => fav.movieId !== movie.id),
        }));
        toast.success("Favorite Added Successfully");
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
            ...prev.favorites,
            {
              movieId: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
            },
          ],
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update favorites");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-3 py-1 rounded ${
        isFavorite ? "bg-red-500 text-white" : "bg-white text-black"
      }`}
    >
      {isFavorite ? "♥ Remove" : "♡ Save"}
    </button>
  );
};

export default FavoriteButton;
