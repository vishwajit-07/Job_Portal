// import React, { useEffect } from 'react'
// import Navbar from '../shared/Navbar'
// import ApplicantsTable from './ApplicantsTable'
// import axios from 'axios'
// import { APPLICATION_API_END_POINT } from '@/utils/constant'
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAllApplicants } from '@/redux/applicantSlice'

// const Applicants = () => {
//   useEffect(() => {
//     const fetchAllApplicants = async () => {
//       try {
//         const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
//         console.log("API response:", res.data);
//         dispatch(setAllApplicants(res.data.job));

//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchAllApplicants();
//   }, []);
//   const params = useParams();
//   const { applicants } = useSelector(store => store.application);
//   const dispatch = useDispatch();


//   return (
//     <div>
//       <Navbar />
//       <div className='max-w-7xl mx-auto'>
//         <h1 className='font-bold text-xl'>Total Applicants <b className='text-red-600'>{applicants?.applications?.length}</b></h1>
//         <ApplicantsTable />
//       </div>
//     </div>
//   )
// }

// export default Applicants

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicantSlice';

const Applicants = () => {
  const [loading, setLoading] = useState(true);  // Add loading state
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        console.log("API response:", res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    }
    fetchAllApplicants();
  }, [params.id, dispatch]);  // Add params.id and dispatch as dependencies

  if (loading) {
    return (

      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div> // Tailwind spinner

    );
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl'>
          Total Applicants <b className='text-red-600'>{applicants?.applications?.length}</b>
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
