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
	// TODO FIX THUMBNAIL
	courseThumbnail: Joi.string(),
	isPublished: Joi.boolean(),
	badges: Joi.array().items(Joi.objectId()),
});

const courseUpdateValidationSchema = Joi.object({
	courseTitle: Joi.string().max(100).min(2),
	subTitle: Joi.string().max(200),
	description: Joi.string().max(3000),
	category: Joi.string().min(2).max(50),
	courseLevel: Joi.string().valid("Beginner", "Medium", "Advance"),
	coursePrice: Joi.number().min(0),
	// TODO FIX THUMBNAIL
	courseThumbnail: Joi.string(),
	isPublished: Joi.boolean(),
	badges: Joi.array().items(Joi.objectId()),
});

const lectureValidationSchema = Joi.object({
	lectureTitle: Joi.string().required().max(100).min(2),
	videoUrl: Joi.string().uri(),
	publicId: Joi.string(),
	isPreviewFree: Joi.boolean(),
});

const lectureUpdateValidationSchema = Joi.object({
	lectureTitle: Joi.string().max(100).min(2),
	videoUrl: Joi.string().uri(),
	publicId: Joi.string(),
	isPreviewFree: Joi.boolean(),
});

// TODO
// ? Pending
const coursePurchaseValidationSchema = Joi.object({
	amount: Joi.number().required().min(0),
	status: Joi.string().valid("pending", "completed", "failed").default("pending"),
});

const jobValidationSchema = Joi.object({
	title: Joi.string().min(1).max(100).required(),
	description: Joi.string().required().max(2000),
	category: Joi.string()
		.required()
		.valid("Software", "AI/ML", "Data Science", "Cloud", "DevOps", "Security", "Frontend", "Backend"),
	minqualification: Joi.string().max(100),
	position: Joi.string().max(100),
	location: Joi.string().max(200),
	duration: Joi.string().required(),
	startsOn: Joi.date().required(),
	stipend: Joi.number().min(0),
	badges: Joi.array().items(Joi.objectId()),
});

const userValidationSchema = Joi.object({
	name: Joi.string().required().max(100).min(2),
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6),
	phone: Joi.string().required(),
})

const userUpdateValidationSchema = Joi.object({
	name: Joi.string().max(100).min(2),
	password: Joi.string().min(6),
	phone: Joi.string(),
	resume: Joi.string(),
})

const companyValidationSchema = Joi.object({
	name: Joi.string().required().max(100).min(2),
	description: Joi.string().max(3000),
	website: Joi.string().uri(),
	location: Joi.string().max(200),
	logo: Joi.string().uri(),
});

const companyUpdateValidationSchema = Joi.object({
	name: Joi.string().max(100).min(2),
	description: Joi.string().max(3000),
	website: Joi.string().uri(),
	location: Joi.string().max(200),
	logo: Joi.string().uri(),
});

export const validateCourse = (data) => courseValidationSchema.validate(data);

export const validateLecture = (data) => lectureValidationSchema.validate(data);

export const validateCoursePurchase = (data) => coursePurchaseValidationSchema.validate(data);

export const validateJob = (data) => jobValidationSchema.validate(data);

export const validateCourseUpdate = (data) => courseUpdateValidationSchema.validate(data);

export const validateLectureUpdate = (data) => lectureUpdateValidationSchema.validate(data);

export const validateUser = (data) => userValidationSchema.validate(data);

export const validateUserUpdate = (data) => userUpdateValidationSchema.validate(data);

export const validateCompany = (data) => companyValidationSchema.validate(data);

export const validateCompanyUpdate = (data) => companyUpdateValidationSchema.validate(data);