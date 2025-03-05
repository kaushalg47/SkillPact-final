import express from "express";
import {
	addBadge,
  addBadgeToUser,
} from "../controllers/badgeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addBadge);
router.post("/add-badge", protect, addBadgeToUser);

export default router;
