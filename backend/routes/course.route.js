import express from "express";

import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

router.route("/").post(protect,createCourse);
router.route("/search").get(protect, searchCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(protect,getCreatorCourses);
router.route("/:courseId").put(protect,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(protect, getCourseById);
router.route("/:courseId/lecture").post(protect, createLecture);
router.route("/:courseId/lecture").get(protect, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(protect, editLecture);
router.route("/lecture/:lectureId").delete(protect, removeLecture);
router.route("/lecture/:lectureId").get(protect, getLectureById);
router.route("/:courseId").patch(protect, togglePublishCourse);


export default router;