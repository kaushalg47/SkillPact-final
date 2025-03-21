import expressAsyncHandler from "express-async-handler";

export const isCompanyOwner = expressAsyncHandler(async (req, res, next) => {
	const isOwner = res.locals.company.userId.toString() == req.user._id.toString();

	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});

export const isAccountOwner = expressAsyncHandler(async (req, res, next) => {
	const isOwner = req.user._id.toString() == res.locals.user._id.toString();

	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});

export const isCourseOwner = expressAsyncHandler(async (req, res, next) => {
	const isOwner = res.locals.course.creator.toString() == req.user._id.toString();
    
	if (!isOwner) {
		return res.status(401).json({
			message: "Unauthorized",
			success: false,
		});
	}

	return next();
});
