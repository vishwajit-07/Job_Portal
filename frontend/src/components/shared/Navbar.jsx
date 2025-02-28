import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { User2, LogOut, Menu } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

function Navbar() {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success('Logged Out Successfully');
            }
        } catch (error) {
            console.error(error);
            toast(error.response.data.message);
        }
    }

    return (
        <div className='bg-white shadow-sm w-full'> {/* Removed fixed positioning */}
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/admin/companies'}>Companies</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/admin/jobs'}>Jobs</Link></li>
                                </>
                            ) : user && user.role === 'admin' ? (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/allUsers'}>All Users</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/allRecruiters'}>All Recruiters</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/'}>Home</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/jobs'}>Jobs</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/browse'}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication Buttons */}
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={'/login'}><Button className="px-4 py-2 border-2 border-[#6A38C2] text-[#6A38C2] rounded-full hover:bg-gray-100 hover:text-[#6A38C2]" variant="outline">Login</Button></Link>
                                <Link to={'/signup'}><Button className="px-4 py-2 text-white rounded-full transition ml-2 bg-[#6A38C2] hover:bg-[#582ba5]">SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer w-14 h-14 border-2 border-[#7209B7]">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user.role === 'recruiter' || user.role === 'admin' ? (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"><Link to={'/profile'}>View Profile</Link></Button>
                                                    </div>
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <LogOut />
                                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className='md:hidden flex flex-col gap-4 p-4 bg-white shadow-lg'>
                    {/* Mobile Menu Links */}
                    <ul className='flex flex-col font-medium gap-4'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/admin/companies'}>Companies</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/admin/jobs'}>Jobs</Link></li>
                                </>
                            ) : user && user.role === 'admin' ? (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/allUsers'}>All Users</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/allRecruiters'}>All Recruiters</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className='hover:text-[#7209B7]' to={'/'}>Home</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/jobs'}>Jobs</Link></li>
                                    <li><Link className='hover:text-[#7209B7]' to={'/browse'}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Mobile Authentication Buttons */}
                    <div className='w-full flex flex-col gap-2'>
                        {!user ? (
                            <>
                                <Link to={'/login'}><Button className="w-full">Login</Button></Link>
                                <Link to={'/signup'}><Button className="w-full bg-[#6A38C2] text-white">SignUp</Button></Link>
                            </>
                        ) : (
                            <Button onClick={logoutHandler} className="w-full bg-red-500 text-white">Logout</Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;