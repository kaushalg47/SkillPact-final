import {
	validateCourse as course,
	validateCoursePurchase as coursePurchase,
	validateLecture as lecture,
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
