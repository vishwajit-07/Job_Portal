import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Menu, LogOut, User2 } from 'lucide-react';

import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth, shallowEqual);
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
            toast.error(error?.response?.data?.message || 'Logout failed');
        }
    };

    const userProfilePhoto = useMemo(() => user?.profile?.profilePhoto, [user]);
    const userName = useMemo(() => user?.fullname, [user]);

    return (
        <div className='bg-white shadow-sm w-full'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                {/* Logo */}
                <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-12'>
                    <DesktopNav user={user} />

                    {/* Auth Buttons */}
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <Button variant="outline" className="px-4 py-2 border-2 border-[#6A38C2] text-[#6A38C2] rounded-full hover:bg-gray-100">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="px-4 py-2 text-white rounded-full transition ml-2 bg-[#6A38C2] hover:bg-[#582ba5]">
                                    SignUp
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-14 h-14 border-2 border-[#7209B7]">
                                    <AvatarImage src={userProfilePhoto} alt="Profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-4">
                                    <Avatar><AvatarImage src={userProfilePhoto} alt="Profile" /></Avatar>
                                    <div>
                                        <h4 className='font-medium'>{userName}</h4>
                                        <p className='text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    {user.role !== 'student' && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    )}
                                    {user.role === 'student' && (
                                        <>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className='md:hidden'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && <MobileMenu user={user} onLogout={logoutHandler} />}
        </div>
    );
};

// ✅ Desktop Navigation Menu
const DesktopNav = ({ user }) => {
    if (!user) {
        return (
            <ul className='flex font-medium items-center gap-5'>
                <li><Link className='hover:text-[#7209B7]' to="/">Home</Link></li>
                <li><Link className='hover:text-[#7209B7]' to="/jobs">Jobs</Link></li>
                <li><Link className='hover:text-[#7209B7]' to="/browse">Browse</Link></li>
            </ul>
        );
    }

    if (user.role === 'recruiter') {
        return (
            <ul className='flex font-medium items-center gap-5'>
                <li><Link className='hover:text-[#7209B7]' to="/admin/companies">Companies</Link></li>
                <li><Link className='hover:text-[#7209B7]' to="/admin/jobs">Jobs</Link></li>
            </ul>
        );
    }

    if (user.role === 'admin') {
        return (
            <ul className='flex font-medium items-center gap-5'>
                <li><Link className='hover:text-[#7209B7]' to="/dashboard">Dashboard</Link></li>
                <li><Link className='hover:text-[#7209B7]' to="/allUsers">All Users</Link></li>
                <li><Link className='hover:text-[#7209B7]' to="/allRecruiters">All Recruiters</Link></li>
            </ul>
        );
    }

    return null;
};

// ✅ Mobile Navigation Menu
const MobileMenu = ({ user, onLogout }) => {
    return (
        <div className='md:hidden flex flex-col gap-4 p-4 bg-white shadow-lg'>
            <ul className='flex flex-col font-medium gap-4'>
                {
                    user && user.role === 'recruiter' ? (
                        <>
                            <li><Link className='hover:text-[#7209B7]' to="/admin/companies">Companies</Link></li>
                            <li><Link className='hover:text-[#7209B7]' to="/admin/jobs">Jobs</Link></li>
                        </>
                    ) : user && user.role === 'admin' ? (
                        <>
                            <li><Link className='hover:text-[#7209B7]' to="/dashboard">Dashboard</Link></li>
                            <li><Link className='hover:text-[#7209B7]' to="/allUsers">All Users</Link></li>
                            <li><Link className='hover:text-[#7209B7]' to="/allRecruiters">All Recruiters</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link className='hover:text-[#7209B7]' to="/">Home</Link></li>
                            <li><Link className='hover:text-[#7209B7]' to="/jobs">Jobs</Link></li>
                            <li><Link className='hover:text-[#7209B7]' to="/browse">Browse</Link></li>
                        </>
                    )
                }
            </ul>

            {/* Mobile Auth Buttons */}
            <div className='w-full flex flex-col gap-2'>
                {!user ? (
                    <>
                        <Link to="/login"><Button className="w-full">Login</Button></Link>
                        <Link to="/signup"><Button className="w-full bg-[#6A38C2] text-white">SignUp</Button></Link>
                    </>
                ) : (
                    <Button onClick={onLogout} className="w-full bg-red-500 text-white">Logout</Button>
                )}
            </div>
        </div>
    );
};

export default React.memo(Navbar);
