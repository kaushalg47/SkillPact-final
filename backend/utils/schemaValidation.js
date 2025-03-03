import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

const courseValidationSchema = Joi.object({
    courseTitle: Joi.string().required().max(100).min(2),
    subTitle: Joi.string().max(200),
    description: Joi.string().max(3000),
    category: Joi.string().min(2).max(50).required(),
    courseLevel: Joi.string().required().valid("Beginner", "Medium", "Advance"),
    coursePrice: Joi.number().min(0),
    courseThumbnail: Joi.string(),
    enrolledStudents: Joi.array().items(Joi.objectId()),
    lectures: Joi.array().items(Joi.objectId()),
    creator: Joi.objectId().required(),
    isPublished: Joi.boolean().default(false),
    badges: Joi.array().items(Joi.objectId()),
});

export const validateCourse = (data) => courseValidationSchema.validate(data);


