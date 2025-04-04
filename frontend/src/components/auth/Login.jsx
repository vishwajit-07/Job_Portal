import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label.jsx'
import { Input } from '../ui/input.jsx'
import { RadioGroup } from '../ui/radio-group.jsx'
import { Button } from '../ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

function login() {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(setLoading(true));
  //     const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(res.data.success);
  //     if (res.data.success) {
  //       dispatch(setUser(res.data.user));
  //       navigate('/');
  //       toast.success(res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(setLoading(true));

  //     // const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   withCredentials: true,  // Ensures cookies are sent with the request
  //     // });
  //     const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     });

  //     if (res.status === 200 && res.data.success) {
  //       // Login success: dispatch user data and navigate to home
  //       dispatch(setUser(res.data.user));
  //       navigate('/');  // Navigate to home page
  //       toast.success(res.data.message);
  //     } else {
  //       // Handle unexpected responses that aren't considered errors by Axios
  //       toast.error(res.data.message || 'Unexpected response from server.');
  //     }
  //   } catch (error) {
  //     // Log the error for more insight
  //     console.error('Error during login:', error);

  //     if (error.response && error.response.data && error.response.data.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error('An unknown error occurred. Please try again later.');
  //     }
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevents the default form submission behavior (which refreshes the page)
    try {
      dispatch(setLoading(true));  // Start the loading state

      // API request to login endpoint
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,  // Sends cookies with the request if needed
      });

      // Check if login was successful
      if (res.status === 200 && res.data.success) {
        // Store user data in Redux
        dispatch(setUser(res.data.user));

        // Redirect user based on their role or default to home ('/')
        const redirectUrl = res.data.redirectUrl || '/';
        navigate(redirectUrl);  // Navigate to the appropriate page

        // Show success message
        toast.success(res.data.message);
      } else {
        // Handle unexpected responses
        toast.error(res.data.message || 'Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error during login:', error);

      // Display a more specific error if available
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unknown error occurred. Please try again later.');
      }
    } finally {
      dispatch(setLoading(false));  // Stop the loading state regardless of success or failure
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate('/'); // Navigate to home page if user is already logged in
  //   }
  // })

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleLogin} className='w-1/2 border border-grey-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email address"
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup defaultValue="student" className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer"></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer"></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="admin" checked={input.role === 'admin'} onChange={changeEventHandler} className="cursor-pointer"></Input>
                <Label htmlFor="r3">Admin</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
          }
          <span className='text-sm'>Alerady have an account? <Link to="/signup" className="text-blue-600">signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default login