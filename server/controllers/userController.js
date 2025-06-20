import jwt from "jsonwebtoken";
import User from "../models/User.js";

// POST /api/user/favorites
export const addFavorite = async (req, res) => {
  const { movieId, title, posterPath } = req.body;
  const user = await User.findById(req.user.userId);

  if (user.favorites.some((fav) => fav.movieId === movieId)) {
    return res.status(400).json({ message: "Movie already in favorites" });
  }

  user.favorites.push({ movieId, title, posterPath });
  await user.save();

  res
    .status(201)
    .json({ message: "Added to favorites", favorites: user.favorites });
};

// DELETE /api/user/favorites/:movieId
export const removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.favorites = user.favorites.filter(
    (fav) => fav.movieId !== req.params.movieId
  );
  await user.save();

  res.json({ message: "Removed from favorites", favorites: user.favorites });
};

// GET /api/user/favorites
export const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.favorites);
};
