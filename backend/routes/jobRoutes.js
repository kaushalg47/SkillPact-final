import express from 'express';
import {
  getJobs,
  postJobs,
  infoJobs,
  adminJobs,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/get-jobs',protect, getJobs);
router.route('/post-jobs')
      .post(protect, postJobs);
router.post('/job-info/:id', infoJobs);
router.post('/admin-jobs',protect, adminJobs);

export default router;
