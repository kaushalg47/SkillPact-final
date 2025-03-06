import express from "express";
import {
	infoCompany,
	registerCompany,
	updateCompany,
	userCompany,
} from "../controllers/companyController.js";
import { protect } from "../middleware/authMiddleware.js";
import isCompanyAccepted from "../middleware/companyApproveMiddleware.js";
import { companyExists } from "../middleware/companyExists.middleware.js";
import { validateCompany, validateCompanyUpdate } from "../middleware/schemaValidationMiddleware.js";

const router = express.Router();

router.get("/", protect, companyExists, userCompany);
router.post("/", protect, validateCompany, registerCompany);
router.put("/:compId", protect, validateCompanyUpdate, companyExists, isCompanyAccepted, updateCompany);
router.get("/:compId", companyExists, infoCompany);

export default router;
