import expressAsyncHandler from "express-async-handler";
import Job from "../models/jobModel.js";

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

		const {
			title,
			description,
			category,
			minqualification,
			position,
			location,
			duration,
			startsOn,
			stipend,
		} = req.body;

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
			company,
		};

		const job = await Job.create(jobData);

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
		const job = await res.locals.job.populate("application");

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
		const jobs = await Job.find({ createdby: adminId });
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

export { adminJobs, getJobs, infoJobs, postJobs, isEligible };
