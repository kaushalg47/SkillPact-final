import express from "express";

import {
	getCourseProgress,
	markAsCompleted,
	markAsIncomplete,
	updateLectureProgress,
} from "../controllers/courseProgress.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { courseExists } from "../middleware/courseExists.middleware.js";
import { courseProgressExists } from "../middleware/courseProgressExists.middleware.js";
import { lectureExists } from "../middleware/lectureExists.middleware.js";

const router = express.Router();

router.route("/:courseId").get(protect, courseExists, courseProgressExists, getCourseProgress);

router
	.route("/:courseId/lecture/:lectureId/view")
	.post(
		protect,
		courseExists,
		lectureExists,
		courseProgressExists,
		updateLectureProgress
	);

// TODO: ADMIN ONLY
router.route("/:courseId/complete").patch(protect, courseExists, courseProgressExists, markAsCompleted);

// TODO: ADMIN ONLY
router.route("/:courseId/incomplete").patch(protect, courseExists, courseProgressExists, markAsIncomplete);

export default router;
