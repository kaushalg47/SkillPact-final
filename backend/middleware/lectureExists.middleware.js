import expressAsyncHandler from "express-async-handler";
import { Lecture } from "../models/lecture.model.js";

export const lectureExists = expressAsyncHandler(async (req, res, next) => {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        return res.status(404).json({
            success: false,
            message: "Lecture not found",
        });
    } else {
        // Store the found lecture in response locals variable
        res.locals.lecture = lecture;
        return next();
    }
});
