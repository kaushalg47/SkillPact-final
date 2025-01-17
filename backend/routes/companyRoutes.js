import express from 'express';
import {
  registerCompany,
  userCompany,
  infoCompany,
  updateCompany,
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reg-company',protect, registerCompany);
router.get('/user-company',protect,userCompany)
router.get('/info-company/:id', protect, infoCompany);
router.post('/update-company',protect, updateCompany);

export default router;
