import express from "express"

import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router = express.Router()

import { protect } from '../middleware/authMiddleware.js';

router.route("/:courseId").get(getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(protect, updateLectureProgress);
router.route("/:courseId/complete").post(protect, markAsCompleted);
router.route("/:courseId/incomplete").post(protect, markAsInCompleted);

export default router;