import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
	message: { type: String, required: true },
	isRead: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

const userNotificationsSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
	notifications: { type: [notificationSchema], default: [] },
});

export const UserNotifications = mongoose.model("UserNotifications", userNotificationsSchema);
