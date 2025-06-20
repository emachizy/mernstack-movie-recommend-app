import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../services/tmdb.js";
import FavoriteButton from "../components/FavoriteButton.jsx";
import YouTube from "react-youtube";
import Modal from "react-modal";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      const trailerData = await getMovieTrailer(id);
      setMovie(data);
      setTrailer(trailerData);
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div class="spinner mx-auto relative top-52"></div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-4 italic">{movie.tagline}</p>
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
          <div className="flex gap-2 mt-2">
            <FavoriteButton movie={movie} />
            <div>
              {trailer && (
                <div className="">
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
      </div>
    </div>
  );
};

export default MovieDetails;
