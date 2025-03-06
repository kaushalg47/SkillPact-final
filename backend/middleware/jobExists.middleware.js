import expressAsyncHandler from "express-async-handler";
import Job from "../models/jobModel.js";

export const jobExists = expressAsyncHandler(async (req, res, next) => {
	const { jobId } = req.params;

	const job = await Job.findById(jobId);

	if (!job) {
		return res.status(404).json({
			success: false,
			message: "Job not found",
		});
	}

    // Store the found job in response locals variable
    res.locals.job = job

	return next();
});
