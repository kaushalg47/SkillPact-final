import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.js";

export const getCourseProgress = async (req, res) => {
	try {
		const { courseId } = req.params;
		const userId = req.user._id;

		// step-1 fetch the user course progress
		let courseProgress = await CourseProgress.findOne({
			courseId,
			userId,
		}).populate("courseId");

		const courseDetails = await res.locals.course.populate("lectures");

		// Step-2 If no progress found, return course details with an empty progress
		if (!courseProgress) {
			return res.status(200).json({
				data: {
					courseDetails,
					progress: [],
					completed: false,
				},
			});
		}

		// Step-3 Return the user's course progress along with course details
		return res.status(200).json({
			data: {
				courseDetails,
				progress: courseProgress.lectureProgress,
				completed: courseProgress.completed,
			},
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
		let courseProgress = await CourseProgress.findOne({ courseId, userId });

		if (!courseProgress) {
			// TODO: MUST BE CREATED WHILE PAYMENT
			// !
			// If no progress exist, create a new record
			courseProgress = new CourseProgress({
				userId,
				courseId,
				completed: true,
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
			// Making sure that the lecture is valid and is present
			const lectureIndex = course.lectures.findIndex((lecture) => lecture.toString() === lectureId);

			if (lectureIndex === -1) {
				return res.status(404).json({
					message: "Lecture not present in the course",
				});
			}

			courseProgress.lectureProgress.push({
				lectureId,
				viewed: true,
			});
		}

		// if all lecture is complete
		const lectureProgressLength = courseProgress.lectureProgress.filter(
			(lectureProg) => lectureProg.viewed
		).length;

		if (course.lectures.length === lectureProgressLength) courseProgress.completed = true;

		await courseProgress.save();

		return res.status(200).json({
			message: "Lecture progress updated successfully.",
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
		const { courseId } = req.params;
		const userId = req.user._id;

		const courseProgress = await CourseProgress.findOne({ courseId, userId });
		if (!courseProgress) return res.status(404).json({ message: "Course progress not found" });

		courseProgress.lectureProgress.map((lectureProgress) => (lectureProgress.viewed = true));
		courseProgress.completed = true;
		await courseProgress.save();
		return res.status(200).json({ message: "Course marked as completed." });
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
		const { courseId } = req.params;
		const userId = req.user._id;

		const courseProgress = await CourseProgress.findOne({ courseId, userId });
		if (!courseProgress) return res.status(404).json({ message: "Course progress not found" });

		courseProgress.lectureProgress.map((lectureProgress) => (lectureProgress.viewed = false));
		courseProgress.completed = false;
		await courseProgress.save();
		return res.status(200).json({ message: "Course marked as incomplete." });
	} catch (error) {
		console.dir(error);
		return res.status(500).json({
			success: false,
			message: "Some error occurred!",
		});
	}
};


// Problems ->
/*
* @getCourseProgress
*/
