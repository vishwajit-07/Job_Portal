import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar.jsx';
import HeroSection from './HeroSection.jsx';
import CategoryCarousel from './CategoryCarousel.jsx';
import LatestJob from './LatestJob.jsx';
import Footer from './Footer.jsx';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import { useSelector } from 'react-redux';

function Home() {
  useGetAllJobs();
  
  return (
    <div className='bg-[rgb(250,250,250)]'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </div>
  );
}

export default Home;