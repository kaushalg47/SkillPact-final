import mongoose from "mongoose";
import Badge from "../models/badgeModel.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

const badgesExist = async (badges) => {
	const docs = await Badge.countDocuments({ _id: { $in: badges } });
	return docs === badges.length;
};

const uniqueBadges = (badges) => [...new Set(badges)];

// TODO: FIX COURSE THUMBNAIL
export const createCourse = async (req, res) => {
	try {
		let {
			courseTitle,
			subTitle,
			description,
			category,
			courseLevel,
			coursePrice,
			courseThumbnail,
			isPublished = false,
			badges = [],
		} = req.body;

		// Validate badge IDs
		if (!badges.every((badge) => mongoose.Types.ObjectId.isValid(badge))) {
			return res.status(400).json({
				success: false,
				message: "Invalid badge id",
			});
		}

		// Remove duplicate badges
		badges = uniqueBadges(badges);

		// Check if badges exceed the limit
		if (badges.length > 10) {
			return res.status(400).json({
				success: false,
				message: "Maximum 10 badges allowed",
			});
		};
		
		// Check if all badges exist in the database
		const allBadgesExist = await badgesExist(badges);
		if (!allBadgesExist) {
			return res.status(400).json({
				success: false,
				message: "Badge not found",
			});
		}

		// Create a new course
		const course = await Course.create({
			courseTitle,
			subTitle,
			description,
			category,
			courseLevel,
			coursePrice,
			courseThumbnail,
			isPublished,
			creator: req.user._id,
			badges,
		});

		return res.status(201).json({
			course,
			success: true,
			message: "Course created.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create course",
		});
	}
};

export const searchCourse = async (req, res) => {
	try {
		const { query = "", categories = [], sortByPrice = "" } = req.query;
		console.log(categories);

		// create search query
		const searchCriteria = {
			isPublished: true,
			$or: [
				{ courseTitle: { $regex: query, $options: "i" } },
				{ subTitle: { $regex: query, $options: "i" } },
				{ category: { $regex: query, $options: "i" } },
			],
		};

		// if categories selected
		if (categories.length > 0) {
			searchCriteria.category = { $in: categories };
		}

		// define sorting order
		const sortOptions = {};
		if (sortByPrice === "low") {
			sortOptions.coursePrice = 1; //sort by price in ascending
		} else if (sortByPrice === "high") {
			sortOptions.coursePrice = -1; // descending
		}

		let courses = await Course.find(searchCriteria)
			.populate({ path: "creator", select: "name photoUrl" })
			.sort(sortOptions);

		return res.status(200).json({
			success: true,
			courses: courses,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to search courses",
		});
	}
};

export const getPublishedCourse = async (_z, res) => {
	try {
		const courses = await Course.find({ isPublished: true }).populate({
			path: "creator",
			select: "name photoUrl",
		});

		return res.status(200).json({
			success: true,
			courses: courses,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to get published courses",
		});
	}
};

export const getCreatorCourses = async (req, res) => {
	try {
		const userId = req.user._id;
		const courses = await Course.find({ creator: userId });

		return res.status(200).json({
			success: true,
			courses,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create course",
		});
	}
};

export const editCourse = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const thumbnail = req.file;
		let course = res.locals.course; // Fetched data from middleware

		let {
			courseTitle,
			subTitle,
			description,
			category,
			courseLevel,
			coursePrice,
			courseThumbnail,
			isPublished = false,
			badges,
		} = req.body;

		if (badges) {
			// Validating if every badge is of type ObjectId
			if (!badges.every((badge) => mongoose.Types.ObjectId.isValid(badge))) {
				return res.status(400).json({
					success: false,
					message: "Invalid badge id",
				});
			}

			// Removing duplicate badges
			badges = uniqueBadges(badges);

			if (badges.length > 10) {
				return res.status(400).json({
					success: false,
					message: "Maximum 10 badges allowed",
				});
			};
			
			// Check if all badges exist in database and are valid
			const allBadgesExist = await badgesExist(badges);
			if (!allBadgesExist) {
				return res.status(400).json({
					success: false,
					message: "Badge not found",
				});
			}
		}

		// If a new thumbnail is uploaded
		let newCourseThumbnail;
		if (thumbnail) {
			if (course.courseThumbnail) {
				const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
				await deleteMediaFromCloudinary(publicId); // delete old image
			}
			// upload a thumbnail on Cloudinary
			const courseThumbnail = await uploadMedia(thumbnail.path);
			newCourseThumbnail = courseThumbnail?.secure_url;
		}

		let updateData = {
			courseTitle,
			subTitle,
			description,
			category,
			courseLevel,
			coursePrice,
			courseThumbnail: newCourseThumbnail,
			isPublished,
			badges,
		};

		// Updating in database
		course = await Course.findByIdAndUpdate(courseId, updateData, { new: true, runValidators: true });

		return res.status(200).json({
			course,
			success: true,
			message: "Course updated successfully.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update course",
		});
	}
};

export const getCourseById = async (req, res) => {
	try {
		const course = await res.locals.course.populate("badges");
		return res.status(200).json({
			success: true,
			course,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to get course by id",
		});
	}
};

// publish unpublish course logic
export const togglePublishCourse = async (req, res) => {
	try {
		const { publish } = req.query; // true, false
		const course = res.locals.course;

		// publish status based on the query parameter
		course.isPublished = publish === "true";
		await course.save();

		const statusMessage = course.isPublished ? "Published" : "Unpublished";
		return res.status(200).json({
			success: true,
			message: `Course is ${statusMessage}`,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to update status",
		});
	}
};

// -------------------------------------------------
//Lectures

export const createLecture = async (req, res) => {
	try {
		const course = res.locals.course;

		const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;
		const lectureData = {
			lectureTitle,
			videoUrl,
			publicId,
			isPreviewFree,
			courseId: course._id,
		};

		// create lecture
		const lecture = await Lecture.create(lectureData);

		// TODO: ADD LECTURE VIDEO TO CLOUDINARY

		// Put the lecture id in the course
		course.lectures.push(lecture._id);
		await course.save();

		return res.status(201).json({
			lecture,
			success: true,
			message: "Lecture created successfully.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to create lecture",
		});
	}
};

export const getCourseLecture = async (req, res) => {
	try {
		const course = await res.locals.course.populate("lectures");

		return res.status(200).json({
			success: true,
			lectures: course.lectures,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to get lectures",
		});
	}
};

export const editLecture = async (req, res) => {
	try {
		const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;
		const lecture = res.locals.lecture;

		// update lecture
		if (lectureTitle) lecture.lectureTitle = lectureTitle;
		if (videoUrl) lecture.videoUrl = videoUrl;
		if (publicId) lecture.publicId = publicId;
		if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

		await lecture.save();

		return res.status(200).json({
			lecture,
			success: true,
			message: "Lecture updated successfully.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to edit lectures",
		});
	}
};

export const removeLecture = async (req, res) => {
	try {
		const { lectureId } = req.params;
		const lecture = res.locals.lecture;
		await lecture.deleteOne();

		// Remove the lecture reference from the associated course
		await Course.findByIdAndUpdate(
			lecture.courseId,
			{ $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
		);

		// delete the lecture from cloudinary as well
		if (lecture.publicId) {
			await deleteVideoFromCloudinary(lecture.publicId);
		}

		return res.status(200).json({
			lecture,
			success: true,
			message: "Lecture removed successfully.",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to remove lecture",
		});
	}
};

export const getLectureById = async (req, res) => {
	try {
		const lecture = res.locals.lecture;
		return res.status(200).json({
			success: true,
			lecture,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Failed to get lecture by id",
		});
	}
};
