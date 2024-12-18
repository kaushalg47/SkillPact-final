import express from 'express';
import {
  registerCompany,
  userCompany,
  infoCompany,
  updateCompany,
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/reg-company',protect, registerCompany);
router.route('/user-company',protect,userCompany)
router.post('/info-company/:id', protect, infoCompany);
router.post('/update-company',protect, updateCompany);

export default router;
