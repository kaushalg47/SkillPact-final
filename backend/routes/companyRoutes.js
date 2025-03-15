import express from "express";
import {
	infoCompany,
	registerCompany,
	updateCompany,
	userCompany,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import approveCompany from "../middleware/companyApproveMiddleware.js";

const router = express.Router();

router.get("/", protect, userCompany);
router.post("/", protect, registerCompany);
router.put("/:compId", protect, approveCompany, updateCompany);
router.get("/:compId", infoCompany);

export default router;
