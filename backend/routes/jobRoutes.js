import express from "express";
import { adminJobs, getJobs, infoJobs, postJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import isCompanyAccepted from "../middleware/companyApproveMiddleware.js";
import { companyExists } from "../middleware/companyExists.middleware.js";
import { validateJob } from "../middleware/schemaValidationMiddleware.js";
import { jobExists } from "../middleware/jobExists.middleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, companyExists, isCompanyAccepted, validateJob, postJobs);
router.get("/admin-jobs", protect, companyExists, isCompanyAccepted, adminJobs);
router.get("/:jobId", jobExists, infoJobs);
// Only allow companies with approval to post

export default router;
