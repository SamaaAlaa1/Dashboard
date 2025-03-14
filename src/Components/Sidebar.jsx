import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/UserContext";
import Swal from 'sweetalert2';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const isDashboard = location.pathname === "/";

    const handleLogout = async() => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Logout",
            text: "Are you sure you want to logout?",
            confirmButtonColor: "#700601",
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            logout();
            navigate("/login", { replace: true });
        }
    };

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

            <button
                onClick={handleLogout}
                className="mt-auto mb-6 px-4 py-2 w-[90%] text-white text-xl font-semibold rounded bg-[#700601] transition-all"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
