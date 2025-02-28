// controllers/filterController.js
import Job from '../models/Job'; // Adjust path as needed

export const getFilters = async (req, res) => {
    try {
        // Fetch distinct locations and industries from the Job collection
        const locations = await Job.distinct('location');
        const industries = await Job.distinct('industry');

        return res.status(200).json({
            success: true,
            locations,
            industries
        });
    } catch (error) {
        console.error("Error fetching filters:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
