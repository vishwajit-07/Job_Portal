import axios from "axios";
import { setSavedJobs } from "./jobSlice";
import { toast } from "sonner"; // Notification library
import { JOB_API_END_POINT } from "@/utils/constant";


// Save a job
export const saveJob = (jobId) => async (dispatch) => {
    try {
        const res = await axios.post(`${JOB_API_END_POINT}/save-job/${jobId}`, {}, { withCredentials: true });
        if (res.data.success) {
            dispatch(getSavedJobs()); // Refresh saved jobs
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to save job");
    }
};

// Get all saved jobs
export const getSavedJobs = () => async (dispatch, getState) => {
    try {
        const { user } = getState().auth; // Get logged-in user from Redux state
        
        const res = await axios.get(`${JOB_API_END_POINT}/saved-jobs`, { withCredentials: true });
        
        if (res.data.success) {
            let savedJobs = res.data.savedJobs;

            // ✅ If user is logged in, filter only their saved jobs
            if (user) {
                savedJobs = savedJobs.filter(job => job.userId === user._id);
            }

            dispatch(setSavedJobs(savedJobs)); // Update Redux store
        }
    } catch (error) {
        console.error(error);
    }
};


// Remove a saved job
export const removeSavedJob = (jobId) => async (dispatch) => {
    try {
        const res = await axios.delete(`${JOB_API_END_POINT}/saved-job/${jobId}`, { withCredentials: true });
        if (res.data.success) {
            dispatch(getSavedJobs()); // Refresh saved jobs
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to remove saved job");
    }
};
