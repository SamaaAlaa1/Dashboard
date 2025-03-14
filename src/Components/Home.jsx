import React from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'
import DataTable from 'react-data-table-component'
const Home = ({persons}) => {
    const columns = [
        {
            name: "Id",
            selector : row => row._id,
        },
        {
            name: "Name",
            selector : row => row.name,
            minWidth: "250px"

        },
        {
            name: "Age",
            selector : row => row.age,
        },
        {
            name: "Email",
            selector : row => row.email,
            minWidth: "350px"

        },
        {
            name: "Phone",
            selector : row => row.phone,
        },
        {
            name: "Level",
            selector : row => row.level,
        },
        {
            name: "University",
            selector : row => row.university,
        }
    ]
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
                fontSize: '18px',
                padding: '8px',
                textAlign: 'center',
            },
        },
    };
    
  return (
    <div className="w-full flex h-screen">
      <Sidebar />
      <div className="w-[80%] bg-white flex flex-col">
       <div className=" mt-[3%]  ml-[5%] flex">
        <div className="flex flex-col mb-[5%]">
        <h1 className="text-[120px] font-semibold ">Hello!</h1>
        <p className="text-[30px] font-thin">Welcome to Dashboard</p>
        </div>
       </div>
        <DataTable
        columns={columns}
        data={persons.slice(0,5)}
        customStyles={customStyles}
        >
        </DataTable>
        <Link to="/students" className="border mt-8 mb-4 rounded-lg bg-[#700601] w-[15%] mx-auto py-3 text-xl text-white">View All Data</Link>

        </div>
    </div>
  )
}

export default Home

