import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import DataTable from 'react-data-table-component';
import { Trash2, User } from 'lucide-react';
import Swal from 'sweetalert2';

const Students = ({ persons, fetchData }) => {
    const [loadingId, setLoadingId] = useState(null);

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
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '16px',
                textAlign: 'center',
            },
        },
    };

    return (
        <div className="w-full flex h-max">
            <Sidebar />
            <div className="w-[80%] bg-white flex flex-col ml-2 mb-4">
                <h1 className="text-left font-bold text-3xl my-4 px-2">Form Data</h1>
                <DataTable columns={columns} data={persons} customStyles={customStyles} />
            </div>
        </div>
    );
};

export default Students;
