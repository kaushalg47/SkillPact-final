import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

const registerCompany = asyncHandler(async (req, res) => {
	try {
		const { name, description, website, location, logo } = req.body;
		const user = req.user;

		// If company defined then we can't register more than one company
		if (user.company) {
			return res.status(400).json({
				message: "You can't register more than 1 company",
				success: false,
			});
		}

		const companyExists = await Company.exists({ name: name.trim() }).lean();

		// If company already exists then we can't register the same company
		if (companyExists) {
			return res.status(400).json({
				message: "You can't register the same company.",
				success: false,
			});
		}

		const companyInfo = {
			name: name.trim(),
			description: description?.trim(),
			website: website?.trim(),
			location: location?.trim(),
			logo,
			userId: user._id,
			status: "pending",
		};

		// Create a new company
		const company = new Company(companyInfo);
		user.set({ company: company._id });

		await Promise.all([company.save(), user.save()]);

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
		const company = res.locals.company;

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
		const company = res.locals.company;

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
		const company = res.locals.company;
		const { name, description, website, location, logo } = req.body;

		if (name) company.name = name.trim();
		if (description) company.description = description.trim();
		if (website) company.website = website.trim();
		if (location) company.location = location.trim();
		if (logo) company.logo = logo;

		await company.save();

		return res.status(200).json({
			message: "Company information updated.",
			company: company,
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
