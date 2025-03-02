import express from "express";
import {
	applyApplication,
	registeredApplicants,
	statusUpdateApplication,
	userApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply-job/:id", protect, applyApplication);
router.get("/user-applications", protect, userApplications);
router.get("/reg-applicants/:id", protect, registeredApplicants);
router.post("/status-update-app/:id", protect, statusUpdateApplication);

export default router;
