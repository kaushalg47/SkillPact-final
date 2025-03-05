import express from "express";
import {
	createCourse,
	createLecture,
	editCourse,
	editLecture,
	getCourseById,
	getCourseLecture,
	getCreatorCourses,
	getLectureById,
	getPublishedCourse,
	removeLecture,
	searchCourse,
	togglePublishCourse,
} from "../controllers/course.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { courseExists } from "../middleware/courseExists.middleware.js";
import { lectureExists } from "../middleware/lectureExists.middleware.js";
import { validateCourse, validateLecture } from "../middleware/schemaValidationMiddleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Route to create a new course
router.post("/", protect, validateCourse, createCourse);

// Route to search courses
router.get("/search", protect, searchCourse);

// Route to get published courses
router.get("/published-courses", getPublishedCourse);

// Route to get courses created by a specific user
router.get("/", protect, getCreatorCourses);

// Route to edit a course by its ID with an uploaded thumbnail
router.put("/:courseId", protect, courseExists, upload.single("courseThumbnail"), editCourse);

// Route to get a course by its ID
router.get("/:courseId", protect, courseExists, getCourseById);

// Route to create a new lecture for a specific course
router.post("/:courseId/lecture", protect, courseExists, validateLecture, createLecture);

// Route to get lectures for a specific course
router.get("/:courseId/lecture", protect, courseExists, getCourseLecture);

// Route to edit a specific lecture by its ID
router.patch("/:courseId/lecture/:lectureId", protect, courseExists, lectureExists, editLecture);

// Route to remove a specific lecture by its ID
// ? Can be improved
router.delete("/lecture/:lectureId", protect, lectureExists, removeLecture);

// Route to get a specific lecture by its ID
router.get("/lecture/:lectureId", protect, lectureExists, getLectureById);

// Route to toggle the publication status of a course
router.patch("/:courseId", protect, courseExists, togglePublishCourse);

export default router;
