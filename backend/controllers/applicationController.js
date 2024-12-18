
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Job from '../models/jobModel.js';
import Application from '../models/applicationModel.js';

//apply for jobs
const applyApplication = asyncHandler(async (req, res) => {
  try {
    const userId = req.id; // Retrieved from isAuthenticated middleware
    const jobId = req.params.id;

    // Validate job ID
    if (!jobId) {
      return res.status(400).json({
        message: 'Job ID is required',
        success: false,
      });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId, // Fixed typo: changed `applicaton` to `application`
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job',
        success: false,
      });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    // Validate if user has the required badges
    const requiredBadges = job.badges || []; 
    const userBadges = user.badges || [];
    const hasAllBadges = requiredBadges.every(badge => userBadges.includes(badge));

    if (!hasAllBadges) {
      return res.status(403).json({
        message: 'You do not have the required badges to apply for this job',
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the new application to the job's application array
    job.application.push(newApplication._id); // Ensure `application` field in Job is an array
    await job.save();

    return res.status(201).json({
      message: 'Job applied successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error while applying for job:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
});

//see applied jobs for users
const userAppliations = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
      path:'job',
      option:{sort:{createdAt:-1}},
      populate:{
        path:'title',
        options:{sort:{createdAt:-1}},
      }
    });
    if(!application){
      return res.status(404).json({
        message:"No Applications",
        success:false
      })
    };
    return res.status(200).json({
      application,
      success:true
    })
  } catch (error) {
    console.log(error);
  };
});

//to see applicants for course owners
const registeredApplicants = asyncHandler(async (req, res) => {
  try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path:'applications',
          options:{sort:{createdAt:-1}},
          populate:{
              path:'applicant'
          }
      });
      if(!job){
          return res.status(404).json({
              message:'Job not found.',
              success:false
          })
      };
      return res.status(200).json({
          job, 
          succees:true
      });
  } catch (error) {
      console.log(error);
  }
});

//to change status of application
const statusUpdateApplication = asyncHandler(async (req, res) => {
  try {
      const {status} = req.body;
      const applicationId = req.params.id;
      if(!status){
          return res.status(400).json({
              message:'status is required',
              success:false
          })
      };

      // find the application by applicantion id
      const application = await Application.findOne({_id:applicationId});
      if(!application){
          return res.status(404).json({
              message:"Application not found.",
              success:false
          })
      };

      // update the status
      application.status = status.toLowerCase();
      await application.save();

      return res.status(200).json({
          message:"Status updated successfully.",
          success:true
      });

  } catch (error) {
      console.log(error);
  }
});

export {
  applyApplication,
  userAppliations,
  registeredApplicants,
  statusUpdateApplication,
};
