import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';
import Badge from '../models/badgeModel.js';
import User from '../models/userModel.js';

// @desc    Fetch all jobs
// @route   GET /api/jobs/get-jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Build the query to search for jobs
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    // Fetch jobs from the database
    const jobs = await Job.find(query)
      .populate({
        path: "badges", // Adjust the populate path if required
      })
      .sort({ createdAt: -1 });
      
    // If no jobs found, return a 404 response
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    console.log("sent")
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
// @route   POST /api/jobs/get-jobs
// @access  Authenticated
const postJobs = asyncHandler(async (req, res) => {
  try {
    const { 
      title,
      description,
      badges,
     } = req.body;

    const userId = req.user._id;
    console.log(userId);
    if (!userId){
      return res.status(400).json({
        message: "user not logged in",
        success: false
      })
    };

    if (!title || !description) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      })
    };

    const company = (await User.findById(userId)).company; // Finding the user company

    if (!company) {
      return res.status(400).json({
        message: "Company not registered for user",
        success: false,
      })
    }

    try {
      if (badges && badges.length > 0) {
        const badgeDocs = await Badge.find({'_id': {$in:badges}});
        if (badgeDocs.length !== badges.length) {
          return res.status(400).json({message: 'some badge'});
        }
      }
    } catch (error) {
      console.log(error)
    };

    const job = await Job.create({
      title,
      description,
      createdby: userId,
      company, // Company is a required parameter in database
    });

    job.save()

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
});


// @desc    fetch job details
// @route   GET /api/jobs/info-jobs/:id
// @access  Public
const infoJobs = asyncHandler(async (req, res) => {
  try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path:"application" // Bug Fixing
      });
      if (!job) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({ job, success: true });
  } catch (error) {
      console.log(error);
  }
});


// @desc    fetch all jobs as an admin
// @route   GET /api/jobs/admin-jobs
// @access  Admin
const adminJobs = asyncHandler(async (req, res) => {
  try {
      const adminId = req.id;
      const jobs = await Job.find({ created_by: adminId }).populate({
          path:'company',
          createdAt:-1
      });
      if (!jobs) {
          return res.status(404).json({
              message: "Jobs not found.",
              success: false
          })
      };
      return res.status(200).json({
          jobs,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
});


export {
  getJobs,
  postJobs,
  infoJobs,
  adminJobs,
};
