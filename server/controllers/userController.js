import User from "../models/User.js";
import axios from "axios";

export const addFavorite = async (req, res) => {
  const { movieId, title, posterPath } = req.body;

  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const alreadyExists = user.favorites.some((fav) => fav.movieId === movieId);
  if (alreadyExists) {
    return res.status(400).json({ message: "Already in favorites" });
  }

  user.favorites.push({ movieId, title, posterPath });
  await user.save();

  res
    .status(201)
    .json({ message: "Added to favorites", favorites: user.favorites });
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favorites);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalCount = user.favorites.length;
    user.favorites = user.favorites.filter((fav) => fav.movieId !== movieId);

    if (user.favorites.length === originalCount) {
      return res.status(404).json({ message: "Movie not found in favorites" });
    }

    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { movieId, content, rating } = req.body;

    if (!movieId || !content || typeof rating !== "number") {
      return res.status(400).json({ message: "Missing review fields" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingReview = user.reviews.find((rev) => rev.movieId === movieId);
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Review already exists for this movie" });
    }

    user.reviews.push({ movieId, content, rating });
    await user.save();

    res.status(201).json({ message: "Review added", reviews: user.reviews });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { content, rating } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const review = user.reviews.find((rev) => rev.movieId === movieId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (content) review.content = content;
    if (typeof rating === "number") review.rating = rating;

    await user.save();

    res.json({ message: "Review updated", reviews: user.reviews });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeReview = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalCount = user.reviews.length;
    user.reviews = user.reviews.filter((rev) => rev.movieId !== movieId);

    if (user.reviews.length === originalCount) {
      return res.status(404).json({ message: "Review not found" });
    }

    await user.save();

    res.json({ message: "Review removed", reviews: user.reviews });
  } catch (error) {
    console.error("Error removing review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Collect genre frequencies from favorites
    const genreCounts = {};
    user.favorites.forEach((fav) => {
      fav.genres?.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });

    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    if (sortedGenres.length === 0) {
      return res.status(200).json([]); // No preferences yet
    }

    // Use TMDB discover endpoint
    const genreParam = sortedGenres.slice(0, 2).join(",");
    const tmdbRes = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_genres: genreParam,
          sort_by: "popularity.desc",
        },
      }
    );

    res.json(tmdbRes.data.results.slice(0, 10));
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Failed to generate recommendations" });
  }
};
