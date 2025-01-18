import express from 'express';
import {
  getJobs,
  postJobs,
  infoJobs,
  adminJobs,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import approveCompany from '../middleware/companyApproveMiddleware.js';

const router = express.Router();

// Arranged in logical order
router.get('/',protect, getJobs);
router.get('/:id', infoJobs);
// Pending to be fixed
router.get('/admin-jobs',protect, adminJobs);

router.route('/')
      .post(protect, approveCompany, postJobs); // Protect the jobs.
      // Only allow companies with approval to post

export default router;
