import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.id;  // Logged-in user's ID from middleware

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required!",
                success: false,
            });
        }

        // Check if the logged-in user is an admin (optional, based on your app's logic)
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied! Only admins can view this data.",
                success: false,
            });
        }

        // Fetch all users with role 'student'
        const allUsers = await User.find({ role: 'student' }).sort({ createdAt: -1 });

        if (!allUsers.length) {
            return res.status(404).json({
                message: "No Users found!",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            allUsers,  // Send list of students
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};



export const getAllRecruiters = async (req, res) => {
    try {
        const userId = req.id;  // Logged-in user's ID from middleware

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required!",
                success: false,
            });
        }

        // Check if the logged-in user is an admin (optional, based on your app's logic)
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied! Only admins can view this data.",
                success: false,
            });
        }

        // Fetch all users with role 'recruiters'
        const allRecruiters = await User.find({ role: 'recruiter' })
        .populate({
            path: 'companies',       // Path to populate (assuming virtual field)
            model: 'Company',        // The Company model to reference
            select: 'name', // Only fetch company name and industry
        })
        .sort({ createdAt: -1 });

        if (!allRecruiters.length) {
            return res.status(404).json({
                message: "No recruiters found!",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            allRecruiters,  // Send list of students
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};

// Toggle Recruiter Suspension Status
export const toggleRecruiterStatus = async (req, res) => {
    try {
        const { recruiterId } = req.params;

        // Find the recruiter
        const recruiter = await User.findById(recruiterId);

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found.", success: false });
        }

        // Toggle the suspended status
        recruiter.suspended = !recruiter.suspended;
        await recruiter.save();

        return res.status(200).json({
            message: `Recruiter has been ${recruiter.suspended ? 'suspended' : 'unsuspended'} successfully.`,
            success: true,
            suspended: recruiter.suspended  // Send back the new status
        });
    } catch (error) {
        console.error("Error toggling recruiter status:", error);
        return res.status(500).json({ message: "Error toggling recruiter status.", success: false });
    }
};


// Backend API: toggleUserStatus
export const toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        // Toggle the suspended status
        user.suspended = !user.suspended;
        await user.save();

        return res.status(200).json({
            message: `User has been ${user.suspended ? 'suspended' : 'unsuspended'} successfully.`,
            success: true,
            suspended: user.suspended
        });
    } catch (error) {
        console.error("Error toggling user status:", error);
        return res.status(500).json({ message: "Error toggling user status.", success: false });
    }
};

