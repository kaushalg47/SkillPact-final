import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

const courseValidationSchema = Joi.object({
	courseTitle: Joi.string().required().max(100).min(2),
	subTitle: Joi.string().max(200),
	description: Joi.string().max(3000),
	category: Joi.string().min(2).max(50).required(),
	courseLevel: Joi.string().required().valid("Beginner", "Medium", "Advance"),
	coursePrice: Joi.number().required().min(0),
	courseThumbnail: Joi.string(),
	isPublished: Joi.boolean(),
	// ! temp removed
	// badges: Joi.array().items(Joi.objectId()),
});

const lectureValidationSchema = Joi.object({
	lectureTitle: Joi.string().required().max(100).min(2),
	videoUrl: Joi.string().uri(),
	publicId: Joi.string(),
	isPreviewFree: Joi.boolean(),
});

// ? Pending
const coursePurchaseValidationSchema = Joi.object({
	amount: Joi.number().required().min(0),
	status: Joi.string().valid("pending", "completed", "failed").default("pending"),
});

export const validateCourse = (data) => courseValidationSchema.validate(data);

export const validateLecture = (data) => lectureValidationSchema.validate(data);

export const validateCoursePurchase = (data) => coursePurchaseValidationSchema.validate(data);
