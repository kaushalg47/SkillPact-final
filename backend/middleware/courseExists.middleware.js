import expressAsyncHandler from "express-async-handler";
import { Course } from "../models/course.model.js";

export const courseExists = expressAsyncHandler(async (req, res, next) => {
	const { courseId } = req.params;

	const course = await Course.findById(courseId);

	if (!course) {
		return res.status(404).json({
			success: false,
			message: "Course not found",
		});
	} else {
		// Store the found course in response locals variable
		res.locals.course = course;
		return next();
	}
});
