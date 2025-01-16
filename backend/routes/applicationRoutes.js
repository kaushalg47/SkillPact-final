import express from 'express';
import {
  applyApplication,
  userApplications, // Typo -> Appliations -> Applications
  registeredApplicants,
  statusUpdateApplication,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply-job/:id',protect, applyApplication);
router.get('/user-applications',protect,userApplications) // Typo -> Appliations -> Applications
router.get('/reg-applicants/:id', protect, registeredApplicants);
router.post('/status-update-app',protect, statusUpdateApplication);

export default router;
