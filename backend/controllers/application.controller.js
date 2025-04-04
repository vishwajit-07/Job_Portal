import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) =>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        // Check if the user is logged in
        if (!userId) {
            return res.status(401).json({
                message: "Please log in to apply for jobs",
                success: false
            });
        }

        if(!jobId){
            return res.status(400).json({
                message: "Invalid job ID",
                success: false
            });
        }
        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };
        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Application submitted successfully!",
            // application: newApplication,
            success: true
        });
        } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
      const userId = req.id;
      const userRole = req.role;
  
      let application;
  
      if (userRole === "admin") {
        // ✅ Admin: fetch all applications
        application = await Application.find({})
          .sort({ createdAt: -1 })
          .populate({
            path: "job",
            populate: {
              path: "company",
            },
          });
      } else {
        // ✅ Student/Recruiter: fetch their applications only
        application = await Application.find({ applicant: userId })
          .sort({ createdAt: -1 })
          .populate({
            path: "job",
            populate: {
              path: "company",
            },
          });
      }
  
      if (!application || application.length === 0) {
        return res.status(404).json({
          message: "No Applications found!",
          success: false,
        });
      }
  
      return res.status(200).json({
        application,
        success: true,
      });
    } catch (error) {
      console.log("Error fetching applied jobs:", error.message);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message,
      });
    }
  };
  
// export const getAppliedJobs = async (req,res) =>{
//     try {
//         const userId = req.id;
//         const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
//             path:"job",
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:"company",
//                 options:{sort:{createdAt:-1}}
//             }
//         });
//         if(!application){
//             return res.status(404).json({
//                 message: "No Applications found!",
//                 success:false
//             });
//         }
//         return res.status(200).json({
//             application,
//             success:true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const getAppliedJobs = async (req, res) => {
//     try {
//         // Ensure req.user is correctly set
//         if (!req.user || !req.user.id) {
//             return res.status(401).json({
//                 message: "Please log in to view applied jobs",
//                 success: false
//             });
//         }

//         const userId = req.user.id;  // ✅ Use req.user.id

//         const application = await Application.find({ applicant: userId })
//             .sort({ createdAt: -1 })
//             .populate({
//                 path: "job",
//                 populate: {
//                     path: "company",
//                     options: { sort: { createdAt: -1 } }
//                 }
//             });

//         // ✅ Check if applications exist (application is an array, not null)
//         if (application.length === 0) {
//             return res.status(404).json({
//                 message: "No applications found!",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             application,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error fetching applied jobs:", error.message);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false,
//             error: error.message
//         });
//     }
// };


//Admin dekhega kitna user ne apply kiya hai
// export const getApplicants = async (req,res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:"applications",
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:"applicant"
//             }
//         });
//         if(!job){
//             return res.status(404).json({
//                 message: "Applicant not found",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             job,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
export const getApplicants = async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path: "applications",
          options: { sort: { createdAt: -1 } },
          populate: {
              path: "applicant"
          }
      });
      // Debugging log
      console.log("Job retrieved from DB:", job);
      if (!job) {
          return res.status(404).json({
              message: "Applicant not found",
              success: false
          });
      };
  
      // Log the populated job
      console.log(job);
  
      return res.status(200).json({
          job,
          success: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  
//   export const updateStatus = async (req, res) => {
//       try {
//           const { status } = req.body;
//           const applicationId = req.params.id;
  
//           // Validate input
//           if (!status) {
//               return res.status(400).json({ success: false, message: "Invalid status" });
//           }
  
//           // Find application by ID
//           const application = await Application.findById(applicationId);
//           if (!application) {
//               return res.status(404).json({ success: false, message: "Application not found" });
//           }
  
//           // Update status
//           application.status = status.toLowerCase();
//           await application.save();
  
//           return res.status(200).json({ success: true, message: "Status updated successfully!", application });
//       } catch (error) {
//           console.error("Error updating status:", error);
//           return res.status(500).json({ success: false, message: "Internal Server Error" });
//       }
//   };
  
export const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate input
      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }
  
      // Find application
      const application = await Application.findById(id);
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      // Update status
      application.status = status;
      await application.save();
  
      return res.status(200).json({ success: true, message: "Application status updated successfully", application });
    } catch (error) {
      console.error("Error updating status:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };