import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Students from './Components/Students'
import axios from 'axios'
import { useEffect } from 'react'
import Edit from './Components/Edit'
function App() {
  const [persons, setPersons] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fake-form.onrender.com/api/students`);
      console.log("Fetched Data:", response.data.data);
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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home persons={persons} />} />
          <Route path="/students" element={<Students persons={persons} fetchData={fetchData} />} />
          <Route path="students/:id" element={<Edit fetchData={fetchData} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
