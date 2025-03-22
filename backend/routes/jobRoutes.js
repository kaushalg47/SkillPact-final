import express from "express";
import {
	adminJobs,
	deleteJob,
	getJobs,
	infoJobs,
	isEligible,
	postJobs,
	toggleJobStatus,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isCompanyOwner, isJobOwner } from "../middleware/authorization.middleware.js";
import isCompanyAccepted from "../middleware/companyApproveMiddleware.js";
import { companyExists } from "../middleware/companyExists.middleware.js";
import { jobExists } from "../middleware/jobExists.middleware.js";
import { validateJob } from "../middleware/schemaValidationMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, validateJob, companyExists, isCompanyOwner, isCompanyAccepted, postJobs);
router.get("/admin-jobs", protect, companyExists, isCompanyAccepted, adminJobs);
router.get("/:jobId/eligibility", protect, jobExists, isEligible);
router.get("/:jobId", jobExists, infoJobs);
router.put("/:jobId", protect, jobExists, isJobOwner, toggleJobStatus);
router.delete("/:jobId", protect, jobExists, isJobOwner, deleteJob);
// Only allow companies with approval to post

export default router;
