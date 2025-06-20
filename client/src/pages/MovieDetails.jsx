import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../services/tmdb.js";
import FavoriteButton from "../components/FavoriteButton.jsx";
import YouTube from "react-youtube";
import Modal from "react-modal";
import api from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      const trailerData = await getMovieTrailer(id);
      setMovie(data);
      setTrailer(trailerData);
    };

    const fetchReviews = async () => {
      try {
        const res = await api.get("/user/reviews", { withCredentials: true });
        const movieReviews = res.data.filter((r) => r.movieId === id);
        setReviews(movieReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchDetails();
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const res = await api.post(
        "/user/reviews",
        { movieId: id, content: newReview, rating: Number(rating) },
        { withCredentials: true }
      );

      const added = res.data.reviews.at(-1);
      setReviews((prev) => [added, ...prev]);
      setNewReview("");
      setRating(5);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  if (!movie) return <div className="spinner mx-auto relative top-52"></div>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4 italic">{movie.tagline}</p>
          <p className="mb-4">{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} ⭐
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>
          <div className="mt-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </div>
          <div className="flex gap-2 mt-4 flex-wrap items-center">
            <FavoriteButton movie={movie} />
            {trailer && (
              <div>
                <button
                  onClick={openModal}
                  className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                >
                  ▶ Watch Trailer
                </button>

                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Trailer Modal"
                  className="bg-black max-w-4xl mx-auto mt-20 p-4 rounded shadow-lg outline-none"
                  overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start"
                >
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="text-white text-xl mb-2"
                    >
                      ✖
                    </button>
                  </div>
                  <YouTube
                    videoId={trailer.key}
                    opts={{ width: "100%", height: "390" }}
                  />
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">💬 Reviews</h2>
        <form onSubmit={handleSubmitReview} className="space-y-4 mb-10">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
            rows={4}
            className="w-full p-4 bg-gray-800 rounded resize-none text-white"
          />
          <div className="flex items-center gap-4">
            <label className="text-sm">Rating:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-16 p-2 rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Submit Review
            </button>
          </div>
        </form>

        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded">
                <p className="text-sm text-gray-300 mb-1">⭐ {rev.rating}/10</p>
                <p>{rev.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
