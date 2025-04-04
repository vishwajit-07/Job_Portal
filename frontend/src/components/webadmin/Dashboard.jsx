import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import useGetAllUsers from '@/hooks/useGetAllUsers';
import useGetAllRecruiters from '@/hooks/useGetAllRecruiters';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs';
import useGetAllSavedJobs from '@/hooks/useGetAllSavedJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import Navbar from '../shared/Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Compact Stat Card
const StatCard = ({ label, count, bgColor }) => (
  <div className={`p-3 rounded-xl shadow-md text-white text-center ${bgColor}`}>
    <p className="text-sm">{label}</p>
    <h2 className="text-xl font-bold">{count}</h2>
  </div>
);

const Dashboard = () => {
  useGetAllUsers();
  useGetAllRecruiters();
  useGetAllAdminJobs();
  useGetAllAppliedJobs();
  useGetAllSavedJobs();
  useGetAllCompanies();

  const chartRef = useRef();

  const { allUsers = [], allRecruiters = [] } = useSelector((state) => state.user);
  const { allJobs = [], allAppliedJobs = [], savedJobs = [] } = useSelector((state) => state.job);
  const { companies = [] } = useSelector((state) => state.company);

  const data = {
    labels: ['Users', 'Recruiters', 'Jobs', 'Applied', 'Saved', 'Companies'],
    datasets: [
      {
        label: 'Count',
        data: [
          allUsers.length,
          allRecruiters.length,
          allJobs.length,
          allAppliedJobs.length,
          savedJobs.length,
          companies.length,
        ],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#a78bfa');
          gradient.addColorStop(1, '#6366f1');
          return gradient;
        },
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuad',
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Admin Dashboard Overview',
        font: { size: 16 },
      },
      tooltip: {
        backgroundColor: '#333',
        bodyColor: '#fff',
        cornerRadius: 6,
        padding: 10,
      },
    },
    scales: {
      y: {
        ticks: {
          font: { size: 12 },
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div className="w-full max-w-5xl mx-auto px-4 my-6">
        <h1 className="text-2xl font-semibold text-center mb-4">📊 Admin Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Users" count={allUsers.length} bgColor="bg-indigo-500" />
          <StatCard label="Recruiters" count={allRecruiters.length} bgColor="bg-pink-500" />
          <StatCard label="Jobs" count={allJobs.length} bgColor="bg-blue-500" />
          <StatCard label="Applied" count={allAppliedJobs.length} bgColor="bg-orange-400" />
          <StatCard label="Saved" count={savedJobs.length} bgColor="bg-purple-500" />
          <StatCard label="Companies" count={companies.length} bgColor="bg-green-500" />
        </div>

        {/* Bar Chart */}
        <div className="h-[300px] bg-white p-4 rounded-xl shadow-md">
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
