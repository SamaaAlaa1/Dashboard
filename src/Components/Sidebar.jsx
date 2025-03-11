import React from 'react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const isDashboard = location.pathname === "/";

    return (
        <div className="w-[16%] bg-[#232323] flex flex-col items-center h-[100vh] sticky top-0">
            <img src={logo} alt="Logo" className="w-[100px] h-[100px] mt-4" />
            <Link 
                to="/" 
                className={`text-white w-[90%] text-left text-xl font-semibold mt-8 px-4 py-2 rounded ${isDashboard ? "bg-[#700601]" : ""}`}
            >
                Dashboard
            </Link>
            <Link 
                to="/students" 
                className={`text-white w-[90%] text-left text-xl font-semibold mt-4 px-4 py-2 rounded ${!isDashboard ? "bg-[#700601]" : ""}`}
            >
                Data
            </Link>
        </div>
    );
};

export default Sidebar;
