import { Company } from '../models/company.model.js'
import getDataUri from '../utils/dataURI.js';
import cloudinary from '../utils/cloudinary.js';
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location  } = req.body;
        if (!companyName && !description && !website && !location) { 
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company with this name already exists!",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            description: description,
            website: website,
            location: location,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully!",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



// In company.controller.js
// export const registerCompany = async (req, res) => {
//     try {
//         const { companyName, description, website, location  } = req.body;
//         if (!companyName || !description || !website || !location) { 
//             return res.status(400).json({
//                 message: "Something is missing!",
//                 success: false
//             });
//         }

//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(400).json({
//                 message: "Company with this name already exists!",
//                 success: false
//             });
//         }

//         company = await Company.create({
//             name: companyName,
//             description,
//             website,
//             location,
//             userId: req.id  // Ensure req.id is valid, coming from authenticated session
//         });

//         return res.status(201).json({
//             message: "Company registered successfully!",
//             company,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// }

// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.user?.id;

//         if (!userId) {
//             return res.status(400).json({
//                 message: "User ID is required!",
//                 success: false,
//             });
//         }


//         const companies = await Company.find({ userId });

//         if (!companies || companies.length === 0) {
//             return res.status(404).json({
//                 message: "No companies found!",
//                 success: false,
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             companies,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message,
//         });
//     }
// };
// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id;  // Access the ID directly from req

//         if (!userId) {
//             return res.status(400).json({
//                 message: "User ID is required!",
//                 success: false,
//             });
//         }

//         const companies = await Company.find({ userId });

//         if (!companies || companies.length === 0) {
//             return res.status(404).json({
//                 message: "No companies found!",
//                 success: false,
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             companies,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message,
//         });
//     }
// };
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // Logged-in user's ID from middleware
        
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required!",
                success: false,
            });
        }

        const companies = await Company.find({ userId }).sort({ createdAt: -1 });

        if (!companies) {
            return res.status(400).json({
                message: "No companies found!",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            companies,  // Send user's companies
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};






// export const getCompanyById = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);
//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found!",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // ✅ Validate if companyId is a valid ObjectId
        if (!mongoose.isValidObjectId(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format!",
                success: false
            });
        }

        // ✅ Fetch the company & optionally populate user info
        const company = await Company.findById(companyId).populate("userId", "name email");

        // ✅ Handle case where company is not found
        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }

        // ✅ Return the company data
        return res.status(200).json({
            success: true,
            company
        });

    } catch (error) {
        console.error("Error fetching company:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};


// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
//         const file = req.file;
//         let locationArray;
//         if(location){ locationArray = location.split(',');}
//         //cloud innery
//         const fileURI = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
//         const logo = cloudResponse.secure_url;
//         const updateData = { name, description, website, location, logo };
//         let company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found!",
//                 success: false
//             })
//         }
//         // updating data
//         if(name) {company.companyName = name;}
//         if(description) {company.description = description;}
//         if(website) {company.website = website;}        
//         if(location) {company.location = locationArray;}
       
//         //resume comes later here...

//         await company.save();

//         company = {
//             _id:company._id,
//             companyName:company.companyName,
//             description:company.email,
//             website:company.website,
//             location:company.location,
//         }

//         return res.status(200).json({
//             message: "Company information updated successfully!",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        let locationArray = location ? location.split(',') : undefined;
        let updateData = { name, description, website, location: locationArray };

        // ✅ Handle file upload only if a new logo is provided
        if (req.file) {
            const fileURI = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
            updateData.logo = cloudResponse.secure_url;
        }

        // ✅ Find and update the company in one step
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully!",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
