import { UserNotifications } from "../models/notificationModel.js";
const MAX_NOTIFICATIONS = 2; // Limit per user

async function addNotification(userId, message) {
	const userNotif = await UserNotifications.findOneAndUpdate(
		{ user: userId },
		{
			$push: {
				notifications: {
                    $each: [{
                        message,
                        isRead: false,
                        createdAt: new Date(),
                    }],
                    $slice: -MAX_NOTIFICATIONS,
				},
			},
		},
		{ upsert: true, new: true }
	);

	return userNotif;
}

export { addNotification };
