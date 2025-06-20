// MovieCarousel.jsx
import { useEffect, useState } from "react";
import { getGenres, getPopularMovies } from "../services/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, genreRes] = await Promise.all([
          getPopularMovies(),
          getGenres(),
        ]);
        setGenres(genreRes || []);
        setMovies((movieRes || []).slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const getGenreNames = (ids) => {
    return ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="w-full mx-auto py-10">
      <Swiper
        modules={[Autoplay]}
        // spaceBetween={20}
        slidesPerView={1}
        // navigation
        autoplay={{ delay: 3000 }}
        loop
        // breakpoints={{
        //   640: { slidesPerView: 1 },
        //   1024: { slidesPerView: 1 },
        // }}
      >
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="bg-gray-900 relative rounded-lg overflow-hidden shadow-lg text-white">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie.backdrop_path || movie.poster_path
                  }`}
                  alt={movie.title}
                  className="w-full h-[60vh] md:h-screen object-cover"
                />
                <div className="p-4 pt-20 md:p-20 absolute inset-0 w-full bg-gradient-to-tr from-black/80 to-white/10">
                  <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                    {movie.title}
                  </h1>

                  <div className="flex gap-2.5 mt-4">
                    <p className="text-sm text-gray-300">
                      ⭐ {movie.vote_average}
                    </p>
                    <p className="bg-red-600 py-1 px-2 rounded-full text-sm">
                      {getGenreNames(movie.genre_ids)}
                    </p>
                  </div>
                  <p className="my-4 max-w-md">{movie.overview}</p>
                  <div className="mt-8">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="px-6 py-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                    >
                      ▶ Watch Trailer
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
