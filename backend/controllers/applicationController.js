import asyncHandler from "express-async-handler";
import Application from "../models/applicationModel.js";

//apply for jobs
const applyForJob = asyncHandler(async (req, res) => {
	try {
		const user = req.user;
		const job = res.locals.job;

		// Check if the user has already applied for the job
		const existingApplication = await Application.findOne({
			job: job._id,
			applicant: user._id,
		});

		if (existingApplication) {
			return res.status(400).json({
				message: "You have already applied for this job",
				success: false,
			});
		}

		// Validate if user has the required badges
		const requiredBadges = job.badges || [];
		const userBadges = user.badges || [];
		const hasAllBadges = requiredBadges.every((badge) => userBadges.includes(badge));

		if (!hasAllBadges) {
			return res.status(403).json({
				message: "You do not have the required badges to apply for this job",
				success: false,
			});
		}

		// Create a new application
		const newApplication = new Application({
			job: job._id,
			applicant: user._id,
		});

		// Add the new application to the job's application array
		job.application.push(newApplication._id);

		// Asynchronously save the job and the new application
		await Promise.all([job.save(), newApplication.save()]);

		return res.status(201).json({
			message: "Job applied successfully",
			success: true,
		});
	} catch (error) {
		console.error("Error while applying for job:", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
});

//see applied jobs for users
const userApplications = asyncHandler(async (req, res) => {
	try {
		const userId = req.params.userId;
		const application = await Application.find({ applicant: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				select: "title category duration",
			});

		return res.status(200).json({
			application,
			success: true,
		});
	} catch (error) {
		console.error("Error while finding user applications: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
});

//see applied jobs for users
const registeredApplicants = asyncHandler(async (req, res) => {
	try {
		const jobId = req.params.jobId;
		const application = await Application.find({ job: jobId }).sort({ createdAt: -1 }).populate({
			path: "applicant",
			select: "name email",
		});

		return res.status(200).json({
			application,
			success: true,
		});
	} catch (error) {
		console.error("Error while finding job applications: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
});

// to change status of application
const statusUpdateApplication = asyncHandler(async (req, res) => {
	try {
		const { status } = req.body;
		const applicationId = req.params.appId;
		if (!status) {
			return res.status(400).json({
				message: "status is required",
				success: false,
			});
		}

		const allowedStatus = ["pending", "accepted", "rejected"];
		if (!allowedStatus.includes(status.toLowerCase())) {
			return res.status(400).json({
				message: "Invalid status",
				success: false,
			});
		}

		// find the application by application id
		const application = await Application.findOne({ _id: applicationId });
		if (!application) {
			return res.status(404).json({
				message: "Application not found.",
				success: false,
			});
		}

		// update the status
		application.status = status.toLowerCase();
		await application.save();

		return res.status(200).json({
			message: `Status updated successfully to ${status.toLowerCase()}.`,
			success: true,
		});
	} catch (error) {
		console.error("Error while updating status of job application: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
});

export { applyForJob, registeredApplicants, statusUpdateApplication, userApplications };
