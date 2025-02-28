import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        location: '',
        website: '',
        file: null
    });
    const { singleCompany } = useSelector(store => store.company)

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeEventListner = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const changeFileListner = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location); // Change made here
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            location: singleCompany.location || '',
            website: singleCompany.website || '',
            file: singleCompany.file || null,
        })
    }, [singleCompany])

    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="flex items-center justify-center">
                <div className="max-w-xl w-full mx-auto my-10">
                    <form onSubmit={submitHandler}>
                        <div className="flex items-center gap-5 p-8">
                            <Button onClick={() => { navigate('/admin/companies') }} variant="outLine" className="flex items-center gap-2 text-gray-500 font-semibold">
                                <ArrowLeft />
                                <span>Back</span>
                            </Button>
                            <h1 className="font-bold text-xl">Company Setup</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>Company Name</Label>
                                <Input type="text" name="name" value={input.name} onChange={changeEventListner} />
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input type="text" name="description" value={input.description} onChange={changeEventListner} />
                            </div>
                            <div>
                                <Label>Website</Label>
                                <Input type="text" name="website" value={input.website} onChange={changeEventListner} />
                            </div>
                            <div>
                                <Label>Location</Label>
                                <Input type="text" name="location" value={input.location} onChange={changeEventListner} />
                            </div>
                            <div>
                                <Label>Logo</Label>
                                <Input type="file" accept='image/*' onChange={changeFileListner} />
                            </div>
                        </div>
                        {
                            loading ? <Button type='submit' className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CompanySetup;

// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Button } from '../ui/button';
// import { ArrowLeft, Loader2 } from 'lucide-react';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import axios from 'axios';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'sonner';
// import { useSelector } from 'react-redux';
// import useGetCompanyById from '@/hooks/useGetCompanyById';

// const CompanySetup = () => {
//     const params = useParams();
//     useGetCompanyById(params.id);  // Ensure this fetches and updates Redux store

//     const [input, setInput] = useState({
//         name: '',
//         description: '',
//         location: '',
//         website: '',
//         file: null
//     });

//     const { singleCompany } = useSelector(store => store.company);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (singleCompany && Object.keys(singleCompany).length > 0) {
//             setInput({
//                 name: singleCompany.name || '',
//                 description: singleCompany.description || '',
//                 location: Array.isArray(singleCompany.location) ? singleCompany.location.join(', ') : singleCompany.location || '',
//                 website: singleCompany.website || '',
//                 file: null,  // File input cannot be prefilled
//             });
//         }
//     }, [singleCompany]);

//     const changeEventListner = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const changeFileListner = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', input.name);
//         formData.append('description', input.description);
//         formData.append('website', input.website);
//         formData.append('location', input.location.split(',').map(loc => loc.trim())); // Convert back to array
//         if (input.file) {
//             formData.append('file', input.file);
//         }

//         try {
//             setLoading(true);
//             const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/admin/companies');
//             }
//         } catch (error) {
//             console.error("Error updating company:", error);
//             toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col">
//             <Navbar />
//             <div className="flex items-center justify-center">
//                 <div className="max-w-xl w-full mx-auto my-10">
//                     <form onSubmit={submitHandler}>
//                         <div className="flex items-center gap-5 p-8">
//                             <Button onClick={() => navigate('/admin/companies')} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
//                                 <ArrowLeft />
//                                 <span>Back</span>
//                             </Button>
//                             <h1 className="font-bold text-xl">Company Setup</h1>
//                         </div>
//                         <div className="grid grid-cols-2 gap-2">
//                             <div>
//                                 <Label>Company Name</Label>
//                                 <Input type="text" name="name" value={input.name} onChange={changeEventListner} />
//                             </div>
//                             <div>
//                                 <Label>Description</Label>
//                                 <Input type="text" name="description" value={input.description} onChange={changeEventListner} />
//                             </div>
//                             <div>
//                                 <Label>Website</Label>
//                                 <Input type="text" name="website" value={input.website} onChange={changeEventListner} />
//                             </div>
//                             <div>
//                                 <Label>Location</Label>
//                                 <Input type="text" name="location" value={input.location} onChange={changeEventListner} />
//                             </div>
//                             <div>
//                                 <Label>Logo</Label>
//                                 <Input type="file" accept="image/*" onChange={changeFileListner} />
//                             </div>
//                         </div>
//                         {loading ? (
//                             <Button type="submit" className="w-full my-4">
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Please wait
//                             </Button>
//                         ) : (
//                             <Button type="submit" className="w-full my-4">Update</Button>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CompanySetup;
