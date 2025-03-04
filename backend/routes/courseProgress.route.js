import express from "express";

import {
	getCourseProgress,
	markAsCompleted,
	markAsIncomplete,
	updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/:courseId").get(protect, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(protect, updateLectureProgress);
router.route("/:courseId/complete").post(protect, markAsCompleted);
router.route("/:courseId/incomplete").post(protect, markAsIncomplete);

export default router;
