import expressAsyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

export const companyExists = expressAsyncHandler(async (req, res, next) => {
	const { compId } = req.params;
    let company;

    if (compId) {
        company = await Company.findById(compId);
    } else if (req.user._id) {
        company = await Company.findOne({ userId: req.user._id });
    }

	if (!company) {
		return res.status(404).json({
			success: false,
			message: "Company not found",
		});
	}

	// Store the found course in response locals variable
	res.locals.company = company;
	return next();
});
