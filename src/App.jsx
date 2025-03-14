import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./Components/Home";
import Students from "./Components/Students";
import Edit from "./Components/Edit";
import Login from "./Components/Login";
import { AuthProvider, useAuth } from "../Context/UserContext"; 
import PrivateRoute from "./Components/PrivateRoute";

const ProtectedLogin = () => {
  const auth = useAuth();
  if (!auth) return <p>Loading...</p>; 
  return auth.token ? <Navigate to="/" replace /> : <Login />;
};

function App() {
  const [persons, setPersons] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fake-form.onrender.com/api/students`);
      setPersons(response.data.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!persons) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-white relative">
        <div className="w-16 h-16 border-4 border-[#700601] border-t-transparent rounded-full animate-spin"></div>
        <h1 className="mt-4 text-xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<ProtectedLogin />} />
          <Route path="/" element={<PrivateRoute><Home persons={persons} fetchData={fetchData} /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute><Students persons={persons} fetchData={fetchData} /></PrivateRoute>} />
          <Route path="/students/:id" element={<PrivateRoute><Edit fetchData={fetchData} /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
