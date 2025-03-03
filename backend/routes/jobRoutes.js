import express from "express";
import { adminJobs, getJobs, infoJobs, postJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import approveCompany from "../middleware/companyApproveMiddleware.js";

const router = express.Router();

// Arranged in logical order
router.get("/admin-jobs", protect, approveCompany, adminJobs);
router.get("/", getJobs);
router.get("/:id", infoJobs);
// Pending to be fixed

router.post("/", protect, approveCompany, postJobs); // Protect the jobs.
// Only allow companies with approval to post

export default router;
