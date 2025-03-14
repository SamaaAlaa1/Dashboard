import { useState, useEffect } from "react";
import { useAuth } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Login = () => {
    const { token, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("https://fake-form.onrender.com/api/login", {
                email,
                password,
            });

            if (response.data.success) {
                login(response.data.token);
                navigate("/", { replace: true });
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#1f1f1f]">
            <div className="w-[400px] bg-[#f6f6f6]  border border-white/20 py-16 px-8 rounded-2xl shadow-xl shadow-slate-400/40 ">
                <motion.img
                    src={logo}
                    alt="Logo"
                    className="w-32 h-32 mb-12 mx-auto"
                    animate={{
                        scale: [1, 1.5, 1.5, 1, 1],
                        rotate: [0, 0, 180, 180, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                />
                <h2 className="text-3xl font-bold mb-4 ">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin} className="flex flex-col gap-4  items-center">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 w-[350px] bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#700601] focus:border-[#700601] transition-all duration-200"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 w-[350px] bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#700601] focus:border-[#700601] transition-all duration-200"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#700601] text-white rounded-lg font-semibold w-[350px] transition-all duration-200 hover:bg-[#3d110e] focus:outline-none focus:ring-2 focus:ring-[#700601] focus:border-[#700601]"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Login;
