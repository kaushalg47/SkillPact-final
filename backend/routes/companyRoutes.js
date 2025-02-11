import express from 'express';
import {
  registerCompany,
  userCompany,
  infoCompany,
  updateCompany,
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';
import approveCompany from '../middleware/companyApproveMiddleware.js';

const router = express.Router();

router.get('/',protect,userCompany)
router.post('/',protect, registerCompany);
router.put('/:compId',protect, approveCompany, updateCompany); // Added middleware "approveCompany" to block pending company requests
router.get('/:compId', infoCompany);

export default router;
