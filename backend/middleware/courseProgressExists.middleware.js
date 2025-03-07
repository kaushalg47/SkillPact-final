import expressAsyncHandler from "express-async-handler";
import { CourseProgress } from "../models/courseProgress.js";

export const courseProgressExists = expressAsyncHandler(async (req, res, next) => {
    const { courseId } = req.params;
    const userId = req.user._id;

    const courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
        // TODO: remove return next() after setting up route for creating a courseProgress
        return next();
        return res.status(404).json({
            success: false,
            message: "User has not enrolled in the course",
        });
    } else {
        // Store the found course in response locals variable
        res.locals.courseProgress = courseProgress;
        return next();
    }
});
