import asyncHandler from "express-async-handler";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import { addNotification } from "../utils/notificationFunctions.js";

//apply for jobs
const applyApplication = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id; // Retrieved from isAuthenticated middleware
		const jobId = req.params.id;

		// Validate job ID
		if (!jobId) {
			return res.status(400).json({
				message: "Job ID is required",
				success: false,
			});
		}

		// Check if the user has already applied for the job
		const existingApplication = await Application.findOne({
			job: jobId,
			applicant: userId,
		});

		if (existingApplication) {
			return res.status(400).json({
				message: "You have already applied for this job",
				success: false,
			});
		}

		// Find the job
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
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
		const newApplication = await Application.create({
			job: jobId,
			applicant: userId,
		});

		// Add the new application to the job's application array
		job.application.push(newApplication._id);

		await job.save();

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
		const userId = req.user._id;
		const application = await Application.find({ applicant: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				option: { sort: { createdAt: -1 } },
				populate: {
					path: "title",
					options: { sort: { createdAt: -1 } },
				},
				populate: {
					path: "company",
					select: "name",
					options: { sort: { createdAt: -1 } },
				},
			});
		if (!application) {
			return res.status(404).json({
				message: "No Applications",
				success: false,
			});
		}
		return res.status(200).json({
			application,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
});

//see applied jobs for users
const registeredApplicants = asyncHandler(async (req, res) => {
	try {
		const jobId = req.params.id;
		const application = await Application.find({ job: jobId }).sort({ createdAt: -1 }).populate({
			path: "applicant",
			select: "name email status badges phone resume",
		});

		if (!application) {
			return res.status(404).json({
				message: "No Applications",
				success: false,
			});
		}
		return res.status(200).json({
			application,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
});

// to change status of application
const statusUpdateApplication = asyncHandler(async (req, res) => {
	try {
		const { status } = req.body;
		const applicationId = req.params.id;
		if (!status) {
			return res.status(400).json({
				message: "status is required",
				success: false,
			});
		}

		// find the application by application id
		const application = await Application.findOne({ _id: applicationId }).populate({
			path: "job",
			select: "title createdby",
		});
		
		if (!application) {
			return res.status(404).json({
				message: "Application not found.",
				success: false,
			});
		}

		if (application.job.createdby.toString() !== req.user._id.toString()) {
			return res.status(401).json({
				message: "Unauthorized",
				success: false,
			})
		}

		// update the status
		application.status = status.toLowerCase();
		await application.save();
		await addNotification(
			application.applicant,
			`Your application for ${application.job.title} position has been ${status.toLowerCase()}`
		);

		return res.status(200).json({
			message: "Status updated successfully.",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
});

export { applyApplication, registeredApplicants, statusUpdateApplication, userApplications };
