import express from 'express';
import {
  applyApplication,
  userAppliations,
  registeredApplicants,
  statusUpdateApplication,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/apply-job',protect, applyApplication);
router.route('/user-applications',protect,userAppliations)
router.post('/reg-applicants/:id', protect, registeredApplicants);
router.post('/status-update-app',protect, statusUpdateApplication);

export default router;
