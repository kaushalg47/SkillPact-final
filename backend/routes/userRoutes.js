import express from "express";
import {
	authUser,
	getUserProfile,
	getUserProfileById,
	logoutUser,
	registerUser,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Reconfigured /register to register users
router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.get("/profile/:id", getUserProfileById);

export default router;
