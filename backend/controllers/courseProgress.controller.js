import { CourseProgress } from "../models/courseProgress.js";

export const getCourseProgress = async (req, res) => {
	try {
		// step-1 fetch the user course progress
		let courseProgress = res.locals.courseProgress;

		const courseDetails = await res.locals.course.populate("lectures");

		// Step-2 Return the user's course progress along with course details
		return res.status(200).json({
			data: {
				courseDetails,
				progress: courseProgress.lectureProgress,
				completed: courseProgress.completed,
			},
			success: true,
		});
	} catch (error) {
		console.dir(error);
		return res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

export const updateLectureProgress = async (req, res) => {
	try {
		const { courseId, lectureId } = req.params;
		const userId = req.user._id;
		const course = res.locals.course;

		// fetch or create course progress
		// Don't change the order of "{userId, courseId}"
		let courseProgress = res.locals.courseProgress;

		if (!courseProgress) {
			// TODO: MUST BE CREATED WHILE PAYMENT
			// !
			// If no progress exist, create a new record
			courseProgress = new CourseProgress({
				userId,
				courseId,
				completed: false,
				lectureProgress: [],
			});
		}

		// find the lecture progress in the course progress
		const lectureIndex = courseProgress.lectureProgress.findIndex(
			(lecture) => lecture.lectureId.toString() === lectureId
		);

		if (lectureIndex !== -1) {
			// if lecture already exist, update its status
			courseProgress.lectureProgress[lectureIndex].viewed = true;
		} else {
			// Add new lecture progress
			courseProgress.lectureProgress.push({
				lectureId,
				viewed: true,
			});
		}

		// if all lecture is complete
		let viewedLectures = 0;
		for (let lectureProg of courseProgress.lectureProgress) {
			if (lectureProg.viewed) {
				viewedLectures++;
			} else {
				break;
			}
		}

		if (course.lectures.length === viewedLectures) courseProgress.completed = true;

		await courseProgress.save();

		return res.status(200).json({
			message: "Lecture progress updated successfully.",
			success: true,
		});
	} catch (error) {
		console.dir(error);
		return res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

export const markAsCompleted = async (req, res) => {
	try {
		const courseProgress = res.locals.courseProgress;

		courseProgress.lectureProgress.forEach((_, index, arr) => (arr[index].viewed = true));
		courseProgress.completed =
			courseProgress.lectureProgress.length === res.locals.course.lectures.length;
		await courseProgress.save();

		return res.status(200).json({
			message: "Course marked as completed.",
			success: true,
		});
	} catch (error) {
		console.dir(error);
		return res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};

export const markAsIncomplete = async (req, res) => {
	try {
		const courseProgress = res.locals.courseProgress;

		courseProgress.lectureProgress.forEach((_, index, arr) => (arr[index].viewed = false));
		courseProgress.completed = false;

		await courseProgress.save();

		return res.status(200).json({
			message: "Course marked as incomplete.",
			success: true,
		});
	} catch (error) {
		console.dir(error);
		return res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};
