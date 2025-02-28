import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar.jsx';
import FilterCard from './FilterCard.jsx';
import Job from './Job.jsx';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import { motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import { Menu } from 'lucide-react'; // Import the filter icon

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs || []);
    const [debouncedQuery] = useDebounce(searchedQuery, 300);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State for mobile filter visibility

    useEffect(() => {
        const now = new Date();
        // Filter logic for search query & expired jobs
        const filteredJobs = allJobs.filter((job) => {
            // Convert endDate to Date object & add 24 hours
            const jobEndDate = new Date(job?.endDate);
            jobEndDate.setHours(jobEndDate.getHours() + 24);
            // Hide jobs that expired 24+ hours ago
            if (now > jobEndDate) {
                return false;
            }
            // Normalize search query
            const normalizedQuery = typeof debouncedQuery === 'string' ? debouncedQuery.toLowerCase() : '';
            // Check if job matches search criteria
            return (
                job.title.toLowerCase().includes(normalizedQuery) ||
                job.description.toLowerCase().includes(normalizedQuery) ||
                (Array.isArray(job.location) &&
                    job.location.some(loc => loc.toLowerCase().includes(normalizedQuery))) ||
                job.salary.toString().toLowerCase().includes(normalizedQuery) ||
                job.company?.name.toLowerCase().includes(normalizedQuery)
            );
        });

        setFilterJobs(filteredJobs);
    }, [allJobs, debouncedQuery]);

    return (
        <div className='bg-[rgb(250,250,250)]'>
            <Navbar />
            <div className='flex gap-5'>
                {/* Filter Toggle Button (Mobile Only) */}
                <button
                    className={`fixed top-16 z-50 p-2 bg-[#6A38C2] text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out ${
                        isFilterOpen ? 'translate-x-64' : 'translate-x-0'
                    } md:hidden`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <Menu size={24} /> {/* Filter icon */}
                </button>

                {/* Filter Card (Left Side) */}
                <div
                    className={`fixed md:static w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                        isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
                >
                    <FilterCard />
                </div>

                {/* Job List (Right Side) */}
                <div className='flex-1 h-[88vh] overflow-y-auto pb-5 mt-12 md:mt-0'> {/* Added mt-20 for mobile spacing */}
                    {
                        filterJobs.length === 0 ? (
                            <div aria-live="polite" className="text-gray-500 text-xl">
                                No jobs found. Try refining your filters or search query.
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {filterJobs.map((job, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;