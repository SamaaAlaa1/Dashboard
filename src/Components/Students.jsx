import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import DataTable from 'react-data-table-component';
import { Trash2, User } from 'lucide-react';
import Swal from 'sweetalert2';

const Students = ({ persons, fetchData }) => {
    const [loadingId, setLoadingId] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleDelete = async (id) => {
        setLoadingId(id);
        try {
            await axios.delete(`https://fake-form.onrender.com/api/students/${id}`);
            fetchData();
            console.log(`Deleted student with ID: ${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Data Deleted successfully!',
                confirmButtonColor: '#700601',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error deleting data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error Deleting data: ${err.message}`,
                confirmButtonColor: '#700601',
                confirmButtonText: 'OK'
            });
        }
        setLoadingId(null);
    };
    
    const handleBulkDelete = async () => {
        if (selectedRows.length === 0) return;
        
        const confirmDelete = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You are about to delete ${selectedRows.length} records.`,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete them!',
        });

        if (!confirmDelete.isConfirmed) return;

        try {
            await Promise.all(
                selectedRows.map(async (row) => {
                    await axios.delete(`https://fake-form.onrender.com/api/students/${row._id}`);
                })
            );
            fetchData();
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Selected records have been deleted.',
                confirmButtonColor: '#700601',
                confirmButtonText: 'OK'
            });
            setSelectedRows([]);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error deleting selected data: ${error.message}`,
                confirmButtonColor: '#700601',
                confirmButtonText: 'OK'
            });
        }
    };

    const columns = [
        {
            name: 'Id',
            selector: (row) => row._id,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            minWidth: '200px',
        },
        {
            name: 'Age',
            selector: (row) => row.age,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            minWidth: '280px',
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'Level',
            selector: (row) => row.level,
        },
        {
            name: 'University',
            selector: (row) => row.university,
            minWidth: '140px',
        },
        {
            name: '',
            cell: (row) => (
                <div className="flex gap-1 justify-center items-center">
                    <button
                        className="text-sm bg-red-500 text-white w-[70px] h-[25px] py-1 rounded flex justify-center items-center"
                        onClick={() => handleDelete(row._id)}
                        disabled={loadingId === row._id}
                    >
                        {loadingId === row._id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Trash2 className="mr-1" /> Delete
                            </>
                        )}
                    </button>
                    <Link
                        to={`${row._id}`}
                        className="text-sm bg-green-500 text-white w-[70px] h-[25px] py-1 rounded flex justify-center items-center text-left"
                    >
                        <User className="mr-1" /> Edit
                    </Link>
                </div>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '2px',
                textAlign: 'center',
            },
        },
    };

    return (
        <div className="w-full flex h-max">
            <Sidebar />
            <div className="w-[80%] bg-white flex flex-col ml-2 mb-4">
                <h1 className="text-left font-bold text-3xl my-4 px-2">Form Data</h1>
                {selectedRows.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded mb-4 w-max self-start ml-2 flex  items-center justify-center"
                    >
                       <Trash2/> Delete Selected ({selectedRows.length})
                    </button>
                )}
                <DataTable columns={columns} data={persons} customStyles={customStyles} pagination paginationPerPage={30} paginationRowsPerPageOptions={[30, 50, 100, persons.length]} selectableRows
                    onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}/>
            </div>
        </div>
    );
};

export default Students;
