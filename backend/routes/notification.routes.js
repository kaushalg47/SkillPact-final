import express from "express";
import { getUserNotifications } from "../controllers/userNotification.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserNotifications);
export default router;
