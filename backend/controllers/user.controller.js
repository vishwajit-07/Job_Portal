import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/dataURI.js';
import cloudinary from '../utils/cloudinary.js';
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, role, password } = req.body;
        if (!fullname || !email || !phoneNumber || !role || !password) {
            return res.status(404).json({
                message: "Somthing is missing",
                success: false
            });
        };
        const file = req.file;
        const fileURI = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({
                message: "User with this email id already exists",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "Account is created successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Somthing is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password",
//                 success: false
//             });
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password",
//                 success: false
//             });
//         }
//         //check role is correct or not 
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account does not exists",
//                 success: false
//             });
//         }
//         const tokenData = {
//             userId: user._id
//         }
//         const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }
//         return res.status(200).cookie("token", token, {
//             maxAge: 1 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             sameSite: 'strict'
//         }).json({
//             message: `Welcome back ${user.fullname}`,
//             success: true,
//             user: {
//                 _id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 role: user.role,
//                 profile: user.profile
//             }
//         });
//         // return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
//         //     message:`Welcome back ${user.fullname}`,
//         //     success:true,
//         // })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;

//         // Validate required fields
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Email, password, and role are required.",
//                 success: false
//             });
//         }

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false
//             });
//         }

//         // Verify password
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false
//             });
//         }

//         // Validate role
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account does not exist for the specified role.",
//                 success: false
//             });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: user._id, role: user.role },
//             process.env.SECRET_KEY,
//             { expiresIn: '1d' }
//         );

//         // Determine redirect URL based on role
//         const roleRedirects = {
//             admin: '/allUsers',
//             recruiter: '/admin/companies',
//             student: '/'
//         };

//         const redirectUrl = roleRedirects[user.role];

//         if (!redirectUrl) {
//             return res.status(400).json({
//                 message: "Invalid role specified.",
//                 success: false
//             });
//         }

//         // Prepare user data to send in response
//         const userData = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         // Send token in HTTP-only cookie and respond with redirect URL
//         return res.status(200).cookie("token", token, {
//             maxAge: 24 * 60 * 60 * 1000,  // 1 day
//             httpOnly: true,
//             sameSite: 'strict'
//         }).json({
//             message: `Welcome back, ${user.fullname}!`,
//             success: true,
//             user: userData,
//             redirectUrl: redirectUrl
//         });

//     } catch (error) {
//         console.error("Login Error:", error);
//         return res.status(500).json({
//             message: "Internal server error. Please try again later.",
//             success: false
//         });
//     }
// };

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password, and role are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if user is suspended
        if (user.suspended) {
            return res.status(403).json({
                message: "Your account has been suspended by the admin.",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist for the specified role.",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        const roleRedirects = {
            admin: '/allUsers',
            recruiter: '/admin/companies',
            student: '/'
        };

        const redirectUrl = roleRedirects[user.role];

        if (!redirectUrl) {
            return res.status(400).json({
                message: "Invalid role specified.",
                success: false
            });
        }

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back, ${user.fullname}!`,
            success: true,
            user: userData,
            redirectUrl: redirectUrl
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        });
    }
};



export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
            success: true
        })
    } catch {
        console.log(error);
    }
}
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file;
//         //cloud unary
//         const fileURI = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
        
//         let skillsArray;
//         if (skills) { skillsArray = skills.split(','); }
//         const userId = req.id; //middleware authentication
//         let user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found!",
//                 success: false
//             });
//         };

//         // updating data
//         if (fullname) { user.fullname = fullname; }
//         if (email) { user.email = email; }
//         if (phoneNumber) { user.phoneNumber = phoneNumber; }
//         if (bio) { user.profile.bio = bio; }
//         if (skills) { user.profile.skills = skillsArray; }

//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url;//save the cloudinary URL
//             user.profile.resumeOriginalName = file.originalname;
//         }
//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }
//         return res.status(200).json({
//             message: "Profile updated successfully!",
//             user: {
//                 _id: user._id,
//                 fullname: user.fullname,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 role: user.role,
//                 profile: user.profile
//             },
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//         console.error("Upload failed:", error);
//     }
// }
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let cloudResponse;
        if (file) {
            const fileURI = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileURI.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }

        const userId = req.id; // Middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            });
        }

        // Updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        // Only update resume if a file was uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // Only access if file is defined
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully!",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false
        });
    }
};

