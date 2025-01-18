import asyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';

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
    console.log(companyInfo)

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

    // Create a new company
    company = await Company.create({
      ...companyInfo,
      userId: req.user._id, // Use req.user._id instead of req.id
    });

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
    const companies = await Company.find({ userId });

    if (!companies || companies.length == 0) {
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
    console.log("Error fetching user company", error);
    return res.status(500).json({
      message: "Can't fetch company data",
      success: false,
    });
  }
});

const infoCompany = asyncHandler(async (req, res) => {
  try {
        const companyId = req.params.id;  // Company id is being passed in params not in query
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

      const company = await Company.findById(req.params.id);

      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      
      if (req.user._id.toString() !== company.userId.toString()) {
        return res.status(403).json({
          message: "Cannot update the company, Unauthorized",
          success: false,
        })
      }

      const { companyInfo } = req.body;

      if (!companyInfo) {
        return res.status(400).json({
          message: "CompanyInfo is required.",
          success: false,
        });
      }
      
      const updatedCompany = await Company.findByIdAndUpdate(req.params.id, companyInfo, { new: true, runValidators: true });  // Company information should be passed in parameters to maintain consistency
      // Validations in schema set to true
      console.log(updatedCompany);

      return res.status(200).json({
          message:"Company information updated.",
          company: updatedCompany,
          success:true,
      })

  } catch (error) {
    console.log("Company update failed: ", error);
    return res.status(500).json({
      message: "Company update failed",
      success: false,
    });
  }
});

export {
  infoCompany, registerCompany, updateCompany, userCompany
};

