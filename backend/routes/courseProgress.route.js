import express from "express";

import {
	getCourseProgress,
	markAsCompleted,
	markAsIncomplete,
	updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";
import { courseExists } from "../middleware/courseExists.middleware.js";

router.route("/:courseId").get(protect, courseExists, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(protect, courseExists, updateLectureProgress);
router.route("/:courseId/complete").post(protect, markAsCompleted);
router.route("/:courseId/incomplete").post(protect, markAsIncomplete);

export default router;
