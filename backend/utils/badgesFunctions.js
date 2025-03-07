import Badge from "../models/badgeModel.js";

// Check if all badges exist in the database
const badgesExist = async (badges) => {
	const docs = await Badge.countDocuments({ _id: { $in: badges } });
	return docs === badges.length;
};

// Remove duplicate badges
const uniqueBadges = (badges) => [...new Set(badges)];

export {
    badgesExist,
    uniqueBadges,
}