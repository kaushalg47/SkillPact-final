import {
	validateCourse as course,
	validateCoursePurchase as coursePurchase,
	validateCourseUpdate as courseUpdate,
	validateJob as job,
	validateLecture as lecture,
	validateLectureUpdate as lectureUpdate,
	validateUser as user,
	validateUserUpdate as userUpdate,
} from "../utils/schemaValidation.js";

const handleError = (req, res, next, error) => {
	if (error) {
		console.dir(error);
		let errorMessage = error.details.map((element) => element.message).join(", ");
		return res.json({ success: false, error: errorMessage });
	} else {
		return next();
	}
};

export const validateCourse = (req, res, next) => {
	let { error } = course(req.body);
	return handleError(req, res, next, error);
};

export const validateCoursePurchase = (req, res, next) => {
	let { error } = coursePurchase(req.body);
	return handleError(req, res, next, error);
};

export const validateLecture = (req, res, next) => {
	let { error } = lecture(req.body);
	return handleError(req, res, next, error);
};

export const validateJob = (req, res, next) => {
	let { error } = job(req.body);
	return handleError(req, res, next, error);
};

export const validateCourseUpdate = (req, res, next) => {
	let { error } = courseUpdate(req.body);
	return handleError(req, res, next, error);
};

export const validateLectureUpdate = (req, res, next) => {
	let { error } = lectureUpdate(req.body);
	return handleError(req, res, next, error);
};

export const validateUser = (req, res, next) => {
	let { error } = user(req.body);
	return handleError(req, res, next, error);
};

export const validateUserUpdate = (req, res, next) => {
	let { error } = userUpdate(req.body);
	return handleError(req, res, next, error);
};
