import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import { badgesExist, uniqueBadges } from "../utils/badgesFunctions.js";

// @desc    Fetch all jobs related to a keyword
// @route   GET /api/jobs/
// @access  Public
const getJobs = expressAsyncHandler(async (req, res) => {
	try {
		const keyword = req.query.keyword || "";

		// Build the query to search for jobs
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
			],
		};

		// Fetch jobs from the database
		const jobs = await Job.find(query)
			.populate({
				path: "badges", // Adjust the populate path if required
			})
			.sort({ createdAt: -1 });

		// Return the list of jobs with a 200 response
		return res.status(200).json({
			jobs,
			success: true,
		});
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return res.status(500).json({
			message: "Server error occurred",
			success: false,
		});
	}
});

// @desc    Post a job
// @route   POST /api/jobs/
// @access  Authenticated
const postJobs = expressAsyncHandler(async (req, res) => {
	try {
		const userId = req.user._id;
		const company = res.locals.company;

		let {
			title,
			description,
			category,
			minqualification,
			position,
			location,
			duration,
			startsOn,
			stipend,
			badges = [],
		} = req.body;

		// Validate badge IDs
		if (!badges.every((badge) => mongoose.Types.ObjectId.isValid(badge))) {
			return res.status(400).json({
				success: false,
				message: "Invalid badge id",
			});
		}

		// Remove duplicate badges
		badges = uniqueBadges(badges);

		// Check if badges exceed the limit
		if (badges.length > 10) {
			return res.status(400).json({
				success: false,
				message: "Maximum 10 badges allowed",
			});
		}

		// Check if all badges exist in the database
		const allBadgesExist = await badgesExist(badges);
		if (!allBadgesExist) {
			return res.status(400).json({
				success: false,
				message: "Badge not found",
			});
		}

		const jobData = {
			title,
			description,
			category,
			minqualification,
			position,
			location,
			duration,
			startsOn,
			stipend,
			createdby: userId,
			company: company._id,
			badges,
		};

		const job = await Job.create(jobData);
		// const job = new Job(jobData);

		return res.status(201).json({
			job,
			message: "New job created successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Could not post job due to some error!",
			success: false,
		});
	}
});

// @desc    fetch job details
// @route   GET /api/jobs/:id
// @access  Public
const infoJobs = expressAsyncHandler(async (req, res) => {
	try {
		const job = await res.locals.job.populate([
			{ path: "application" },
			{ path: "company" },
			{ path: "badges", select: "title imageUrl" }
		]);

		return res.status(200).json({ job, success: true });
	} catch (error) {
		console.error("Error fetching job details:", error);
		return res.status(500).json({
			message: "Could not get any information about the job!",
			success: false,
		});
	}
});

// @desc    fetch all jobs as an admin
// @route   GET /api/jobs/admin-jobs
// @access  Admin
const adminJobs = expressAsyncHandler(async (req, res) => {
	try {
		const adminId = req.user._id;
		const jobs = await Job.find({ createdby: adminId })
			.populate({ path: "badges", select: "title" })
			.populate({ path: "company" });

		if (!jobs) {
			return res.status(404).json({
				message: "Jobs not found.",
				success: false,
			});
		}
		return res.status(200).json({
			jobs,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Server error occurred",
			success: false,
		});
	}
});

const isEligible = expressAsyncHandler(async (req, res) => {
	try {
		const user = req.user;
		const job = res.locals.job;

		const requiredBadges = job.badges || [];
		const userBadges = user.badges || [];
		const hasAllBadges = requiredBadges.every((badge) => userBadges.includes(badge));

		return res.status(200).json({
			success: true,
			isEligible: hasAllBadges,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Server error occurred",
			success: false,
		});
	}
});

const toggleJobStatus = expressAsyncHandler(async (req, res) => {
	try {
		const job = res.locals.job;

		// Toggle the active status
		job.active = !job.active;

		// Save the updated job
		await job.save();

		return res.status(200).json({
			message: `Job status updated to ${job.active ? "active" : "inactive"}`,
			job,
			success: true,
		});
	} catch (error) {
		console.error(`Error updating job status: ${error.message}`);
		res.status(500).json({
			message: "Failed to update job status",
			success: false,
		});
	}
});

// Delete Job Controller
const deleteJob = expressAsyncHandler(async (req, res) => {
	try {
		const job = res.locals.job;

		// Delete the job
		await job.deleteOne();

		return res.status(200).json({
			message: "Job deleted successfully",
			success: true,
		});
	} catch (error) {
		console.error(`Error deleting job: ${error.message}`);
		res.status(500).json({
			message: "Failed to delete job",
			success: false,
		});
	}
});

export { adminJobs, deleteJob, getJobs, infoJobs, isEligible, postJobs, toggleJobStatus };
