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
import { validateUser, validateUserUpdate } from "../middleware/schemaValidationMiddleware.js";
import { userExists } from "../middleware/userExists.middleware.js";
import { isAccountOwner } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
	.route("/profile/:userId")
	.get(protect, userExists, getUserProfile)
	.put(protect, validateUserUpdate, userExists, isAccountOwner, updateUserProfile);
router.get("/profile/:userId", userExists, getUserProfileById);

export default router;
