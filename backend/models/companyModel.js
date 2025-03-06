import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true, // Ensure no leading or trailing spaces
			minlength: 2, // Minimum length of 2 characters
			maxlength: 100,
		},
		description: {
			type: String,
			trim: true, // Ensure no leading or trailing spaces
			maxlength: 3000, // Maximum length of 3000 characters
		},
		website: {
			type: String,
			trim: true, // Ensure no leading or trailing spaces
		},
		location: {
			type: String,
			trim: true, // Ensure no leading or trailing spaces
		},
		logo: {
			type: String, // URL to company logo
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true, // Once created company ownership
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
