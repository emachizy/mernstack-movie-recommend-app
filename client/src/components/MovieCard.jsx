import { Link, Navigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative rounded overflow-hidden shadow-lg transition group">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start pl-4 pb-6 text-white px-4">
          <button
            onClick={() => Navigate("/movie/:id")}
            className="px-8 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
          >
            ▶
          </button>

          <h3 className="font-bold text-xl mb-2 text-center">{movie.title}</h3>
          <p className="text-sm">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
