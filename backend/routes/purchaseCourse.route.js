import express from "express";

import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

router.route("/checkout/create-checkout-session").post(protect, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(protect,getCourseDetailWithPurchaseStatus);

router.route("/").get(protect,getAllPurchasedCourse);

export default router;