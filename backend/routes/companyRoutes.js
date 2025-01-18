import express from 'express';
import {
  registerCompany,
  userCompany,
  infoCompany,
  updateCompany,
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',protect,userCompany)
router.post('/',protect, registerCompany);
router.put('/:id',protect, updateCompany);
router.get('/:id', protect, infoCompany);

export default router;
