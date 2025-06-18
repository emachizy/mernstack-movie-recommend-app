import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="rounded overflow-hidden shadow-lg bg-white transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{movie.title}</h3>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
