import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJob, getAllJobs, getJobById, postJob, saveJob, getSavedJobs, removeSavedJob, deleteJob} from '../controllers/job.controller.js';
const router = express.Router();


router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminJob);
router.route("/get/:id").get(getJobById);

router.route("/save-job/:id").post(isAuthenticated, saveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);
router.route("/saved-job/:id").delete(isAuthenticated, removeSavedJob);
router.route("/deletejob/:id").delete(isAuthenticated, deleteJob);
export default router;