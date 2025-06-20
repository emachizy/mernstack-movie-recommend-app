import express from "express";
import { getProfile } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/me", protect, getProfile);
router
  .route("/favorites")
  .get(protect, getFavorites)
  .post(protect, addFavorite);
router.delete("/favorites/:movieId", protect, removeFavorite);

export default router;
