import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    useEffect(() => {
        // Ensure companies is an array and handle filtering
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);  // Always set as an array
    }, [companies, searchCompanyByText]); // If no companies, set to an empty array

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filterCompany.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filterCompany.length / entriesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        // <div className="border rounded-lg shadow-lg max-w-6xl mx-auto">
        //     <div className="bg-gray-100">
        //         <Table className="min-w-full">
        //             <TableHeader>
        //                 <TableRow>
        //                     <TableHead className="w-12 p-4">#</TableHead>
        //                     <TableHead className="w-24 p-4">Logo</TableHead>
        //                     <TableHead className="w-48 p-4">Name</TableHead>
        //                     <TableHead className="w-48 p-4">Date</TableHead>
        //                     <TableHead className="w-48 p-4">Website</TableHead>
        //                     <TableHead className="w-40 p-4">Offices</TableHead>
        //                     <TableHead className='w-32 p-4 text-right'>Actions</TableHead>
        //                 </TableRow>
        //             </TableHeader>
        //         </Table>
        //     </div>
        //     <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        //         <Table className="min-w-full">
        //             <TableBody>
        //                 {
        //                     currentEntries.length <= 0 ? (
        //                         <TableRow>
        //                             <TableCell colSpan="7" className="text-center text-gray-500">
        //                                You haven't created any company.
        //                             </TableCell>
        //                         </TableRow>) : (
        //                         currentEntries?.map((company, index) => (
        //                             <TableRow key={company._id}>
        //                                 <TableCell className="w-12 p-4">{index + 1}</TableCell>
        //                                 <TableCell className="w-24 p-4">
        //                                     <Avatar>
        //                                         <AvatarImage src={company.logo || 'https://via.placeholder.com/150'} />
        //                                     </Avatar>
        //                                 </TableCell>
        //                                 <TableCell className="w-48 p-4">{company.name}</TableCell>
        //                                 <TableCell className="w-48 p-4">{company.createdAt.split("T")[0]}</TableCell>
        //                                 <TableCell className="w-48 p-4">{company.website}</TableCell>
        //                                 <TableCell className="w-40 p-4">{company.location}</TableCell>
        //                                 <TableCell className='w-32 p-4 text-right cursor-pointer'>
        //                                     <Popover>
        //                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
        //                                         <PopoverContent className='w-32'>
        //                                             <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
        //                                                 <Edit2 className='w-4' />
        //                                                 <span>Edit</span>
        //                                             </div>
        //                                         </PopoverContent>
        //                                     </Popover>
        //                                 </TableCell>
        //                             </TableRow>
        //                         ))
        //                     )}
        //             </TableBody>
        //         </Table>
        //     </div>

        //     {/* Pagination Controls */}
        //     <div className="flex justify-between items-center p-4 bg-gray-100">
        //         <button
        //             onClick={handlePreviousPage}
        //             disabled={currentPage === 1}
        //             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        //         >
        //             Previous
        //         </button>
        //         <span className="text-gray-700">
        //             Page {currentPage} of {totalPages}
        //         </span>
        //         <button
        //             onClick={handleNextPage}
        //             disabled={currentPage === totalPages}
        //             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        //         >
        //             Next
        //         </button>
        //     </div>
        // </div>
        <div className="border rounded-lg shadow-lg max-w-6xl mx-auto">
            <div className="bg-gray-100">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12 p-2">#</TableHead>
                            <TableHead className="w-24 p-2">Logo</TableHead>
                            <TableHead className="w-48 p-2">Name</TableHead>
                            <TableHead className="w-48 p-2">Date</TableHead>
                            <TableHead className="w-48 p-2">Website</TableHead>
                            <TableHead className="w-40 p-2">Offices</TableHead>
                            <TableHead className='w-32 p-2 text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <Table className="min-w-full">
                    <TableBody>
                        {
                            currentEntries.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan="7" className="text-center text-gray-500">
                                        You haven't created any company.
                                    </TableCell>
                                </TableRow>) : (
                                currentEntries?.map((company, index) => (
                                    <TableRow key={company._id}>
                                        <TableCell className="w-12 p-2">{index + 1}</TableCell>
                                        <TableCell className="w-24 p-2">
                                            <Avatar>
                                                <AvatarImage src={company.logo || 'https://via.placeholder.com/150'} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="w-48 p-2">{company.name}</TableCell>
                                        <TableCell className="w-48 p-2">{company.createdAt.split("T")[0]}</TableCell>
                                        <TableCell className="w-48 p-2">{company.website}</TableCell>
                                        <TableCell className="w-40 p-2">{company.location}</TableCell>
                                        <TableCell className='w-32 p-2 text-right cursor-pointer'>
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className='w-32'>
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>

    );
};
export default CompaniesTable;
