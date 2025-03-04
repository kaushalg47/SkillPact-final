import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		enum: [
			"Team Player",
			"Innovative",
			"Leadership",
			"Problem Solver",
			"Hardworking",
			"Creative Thinker",
			"Dependable",
			"Motivator",
			"Efficient",
			"Strategic Planner",
			"Mentor",
			"Collaborator",
			"Visionary",
			"Achiever",
			"Communicator",
		],
	},
	imageUrl: {
		type: String,
		default: "",
	},
});

const Badge = mongoose.model("Badge", badgeSchema);

export default Badge;
