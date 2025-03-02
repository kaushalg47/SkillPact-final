import express from 'express';
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
  togglePublishCourse
} from '../controllers/course.controller.js';
import upload from '../utils/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new course
// ! Verified
router.post('/', protect, createCourse);

// Route to search courses
// ! Verified
router.get('/search', protect, searchCourse);

// Route to get published courses
// ! Verified
router.get('/published-courses', getPublishedCourse);

// Route to get courses created by a specific user
// ! Verified
router.get('/', protect, getCreatorCourses);

// Route to edit a course by its ID with an uploaded thumbnail
// ! Verified
router.put('/:courseId', protect, upload.single('courseThumbnail'), editCourse);

// Route to get a course by its ID
// ! Verified
router.get('/:courseId', protect, getCourseById);

// Route to create a new lecture for a specific course
// ! Verified
router.post('/:courseId/lecture', protect, createLecture);

// Route to get lectures for a specific course
// ! Verified
router.get('/:courseId/lecture', protect, getCourseLecture);

// Route to edit a specific lecture by its ID
// ! Verified
router.patch('/:courseId/lecture/:lectureId', protect, editLecture); // Changed the request type of edit

// Route to remove a specific lecture by its ID
// ! Verified
// ? Can be improved
router.delete('/lecture/:lectureId', protect, removeLecture);

// Route to get a specific lecture by its ID
// ! Verified
router.get('/lecture/:lectureId', protect, getLectureById);

// Route to toggle the publication status of a course
// ! Verified
router.patch('/:courseId', protect, togglePublishCourse);

export default router;
