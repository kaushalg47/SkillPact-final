import express from 'express';
import {
  getJobs,
  postJobs,
  infoJobs,
  adminJobs,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Arranged in logical order
router.get('/',protect, getJobs);
router.get('/:id', infoJobs);
// Pending to be fixed
router.get('/admin-jobs',protect, adminJobs);

router.route('/')
      .post(postJobs);

export default router;
