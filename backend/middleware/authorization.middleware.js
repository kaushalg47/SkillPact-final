import expressAsyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";
import { Course } from "../models/course.model.js";
import User from "../models/userModel.js";

export const isCompanyOwner = expressAsyncHandler(async (req, res, next) => {
	const company = await Company.findById(req.params.compId);
	const isOwner = company.userId.toString() == req.user._id.toString();

	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});

export const isAccountOwner = expressAsyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.userId);
	const isOwner = req.user._id.toString() == user._id.toString();

	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});

export const isCourseOwner = expressAsyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.courseId);
	console.log(req.params.courseId);
	const isOwner = course.createdby.toString() == req.user._id.toString();
    
	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});
