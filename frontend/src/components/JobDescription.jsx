import { Badge } from './ui/badge.jsx';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant.js';
import Navbar from './shared/Navbar.jsx';
import { toast } from 'sonner';

function JobDescription() {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        if (!user) {
            toast.error("Please log in to apply for jobs");
            navigate('/login');
            return;
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...singleJob?.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updateSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='font-bold text-2xl sm:text-3xl'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant='ghost'>Positions: {singleJob?.position}</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209B7] font-bold'} variant='ghost'>Salary: {singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    
                    {/* Apply Button */}
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        className={`rounded-lg w-full sm:w-auto ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209B7] hover:bg-[#5FC2AD]'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}.</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements}.</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} Years.</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA.</span></h1>
                    <h1 className='font-bold my-1'>Total Applications: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </>
    );
}

export default JobDescription;