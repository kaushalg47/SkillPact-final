import express from "express";
import {
	applyForJob,
	registeredApplicants,
	statusUpdateApplication,
	userApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { jobExists } from "../middleware/jobExists.middleware.js";

const router = express.Router();

router.get("/job/:jobId/applicants", protect, jobExists, registeredApplicants);
router.post("/job/:jobId/apply", protect, jobExists, applyForJob);
router.get("/user/:userId", protect, userApplications);
router.patch("/:appId/status", protect, statusUpdateApplication);

export default router;
