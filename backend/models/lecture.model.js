import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
	{
		lectureTitle: {
			type: String,
			required: true,
			maxlength: 100,
			minlength: 2,
		},
		videoUrl: {
			type: String,
		},
		publicId: {
			type: String,
		},
		isPreviewFree: {
			type: Boolean,
			default: false,
		},
		courseId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
