import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'content-type': 'application/json'
                },
                withCredentials: true,  // Ensure cookies are sent with the request
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p>What would like to give your company name? You can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input type='text'
                    className='my-2'
                    placeholder='JobHunt, Microsoft, etc.'
                    onChange={(e) => { setCompanyName(e.target.value) }} />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate

// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { setSingleCompany } from '@/redux/companySlice'
// import { toast } from 'sonner'

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [companyName, setCompanyName] = useState(''); // ✅ Fixed uncontrolled input issue
//     const [loading, setLoading] = useState(false);

//     const registerCompany = async () => {
//         if (!companyName.trim()) {
//             toast.error("Company name is required!");
//             return;
//         }

//         try {
//             setLoading(true);
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
//                 headers: { 'content-type': 'application/json' },
//                 withCredentials: true,
//             });

//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.error("Error registering company:", error);
//             toast.error(error.response?.data?.message || "Something went wrong, please try again");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto'>
//                 <div className='my-10'>
//                     <h1 className='font-bold text-2xl'>Your Company Name</h1>
//                     <p>What would you like to name your company? You can change this later.</p>
//                 </div>
//                 <Label>Company Name</Label>
//                 <Input
//                     type='text'
//                     className='my-2'
//                     placeholder='JobHunt, Microsoft, etc.'
//                     value={companyName} // ✅ Prevents uncontrolled input issue
//                     onChange={(e) => setCompanyName(e.target.value)}
//                 />
//                 <div className='flex items-center gap-2 my-10'>
//                     <Button variant='outline' onClick={() => navigate('/admin/companies')}>
//                         Cancel
//                     </Button>
//                     <Button onClick={registerCompany} disabled={!companyName.trim() || loading}>
//                         {loading ? "Please wait..." : "Continue"}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CompanyCreate;
