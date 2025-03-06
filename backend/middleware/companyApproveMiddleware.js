import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

const isCompanyAccepted = asyncHandler(async (req, res, next) => {
	let company = res.locals.company;

	// TODO: COMPANY_EXISTS MIDDLEWARE ALWAYS RUNS FIRST
	// ! REMOVE THIS AFTER FIXING DEPENDENCIES
	if (!company) {
		if (req.params.compId) {
			// If user is looking for company by get request
			company = await Company.findById(req.params.compId);
		} else {
			// used if user is trying to post job -> used to see if the user has a company or not
			company = await Company.findOne({ userId: req.user._id });
		}

		res.locals.company = company;
	}

	if (!company) {
		return res.status(404).json({
			message: "Company not found.",
			success: false,
		});
	}

	if (company.status) {
		switch (company.status) {
			case "accepted":
				return next();
			case "pending":
				return res.status(400).json({
					message: "Company not accepted yet.",
					success: false,
				});
			case "rejected":
				return res.status(400).json({
					message: "Company approval request rejected",
					success: false,
				});
			default:
				return res.status(500).json({
					message: "Something went wrong",
					success: false,
				});
		}
	} else {
		return res.status(400).json({
			message: "Company not accepted yet",
			success: false,
		});
	}
});

export default isCompanyAccepted;
