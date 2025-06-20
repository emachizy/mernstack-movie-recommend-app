import express from "express";
import { getProfile } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  addReview,
  getReviews,
  updateReview,
  removeReview,
  getRecommendations,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/me", protect, getProfile);
router.get("/favorites", protect, getFavorites);
router.post("/favorites", protect, addFavorite);
router.delete("/favorites/:movieId", protect, removeFavorite);

router.get("/reviews", protect, getReviews);
router.post("/reviews", protect, addReview);
router.put("/reviews/:movieId", protect, updateReview);
router.delete("/reviews/:movieId", protect, removeReview);
router.get("/recommendations", protect, getRecommendations);
export default router;
