import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
	{
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			required: true,
			index: true,
		},
		applicant: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
			trim: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
