import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		enum: [
			"Team Player",
			"Innovative",
			"Leadership",
		],
	},
	imageUrl: {
		type: String,
		default: "",
	},
});

const Badge = mongoose.model("Badge", badgeSchema);

export default Badge;
