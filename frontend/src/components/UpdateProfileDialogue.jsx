import React, { useState } from 'react'
import { DialogTitle, Dialog, DialogContent, DialogHeader, DialogFooter } from './ui/dialog.jsx'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from './ui/button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js'
import { setUser } from '@/redux/authSlice.js'

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });

    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="max-w-425px">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="fullname" type="text" onChange={changeEventHandler} className="col-span-3" value={input.fullname} name="fullname"></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" type='email' onChange={changeEventHandler} className="col-span-3" value={input.email} name="email"></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Phone Number</Label>
                                <Input id="phoneNumber" onChange={changeEventHandler} className="col-span-3" value={input.phoneNumber} name="phoneNumber"></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input id="bio" onChange={changeEventHandler} className="col-span-3" value={input.bio} name="bio"></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input id="skills" onChange={changeEventHandler} className="col-span-3" value={input.skills} name="skills"></Input>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="resume" className="text-right">Resume</Label>
                                <Input id="resume" onChange={changeFileHandler} type='file' accept="application/pdf" className="col-span-3" name="resume"></Input>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default UpdateProfileDialogue