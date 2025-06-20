import useAuth from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Favorite Movies</h2>
      {user?.favorites?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.favorites.map((fav) => (
            <div key={fav.movieId} className="bg-white shadow rounded p-2">
              <img
                src={`https://image.tmdb.org/t/p/w500/${fav.posterPath}`}
                alt={fav.title}
              />
              <p className="mt-2">{fav.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Profile;
