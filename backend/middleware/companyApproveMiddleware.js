import asyncHandler from "express-async-handler";

const isCompanyAccepted = asyncHandler(async (req, res, next) => {
	let company = res.locals.company;

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
