import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home.jsx'
import Login from './components/auth/login.jsx'
import Signup from './components/auth/signup.jsx'
import Jobs from './components/JObs.jsx'
import Job from './components/Job.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin/Companies.jsx'
import CompanyCreate from './components/admin/CompanyCreate.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import AdminJobs from './components/admin/AdminJobs.jsx'
import PostJob from './components/admin/PostJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import AllUsers from './components/webadmin/allUsers.jsx';
import AllRecruiters from './components/webadmin/allRecruiters.jsx'
import Dashboard from './components/webadmin/Dashboard.jsx'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/job/:id",
    element: <Job />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Admin 

  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  //webAdmin route
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/allUsers",
    element: <AllUsers />
  },
  {
    path: "/allRecruiters",
    element: <AllRecruiters />
  }
])
function App() {

  return (
    <>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </>
  )
}
export default App
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// import Home from './components/Home.jsx'
// import Login from './components/auth/login.jsx'
// import Signup from './components/auth/signup.jsx'
// import Jobs from './components/JObs.jsx'
// import Job from './components/Job.jsx'
// import Browse from './components/Browse.jsx'
// import Profile from './components/Profile.jsx'
// import JobDescription from './components/JobDescription.jsx'
// import Companies from './components/admin/Companies.jsx'
// import CompanyCreate from './components/admin/CompanyCreate.jsx'
// import CompanySetup from './components/admin/CompanySetup.jsx'
// import AdminJobs from './components/admin/AdminJobs.jsx'
// import PostJob from './components/admin/PostJob.jsx'
// import Applicants from './components/admin/Applicants.jsx'
// import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
// import AllUsers from './components/webadmin/allUsers.jsx';
// // Create a role-based route guard component
// const RoleGuard = ({ children, allowedRoles }) => {
//   const { user } = useSelector(store => store.auth);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     // Redirect to appropriate dashboard based on role
//     if (user.role === 'recruiter') {
//       return <Navigate to="/admin/companies" replace />;
//     }
//     if (user.role === 'admin') {
//       return <Navigate to="/allUsers" replace />;
//     }
//     // For regular users, allow access to main content
//     return children;
//   }

//   return children;
// };

// // Modified Home component
// const HomeWrapper = () => {
//   return (
//     <RoleGuard allowedRoles={['user']}>
//       <Home />
//     </RoleGuard>
//   );
// };

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeWrapper />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   // Public routes
//   {
//     path: "/jobs",
//     element: <Jobs />
//   },
//   {
//     path: "/job/:id",
//     element: <Job />
//   },
//   {
//     path: "/description/:id",
//     element: <JobDescription />
//   },
//   {
//     path: "/browse",
//     element: <Browse />
//   },
//   // Protected user routes
//   {
//     path: "/profile",
//     element: <ProtectedRoute><Profile /></ProtectedRoute>
//   },
//   // Admin routes (Recruiter)
//   {
//     path: "/admin",
//     children: [
//       {
//         path: "companies",
//         element: <ProtectedRoute roles={['recruiter']}><Companies /></ProtectedRoute>
//       },
//       {
//         path: "companies/create",
//         element: <ProtectedRoute roles={['recruiter']}><CompanyCreate /></ProtectedRoute>
//       },
//       {
//         path: "companies/:id",
//         element: <ProtectedRoute roles={['recruiter']}><CompanySetup /></ProtectedRoute>
//       },
//       {
//         path: "jobs",
//         element: <ProtectedRoute roles={['recruiter']}><AdminJobs /></ProtectedRoute>
//       },
//       {
//         path: "jobs/create",
//         element: <ProtectedRoute roles={['recruiter']}><PostJob /></ProtectedRoute>
//       },
//       {
//         path: "jobs/:id/applicants",
//         element: <ProtectedRoute roles={['recruiter']}><Applicants /></ProtectedRoute>
//       },
//     ]
//   },
//   // Super admin routes
//   {
//     path: "/allUsers",
//     element: <ProtectedRoute roles={['admin']}><AllUsers /></ProtectedRoute>
//   }
// ]);

// function App() {
//   return <RouterProvider router={appRouter} />;
// }

// export default App;