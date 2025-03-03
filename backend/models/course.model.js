import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		courseTitle: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 100,
		},
		subTitle: {
			type: String,
			maxlength: 200,
		},
		description: {
			type: String,
			maxlength: 3000,
		},
		category: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		courseLevel: {
			type: String,
			enum: ["Beginner", "Medium", "Advance"],
			required: true,
		},
		coursePrice: {
			type: Number,
			min: 0,
			required: true,
			default: 0,
		},
		courseThumbnail: {
			type: String,
		},
		enrolledStudents: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			default: [],
		},
		lectures: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Lecture",
				},
			],
			default: [],
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		badges: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Badge",
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
