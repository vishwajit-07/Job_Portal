// routes/filterRoutes.js
import express from 'express';
const router = express.Router();
const { getFilters } = require('../controllers/filterController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Optional: If authentication is required

router.get('/filters', verifyToken, getFilters); // Add verifyToken if authentication is needed

export default router;
