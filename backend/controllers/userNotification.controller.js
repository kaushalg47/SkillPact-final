import asyncHandler from "express-async-handler";
import { UserNotifications } from "../models/notificationModel.js";

export const getUserNotifications = asyncHandler(async (req, res) => {
	try {
		const notifications = await UserNotifications.findOne({ user: req.user._id });

		return res.status(200).json({
			notifications: notifications?.notifications || [],
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
});
