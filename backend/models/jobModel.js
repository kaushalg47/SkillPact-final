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
			maxlength: 500,
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
			trim: true,
		},
		startsOn: {
			// New field added
			type: Date,
			required: true,
		},
		stipend: {
			type: Number, // stipend should be a +ve number
			trim: true,
			min: 0,
		},
		createdby: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true, // Required creator
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
		badges: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Badge",
			},
		],
		application: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Application",
			},
		],
	},
	{ timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
