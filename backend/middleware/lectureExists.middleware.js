import expressAsyncHandler from "express-async-handler";
import { Lecture } from "../models/lecture.model.js";

export const lectureExists = expressAsyncHandler(async (req, res, next) => {
	// Get the courseIds and lectureIds from request params
	// Assuming the data is in params
	const { lectureId, courseId } = req.params;

	const lecture = await Lecture.findOne({ _id: lectureId, courseId: courseId });
	if (!lecture) {
		return res.status(404).json({
			success: false,
			message: "Lecture not found",
		});
	} 
    // Store the found lecture in response locals variable
    res.locals.lecture = lecture;
    return next();
});
