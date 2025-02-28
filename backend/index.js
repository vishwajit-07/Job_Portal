import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
import webadminRoute from './routes/webAdmin.route.js';
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Add parentheses to call the function
app.use(express.urlencoded({ extended: true })); // Same here
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);
app.use('/api/v1/webadmin', webadminRoute);

// Start the server
app.listen(PORT, () => {
    connectDB(); // Ensure the DB connection is successful
    console.log(`Server running successfully on ${PORT}`);
});
