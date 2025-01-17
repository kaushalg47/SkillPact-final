import asyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';

const registerCompany = asyncHandler(async (req, res) => {
  try {
    const { companyName } = req.body;

    // Validate the company name
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if the company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create a new company
    company = await Company.create({
      name: companyName,
      userId: req.user._id, // Ensure `req.id` is correctly set by isAuthenticated
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
});

const userCompany = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
        return res.status(404).json({
            message: "Companies not found.",
            success: false
        })
    }
    return res.status(200).json({
        companies,
        success:true
    })
} catch (error) {
    console.log(error);
}
});

const infoCompany = asyncHandler(async (req, res) => {
  try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
});

const updateCompany = asyncHandler(async (req, res) => {
  try {
      const { name, description, website, location } = req.body;

  
      const updateData = { name, description, website, location};

      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      return res.status(200).json({
          message:"Company information updated.",
          success:true
      })

  } catch (error) {
      console.log(error);
  }
});

export {
  registerCompany,
  userCompany,
  infoCompany,
  updateCompany,
};