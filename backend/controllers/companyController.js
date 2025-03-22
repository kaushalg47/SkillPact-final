import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

// TODO: SCHEMA VALIDATION
const registerCompany = asyncHandler(async (req, res) => {
	try {
		/*
    IMP - COMPANY INFO TO BE PASSED AS JS OBJECT
    companyInfo[name] = <Name>
    companyInfo[description] = <description>
    ...

    OR 

    companyInfo = {
       name: <Name>
       description: <Description>
    } 
    */

		const { companyInfo } = req.body;
		console.log(companyInfo);

		// Validate the company name
		if (!companyInfo) {
			return res.status(400).json({
				message: "Company is required.",
				success: false,
			});
		}

		// Check if the company already exists
		let company = await Company.findOne({ name: companyInfo.name });
		if (company) {
			return res.status(400).json({
				message: "You can't register the same company.",
				success: false,
			});
		}

		// While making company it has to be saved in user's company
		const userId = req.user._id;
		const user = await User.findById(userId);
		console.log("USER BEFORE REGISTRATION:", user);
		console.log("USER.COMPANY:", user.company);

		// If company defined then we can't register more than one company
		if (user.company) {
			return res.status(400).json({
				message: "You can't register more than 1 company",
				success: false,
			});
		} else {
			// Create a new company
			company = await Company.create({
				...companyInfo,
				userId: req.user._id,
			});

			user.company = company;
			await user.save();
		}

		return res.status(201).json({
			message: "Company registered successfully.",
			company,
			success: true,
		});
	} catch (error) {
		console.error("Error registering company: ", error);
		return res.status(500).json({
			message: "Company registration failed",
			success: false,
		});
	}
});

const userCompany = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id; // logged in user id
		const company = await Company.findOne({ userId });

		console.log(company);

		if (!company) {
			return res.status(404).json({
				message: "Companies not found.",
				success: false,
			});
		}
		return res.status(200).json({
			company,
			success: true,
		});
	} catch (error) {
		console.log("Error fetching user company", error);
		return res.status(500).json({
			message: "Can't fetch company data",
			success: false,
		});
	}
});

const infoCompany = asyncHandler(async (req, res) => {
	try {
		const companyId = req.params.compId;
		const company = await Company.findById(companyId);
		if (!company) {
			return res.status(404).json({
				message: "Company not found.",
				success: false,
			});
		}
		return res.status(200).json({
			company,
			success: true,
		});
	} catch (error) {
		console.log("Error getting company info: ", error);
		return res.status(500).json({
			message: "Can't fetch company data",
			success: false,
		});
	}
});

const updateCompany = asyncHandler(async (req, res) => {
	try {
		/* 
    COMPANY INFO TO BE PASSED AS JS OBJECT
    companyInfo[name] = <Name>
    companyInfo[description] = <description>
    ...

    OR 

    companyInfo = {
       name: <Name>
       description: <Description>
    } 
    */

		const company = await Company.findById(req.params.compId);

		if (!company) {
			return res.status(404).json({
				message: "Company not found.",
				success: false,
			});
		}

		const isOwner = company.userId.toString() == req.user._id.toString();

		if (!isOwner) {
			return res.status(401).json({
				message: "Unauthorized",
				success: false,
			});
		}

		if (req.user._id.toString() !== company.userId.toString()) {
			return res.status(403).json({
				message: "Cannot update the company, Unauthorized",
				success: false,
			});
		}

		const { companyInfo } = req.body;

		console.log(req.body);

		if (!companyInfo) {
			return res.status(400).json({
				message: "CompanyInfo is required.",
				success: false,
			});
		}

		const updatedCompany = await Company.findByIdAndUpdate(req.params.compId, companyInfo, {
			new: true,
			runValidators: true,
		});
		console.log(updatedCompany);

		return res.status(200).json({
			message: "Company information updated.",
			company: updatedCompany,
			success: true,
		});
	} catch (error) {
		console.log("Company update failed: ", error);
		return res.status(500).json({
			message: "Company update failed",
			success: false,
		});
	}
});

export { infoCompany, registerCompany, updateCompany, userCompany };