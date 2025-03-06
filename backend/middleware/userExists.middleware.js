import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const userExists = expressAsyncHandler(async (req, res, next) => {
    const userId = req.params.userId || req.user._id;
    
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

	const user = await User.findById(userId).populate("badges");

	if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
	}

    res.locals.user = user;
    return next();
});