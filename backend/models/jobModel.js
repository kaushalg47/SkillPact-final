import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Job Title is required"],
			trim: true,
			minlength: [1, "Job title must be at least 1 character long"],
			maxlength: [100, "Job title must be at most 100 character long"],
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		category: {
			type: String,
			enum: ["Software", "AI/ML", "Data Science", "Cloud", "DevOps", "Security", "Frontend", "Backend"],
			required: true,
		},
		minqualification: {
			type: String,
			trim: true,
		},
		position: {
			type: String,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
		},
		duration: {
			type: String,
			required: true,
			trim: true,
		},
		startsOn: {
			type: Date,
			required: true,
		},
		stipend: {
			type: Number,
			trim: true,
			min: 0,
		},
		active: {
			type: Boolean,
			default: true,
		},
		createdby: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
		badges: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: "Badge",
				},
			],
			default: [],
		},
		application: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Application",
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
