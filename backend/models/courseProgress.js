import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	lectureProgress: {
		type: [
			{
				_id: false,
				lectureId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Lecture",
					required: true,
				},
				viewed: {
					type: Boolean,
					default: false,
				},
			},
		],
		default: [],
	},
});

// Indexing for faster query
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
