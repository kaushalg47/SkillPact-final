import express from "express";
import { adminJobs, getJobs, infoJobs, postJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import isCompanyAccepted from "../middleware/companyApproveMiddleware.js";
import { validateJob } from "../middleware/schemaValidationMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, isCompanyAccepted, validateJob, postJobs);
router.get("/admin-jobs", protect, isCompanyAccepted, adminJobs);
router.get("/:id", infoJobs);
// Only allow companies with approval to post

export default router;
