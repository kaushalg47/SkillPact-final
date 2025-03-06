import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			success: true,
		});
	} else {
		res.status(401).json({
			message: "Invalid email or password",
			success: false,
		});
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, password, email } = req.body;
	const userExists = await User.exists({ email });
	
	if (userExists) {
		return res.status(400).json({
			message: "User already exists",
			success: false,
		});
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			success: true,
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400).json({
			message: "Invalid user data",
			success: false,
		});
	}
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({
		message: "Logged out successfully",
		success: true,
	});
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await res.locals.user.populate("badges");

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			badges: user.badges,
			company: user.company,
		});
	} else {
		res.status(404).json({
			message: "User not found",
			success: false,
		});
	}
});

// @desc    Get any user's profile by ID
// @route   GET /api/users/profile/:id
// @access  Public
const getUserProfileById = expressAsyncHandler(async (req, res) => {
	// Added another route where any one can see a user's profile without needing login
	const user = await res.locals.user.populate("badges");

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			badges: user.badges,
			company: user.company,
		});
	} else {
		res.status(404).json({
			message: "User not found",
			success: false,
		});
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
	const user = res.locals.user;

	const { name, password } = req.body;

	if (name) user.name = name;
	if (password) user.password = password;

	const updatedUser = await user.save();

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
	});
});

export { authUser, getUserProfile, getUserProfileById, logoutUser, registerUser, updateUserProfile };
