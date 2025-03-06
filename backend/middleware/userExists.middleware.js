import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const userExists = expressAsyncHandler(async (req, res, next) => {
    // If user is looking for a specific user by id
    if (req.params.userId) {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.locals.user = user;
        return next();
    }

    // If the user is finding himself
    res.locals.user = req.user;
    return next();
});