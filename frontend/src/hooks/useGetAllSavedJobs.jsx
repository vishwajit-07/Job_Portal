import { setSavedJobs } from "@/redux/jobSlice"; // Make sure you have this action in jobSlice
import { JOB_API_END_POINT } from "@/utils/constant"; // Define the endpoint for saved jobs
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// const useGetAllSavedJobs = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/saved-jobs`, { withCredentials: true });
//         if (res.data.success) {
//           dispatch(setAllSavedJobs(res.data.savedJobs)); // Ensure your API returns the saved jobs array
//         }
//       } catch (error) {
//         console.error("Error fetching saved jobs:", error);
//       }
//     };

//     fetchSavedJobs();
//   }, []); // Add dispatch as a dependency
// };

// export default useGetAllSavedJobs;
const useGetAllSavedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/saved-jobs`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, [dispatch]);  // Added dispatch dependency for best practices
};

export default useGetAllSavedJobs;
