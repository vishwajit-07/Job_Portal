import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge.jsx'
import { Label } from './ui/label.jsx'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialogue from './UpdateProfileDialogue'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'
import useGetAllSavedJobs from '@/hooks/useGetAllSavedJobs'
import SavedJobTable from './SavedJobTable'

const Profile = () => {
    useGetAllAppliedJobs();
    useGetAllSavedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const isResume = true;
    return (
        <div>
            <Navbar />
            <h1 className='text-3xl text-gray-500 mx-44 font-bold my-5'>Profile Setup /</h1>
            <div className='max-w-4xl  mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage className="w-24 h-24 rounded-full object-cover" src={user?.profile?.profilePhoto} alt='profile' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className='text-right' variant="outline" onClick={() => setOpen(true)} ><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='my-2'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>N.A</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>N.A</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='my-5 font-bold text-[#7209B7] text-lg'>All Applied Jobs :-</h1>
                <AppliedJobTable />
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='my-5 font-bold text-green-600 text-lg'>All Saved Jobs :-</h1>
                <SavedJobTable />
            </div>
            <UpdateProfileDialogue open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
